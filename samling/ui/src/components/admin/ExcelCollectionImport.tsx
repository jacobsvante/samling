import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { t, Trans } from "@lingui/macro";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { read, utils, WorkBook } from "xlsx";
import { useAppSelector } from "../../state/hooks";
import { EditableStyle } from "../../types/admin";
import { NestedColorSummary, NestedSizeSummary, NestedStyleSummary } from "../../types/api";

// --- Types ---

export interface ExcelMapping {
  sizeExternalIdColumns: string[];
  sizeExternalIdSeparator: string;
  newStyleColumn: string | null;
  newColorColumn: string | null;
}

interface SavedMappingEntry {
  headers: string[];
  mapping: ExcelMapping;
}

// --- localStorage helpers ---

function storageKey(userId: number): string {
  return `samling:excel-mapping:${userId}`;
}

function loadSavedMapping(userId: number): SavedMappingEntry | null {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    if (!raw) return null;
    return JSON.parse(raw) as SavedMappingEntry;
  } catch {
    return null;
  }
}

function saveMappingToStorage(
  userId: number,
  headers: string[],
  mapping: ExcelMapping,
) {
  localStorage.setItem(
    storageKey(userId),
    JSON.stringify({ headers, mapping } as SavedMappingEntry),
  );
}

// --- Excel parsing ---

function parseWorkbook(data: ArrayBuffer): {
  headers: string[];
  rows: Record<string, unknown>[];
} {
  const wb: WorkBook = read(data, { type: "array" });
  const sheetName = wb.SheetNames[0];
  const sheet = wb.Sheets[sheetName];
  const jsonRows = utils.sheet_to_json<Record<string, unknown>>(sheet);
  const headers = jsonRows.length > 0 ? Object.keys(jsonRows[0]) : [];
  return { headers, rows: jsonRows };
}

function isTruthy(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    const lower = value.trim().toLowerCase();
    return (
      lower === "true" ||
      lower === "yes" ||
      lower === "1" ||
      lower === "x" ||
      lower === "ja"
    );
  }
  return false;
}

// --- Apply Excel data to editableStyles ---

interface ExcelSizeRow {
  externalId: string;
  isNewStyle: boolean;
  isNewColor: boolean;
}

function parseExcelRows(
  rows: Record<string, unknown>[],
  mapping: ExcelMapping,
): ExcelSizeRow[] {
  const result: ExcelSizeRow[] = [];
  for (const row of rows) {
    const parts = mapping.sizeExternalIdColumns.map((col) =>
      String(row[col] ?? ""),
    );
    const externalId = parts.join(mapping.sizeExternalIdSeparator);
    if (!externalId) continue;
    result.push({
      externalId,
      isNewStyle: mapping.newStyleColumn
        ? isTruthy(row[mapping.newStyleColumn])
        : false,
      isNewColor: mapping.newColorColumn
        ? isTruthy(row[mapping.newColorColumn])
        : false,
    });
  }
  return result;
}

// Lookup structure: external_id → { sizeId, styleId, colorId }
interface SizeLookupEntry {
  sizeId: number;
  sizeNumber: string;
  styleId: number;
  colorId: number;
}

interface SizeLookups {
  byExternalId: Map<string, SizeLookupEntry>;
  bySizeId: Map<number, string>; // sizeId → externalId
}

function buildSizeLookup(
  allNestedStylesMap: Map<number, NestedStyleSummary>,
): SizeLookups {
  const byExternalId = new Map<string, SizeLookupEntry>();
  const bySizeId = new Map<number, string>();
  allNestedStylesMap.forEach((style, styleId) => {
    for (const color of style.colors) {
      for (const size of color.sizes) {
        const extId = size.external_id;
        if (!extId) continue;
        bySizeId.set(size.id, extId);
        byExternalId.set(extId, {
          sizeId: size.id,
          sizeNumber: size.number,
          styleId,
          colorId: color.id,
        });
      }
    }
  });
  return { byExternalId, bySizeId };
}

export interface ExcelImportStats {
  stylesAdded: number;
  stylesAddedNew: number;
  stylesRemoved: number;
  colorsAdded: number;
  colorsAddedNew: number;
  colorsRemoved: number;
  sizesAdded: number;
  sizesRemoved: number;
}

