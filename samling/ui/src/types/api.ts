// To parse this data:
//
//   import { Convert, Api } from "./file";
//
//   const api = Convert.toApi(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Api {
    attribute:              Attribute;
    attribute_type:         AttributeType;
    attribute_type_summary: AttributeTypeSummaryObject;
    auth:                   Auth;
    category:               Category;
    category_summary:       CategorySummary;
    collection:             ApiCollection;
    collection_style_item:  CollectionStyleItem;
    collection_summary:     CollectionSummaryElement;
    collection_with_items:  CollectionWithItems;
    color:                  Color;
    color_summary:          ColorSummary;
    create_collection:      CreateCollection;
    environment:            Environment;
    errors:                 Errors;
    export:                 Export;
    filters:                Filters;
    i18n_string:            Description;
    image:                  Image;
    image_summary:          ImageSummaryElement;
    language:               Language;
    nested_attribute:       NestedAttributeElement;
    nested_color:           NestedColorElement;
    nested_price:           NestedPriceElement;
    nested_size:            NestedSizeElement;
    nested_style:           NestedStyleObject;
    nested_style_summary:   NestedStyleSummary;
    organization:           ApiOrganization;
    price:                  Price;
    price_list:             PriceList;
    price_list_summary:     List;
    size:                   Size;
    sort_by:                SortBy;
    style:                  PurpleStyle;
    style_summary:          StyleSummaryObject;
    update_collection:      UpdateCollection;
    [property: string]: any;
}

/**
 * Attribute
 */
export interface Attribute {
    created_at:   string;
    created_by?:  number | null;
    description:  Description;
    external_id?: null | string;
    id:           number;
    slug:         string;
    title:        Description;
    type:         AttributeTypeSummaryObject;
    updated_at:   string;
    [property: string]: any;
}

export interface Description {
    de?: string;
    en?: string;
    sv?: string;
    [property: string]: any;
}

/**
 * Attribute type summary
 */
export interface AttributeTypeSummaryObject {
    external_id?: null | string;
    id:           number;
    name:         Description;
    slug:         string;
    [property: string]: any;
}

/**
 * Attribute type
 */
export interface AttributeType {
    created_at:   string;
    created_by?:  number | null;
    external_id?: null | string;
    id:           number;
    name:         Description;
    slug:         string;
    updated_at:   string;
    [property: string]: any;
}

export interface Auth {
    authenticated_user:    AuthenticatedUser;
    create_group:          CreateGroup;
    create_user:           CreateUser;
    google_credentials:    GoogleCredentials;
    group:                 Group;
    group_summary:         GroupSummaryElement;
    microsoft_credentials: MicrosoftCredentials;
    update_group:          UpdateGroup;
    update_own_user:       UpdateOwnUser;
    update_user:           UpdateUser;
    user:                  AuthenticatedUserUser;
    user_summary:          UserSummaryElement;
    [property: string]: any;
}

export interface AuthenticatedUser {
    environment: Environment;
    token:       string;
    user:        AuthenticatedUserUser;
    [property: string]: any;
}

export enum Environment {
    Development = "development",
    Production = "production",
    Staging = "staging",
}

export interface AuthenticatedUserUser {
    created_at:     string;
    email:          string;
    groups:         GroupSummaryElement[];
    id:             number;
    last_sign_in?:  null | string;
    name:           string;
    organizations:  OrganizationElement[];
    profile_image?: null | string;
    updated_at:     string;
    [property: string]: any;
}

export interface GroupSummaryElement {
    description:     string;
    external_id?:    null | string;
    id:              number;
    name:            string;
    num_collections: number;
    num_price_lists: number;
    num_users:       number;
    slug:            string;
    [property: string]: any;
}

export interface OrganizationElement {
    organization: OrganizationOrganization;
    roles:        RoleElement[];
    [property: string]: any;
}

/**
 * Organization
 */
export interface OrganizationOrganization {
    id:        number;
    logo_url?: null | string;
    name:      string;
    [property: string]: any;
}

/**
 * A role that can be assigned to a user
 *
 * The u8 representation is meant for database storage/retrieval
 */
export enum RoleElement {
    Active = "Active",
    Administrator = "Administrator",
    Editor = "Editor",
    Viewer = "Viewer",
}

export interface CreateGroup {
    collections?: CollectionClass[];
    description?: string;
    external_id?: null | string;
    name:         string;
    price_lists?: PriceListElement[];
    slug?:        null | string;
    users?:       UserClass[];
    [property: string]: any;
}

export interface CollectionClass {
    id?:          number;
    external_id?: string;
    slug?:        string;
}

export interface PriceListElement {
    id?:          number;
    external_id?: string;
    slug?:        string;
}

export interface UserClass {
    id?:          number;
    external_id?: string;
    slug?:        string;
}

export interface CreateUser {
    email:          string;
    groups?:        GroupClass[] | null;
    name:           string;
    password?:      null | string;
    profile_image?: null | string;
    roles?:         RoleElement[] | null;
    [property: string]: any;
}

export interface GroupClass {
    id?:          number;
    external_id?: string;
    slug?:        string;
}

export interface GoogleCredentials {
    idToken: string;
    [property: string]: any;
}

export interface Group {
    collections:  CollectionSummaryElement[];
    created_at:   string;
    created_by?:  number | null;
    description:  string;
    external_id?: null | string;
    id:           number;
    name:         string;
    price_lists:  List[];
    slug:         string;
    updated_at:   string;
    users:        UserSummaryElement[];
    [property: string]: any;
}

/**
 * Collection
 */
export interface CollectionSummaryElement {
    acronym:      Description;
    created_at:   string;
    created_by?:  number | null;
    external_id?: null | string;
    id:           number;
    image_url?:   null | string;
    name:         Description;
    num_colors:   number;
    num_sizes:    number;
    num_styles:   number;
    pricing:      PricingElement[];
    slug:         string;
    updated_at:   string;
    [property: string]: any;
}

export interface PricingElement {
    date: string;
    list: List;
    [property: string]: any;
}

/**
 * Price list summary
 */
export interface List {
    external_id?: null | string;
    id:           number;
    name:         string;
    slug:         string;
    [property: string]: any;
}

export interface UserSummaryElement {
    email:          string;
    id:             number;
    last_sign_in?:  null | string;
    name:           string;
    profile_image?: null | string;
    [property: string]: any;
}

export interface MicrosoftCredentials {
    accessToken:   string;
    idToken:       string;
    idTokenClaims: IdTokenClaims;
    [property: string]: any;
}

export interface IdTokenClaims {
    email: string;
    name:  string;
    [property: string]: any;
}

export interface UpdateGroup {
    collections?: CollectionClass[] | null;
    description?: null | string;
    external_id?: null | string;
    name?:        null | string;
    price_lists?: PriceListElement[] | null;
    slug?:        null | string;
    users?:       UserClass[] | null;
    [property: string]: any;
}

export interface UpdateOwnUser {
    email?:         null | string;
    name?:          null | string;
    password?:      null | string;
    profile_image?: null | string;
    [property: string]: any;
}

export interface UpdateUser {
    email?:         null | string;
    groups?:        GroupClass[] | null;
    name?:          null | string;
    password?:      null | string;
    profile_image?: null | string;
    roles?:         RoleElement[] | null;
    [property: string]: any;
}

/**
 * Category
 */
export interface Category {
    created_at:   string;
    created_by?:  number | null;
    external_id?: null | string;
    id:           number;
    name:         Description;
    slug:         string;
    updated_at:   string;
    [property: string]: any;
}

/**
 * Category summary
 */
export interface CategorySummary {
    external_id?: null | string;
    id:           number;
    name:         Description;
    slug:         string;
    [property: string]: any;
}

/**
 * Collection
 */
export interface ApiCollection {
    acronym:      Description;
    created_at:   string;
    created_by?:  number | null;
    external_id?: null | string;
    id:           number;
    image_url?:   null | string;
    name:         Description;
    pricing:      PricingElement[];
    sizes:        NestedSizeElement[];
    slug:         string;
    updated_at:   string;
    [property: string]: any;
}

/**
 * Nested size (well, used by NestedColor, so `color` field isn't needed)
 */
export interface NestedSizeElement {
    delivery_period?: null | string;
    ean_code?:        null | string;
    external_id?:     null | string;
    id:               number;
    name:             Description;
    number:           string;
    position:         number;
    service_item?:    boolean | null;
    slug:             string;
    status?:          null | string;
    [property: string]: any;
}

/**
 * Collection
 */
export interface CollectionStyleItem {
    style:        NestedStyleObject;
    user_comment: string;
    [property: string]: any;
}

/**
 * Style nested with colors and sizes, with some metadata fields excluded
 */
