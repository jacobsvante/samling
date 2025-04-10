// This file was generated with `clorinde`. Do not modify.

#[derive(Debug, Clone, PartialEq)]
pub struct EntityFilterChoiceRow {
    pub id: i32,
    pub title: serde_json::Value,
    pub subtitle: Option<serde_json::Value>,
    pub image: Option<serde_json::Value>,
}
pub struct EntityFilterChoiceRowBorrowed<'a> {
    pub id: i32,
    pub title: postgres_types::Json<&'a serde_json::value::RawValue>,
    pub subtitle: Option<postgres_types::Json<&'a serde_json::value::RawValue>>,
    pub image: Option<postgres_types::Json<&'a serde_json::value::RawValue>>,
}
impl<'a> From<EntityFilterChoiceRowBorrowed<'a>> for EntityFilterChoiceRow {
    fn from(
        EntityFilterChoiceRowBorrowed {
            id,
            title,
            subtitle,
            image,
        }: EntityFilterChoiceRowBorrowed<'a>,
    ) -> Self {
        Self {
            id,
            title: serde_json::from_str(title.0.get()).unwrap(),
            subtitle: subtitle.map(|v| serde_json::from_str(v.0.get()).unwrap()),
            image: image.map(|v| serde_json::from_str(v.0.get()).unwrap()),
        }
    }
}
#[derive(Debug, Clone, PartialEq)]
pub struct StringFilterChoiceRow {
    pub title: String,
}
pub struct StringFilterChoiceRowBorrowed<'a> {
    pub title: &'a str,
}
impl<'a> From<StringFilterChoiceRowBorrowed<'a>> for StringFilterChoiceRow {
    fn from(StringFilterChoiceRowBorrowed { title }: StringFilterChoiceRowBorrowed<'a>) -> Self {
        Self {
            title: title.into(),
        }
    }
}
use crate::client::async_::GenericClient;
use futures::{self, StreamExt, TryStreamExt};
pub struct EntityFilterChoiceRowQuery<'c, 'a, 's, C: GenericClient, T, const N: usize> {
    client: &'c C,
    params: [&'a (dyn postgres_types::ToSql + Sync); N],
    stmt: &'s mut crate::client::async_::Stmt,
    extractor: fn(&tokio_postgres::Row) -> EntityFilterChoiceRowBorrowed,
    mapper: fn(EntityFilterChoiceRowBorrowed) -> T,
}
impl<'c, 'a, 's, C, T: 'c, const N: usize> EntityFilterChoiceRowQuery<'c, 'a, 's, C, T, N>
where
    C: GenericClient,
{
    pub fn map<R>(
        self,
        mapper: fn(EntityFilterChoiceRowBorrowed) -> R,
    ) -> EntityFilterChoiceRowQuery<'c, 'a, 's, C, R, N> {
        EntityFilterChoiceRowQuery {
            client: self.client,
            params: self.params,
            stmt: self.stmt,
            extractor: self.extractor,
            mapper,
        }
    }
    pub async fn one(self) -> Result<T, tokio_postgres::Error> {
        let stmt = self.stmt.prepare(self.client).await?;
        let row = self.client.query_one(stmt, &self.params).await?;
        Ok((self.mapper)((self.extractor)(&row)))
    }
    pub async fn all(self) -> Result<Vec<T>, tokio_postgres::Error> {
        self.iter().await?.try_collect().await
    }
    pub async fn opt(self) -> Result<Option<T>, tokio_postgres::Error> {
        let stmt = self.stmt.prepare(self.client).await?;
        Ok(self
            .client
            .query_opt(stmt, &self.params)
            .await?
            .map(|row| (self.mapper)((self.extractor)(&row))))
    }
    pub async fn iter(
        self,
    ) -> Result<
        impl futures::Stream<Item = Result<T, tokio_postgres::Error>> + 'c,
        tokio_postgres::Error,
    > {
        let stmt = self.stmt.prepare(self.client).await?;
        let it = self
            .client
            .query_raw(stmt, crate::slice_iter(&self.params))
            .await?
            .map(move |res| res.map(|row| (self.mapper)((self.extractor)(&row))))
            .into_stream();
        Ok(it)
    }
}
pub struct StringFilterChoiceRowQuery<'c, 'a, 's, C: GenericClient, T, const N: usize> {
    client: &'c C,
    params: [&'a (dyn postgres_types::ToSql + Sync); N],
    stmt: &'s mut crate::client::async_::Stmt,
    extractor: fn(&tokio_postgres::Row) -> StringFilterChoiceRowBorrowed,
    mapper: fn(StringFilterChoiceRowBorrowed) -> T,
}
impl<'c, 'a, 's, C, T: 'c, const N: usize> StringFilterChoiceRowQuery<'c, 'a, 's, C, T, N>
where
    C: GenericClient,
{
    pub fn map<R>(
        self,
        mapper: fn(StringFilterChoiceRowBorrowed) -> R,
    ) -> StringFilterChoiceRowQuery<'c, 'a, 's, C, R, N> {
        StringFilterChoiceRowQuery {
            client: self.client,
            params: self.params,
            stmt: self.stmt,
            extractor: self.extractor,
            mapper,
        }
    }
    pub async fn one(self) -> Result<T, tokio_postgres::Error> {
        let stmt = self.stmt.prepare(self.client).await?;
        let row = self.client.query_one(stmt, &self.params).await?;
        Ok((self.mapper)((self.extractor)(&row)))
    }
    pub async fn all(self) -> Result<Vec<T>, tokio_postgres::Error> {
        self.iter().await?.try_collect().await
    }
    pub async fn opt(self) -> Result<Option<T>, tokio_postgres::Error> {
        let stmt = self.stmt.prepare(self.client).await?;
        Ok(self
            .client
            .query_opt(stmt, &self.params)
            .await?
            .map(|row| (self.mapper)((self.extractor)(&row))))
    }
    pub async fn iter(
        self,
    ) -> Result<
        impl futures::Stream<Item = Result<T, tokio_postgres::Error>> + 'c,
        tokio_postgres::Error,
    > {
        let stmt = self.stmt.prepare(self.client).await?;
        let it = self
            .client
            .query_raw(stmt, crate::slice_iter(&self.params))
            .await?
            .map(move |res| res.map(|row| (self.mapper)((self.extractor)(&row))))
            .into_stream();
        Ok(it)
    }
}
pub fn select_style_filter_choices() -> SelectStyleFilterChoicesStmt {
    SelectStyleFilterChoicesStmt(crate::client::async_::Stmt::new(
        "SELECT style.id, style.\"name\" AS title, jsonb_build_object('en', style.\"number\") AS subtitle, to_jsonb(main_image.json_data) AS image FROM style LEFT JOIN ( SELECT color.style_id, row_number() OVER (PARTITION BY color.style_id ORDER BY image.uploaded_at DESC) AS rowno, jsonb_build_object( 'id', image.id, 'external_id', image.external_id, 'url', image.url ) AS json_data FROM color INNER JOIN image ON image.color_id = color.id WHERE image.position = 1 ) AS main_image ON main_image.style_id = style.id AND main_image.rowno = 1 WHERE style.organization_id = $1 ORDER BY title",
    ))
}
pub struct SelectStyleFilterChoicesStmt(crate::client::async_::Stmt);
impl SelectStyleFilterChoicesStmt {
    pub fn bind<'c, 'a, 's, C: GenericClient>(
        &'s mut self,
        client: &'c C,
        organization_id: &'a i32,
    ) -> EntityFilterChoiceRowQuery<'c, 'a, 's, C, EntityFilterChoiceRow, 1> {
        EntityFilterChoiceRowQuery {
            client,
            params: [organization_id],
            stmt: &mut self.0,
            extractor: |row| EntityFilterChoiceRowBorrowed {
                id: row.get(0),
                title: row.get(1),
                subtitle: row.get(2),
                image: row.get(3),
            },
            mapper: |it| EntityFilterChoiceRow::from(it),
        }
    }
}
pub fn select_category_filter_choices() -> SelectCategoryFilterChoicesStmt {
    SelectCategoryFilterChoicesStmt(crate::client::async_::Stmt::new(
        "SELECT category.id, category.\"name\" AS title, NULL::jsonb AS subtitle, NULL::jsonb AS image FROM category WHERE category.organization_id = $1 ORDER BY title",
    ))
}
pub struct SelectCategoryFilterChoicesStmt(crate::client::async_::Stmt);
impl SelectCategoryFilterChoicesStmt {
    pub fn bind<'c, 'a, 's, C: GenericClient>(
        &'s mut self,
        client: &'c C,
        organization_id: &'a i32,
    ) -> EntityFilterChoiceRowQuery<'c, 'a, 's, C, EntityFilterChoiceRow, 1> {
        EntityFilterChoiceRowQuery {
            client,
            params: [organization_id],
            stmt: &mut self.0,
            extractor: |row| EntityFilterChoiceRowBorrowed {
                id: row.get(0),
                title: row.get(1),
                subtitle: row.get(2),
                image: row.get(3),
            },
            mapper: |it| EntityFilterChoiceRow::from(it),
        }
    }
}
pub fn select_attribute_filter_choices() -> SelectAttributeFilterChoicesStmt {
    SelectAttributeFilterChoicesStmt(crate::client::async_::Stmt::new(
        "SELECT \"attribute\".id, \"attribute\".title, attributetype.\"name\" AS subtitle, NULL::jsonb AS image FROM \"attribute\" INNER JOIN attributetype ON attributetype.id = \"attribute\".type_id WHERE \"attribute\".organization_id = $1 ORDER BY \"attribute\".title",
    ))
}
pub struct SelectAttributeFilterChoicesStmt(crate::client::async_::Stmt);
impl SelectAttributeFilterChoicesStmt {
    pub fn bind<'c, 'a, 's, C: GenericClient>(
        &'s mut self,
        client: &'c C,
        organization_id: &'a i32,
    ) -> EntityFilterChoiceRowQuery<'c, 'a, 's, C, EntityFilterChoiceRow, 1> {
        EntityFilterChoiceRowQuery {
            client,
            params: [organization_id],
            stmt: &mut self.0,
            extractor: |row| EntityFilterChoiceRowBorrowed {
                id: row.get(0),
                title: row.get(1),
                subtitle: row.get(2),
                image: row.get(3),
            },
            mapper: |it| EntityFilterChoiceRow::from(it),
        }
    }
}
pub fn select_status_filter_choices() -> SelectStatusFilterChoicesStmt {
    SelectStatusFilterChoicesStmt(crate::client::async_::Stmt::new(
        "SELECT DISTINCT size.status AS title FROM size WHERE size.organization_id = $1 ORDER BY title",
    ))
}
pub struct SelectStatusFilterChoicesStmt(crate::client::async_::Stmt);
impl SelectStatusFilterChoicesStmt {
    pub fn bind<'c, 'a, 's, C: GenericClient>(
        &'s mut self,
        client: &'c C,
        organization_id: &'a i32,
    ) -> StringFilterChoiceRowQuery<'c, 'a, 's, C, StringFilterChoiceRow, 1> {
        StringFilterChoiceRowQuery {
            client,
            params: [organization_id],
            stmt: &mut self.0,
            extractor: |row| StringFilterChoiceRowBorrowed { title: row.get(0) },
            mapper: |it| StringFilterChoiceRow::from(it),
        }
    }
}