export function applyExcelToStyles(
  editableStyles: EditableStyle[],
  excelRows: ExcelSizeRow[],
  sizeLookups: SizeLookups,
  allNestedStylesMap: Map<number, NestedStyleSummary>,
): { styles: EditableStyle[]; stats: ExcelImportStats } {
  const sizeLookup = sizeLookups.byExternalId;
  const sizeIdToExtId = sizeLookups.bySizeId;
  const excelByExternalId = new Map(
    excelRows.map((r) => [r.externalId, r]),
  );

  // Track which excel rows are matched by existing editable sizes
  const matchedExternalIds = new Set<string>();

  // 1. Update existing styles
  const updatedStyles = editableStyles.map((style) => {
    let anyStyleNewFlag = false;
    let anyColorMatched = false;
    const colors = style.colors.map((color) => {
      let anyColorNewFlag = false;
      let anySizeMatched = false;
      const sizes = color.sizes.map((size) => {
        if (!size.externalId) return { ...size, removed: true, enabled: false };
        const excelRow = excelByExternalId.get(size.externalId);
        if (excelRow) {
          matchedExternalIds.add(size.externalId);
          anySizeMatched = true;
          if (excelRow.isNewStyle) anyStyleNewFlag = true;
          if (excelRow.isNewColor) anyColorNewFlag = true;
          return { ...size, enabled: true, removed: false };
        }
        return { ...size, enabled: false, removed: true };
      });
      if (anySizeMatched) anyColorMatched = true;
      return {
        ...color,
        sizes,
        isNew: anyColorNewFlag,
        removed: !anySizeMatched,
      };
    });
    return {
      ...style,
      colors,
      isNew: anyStyleNewFlag,
      removed: !anyColorMatched,
    };
  });

  // 2. Find unmatched excel rows and create new editable styles for them
  const unmatchedRows = excelRows.filter(
    (r) => !matchedExternalIds.has(r.externalId),
  );
  if (unmatchedRows.length === 0) return { styles: updatedStyles, stats: computeStats(editableStyles, updatedStyles) };

  // Group unmatched rows by style
  const existingStyleIds = new Set(updatedStyles.map((s) => s.id));
  const newStylesMap = new Map<
    number,
    {
      style: NestedStyleSummary;
      colorSizes: Map<number, { externalId: string; row: ExcelSizeRow }[]>;
    }
  >();

  for (const row of unmatchedRows) {
    const entry = sizeLookup.get(row.externalId);
    if (!entry) continue; // Size not found in org at all
    if (existingStyleIds.has(entry.styleId)) {
      // Style exists but this specific size wasn't in it (different color maybe)
      // Find the style in updatedStyles and add the size
      continue; // Handled below
    }
    const style = allNestedStylesMap.get(entry.styleId);
    if (!style) continue;
    if (!newStylesMap.has(entry.styleId)) {
      newStylesMap.set(entry.styleId, { style, colorSizes: new Map() });
    }
    const styleEntry = newStylesMap.get(entry.styleId)!;
    if (!styleEntry.colorSizes.has(entry.colorId)) {
      styleEntry.colorSizes.set(entry.colorId, []);
    }
    styleEntry.colorSizes.get(entry.colorId)!.push({
      externalId: row.externalId,
      row,
    });
  }

  // Also handle unmatched rows for styles already in the table
  // (sizes in colors not previously in the editable style)
  for (const row of unmatchedRows) {
    const entry = sizeLookup.get(row.externalId);
    if (!entry || !existingStyleIds.has(entry.styleId)) continue;

    const styleIdx = updatedStyles.findIndex((s) => s.id === entry.styleId);
    if (styleIdx === -1) continue;
    const style = updatedStyles[styleIdx];

    // Check if color already exists in the style
    let colorIdx = style.colors.findIndex((c) => c.id === entry.colorId);
    if (colorIdx === -1) {
      // Add new color from the full styles map
      const fullStyle = allNestedStylesMap.get(entry.styleId);
      const fullColor = fullStyle?.colors.find((c) => c.id === entry.colorId);
      if (!fullColor) continue;
      style.colors.push({
        id: fullColor.id,
        name: fullColor.name,
        number: fullColor.number,
        primaryImage: fullColor.primary_image,
        isNew: row.isNewColor,
        removed: false,
        sizes: [],
      });
      colorIdx = style.colors.length - 1;
    }

    const color = style.colors[colorIdx];
    // Check if size already exists
    if (color.sizes.find((s) => s.id === entry.sizeId)) continue;

    color.sizes.push({
      id: entry.sizeId,
      number: entry.sizeNumber,
      externalId: row.externalId,
      enabled: true,
      removed: false,
    });

    // Update flags
    if (row.isNewColor) color.isNew = true;
    if (row.isNewStyle) style.isNew = true;
    color.removed = false;
    style.removed = false;
  }

  // Build new EditableStyle entries for entirely new styles
  const newStyles: EditableStyle[] = [];
  newStylesMap.forEach(({ style, colorSizes }, styleId) => {
    let isNewStyle = false;
    const colors = style.colors.map((fullColor: NestedColorSummary) => {
      const sizeEntries = colorSizes.get(fullColor.id);
      if (!sizeEntries || sizeEntries.length === 0) {
        return {
          id: fullColor.id,
          name: fullColor.name,
          number: fullColor.number,
          primaryImage: fullColor.primary_image,
          isNew: false,
          removed: true,
          sizes: fullColor.sizes.map((s: NestedSizeSummary) => ({
            id: s.id,
            number: s.number,
            externalId: sizeIdToExtId.get(s.id) ?? null,
            enabled: false,
            removed: true,
          })),
        };
      }
      let isNewColor = false;
      for (const e of sizeEntries) {
        if (e.row.isNewStyle) isNewStyle = true;
        if (e.row.isNewColor) isNewColor = true;
      }
      const matchedExtIds = new Set(sizeEntries.map((e: { externalId: string }) => e.externalId));
      return {
        id: fullColor.id,
        name: fullColor.name,
        number: fullColor.number,
        primaryImage: fullColor.primary_image,
        isNew: isNewColor,
        removed: false,
        sizes: fullColor.sizes.map((s: NestedSizeSummary) => {
          const extId = sizeIdToExtId.get(s.id) ?? null;
          const matched = extId ? matchedExtIds.has(extId) : false;
          return {
            id: s.id,
            number: s.number,
            externalId: extId,
            enabled: matched,
            removed: !matched,
          };
        }),
      };
    });
    newStyles.push({
      id: styleId,
      name: style.name,
      number: style.number,
      isNew: isNewStyle,
      removed: false,
      colors,
    });
  });

  const allStyles = [...updatedStyles, ...newStyles];
  return { styles: allStyles, stats: computeStats(editableStyles, allStyles) };
}