export interface NestedStyleObject {
    attributes:         NestedAttributeElement[];
    categories:         CategorySummary[];
    colors:             NestedColorElement[];
    core?:              boolean | null;
    country_of_origin?: null | string;
    description:        Description;
    external_id?:       null | string;
    gross_weight:       number | string;
    id:                 number;
    is_new?:            boolean | null;
    name:               Description;
    net_weight:         number | string;
    number:             string;
    prices:             NestedPriceElement[];
    slug:               string;
    tariff_no?:         null | string;
    unit_volume:        number | string;
    [property: string]: any;
}

/**
 * Nested attribute
 */
export interface NestedAttributeElement {
    description:  Description;
    external_id?: null | string;
    id:           number;
    slug:         string;
    title:        Description;
    type:         AttributeTypeSummaryObject;
    [property: string]: any;
}

/**
 * Color with sizes included
 */
export interface NestedColorElement {
    external_id?: null | string;
    id:           number;
    images:       ImageSummaryElement[];
    is_new?:      boolean | null;
    name:         Description;
    number:       string;
    sizes:        NestedSizeElement[];
    slug:         string;
    [property: string]: any;
}

/**
 * Image summary
 */
export interface ImageSummaryElement {
    external_id?: null | string;
    id:           number;
    url:          string;
    [property: string]: any;
}

/**
 * Nested price set, for inclusion in a NestedStyle
 */
export interface NestedPriceElement {
    amount:   number | string;
    currency: string;
    end:      string;
    id:       number;
    list:     List;
    start:    string;
    type:     TypeEnum;
    uom?:     null | string;
    [property: string]: any;
}

export enum TypeEnum {
    Retail = "Retail",
    Unit = "Unit",
}

/**
 * Collection
 */
export interface CollectionWithItems {
    acronym:      Description;
    created_at:   string;
    created_by?:  number | null;
    external_id?: null | string;
    id:           number;
    image_url?:   null | string;
    items:        CollectionStyleItem[];
    name:         Description;
    num_colors:   number;
    num_sizes:    number;
    num_styles:   number;
    pricing:      PricingElement[];
    slug:         string;
    updated_at:   string;
    [property: string]: any;
}

/**
 * Color
 */
export interface Color {
    created_at:   string;
    created_by?:  number | null;
    external_id?: null | string;
    id:           number;
    images:       ImageSummaryElement[];
    name:         Description;
    number:       string;
    slug:         string;
    style:        StyleSummaryObject;
    updated_at:   string;
    [property: string]: any;
}

/**
 * Style summary
 */
export interface StyleSummaryObject {
    external_id?: null | string;
    id:           number;
    name:         Description;
    number:       string;
    slug:         string;
    [property: string]: any;
}

/**
 * Color summary
 */
export interface ColorSummary {
    external_id?: null | string;
    id:           number;
    name:         Description;
    number:       string;
    slug:         string;
    style:        StyleSummaryObject;
    [property: string]: any;
}

/**
 * Collection, for creation
 */
export interface CreateCollection {
    acronym:      Description;
    external_id?: null | string;
    image?:       ImageClass | null;
    name:         Description;
    new_colors:   NewColorElement[];
    new_styles:   NewStyleElement[];
    pricing:      PricingElement[];
    sizes?:       SizeClass[];
    slug?:        null | string;
    [property: string]: any;
}

export interface ImageClass {
    url?:    string;
    bytes?:  number[] | string;
    base64?: string;
}

export interface NewColorElement {
    id?:          number;
    external_id?: string;
    slug?:        string;
}

export interface NewStyleElement {
    id?:          number;
    external_id?: string;
    slug?:        string;
}

export interface SizeClass {
    id?:          number;
    external_id?: string;
    slug?:        string;
}

export interface Errors {
    code:     Code;
    response: Response;
    [property: string]: any;
}

/**
 * Auto-generated discriminant enum variants
 */
export enum Code {
    ApplicationNotReady = "ApplicationNotReady",
    Base64DecodeError = "Base64DecodeError",
    CsvError = "CsvError",
    DbBuildError = "DbBuildError",
    DbCreatePoolError = "DbCreatePoolError",
    DbError = "DbError",
    DbPoolError = "DbPoolError",
    EmptySlugDisallowed = "EmptySlugDisallowed",
    ExpiredToken = "ExpiredToken",
    ExplicitIdCreationDisallowed = "ExplicitIdCreationDisallowed",
    ExternalIdAlreadyExists = "ExternalIdAlreadyExists",
    ExternalIdNotFound = "ExternalIdNotFound",
    ExternalIdReferenceUnsupported = "ExternalIdReferenceUnsupported",
    ExternalRequestError = "ExternalRequestError",
    FailedPasswordHashing = "FailedPasswordHashing",
    FailedPasswordValidation = "FailedPasswordValidation",
    IdAlreadyExists = "IdAlreadyExists",
    IdNotFound = "IdNotFound",
    ImageAlreadyExists = "ImageAlreadyExists",
    ImageBackendMisconfigured = "ImageBackendMisconfigured",
    ImageUploadsUnavailable = "ImageUploadsUnavailable",
    InvalidDbRoleId = "InvalidDbRoleId",
    InvalidEntityRef = "InvalidEntityRef",
    InvalidHttpHeaderValue = "InvalidHttpHeaderValue",
    InvalidToken = "InvalidToken",
    InvalidUserCredentials = "InvalidUserCredentials",
    IoError = "IoError",
    JsonError = "JsonError",
    MissingEntityRefPathParameter = "MissingEntityRefPathParameter",
    MissingPermissions = "MissingPermissions",
    PathJsonError = "PathJsonError",
    PathRejection = "PathRejection",
    QueryParsingError = "QueryParsingError",
    QueryRejection = "QueryRejection",
    SlugAlreadyExists = "SlugAlreadyExists",
    SlugNotFound = "SlugNotFound",
    SlugReferenceUnsupported = "SlugReferenceUnsupported",
    UnverifiedEmail = "UnverifiedEmail",
    UrlParseError = "UrlParseError",
    UserEmailAlreadyExists = "UserEmailAlreadyExists",
    UserEmailNotFound = "UserEmailNotFound",
    XlsxError = "XlsxError",
}

export interface Response {
    error_code:    Code;
    error_message: string;
    [property: string]: any;
}

export interface Export {
    field:    Field;
    format:   Format;
    group_by: GroupBy;
    [property: string]: any;
}

export enum Field {
    Attribute = "attribute",
    CategoryName = "category_name",
    ColorExternalid = "color_external_id",
    ColorName = "color_name",
    ColorNumber = "color_number",
    Core = "core",
    CountryOfOrigin = "country_of_origin",
    DeliveryPeriod = "delivery_period",
    EanCode = "ean_code",
    GrossWeight = "gross_weight",
    Images = "images",
    NewColor = "new_color",
    NewStyle = "new_style",
    PrimaryImage = "primary_image",
    RetailPriceAmount = "retail_price_amount",
    RetailPriceCurrency = "retail_price_currency",
    RetailPriceList = "retail_price_list",
    ServiceItem = "service_item",
    SizeNumber = "size_number",
    SizeType = "size_type",
    StyleDescription = "style_description",
    StyleExternalid = "style_external_id",
    StyleName = "style_name",
    StyleNumber = "style_number",
    TariffNo = "tariff_no",
    UnitPriceAmount = "unit_price_amount",
    UnitPriceCurrency = "unit_price_currency",
    UnitPriceList = "unit_price_list",
    UnitVolume = "unit_volume",
}

export enum Format {
    Csv = "csv",
    Json = "json",
    Xlsx = "xlsx",
}

export enum GroupBy {
    Category = "category",
    Color = "color",
    Image = "image",
    PriceList = "price_list",
    Size = "size",
    Style = "style",
}

export interface Filters {
    collection:          FiltersCollection;
    item_filter_choices: ItemFilterChoices;
    style:               Styles;
    user:                FiltersUser;
    [property: string]: any;
}

export interface FiltersCollection {
    styles?: Styles;
    [property: string]: any;
}

export interface Styles {
    attributes?:        AttributeClass[] | null;
    categories?:        CategoryClass[] | null;
    core?:              boolean | null;
    country_of_origin?: string[] | null;
    new_colors?:        boolean | null;
    new_styles?:        boolean | null;
    numbers?:           string[] | null;
    pricelists?:        PriceListElement[] | null;
    refs?:              NewStyleElement[] | null;
    service_item?:      boolean | null;
    status?:            string[] | null;
    [property: string]: any;
}

export interface AttributeClass {
    id?:          number;
    external_id?: string;
    slug?:        string;
}

export interface CategoryClass {
    id?:          number;
    external_id?: string;
    slug?:        string;
}

export interface ItemFilterChoices {
    attribute: StyleElement[];
    category:  StyleElement[];
    status:    string[];
    style:     StyleElement[];
    [property: string]: any;
}

export interface StyleElement {
    id:        number;
    image?:    null | ImageSummaryElement;
    subtitle?: null | Description;
    title:     Description;
    [property: string]: any;
}