function computeStats(
  before: EditableStyle[],
  after: EditableStyle[],
): ExcelImportStats {
  const beforeStyleIds = new Set(before.map((s) => s.id));
  const afterActive = after.filter((s) => !s.removed);
  const afterRemoved = after.filter((s) => s.removed);

  let stylesAdded = 0;
  let stylesAddedNew = 0;
  let stylesRemoved = 0;
  let colorsAdded = 0;
  let colorsAddedNew = 0;
  let colorsRemoved = 0;
  let sizesAdded = 0;
  let sizesRemoved = 0;

  // Styles not in original set = added
  for (const style of afterActive) {
    if (!beforeStyleIds.has(style.id)) {
      stylesAdded++;
      if (style.isNew) stylesAddedNew++;
    }
  }
  // Removed styles
  for (const style of afterRemoved) {
    if (beforeStyleIds.has(style.id)) {
      stylesRemoved++;
    }
  }

  // Colors & sizes
  const beforeColors = new Set<number>();
  const beforeSizes = new Set<number>();
  for (const style of before) {
    for (const color of style.colors) {
      if (color.sizes.some((s) => s.enabled)) beforeColors.add(color.id);
      for (const size of color.sizes) {
        if (size.enabled) beforeSizes.add(size.id);
      }
    }
  }

  for (const style of after) {
    for (const color of style.colors) {
      if (color.removed) {
        if (beforeColors.has(color.id)) colorsRemoved++;
        continue;
      }
      if (!beforeColors.has(color.id)) {
        colorsAdded++;
        if (color.isNew) colorsAddedNew++;
      }
      for (const size of color.sizes) {
        if (size.removed) {
          if (beforeSizes.has(size.id)) sizesRemoved++;
        } else if (size.enabled && !beforeSizes.has(size.id)) {
          sizesAdded++;
        }
      }
    }
  }

  return {
    stylesAdded,
    stylesAddedNew,
    stylesRemoved,
    colorsAdded,
    colorsAddedNew,
    colorsRemoved,
    sizesAdded,
    sizesRemoved,
  };
}

// --- Header mapping modal ---

function HeaderMappingModal({
  open,
  setOpen,
  headers,
  initialMapping,
  onConfirm,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  headers: string[];
  initialMapping: ExcelMapping | null;
  onConfirm: (mapping: ExcelMapping) => void;
}) {
  const [selectedSizeColumns, setSelectedSizeColumns] = useState<string[]>(
    initialMapping?.sizeExternalIdColumns ?? [],
  );
  const [separator, setSeparator] = useState(
    initialMapping?.sizeExternalIdSeparator ?? "-",
  );
  const [newStyleColumn, setNewStyleColumn] = useState<string>(
    initialMapping?.newStyleColumn ?? "",
  );
  const [newColorColumn, setNewColorColumn] = useState<string>(
    initialMapping?.newColorColumn ?? "",
  );

  useEffect(() => {
    if (initialMapping) {
      setSelectedSizeColumns(initialMapping.sizeExternalIdColumns);
      setSeparator(initialMapping.sizeExternalIdSeparator);
      setNewStyleColumn(initialMapping.newStyleColumn ?? "");
      setNewColorColumn(initialMapping.newColorColumn ?? "");
    } else {
      setSelectedSizeColumns([]);
      setSeparator("-");
      setNewStyleColumn("");
      setNewColorColumn("");
    }
  }, [initialMapping, headers]);

  function toggleSizeColumn(header: string) {
    setSelectedSizeColumns((prev) =>
      prev.includes(header)
        ? prev.filter((h) => h !== header)
        : [...prev, header],
    );
  }

  const canSubmit = selectedSizeColumns.length > 0;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {t`Map Excel columns`}
                  </Dialog.Title>
                  <p className="mt-2 text-sm text-gray-500">
                    <Trans>
                      Select which columns from your Excel file map to each
                      field. Each row in the sheet represents a size.
                    </Trans>
                  </p>

                  <div className="mt-6 space-y-6">
                    {/* Size external_id: multi-select */}
                    <fieldset>
                      <legend className="text-sm font-medium text-gray-900">
                        {t`Size external ID`}
                        <span className="ml-1 text-xs font-normal text-gray-500">
                          ({t`select one or more columns`})
                        </span>
                      </legend>
                      <p className="mt-1 text-xs text-gray-500">
                        <Trans>
                          Multiple columns will be joined with the separator
                          below.
                        </Trans>
                      </p>
                      <div className="mt-2 space-y-2">
                        {headers.map((header) => (
                          <label
                            key={header}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              checked={selectedSizeColumns.includes(header)}
                              onChange={() => toggleSizeColumn(header)}
                            />
                            <span className="text-sm text-gray-700">
                              {header}
                            </span>
                            {selectedSizeColumns.includes(header) && (
                              <span className="text-xs text-indigo-500">
                                #{selectedSizeColumns.indexOf(header) + 1}
                              </span>
                            )}
                          </label>
                        ))}
                      </div>
                      {selectedSizeColumns.length > 1 && (
                        <div className="mt-3">
                          <label
                            htmlFor="separator"
                            className="block text-sm font-medium text-gray-700"
                          >
                            {t`Separator`}
                          </label>
                          <input
                            id="separator"
                            type="text"
                            value={separator}
                            onChange={(e) => setSeparator(e.target.value)}
                            className="mt-1 block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="-"
                          />
                        </div>
                      )}
                    </fieldset>

                    {/* New style column */}
                    <div>
                      <label
                        htmlFor="new-style-col"
                        className="block text-sm font-medium text-gray-900"
                      >
                        {t`New style`}
                        <span className="ml-1 text-xs font-normal text-gray-500">
                          ({t`boolean column, optional`})
                        </span>
                      </label>
                      <select
                        id="new-style-col"
                        value={newStyleColumn}
                        onChange={(e) => setNewStyleColumn(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="">{t`— None —`}</option>
                        {headers.map((header) => (
                          <option key={header} value={header}>
                            {header}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* New color column */}
                    <div>
                      <label
                        htmlFor="new-color-col"
                        className="block text-sm font-medium text-gray-900"
                      >
                        {t`New color`}
                        <span className="ml-1 text-xs font-normal text-gray-500">
                          ({t`boolean column, optional`})
                        </span>
                      </label>
                      <select
                        id="new-color-col"
                        value={newColorColumn}
                        onChange={(e) => setNewColorColumn(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="">{t`— None —`}</option>
                        {headers.map((header) => (
                          <option key={header} value={header}>
                            {header}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preview of external_id format */}
                  {selectedSizeColumns.length > 0 && (
                    <div className="mt-4 rounded-md bg-gray-50 p-3">
                      <p className="text-xs font-medium text-gray-500">
                        {t`External ID format preview`}
                      </p>
                      <p className="mt-1 text-sm font-mono text-gray-900">
                        {selectedSizeColumns.length === 1
                          ? `{${selectedSizeColumns[0]}}`
                          : selectedSizeColumns
                            .map((col) => `{${col}}`)
                            .join(separator)}
                      </p>
                    </div>
                  )}

                  <div className="mt-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      disabled={!canSubmit}
                      onClick={() => {
                        onConfirm({
                          sizeExternalIdColumns: selectedSizeColumns,
                          sizeExternalIdSeparator: separator,
                          newStyleColumn: newStyleColumn || null,
                          newColorColumn: newColorColumn || null,
                        });
                        setOpen(false);
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:opacity-50 mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {t`Apply mapping`}
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      {t`Cancel`}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

// --- Main exported component: a button + hidden file input ---

export default function ExcelCollectionImport({
  editableStyles,
  setEditableStyles,
  allNestedStylesMap,
  onStatsChanged,
}: {
  editableStyles: EditableStyle[];
  setEditableStyles: Dispatch<SetStateAction<EditableStyle[]>>;
  allNestedStylesMap: Map<number, NestedStyleSummary>;
  onStatsChanged: (stats: ExcelImportStats | null) => void;
}) {
  const user = useAppSelector((state) => state.user.user);
  const userId = user?.id ?? null;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [mappingModalOpen, setMappingModalOpen] = useState(false);

  // Stable refs for use in the mapping callback
  const editableStylesRef = useRef(editableStyles);
  editableStylesRef.current = editableStyles;
  const allNestedStylesMapRef = useRef(allNestedStylesMap);
  allNestedStylesMapRef.current = allNestedStylesMap;

  const savedMapping = useMemo<ExcelMapping | null>(() => {
    if (!userId || headers.length === 0) return null;
    const saved = loadSavedMapping(userId);
    if (!saved) return null;
    const allSavedCols = [
      ...saved.mapping.sizeExternalIdColumns,
      ...(saved.mapping.newStyleColumn ? [saved.mapping.newStyleColumn] : []),
      ...(saved.mapping.newColorColumn ? [saved.mapping.newColorColumn] : []),
    ];
    const headersSet = new Set(headers);
    if (allSavedCols.every((col) => headersSet.has(col))) {
      return saved.mapping;
    }
    return null;
  }, [userId, headers]);

  const onFileSelected = useCallback((file: File) => {
    file.arrayBuffer().then((buffer) => {
      const { headers: h, rows: r } = parseWorkbook(buffer);
      setHeaders(h);
      setRows(r);
      setMappingModalOpen(true);
    });
  }, []);

  function onMappingConfirmed(mapping: ExcelMapping) {
    if (userId) {
      saveMappingToStorage(userId, headers, mapping);
    }
    const excelRows = parseExcelRows(rows, mapping);
    const sizeLookup = buildSizeLookup(
      allNestedStylesMapRef.current,
    );
    const { styles, stats } = applyExcelToStyles(
      editableStylesRef.current,
      excelRows,
      sizeLookup,
      allNestedStylesMapRef.current,
    );
    setEditableStyles(styles);
    onStatsChanged(stats);
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.item(0);
          if (file) onFileSelected(file);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        onClick={() => fileInputRef.current?.click()}
      >
        <Trans>Import Excel</Trans>
      </button>

      <HeaderMappingModal
        open={mappingModalOpen}
        setOpen={setMappingModalOpen}
        headers={headers}
        initialMapping={savedMapping}
        onConfirm={onMappingConfirmed}
      />
    </>
  );
}