export interface FiltersUser {
    groups?: GroupClass[] | null;
    roles?:  RoleElement[] | null;
    [property: string]: any;
}

/**
 * Image
 */
export interface Image {
    color:              ColorSummary;
    external_checksum?: null | string;
    external_id?:       null | string;
    id:                 number;
    position:           number;
    updated_at:         string;
    uploaded_at:        string;
    uploaded_by?:       number | null;
    url:                string;
    [property: string]: any;
}

export enum Language {
    De = "de",
    En = "en",
    Sv = "sv",
}

/**
 * Style nested with colors and sizes, with some metadata fields excluded
 */
export interface NestedStyleSummary {
    colors: NestedStyleSummaryColor[];
    id:     number;
    name:   Description;
    number: string;
    [property: string]: any;
}

/**
 * Color with sizes included
 */
export interface NestedStyleSummaryColor {
    id:             number;
    name:           Description;
    number:         string;
    primary_image?: null | ImageSummaryElement;
    sizes:          PurpleSchema[];
    [property: string]: any;
}

/**
 * Nested size (well, used by NestedColor, so `color` field isn't needed)
 */
export interface PurpleSchema {
    id:     number;
    name:   Description;
    number: string;
    [property: string]: any;
}

/**
 * Organization
 */
export interface ApiOrganization {
    created_at:  string;
    created_by?: number | null;
    id:          number;
    logo_url?:   null | string;
    name:        string;
    updated_at:  string;
    [property: string]: any;
}

/**
 * Price set (belonging to the same list and style, but with different start/end dates)
 */
export interface Price {
    amount:       number | string;
    created_at:   string;
    created_by?:  number | null;
    currency:     string;
    end:          string;
    external_id?: null | string;
    id:           number;
    list:         List;
    start:        string;
    style:        StyleSummaryObject;
    type:         TypeEnum;
    uom?:         null | string;
    updated_at:   string;
    [property: string]: any;
}

/**
 * PriceList
 */
export interface PriceList {
    created_at:   string;
    created_by?:  number | null;
    external_id?: null | string;
    id:           number;
    name:         string;
    slug:         string;
    updated_at:   string;
    [property: string]: any;
}

/**
 * Size
 */
export interface Size {
    color:            ColorSummary;
    created_at:       string;
    created_by?:      number | null;
    delivery_period?: null | string;
    ean_code?:        null | string;
    external_id?:     null | string;
    id:               number;
    name:             Description;
    number:           string;
    position:         number;
    service_item?:    boolean | null;
    slug:             string;
    status?:          null | string;
    updated_at:       string;
    [property: string]: any;
}

export interface SortBy {
    nested_style: NestedStyle;
    user:         UserEnum;
    [property: string]: any;
}

export enum NestedStyle {
    DeliveryPeriodAsc = "delivery_period:asc",
    DeliveryPeriodDesc = "delivery_period:desc",
    NameAsc = "name:asc",
    NumberAsc = "number:asc",
}

export enum UserEnum {
    EmailAsc = "email:asc",
    LastSignInAsc = "last_sign_in:asc",
    LastSignInDesc = "last_sign_in:desc",
    NameAsc = "name:asc",
}

/**
 * Style
 */
export interface PurpleStyle {
    attributes:         NestedAttributeElement[];
    categories:         Category[];
    core?:              boolean | null;
    country_of_origin?: null | string;
    created_at:         string;
    created_by?:        number | null;
    description:        Description;
    external_id?:       null | string;
    gross_weight:       number | string;
    id:                 number;
    name:               Description;
    net_weight:         number | string;
    number:             string;
    slug:               string;
    tariff_no?:         null | string;
    unit_volume:        number | string;
    updated_at:         string;
    [property: string]: any;
}

/**
 * Collection, for update
 */
export interface UpdateCollection {
    acronym?:     null | Description;
    external_id?: null | string;
    image?:       ImageClass | null;
    name?:        null | Description;
    new_colors?:  NewColorElement[] | null;
    new_styles?:  NewStyleElement[] | null;
    pricing?:     PricingElement[] | null;
    sizes?:       SizeClass[] | null;
    slug?:        null | string;
    [property: string]: any;
}

// Converts JSON types to/from your types
// and asserts the results at runtime
export class Convert {
    public static toApi(json: any): Api {
        return cast(json, r("Api"));
    }

    public static apiToJson(value: Api): any {
        return uncast(value, r("Api"));
    }

    public static toAttribute(json: any): Attribute {
        return cast(json, r("Attribute"));
    }

    public static attributeToJson(value: Attribute): any {
        return uncast(value, r("Attribute"));
    }

    public static toDescription(json: any): Description {
        return cast(json, r("Description"));
    }

    public static descriptionToJson(value: Description): any {
        return uncast(value, r("Description"));
    }

    public static toAttributeTypeSummaryObject(json: any): AttributeTypeSummaryObject {
        return cast(json, r("AttributeTypeSummaryObject"));
    }

    public static attributeTypeSummaryObjectToJson(value: AttributeTypeSummaryObject): any {
        return uncast(value, r("AttributeTypeSummaryObject"));
    }

    public static toAttributeType(json: any): AttributeType {
        return cast(json, r("AttributeType"));
    }

    public static attributeTypeToJson(value: AttributeType): any {
        return uncast(value, r("AttributeType"));
    }

    public static toAuth(json: any): Auth {
        return cast(json, r("Auth"));
    }

    public static authToJson(value: Auth): any {
        return uncast(value, r("Auth"));
    }

    public static toAuthenticatedUser(json: any): AuthenticatedUser {
        return cast(json, r("AuthenticatedUser"));
    }

    public static authenticatedUserToJson(value: AuthenticatedUser): any {
        return uncast(value, r("AuthenticatedUser"));
    }

    public static toAuthenticatedUserUser(json: any): AuthenticatedUserUser {
        return cast(json, r("AuthenticatedUserUser"));
    }

    public static authenticatedUserUserToJson(value: AuthenticatedUserUser): any {
        return uncast(value, r("AuthenticatedUserUser"));
    }

    public static toGroupSummaryElement(json: any): GroupSummaryElement {
        return cast(json, r("GroupSummaryElement"));
    }

    public static groupSummaryElementToJson(value: GroupSummaryElement): any {
        return uncast(value, r("GroupSummaryElement"));
    }

    public static toOrganizationElement(json: any): OrganizationElement {
        return cast(json, r("OrganizationElement"));
    }

    public static organizationElementToJson(value: OrganizationElement): any {
        return uncast(value, r("OrganizationElement"));
    }

    public static toOrganizationOrganization(json: any): OrganizationOrganization {
        return cast(json, r("OrganizationOrganization"));
    }

    public static organizationOrganizationToJson(value: OrganizationOrganization): any {
        return uncast(value, r("OrganizationOrganization"));
    }

    public static toCreateGroup(json: any): CreateGroup {
        return cast(json, r("CreateGroup"));
    }

    public static createGroupToJson(value: CreateGroup): any {
        return uncast(value, r("CreateGroup"));
    }

    public static toCollectionClass(json: any): CollectionClass {
        return cast(json, r("CollectionClass"));
    }

    public static collectionClassToJson(value: CollectionClass): any {
        return uncast(value, r("CollectionClass"));
    }

    public static toPriceListElement(json: any): PriceListElement {
        return cast(json, r("PriceListElement"));
    }

    public static priceListElementToJson(value: PriceListElement): any {
        return uncast(value, r("PriceListElement"));
    }

    public static toUserClass(json: any): UserClass {
        return cast(json, r("UserClass"));
    }

    public static userClassToJson(value: UserClass): any {
        return uncast(value, r("UserClass"));
    }

    public static toCreateUser(json: any): CreateUser {
        return cast(json, r("CreateUser"));
    }

    public static createUserToJson(value: CreateUser): any {
        return uncast(value, r("CreateUser"));
    }

    public static toGroupClass(json: any): GroupClass {
        return cast(json, r("GroupClass"));
    }

    public static groupClassToJson(value: GroupClass): any {
        return uncast(value, r("GroupClass"));
    }

    public static toGoogleCredentials(json: any): GoogleCredentials {
        return cast(json, r("GoogleCredentials"));
    }

    public static googleCredentialsToJson(value: GoogleCredentials): any {
        return uncast(value, r("GoogleCredentials"));
    }

    public static toGroup(json: any): Group {
        return cast(json, r("Group"));
    }

    public static groupToJson(value: Group): any {
        return uncast(value, r("Group"));
    }

    public static toCollectionSummaryElement(json: any): CollectionSummaryElement {
        return cast(json, r("CollectionSummaryElement"));
    }

    public static collectionSummaryElementToJson(value: CollectionSummaryElement): any {
        return uncast(value, r("CollectionSummaryElement"));
    }

    public static toPricingElement(json: any): PricingElement {
        return cast(json, r("PricingElement"));
    }

    public static pricingElementToJson(value: PricingElement): any {
        return uncast(value, r("PricingElement"));
    }

    public static toList(json: any): List {
        return cast(json, r("List"));
    }

    public static listToJson(value: List): any {
        return uncast(value, r("List"));
    }

    public static toUserSummaryElement(json: any): UserSummaryElement {
        return cast(json, r("UserSummaryElement"));
    }

    public static userSummaryElementToJson(value: UserSummaryElement): any {
        return uncast(value, r("UserSummaryElement"));
    }

    public static toMicrosoftCredentials(json: any): MicrosoftCredentials {
        return cast(json, r("MicrosoftCredentials"));
    }

    public static microsoftCredentialsToJson(value: MicrosoftCredentials): any {
        return uncast(value, r("MicrosoftCredentials"));
    }

    public static toIdTokenClaims(json: any): IdTokenClaims {
        return cast(json, r("IdTokenClaims"));
    }

    public static idTokenClaimsToJson(value: IdTokenClaims): any {
        return uncast(value, r("IdTokenClaims"));
    }

    public static toUpdateGroup(json: any): UpdateGroup {
        return cast(json, r("UpdateGroup"));
    }

    public static updateGroupToJson(value: UpdateGroup): any {
        return uncast(value, r("UpdateGroup"));
    }

    public static toUpdateOwnUser(json: any): UpdateOwnUser {
        return cast(json, r("UpdateOwnUser"));
    }

    public static updateOwnUserToJson(value: UpdateOwnUser): any {
        return uncast(value, r("UpdateOwnUser"));
    }

    public static toUpdateUser(json: any): UpdateUser {
        return cast(json, r("UpdateUser"));
    }

    public static updateUserToJson(value: UpdateUser): any {
        return uncast(value, r("UpdateUser"));
    }

    public static toCategory(json: any): Category {
        return cast(json, r("Category"));
    }

    public static categoryToJson(value: Category): any {
        return uncast(value, r("Category"));
    }

    public static toCategorySummary(json: any): CategorySummary {
        return cast(json, r("CategorySummary"));
    }

    public static categorySummaryToJson(value: CategorySummary): any {
        return uncast(value, r("CategorySummary"));
    }

    public static toApiCollection(json: any): ApiCollection {
        return cast(json, r("ApiCollection"));
    }

    public static apiCollectionToJson(value: ApiCollection): any {
        return uncast(value, r("ApiCollection"));
    }

    public static toNestedSizeElement(json: any): NestedSizeElement {
        return cast(json, r("NestedSizeElement"));
    }

    public static nestedSizeElementToJson(value: NestedSizeElement): any {
        return uncast(value, r("NestedSizeElement"));
    }

    public static toCollectionStyleItem(json: any): CollectionStyleItem {
        return cast(json, r("CollectionStyleItem"));
    }

    public static collectionStyleItemToJson(value: CollectionStyleItem): any {
        return uncast(value, r("CollectionStyleItem"));
    }

    public static toNestedStyleObject(json: any): NestedStyleObject {
        return cast(json, r("NestedStyleObject"));
    }

    public static nestedStyleObjectToJson(value: NestedStyleObject): any {
        return uncast(value, r("NestedStyleObject"));
    }

    public static toNestedAttributeElement(json: any): NestedAttributeElement {
        return cast(json, r("NestedAttributeElement"));
    }

    public static nestedAttributeElementToJson(value: NestedAttributeElement): any {
        return uncast(value, r("NestedAttributeElement"));
    }

    public static toNestedColorElement(json: any): NestedColorElement {
        return cast(json, r("NestedColorElement"));
    }

    public static nestedColorElementToJson(value: NestedColorElement): any {
        return uncast(value, r("NestedColorElement"));
    }

    public static toImageSummaryElement(json: any): ImageSummaryElement {
        return cast(json, r("ImageSummaryElement"));
    }

    public static imageSummaryElementToJson(value: ImageSummaryElement): any {
        return uncast(value, r("ImageSummaryElement"));
    }

    public static toNestedPriceElement(json: any): NestedPriceElement {
        return cast(json, r("NestedPriceElement"));
    }

    public static nestedPriceElementToJson(value: NestedPriceElement): any {
        return uncast(value, r("NestedPriceElement"));
    }

    public static toCollectionWithItems(json: any): CollectionWithItems {
        return cast(json, r("CollectionWithItems"));
    }

    public static collectionWithItemsToJson(value: CollectionWithItems): any {
        return uncast(value, r("CollectionWithItems"));
    }

    public static toColor(json: any): Color {
        return cast(json, r("Color"));
    }

    public static colorToJson(value: Color): any {
        return uncast(value, r("Color"));
    }

    public static toStyleSummaryObject(json: any): StyleSummaryObject {
        return cast(json, r("StyleSummaryObject"));
    }

    public static styleSummaryObjectToJson(value: StyleSummaryObject): any {
        return uncast(value, r("StyleSummaryObject"));
    }

    public static toColorSummary(json: any): ColorSummary {
        return cast(json, r("ColorSummary"));
    }

    public static colorSummaryToJson(value: ColorSummary): any {
        return uncast(value, r("ColorSummary"));
    }

    public static toCreateCollection(json: any): CreateCollection {
        return cast(json, r("CreateCollection"));
    }

    public static createCollectionToJson(value: CreateCollection): any {
        return uncast(value, r("CreateCollection"));
    }

    public static toImageClass(json: any): ImageClass {
        return cast(json, r("ImageClass"));
    }

    public static imageClassToJson(value: ImageClass): any {
        return uncast(value, r("ImageClass"));
    }

    public static toNewColorElement(json: any): NewColorElement {
        return cast(json, r("NewColorElement"));
    }

    public static newColorElementToJson(value: NewColorElement): any {
        return uncast(value, r("NewColorElement"));
    }

    public static toNewStyleElement(json: any): NewStyleElement {
        return cast(json, r("NewStyleElement"));
    }

    public static newStyleElementToJson(value: NewStyleElement): any {
        return uncast(value, r("NewStyleElement"));
    }

    public static toSizeClass(json: any): SizeClass {
        return cast(json, r("SizeClass"));
    }

    public static sizeClassToJson(value: SizeClass): any {
        return uncast(value, r("SizeClass"));
    }

    public static toErrors(json: any): Errors {
        return cast(json, r("Errors"));
    }

    public static errorsToJson(value: Errors): any {
        return uncast(value, r("Errors"));
    }

    public static toResponse(json: any): Response {
        return cast(json, r("Response"));
    }

    public static responseToJson(value: Response): any {
        return uncast(value, r("Response"));
    }

    public static toExport(json: any): Export {
        return cast(json, r("Export"));
    }

    public static exportToJson(value: Export): any {
        return uncast(value, r("Export"));
    }

    public static toFilters(json: any): Filters {
        return cast(json, r("Filters"));
    }

    public static filtersToJson(value: Filters): any {
        return uncast(value, r("Filters"));
    }

    public static toFiltersCollection(json: any): FiltersCollection {
        return cast(json, r("FiltersCollection"));
    }

    public static filtersCollectionToJson(value: FiltersCollection): any {
        return uncast(value, r("FiltersCollection"));
    }

    public static toStyles(json: any): Styles {
        return cast(json, r("Styles"));
    }

    public static stylesToJson(value: Styles): any {
        return uncast(value, r("Styles"));
    }

    public static toAttributeClass(json: any): AttributeClass {
        return cast(json, r("AttributeClass"));
    }

    public static attributeClassToJson(value: AttributeClass): any {
        return uncast(value, r("AttributeClass"));
    }

    public static toCategoryClass(json: any): CategoryClass {
        return cast(json, r("CategoryClass"));
    }

    public static categoryClassToJson(value: CategoryClass): any {
        return uncast(value, r("CategoryClass"));
    }

    public static toItemFilterChoices(json: any): ItemFilterChoices {
        return cast(json, r("ItemFilterChoices"));
    }

    public static itemFilterChoicesToJson(value: ItemFilterChoices): any {
        return uncast(value, r("ItemFilterChoices"));
    }

    public static toStyleElement(json: any): StyleElement {
        return cast(json, r("StyleElement"));
    }

    public static styleElementToJson(value: StyleElement): any {
        return uncast(value, r("StyleElement"));
    }

    public static toFiltersUser(json: any): FiltersUser {
        return cast(json, r("FiltersUser"));
    }

    public static filtersUserToJson(value: FiltersUser): any {
        return uncast(value, r("FiltersUser"));
    }

    public static toImage(json: any): Image {
        return cast(json, r("Image"));
    }

    public static imageToJson(value: Image): any {
        return uncast(value, r("Image"));
    }

    public static toNestedStyleSummary(json: any): NestedStyleSummary {
        return cast(json, r("NestedStyleSummary"));
    }

    public static nestedStyleSummaryToJson(value: NestedStyleSummary): any {
        return uncast(value, r("NestedStyleSummary"));
    }

    public static toNestedStyleSummaryColor(json: any): NestedStyleSummaryColor {
        return cast(json, r("NestedStyleSummaryColor"));
    }

    public static nestedStyleSummaryColorToJson(value: NestedStyleSummaryColor): any {
        return uncast(value, r("NestedStyleSummaryColor"));
    }

    public static toPurpleSchema(json: any): PurpleSchema {
        return cast(json, r("PurpleSchema"));
    }

    public static purpleSchemaToJson(value: PurpleSchema): any {
        return uncast(value, r("PurpleSchema"));
    }

    public static toApiOrganization(json: any): ApiOrganization {
        return cast(json, r("ApiOrganization"));
    }

    public static apiOrganizationToJson(value: ApiOrganization): any {
        return uncast(value, r("ApiOrganization"));
    }

    public static toPrice(json: any): Price {
        return cast(json, r("Price"));
    }

    public static priceToJson(value: Price): any {
        return uncast(value, r("Price"));
    }

    public static toPriceList(json: any): PriceList {
        return cast(json, r("PriceList"));
    }

    public static priceListToJson(value: PriceList): any {
        return uncast(value, r("PriceList"));
    }

    public static toSize(json: any): Size {
        return cast(json, r("Size"));
    }

    public static sizeToJson(value: Size): any {
        return uncast(value, r("Size"));
    }

    public static toSortBy(json: any): SortBy {
        return cast(json, r("SortBy"));
    }

    public static sortByToJson(value: SortBy): any {
        return uncast(value, r("SortBy"));
    }

    public static toPurpleStyle(json: any): PurpleStyle {
        return cast(json, r("PurpleStyle"));
    }

    public static purpleStyleToJson(value: PurpleStyle): any {
        return uncast(value, r("PurpleStyle"));
    }

    public static toUpdateCollection(json: any): UpdateCollection {
        return cast(json, r("UpdateCollection"));
    }

    public static updateCollectionToJson(value: UpdateCollection): any {
        return uncast(value, r("UpdateCollection"));
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Api": o([
        { json: "attribute", js: "attribute", typ: r("Attribute") },
        { json: "attribute_type", js: "attribute_type", typ: r("AttributeType") },
        { json: "attribute_type_summary", js: "attribute_type_summary", typ: r("AttributeTypeSummaryObject") },
        { json: "auth", js: "auth", typ: r("Auth") },
        { json: "category", js: "category", typ: r("Category") },
        { json: "category_summary", js: "category_summary", typ: r("CategorySummary") },
        { json: "collection", js: "collection", typ: r("ApiCollection") },
        { json: "collection_style_item", js: "collection_style_item", typ: r("CollectionStyleItem") },
        { json: "collection_summary", js: "collection_summary", typ: r("CollectionSummaryElement") },
        { json: "collection_with_items", js: "collection_with_items", typ: r("CollectionWithItems") },
        { json: "color", js: "color", typ: r("Color") },
        { json: "color_summary", js: "color_summary", typ: r("ColorSummary") },
        { json: "create_collection", js: "create_collection", typ: r("CreateCollection") },
        { json: "environment", js: "environment", typ: r("Environment") },
        { json: "errors", js: "errors", typ: r("Errors") },
        { json: "export", js: "export", typ: r("Export") },
        { json: "filters", js: "filters", typ: r("Filters") },
        { json: "i18n_string", js: "i18n_string", typ: r("Description") },
        { json: "image", js: "image", typ: r("Image") },
        { json: "image_summary", js: "image_summary", typ: r("ImageSummaryElement") },
        { json: "language", js: "language", typ: r("Language") },
        { json: "nested_attribute", js: "nested_attribute", typ: r("NestedAttributeElement") },
        { json: "nested_color", js: "nested_color", typ: r("NestedColorElement") },
        { json: "nested_price", js: "nested_price", typ: r("NestedPriceElement") },
        { json: "nested_size", js: "nested_size", typ: r("NestedSizeElement") },
        { json: "nested_style", js: "nested_style", typ: r("NestedStyleObject") },
        { json: "nested_style_summary", js: "nested_style_summary", typ: r("NestedStyleSummary") },
        { json: "organization", js: "organization", typ: r("ApiOrganization") },
        { json: "price", js: "price", typ: r("Price") },
        { json: "price_list", js: "price_list", typ: r("PriceList") },
        { json: "price_list_summary", js: "price_list_summary", typ: r("List") },
        { json: "size", js: "size", typ: r("Size") },
        { json: "sort_by", js: "sort_by", typ: r("SortBy") },
        { json: "style", js: "style", typ: r("PurpleStyle") },
        { json: "style_summary", js: "style_summary", typ: r("StyleSummaryObject") },
        { json: "update_collection", js: "update_collection", typ: r("UpdateCollection") },
    ], "any"),
    "Attribute": o([
        { json: "created_at", js: "created_at", typ: "" },
        { json: "created_by", js: "created_by", typ: u(undefined, u(3.14, null)) },
        { json: "description", js: "description", typ: r("Description") },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "slug", js: "slug", typ: "" },
        { json: "title", js: "title", typ: r("Description") },
        { json: "type", js: "type", typ: r("AttributeTypeSummaryObject") },
        { json: "updated_at", js: "updated_at", typ: "" },
    ], "any"),
    "Description": o([
        { json: "de", js: "de", typ: u(undefined, "") },
        { json: "en", js: "en", typ: u(undefined, "") },
        { json: "sv", js: "sv", typ: u(undefined, "") },
    ], "any"),
    "AttributeTypeSummaryObject": o([
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "name", js: "name", typ: r("Description") },
        { json: "slug", js: "slug", typ: "" },
    ], "any"),
    "AttributeType": o([
        { json: "created_at", js: "created_at", typ: "" },
        { json: "created_by", js: "created_by", typ: u(undefined, u(3.14, null)) },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "name", js: "name", typ: r("Description") },
        { json: "slug", js: "slug", typ: "" },
        { json: "updated_at", js: "updated_at", typ: "" },
    ], "any"),
    "Auth": o([
        { json: "authenticated_user", js: "authenticated_user", typ: r("AuthenticatedUser") },
        { json: "create_group", js: "create_group", typ: r("CreateGroup") },
        { json: "create_user", js: "create_user", typ: r("CreateUser") },
        { json: "google_credentials", js: "google_credentials", typ: r("GoogleCredentials") },
        { json: "group", js: "group", typ: r("Group") },
        { json: "group_summary", js: "group_summary", typ: r("GroupSummaryElement") },
        { json: "microsoft_credentials", js: "microsoft_credentials", typ: r("MicrosoftCredentials") },
        { json: "update_group", js: "update_group", typ: r("UpdateGroup") },
        { json: "update_own_user", js: "update_own_user", typ: r("UpdateOwnUser") },
        { json: "update_user", js: "update_user", typ: r("UpdateUser") },
        { json: "user", js: "user", typ: r("AuthenticatedUserUser") },
        { json: "user_summary", js: "user_summary", typ: r("UserSummaryElement") },
    ], "any"),
    "AuthenticatedUser": o([
        { json: "environment", js: "environment", typ: r("Environment") },
        { json: "token", js: "token", typ: "" },
        { json: "user", js: "user", typ: r("AuthenticatedUserUser") },
    ], "any"),
    "AuthenticatedUserUser": o([
        { json: "created_at", js: "created_at", typ: "" },
        { json: "email", js: "email", typ: "" },
        { json: "groups", js: "groups", typ: a(r("GroupSummaryElement")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "last_sign_in", js: "last_sign_in", typ: u(undefined, u(null, "")) },
        { json: "name", js: "name", typ: "" },
        { json: "organizations", js: "organizations", typ: a(r("OrganizationElement")) },
        { json: "profile_image", js: "profile_image", typ: u(undefined, u(null, "")) },
        { json: "updated_at", js: "updated_at", typ: "" },
    ], "any"),
    "GroupSummaryElement": o([
        { json: "description", js: "description", typ: "" },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "name", js: "name", typ: "" },
        { json: "num_collections", js: "num_collections", typ: 0 },
        { json: "num_price_lists", js: "num_price_lists", typ: 0 },
        { json: "num_users", js: "num_users", typ: 0 },
        { json: "slug", js: "slug", typ: "" },
    ], "any"),
    "OrganizationElement": o([
        { json: "organization", js: "organization", typ: r("OrganizationOrganization") },
        { json: "roles", js: "roles", typ: a(r("RoleElement")) },
    ], "any"),
    "OrganizationOrganization": o([
        { json: "id", js: "id", typ: 3.14 },
        { json: "logo_url", js: "logo_url", typ: u(undefined, u(null, "")) },
        { json: "name", js: "name", typ: "" },
    ], "any"),
    "CreateGroup": o([
        { json: "collections", js: "collections", typ: u(undefined, a(r("CollectionClass"))) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "name", js: "name", typ: "" },
        { json: "price_lists", js: "price_lists", typ: u(undefined, a(r("PriceListElement"))) },
        { json: "slug", js: "slug", typ: u(undefined, u(null, "")) },
        { json: "users", js: "users", typ: u(undefined, a(r("UserClass"))) },
    ], "any"),
    "CollectionClass": o([
        { json: "id", js: "id", typ: u(undefined, 3.14) },
        { json: "external_id", js: "external_id", typ: u(undefined, "") },
        { json: "slug", js: "slug", typ: u(undefined, "") },
    ], false),
    "PriceListElement": o([
        { json: "id", js: "id", typ: u(undefined, 3.14) },
        { json: "external_id", js: "external_id", typ: u(undefined, "") },
        { json: "slug", js: "slug", typ: u(undefined, "") },
    ], false),
    "UserClass": o([
        { json: "id", js: "id", typ: u(undefined, 3.14) },
        { json: "external_id", js: "external_id", typ: u(undefined, "") },
        { json: "slug", js: "slug", typ: u(undefined, "") },
    ], false),
    "CreateUser": o([
        { json: "email", js: "email", typ: "" },
        { json: "groups", js: "groups", typ: u(undefined, u(a(r("GroupClass")), null)) },
        { json: "name", js: "name", typ: "" },
        { json: "password", js: "password", typ: u(undefined, u(null, "")) },
        { json: "profile_image", js: "profile_image", typ: u(undefined, u(null, "")) },
        { json: "roles", js: "roles", typ: u(undefined, u(a(r("RoleElement")), null)) },
    ], "any"),
    "GroupClass": o([
        { json: "id", js: "id", typ: u(undefined, 3.14) },
        { json: "external_id", js: "external_id", typ: u(undefined, "") },
        { json: "slug", js: "slug", typ: u(undefined, "") },
    ], false),
    "GoogleCredentials": o([
        { json: "idToken", js: "idToken", typ: "" },
    ], "any"),
    "Group": o([
        { json: "collections", js: "collections", typ: a(r("CollectionSummaryElement")) },
        { json: "created_at", js: "created_at", typ: "" },
        { json: "created_by", js: "created_by", typ: u(undefined, u(3.14, null)) },
        { json: "description", js: "description", typ: "" },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "name", js: "name", typ: "" },
        { json: "price_lists", js: "price_lists", typ: a(r("List")) },
        { json: "slug", js: "slug", typ: "" },
        { json: "updated_at", js: "updated_at", typ: "" },
        { json: "users", js: "users", typ: a(r("UserSummaryElement")) },
    ], "any"),
    "CollectionSummaryElement": o([
        { json: "acronym", js: "acronym", typ: r("Description") },
        { json: "created_at", js: "created_at", typ: "" },
        { json: "created_by", js: "created_by", typ: u(undefined, u(3.14, null)) },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "image_url", js: "image_url", typ: u(undefined, u(null, "")) },
        { json: "name", js: "name", typ: r("Description") },
        { json: "num_colors", js: "num_colors", typ: 0 },
        { json: "num_sizes", js: "num_sizes", typ: 0 },
        { json: "num_styles", js: "num_styles", typ: 0 },
        { json: "pricing", js: "pricing", typ: a(r("PricingElement")) },
        { json: "slug", js: "slug", typ: "" },
        { json: "updated_at", js: "updated_at", typ: "" },
    ], "any"),
    "PricingElement": o([
        { json: "date", js: "date", typ: "" },
        { json: "list", js: "list", typ: r("List") },
    ], "any"),
    "List": o([
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "name", js: "name", typ: "" },
        { json: "slug", js: "slug", typ: "" },
    ], "any"),
    "UserSummaryElement": o([
        { json: "email", js: "email", typ: "" },
        { json: "id", js: "id", typ: 3.14 },
        { json: "last_sign_in", js: "last_sign_in", typ: u(undefined, u(null, "")) },
        { json: "name", js: "name", typ: "" },
        { json: "profile_image", js: "profile_image", typ: u(undefined, u(null, "")) },
    ], "any"),
    "MicrosoftCredentials": o([
        { json: "accessToken", js: "accessToken", typ: "" },
        { json: "idToken", js: "idToken", typ: "" },
        { json: "idTokenClaims", js: "idTokenClaims", typ: r("IdTokenClaims") },
    ], "any"),
    "IdTokenClaims": o([
        { json: "email", js: "email", typ: "" },
        { json: "name", js: "name", typ: "" },
    ], "any"),
    "UpdateGroup": o([
        { json: "collections", js: "collections", typ: u(undefined, u(a(r("CollectionClass")), null)) },
        { json: "description", js: "description", typ: u(undefined, u(null, "")) },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "name", js: "name", typ: u(undefined, u(null, "")) },
        { json: "price_lists", js: "price_lists", typ: u(undefined, u(a(r("PriceListElement")), null)) },
        { json: "slug", js: "slug", typ: u(undefined, u(null, "")) },
        { json: "users", js: "users", typ: u(undefined, u(a(r("UserClass")), null)) },
    ], "any"),
    "UpdateOwnUser": o([
        { json: "email", js: "email", typ: u(undefined, u(null, "")) },
        { json: "name", js: "name", typ: u(undefined, u(null, "")) },
        { json: "password", js: "password", typ: u(undefined, u(null, "")) },
        { json: "profile_image", js: "profile_image", typ: u(undefined, u(null, "")) },
    ], "any"),
    "UpdateUser": o([
        { json: "email", js: "email", typ: u(undefined, u(null, "")) },
        { json: "groups", js: "groups", typ: u(undefined, u(a(r("GroupClass")), null)) },
        { json: "name", js: "name", typ: u(undefined, u(null, "")) },
        { json: "password", js: "password", typ: u(undefined, u(null, "")) },
        { json: "profile_image", js: "profile_image", typ: u(undefined, u(null, "")) },
        { json: "roles", js: "roles", typ: u(undefined, u(a(r("RoleElement")), null)) },
    ], "any"),
    "Category": o([
        { json: "created_at", js: "created_at", typ: "" },
        { json: "created_by", js: "created_by", typ: u(undefined, u(3.14, null)) },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "name", js: "name", typ: r("Description") },
        { json: "slug", js: "slug", typ: "" },
        { json: "updated_at", js: "updated_at", typ: "" },
    ], "any"),
    "CategorySummary": o([
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "name", js: "name", typ: r("Description") },
        { json: "slug", js: "slug", typ: "" },
    ], "any"),
    "ApiCollection": o([
        { json: "acronym", js: "acronym", typ: r("Description") },
        { json: "created_at", js: "created_at", typ: "" },
        { json: "created_by", js: "created_by", typ: u(undefined, u(3.14, null)) },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "image_url", js: "image_url", typ: u(undefined, u(null, "")) },
        { json: "name", js: "name", typ: r("Description") },
        { json: "pricing", js: "pricing", typ: a(r("PricingElement")) },
        { json: "sizes", js: "sizes", typ: a(r("NestedSizeElement")) },
        { json: "slug", js: "slug", typ: "" },
        { json: "updated_at", js: "updated_at", typ: "" },
    ], "any"),
    "NestedSizeElement": o([
        { json: "delivery_period", js: "delivery_period", typ: u(undefined, u(null, "")) },
        { json: "ean_code", js: "ean_code", typ: u(undefined, u(null, "")) },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "name", js: "name", typ: r("Description") },
        { json: "number", js: "number", typ: "" },
        { json: "position", js: "position", typ: 0 },
        { json: "service_item", js: "service_item", typ: u(undefined, u(true, null)) },
        { json: "slug", js: "slug", typ: "" },
        { json: "status", js: "status", typ: u(undefined, u(null, "")) },
    ], "any"),
    "CollectionStyleItem": o([
        { json: "style", js: "style", typ: r("NestedStyleObject") },
        { json: "user_comment", js: "user_comment", typ: "" },
    ], "any"),
    "NestedStyleObject": o([
        { json: "attributes", js: "attributes", typ: a(r("NestedAttributeElement")) },
        { json: "categories", js: "categories", typ: a(r("CategorySummary")) },
        { json: "colors", js: "colors", typ: a(r("NestedColorElement")) },
        { json: "core", js: "core", typ: u(undefined, u(true, null)) },
        { json: "country_of_origin", js: "country_of_origin", typ: u(undefined, u(null, "")) },
        { json: "description", js: "description", typ: r("Description") },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "gross_weight", js: "gross_weight", typ: u(3.14, "") },
        { json: "id", js: "id", typ: 3.14 },
        { json: "is_new", js: "is_new", typ: u(undefined, u(true, null)) },
        { json: "name", js: "name", typ: r("Description") },
        { json: "net_weight", js: "net_weight", typ: u(3.14, "") },
        { json: "number", js: "number", typ: "" },
        { json: "prices", js: "prices", typ: a(r("NestedPriceElement")) },
        { json: "slug", js: "slug", typ: "" },
        { json: "tariff_no", js: "tariff_no", typ: u(undefined, u(null, "")) },
        { json: "unit_volume", js: "unit_volume", typ: u(3.14, "") },
    ], "any"),
    "NestedAttributeElement": o([
        { json: "description", js: "description", typ: r("Description") },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "slug", js: "slug", typ: "" },
        { json: "title", js: "title", typ: r("Description") },
        { json: "type", js: "type", typ: r("AttributeTypeSummaryObject") },
    ], "any"),
    "NestedColorElement": o([
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "images", js: "images", typ: a(r("ImageSummaryElement")) },
        { json: "is_new", js: "is_new", typ: u(undefined, u(true, null)) },
        { json: "name", js: "name", typ: r("Description") },
        { json: "number", js: "number", typ: "" },
        { json: "sizes", js: "sizes", typ: a(r("NestedSizeElement")) },
        { json: "slug", js: "slug", typ: "" },
    ], "any"),
    "ImageSummaryElement": o([
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "url", js: "url", typ: "" },
    ], "any"),
    "NestedPriceElement": o([
        { json: "amount", js: "amount", typ: u(3.14, "") },
        { json: "currency", js: "currency", typ: "" },
        { json: "end", js: "end", typ: "" },
        { json: "id", js: "id", typ: 3.14 },
        { json: "list", js: "list", typ: r("List") },
        { json: "start", js: "start", typ: "" },
        { json: "type", js: "type", typ: r("TypeEnum") },
        { json: "uom", js: "uom", typ: u(undefined, u(null, "")) },
    ], "any"),
    "CollectionWithItems": o([
        { json: "acronym", js: "acronym", typ: r("Description") },
        { json: "created_at", js: "created_at", typ: "" },
        { json: "created_by", js: "created_by", typ: u(undefined, u(3.14, null)) },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "image_url", js: "image_url", typ: u(undefined, u(null, "")) },
        { json: "items", js: "items", typ: a(r("CollectionStyleItem")) },
        { json: "name", js: "name", typ: r("Description") },
        { json: "num_colors", js: "num_colors", typ: 0 },
        { json: "num_sizes", js: "num_sizes", typ: 0 },
        { json: "num_styles", js: "num_styles", typ: 0 },
        { json: "pricing", js: "pricing", typ: a(r("PricingElement")) },
        { json: "slug", js: "slug", typ: "" },
        { json: "updated_at", js: "updated_at", typ: "" },
    ], "any"),
    "Color": o([
        { json: "created_at", js: "created_at", typ: "" },
        { json: "created_by", js: "created_by", typ: u(undefined, u(3.14, null)) },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "images", js: "images", typ: a(r("ImageSummaryElement")) },
        { json: "name", js: "name", typ: r("Description") },
        { json: "number", js: "number", typ: "" },
        { json: "slug", js: "slug", typ: "" },
        { json: "style", js: "style", typ: r("StyleSummaryObject") },
        { json: "updated_at", js: "updated_at", typ: "" },
    ], "any"),
    "StyleSummaryObject": o([
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "name", js: "name", typ: r("Description") },
        { json: "number", js: "number", typ: "" },
        { json: "slug", js: "slug", typ: "" },
    ], "any"),
    "ColorSummary": o([
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "name", js: "name", typ: r("Description") },
        { json: "number", js: "number", typ: "" },
        { json: "slug", js: "slug", typ: "" },
        { json: "style", js: "style", typ: r("StyleSummaryObject") },
    ], "any"),
    "CreateCollection": o([
        { json: "acronym", js: "acronym", typ: r("Description") },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "image", js: "image", typ: u(undefined, u(r("ImageClass"), null)) },
        { json: "name", js: "name", typ: r("Description") },
        { json: "new_colors", js: "new_colors", typ: a(r("NewColorElement")) },
        { json: "new_styles", js: "new_styles", typ: a(r("NewStyleElement")) },
        { json: "pricing", js: "pricing", typ: a(r("PricingElement")) },
        { json: "sizes", js: "sizes", typ: u(undefined, a(r("SizeClass"))) },
        { json: "slug", js: "slug", typ: u(undefined, u(null, "")) },
    ], "any"),
    "ImageClass": o([
        { json: "url", js: "url", typ: u(undefined, "") },
        { json: "bytes", js: "bytes", typ: u(undefined, u(a(0), "")) },
        { json: "base64", js: "base64", typ: u(undefined, "") },
    ], false),
    "NewColorElement": o([
        { json: "id", js: "id", typ: u(undefined, 3.14) },
        { json: "external_id", js: "external_id", typ: u(undefined, "") },
        { json: "slug", js: "slug", typ: u(undefined, "") },
    ], false),
    "NewStyleElement": o([
        { json: "id", js: "id", typ: u(undefined, 3.14) },
        { json: "external_id", js: "external_id", typ: u(undefined, "") },
        { json: "slug", js: "slug", typ: u(undefined, "") },
    ], false),
    "SizeClass": o([
        { json: "id", js: "id", typ: u(undefined, 3.14) },
        { json: "external_id", js: "external_id", typ: u(undefined, "") },
        { json: "slug", js: "slug", typ: u(undefined, "") },
    ], false),
    "Errors": o([
        { json: "code", js: "code", typ: r("Code") },
        { json: "response", js: "response", typ: r("Response") },
    ], "any"),
    "Response": o([
        { json: "error_code", js: "error_code", typ: r("Code") },
        { json: "error_message", js: "error_message", typ: "" },
    ], "any"),
    "Export": o([
        { json: "field", js: "field", typ: r("Field") },
        { json: "format", js: "format", typ: r("Format") },
        { json: "group_by", js: "group_by", typ: r("GroupBy") },
    ], "any"),
    "Filters": o([
        { json: "collection", js: "collection", typ: r("FiltersCollection") },
        { json: "item_filter_choices", js: "item_filter_choices", typ: r("ItemFilterChoices") },
        { json: "style", js: "style", typ: r("Styles") },
        { json: "user", js: "user", typ: r("FiltersUser") },
    ], "any"),
    "FiltersCollection": o([
        { json: "styles", js: "styles", typ: u(undefined, r("Styles")) },
    ], "any"),
    "Styles": o([
        { json: "attributes", js: "attributes", typ: u(undefined, u(a(r("AttributeClass")), null)) },
        { json: "categories", js: "categories", typ: u(undefined, u(a(r("CategoryClass")), null)) },
        { json: "core", js: "core", typ: u(undefined, u(true, null)) },
        { json: "country_of_origin", js: "country_of_origin", typ: u(undefined, u(a(""), null)) },
        { json: "new_colors", js: "new_colors", typ: u(undefined, u(true, null)) },
        { json: "new_styles", js: "new_styles", typ: u(undefined, u(true, null)) },
        { json: "numbers", js: "numbers", typ: u(undefined, u(a(""), null)) },
        { json: "pricelists", js: "pricelists", typ: u(undefined, u(a(r("PriceListElement")), null)) },
        { json: "refs", js: "refs", typ: u(undefined, u(a(r("NewStyleElement")), null)) },
        { json: "service_item", js: "service_item", typ: u(undefined, u(true, null)) },
        { json: "status", js: "status", typ: u(undefined, u(a(""), null)) },
    ], "any"),
    "AttributeClass": o([
        { json: "id", js: "id", typ: u(undefined, 3.14) },
        { json: "external_id", js: "external_id", typ: u(undefined, "") },
        { json: "slug", js: "slug", typ: u(undefined, "") },
    ], false),
    "CategoryClass": o([
        { json: "id", js: "id", typ: u(undefined, 3.14) },
        { json: "external_id", js: "external_id", typ: u(undefined, "") },
        { json: "slug", js: "slug", typ: u(undefined, "") },
    ], false),
    "ItemFilterChoices": o([
        { json: "attribute", js: "attribute", typ: a(r("StyleElement")) },
        { json: "category", js: "category", typ: a(r("StyleElement")) },
        { json: "status", js: "status", typ: a("") },
        { json: "style", js: "style", typ: a(r("StyleElement")) },
    ], "any"),
    "StyleElement": o([
        { json: "id", js: "id", typ: 0 },
        { json: "image", js: "image", typ: u(undefined, u(null, r("ImageSummaryElement"))) },
        { json: "subtitle", js: "subtitle", typ: u(undefined, u(null, r("Description"))) },
        { json: "title", js: "title", typ: r("Description") },
    ], "any"),
    "FiltersUser": o([
        { json: "groups", js: "groups", typ: u(undefined, u(a(r("GroupClass")), null)) },
        { json: "roles", js: "roles", typ: u(undefined, u(a(r("RoleElement")), null)) },
    ], "any"),
    "Image": o([
        { json: "color", js: "color", typ: r("ColorSummary") },
        { json: "external_checksum", js: "external_checksum", typ: u(undefined, u(null, "")) },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "position", js: "position", typ: 0 },
        { json: "updated_at", js: "updated_at", typ: "" },
        { json: "uploaded_at", js: "uploaded_at", typ: "" },
        { json: "uploaded_by", js: "uploaded_by", typ: u(undefined, u(3.14, null)) },
        { json: "url", js: "url", typ: "" },
    ], "any"),
    "NestedStyleSummary": o([
        { json: "colors", js: "colors", typ: a(r("NestedStyleSummaryColor")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "name", js: "name", typ: r("Description") },
        { json: "number", js: "number", typ: "" },
    ], "any"),
    "NestedStyleSummaryColor": o([
        { json: "id", js: "id", typ: 3.14 },
        { json: "name", js: "name", typ: r("Description") },
        { json: "number", js: "number", typ: "" },
        { json: "primary_image", js: "primary_image", typ: u(undefined, u(null, r("ImageSummaryElement"))) },
        { json: "sizes", js: "sizes", typ: a(r("PurpleSchema")) },
    ], "any"),
    "PurpleSchema": o([
        { json: "id", js: "id", typ: 3.14 },
        { json: "name", js: "name", typ: r("Description") },
        { json: "number", js: "number", typ: "" },
    ], "any"),
    "ApiOrganization": o([
        { json: "created_at", js: "created_at", typ: "" },
        { json: "created_by", js: "created_by", typ: u(undefined, u(3.14, null)) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "logo_url", js: "logo_url", typ: u(undefined, u(null, "")) },
        { json: "name", js: "name", typ: "" },
        { json: "updated_at", js: "updated_at", typ: "" },
    ], "any"),
    "Price": o([
        { json: "amount", js: "amount", typ: u(3.14, "") },
        { json: "created_at", js: "created_at", typ: "" },
        { json: "created_by", js: "created_by", typ: u(undefined, u(3.14, null)) },
        { json: "currency", js: "currency", typ: "" },
        { json: "end", js: "end", typ: "" },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "list", js: "list", typ: r("List") },
        { json: "start", js: "start", typ: "" },
        { json: "style", js: "style", typ: r("StyleSummaryObject") },
        { json: "type", js: "type", typ: r("TypeEnum") },
        { json: "uom", js: "uom", typ: u(undefined, u(null, "")) },
        { json: "updated_at", js: "updated_at", typ: "" },
    ], "any"),
    "PriceList": o([
        { json: "created_at", js: "created_at", typ: "" },
        { json: "created_by", js: "created_by", typ: u(undefined, u(3.14, null)) },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "name", js: "name", typ: "" },
        { json: "slug", js: "slug", typ: "" },
        { json: "updated_at", js: "updated_at", typ: "" },
    ], "any"),
    "Size": o([
        { json: "color", js: "color", typ: r("ColorSummary") },
        { json: "created_at", js: "created_at", typ: "" },
        { json: "created_by", js: "created_by", typ: u(undefined, u(3.14, null)) },
        { json: "delivery_period", js: "delivery_period", typ: u(undefined, u(null, "")) },
        { json: "ean_code", js: "ean_code", typ: u(undefined, u(null, "")) },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "id", js: "id", typ: 3.14 },
        { json: "name", js: "name", typ: r("Description") },
        { json: "number", js: "number", typ: "" },
        { json: "position", js: "position", typ: 0 },
        { json: "service_item", js: "service_item", typ: u(undefined, u(true, null)) },
        { json: "slug", js: "slug", typ: "" },
        { json: "status", js: "status", typ: u(undefined, u(null, "")) },
        { json: "updated_at", js: "updated_at", typ: "" },
    ], "any"),
    "SortBy": o([
        { json: "nested_style", js: "nested_style", typ: r("NestedStyle") },
        { json: "user", js: "user", typ: r("UserEnum") },
    ], "any"),
    "PurpleStyle": o([
        { json: "attributes", js: "attributes", typ: a(r("NestedAttributeElement")) },
        { json: "categories", js: "categories", typ: a(r("Category")) },
        { json: "core", js: "core", typ: u(undefined, u(true, null)) },
        { json: "country_of_origin", js: "country_of_origin", typ: u(undefined, u(null, "")) },
        { json: "created_at", js: "created_at", typ: "" },
        { json: "created_by", js: "created_by", typ: u(undefined, u(3.14, null)) },
        { json: "description", js: "description", typ: r("Description") },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "gross_weight", js: "gross_weight", typ: u(3.14, "") },
        { json: "id", js: "id", typ: 3.14 },
        { json: "name", js: "name", typ: r("Description") },
        { json: "net_weight", js: "net_weight", typ: u(3.14, "") },
        { json: "number", js: "number", typ: "" },
        { json: "slug", js: "slug", typ: "" },
        { json: "tariff_no", js: "tariff_no", typ: u(undefined, u(null, "")) },
        { json: "unit_volume", js: "unit_volume", typ: u(3.14, "") },
        { json: "updated_at", js: "updated_at", typ: "" },
    ], "any"),
    "UpdateCollection": o([
        { json: "acronym", js: "acronym", typ: u(undefined, u(null, r("Description"))) },
        { json: "external_id", js: "external_id", typ: u(undefined, u(null, "")) },
        { json: "image", js: "image", typ: u(undefined, u(r("ImageClass"), null)) },
        { json: "name", js: "name", typ: u(undefined, u(null, r("Description"))) },
        { json: "new_colors", js: "new_colors", typ: u(undefined, u(a(r("NewColorElement")), null)) },
        { json: "new_styles", js: "new_styles", typ: u(undefined, u(a(r("NewStyleElement")), null)) },
        { json: "pricing", js: "pricing", typ: u(undefined, u(a(r("PricingElement")), null)) },
        { json: "sizes", js: "sizes", typ: u(undefined, u(a(r("SizeClass")), null)) },
        { json: "slug", js: "slug", typ: u(undefined, u(null, "")) },
    ], "any"),
    "Environment": [
        "development",
        "production",
        "staging",
    ],
    "RoleElement": [
        "Active",
        "Administrator",
        "Editor",
        "Viewer",
    ],
    "TypeEnum": [
        "Retail",
        "Unit",
    ],
    "Code": [
        "ApplicationNotReady",
        "Base64DecodeError",
        "CsvError",
        "DbBuildError",
        "DbCreatePoolError",
        "DbError",
        "DbPoolError",
        "EmptySlugDisallowed",
        "ExpiredToken",
        "ExplicitIdCreationDisallowed",
        "ExternalIdAlreadyExists",
        "ExternalIdNotFound",
        "ExternalIdReferenceUnsupported",
        "ExternalRequestError",
        "FailedPasswordHashing",
        "FailedPasswordValidation",
        "IdAlreadyExists",
        "IdNotFound",
        "ImageAlreadyExists",
        "ImageBackendMisconfigured",
        "ImageUploadsUnavailable",
        "InvalidDbRoleId",
        "InvalidEntityRef",
        "InvalidHttpHeaderValue",
        "InvalidToken",
        "InvalidUserCredentials",
        "IoError",
        "JsonError",
        "MissingEntityRefPathParameter",
        "MissingPermissions",
        "PathJsonError",
        "PathRejection",
        "QueryParsingError",
        "QueryRejection",
        "SlugAlreadyExists",
        "SlugNotFound",
        "SlugReferenceUnsupported",
        "UnverifiedEmail",
        "UrlParseError",
        "UserEmailAlreadyExists",
        "UserEmailNotFound",
        "XlsxError",
    ],
    "Field": [
        "attribute",
        "category_name",
        "color_external_id",
        "color_name",
        "color_number",
        "core",
        "country_of_origin",
        "delivery_period",
        "ean_code",
        "gross_weight",
        "images",
        "new_color",
        "new_style",
        "primary_image",
        "retail_price_amount",
        "retail_price_currency",
        "retail_price_list",
        "service_item",
        "size_number",
        "size_type",
        "style_description",
        "style_external_id",
        "style_name",
        "style_number",
        "tariff_no",
        "unit_price_amount",
        "unit_price_currency",
        "unit_price_list",
        "unit_volume",
    ],
    "Format": [
        "csv",
        "json",
        "xlsx",
    ],
    "GroupBy": [
        "category",
        "color",
        "image",
        "price_list",
        "size",
        "style",
    ],
    "Language": [
        "de",
        "en",
        "sv",
    ],
    "NestedStyle": [
        "delivery_period:asc",
        "delivery_period:desc",
        "name:asc",
        "number:asc",
    ],
    "UserEnum": [
        "email:asc",
        "last_sign_in:asc",
        "last_sign_in:desc",
        "name:asc",
    ],
};
