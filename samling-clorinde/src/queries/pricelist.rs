// This file was generated with `clorinde`. Do not modify.

#[derive(Clone, Copy, Debug)]
pub struct ListPricelistsParams {
    pub requester_id: i32,
    pub organization_id: i32,
}
#[derive(Clone, Copy, Debug)]
pub struct ListPricelistSummariesParams {
    pub requester_id: i32,
    pub organization_id: i32,
}
#[derive(Debug)]
pub struct GetPricelistParams<T1: crate::StringSql, T2: crate::StringSql> {
    pub organization_id: i32,
    pub id: Option<i32>,
    pub external_id: Option<T1>,
    pub slug: Option<T2>,
}
#[derive(Debug)]
pub struct GetPricelistIdParams<T1: crate::StringSql, T2: crate::StringSql> {
    pub organization_id: i32,
    pub id: Option<i32>,
    pub external_id: Option<T1>,
    pub slug: Option<T2>,
}
#[derive(Debug)]
pub struct InsertPricelistParams<T1: crate::StringSql, T2: crate::StringSql, T3: crate::StringSql> {
    pub name: T1,
    pub slug: T2,
    pub external_id: Option<T3>,
    pub organization_id: i32,
    pub created_by: i32,
}
#[derive(Debug)]
pub struct UpdatePricelistParams<T1: crate::StringSql, T2: crate::StringSql, T3: crate::StringSql> {
    pub name: Option<T1>,
    pub slug: Option<T2>,
    pub external_id: Option<T3>,
    pub id: i32,
}
#[derive(Clone, Copy, Debug)]
pub struct DeletePricelistParams {
    pub organization_id: i32,
    pub id: i32,
}
#[derive(Clone, Copy, Debug)]
pub struct AllowedPricelistIdsParams {
    pub organization_id: i32,
    pub user_id: i32,
}
#[derive(Debug, Clone, PartialEq)]
pub struct PriceListRow {
    pub id: i32,
    pub organization_id: i32,
    pub name: String,
    pub slug: String,
    pub external_id: Option<String>,
    pub created_by: Option<i32>,
    pub created_at: crate::types::time::TimestampTz,
    pub updated_at: crate::types::time::TimestampTz,
}
pub struct PriceListRowBorrowed<'a> {
    pub id: i32,
    pub organization_id: i32,
    pub name: &'a str,
    pub slug: &'a str,
    pub external_id: Option<&'a str>,
    pub created_by: Option<i32>,
    pub created_at: crate::types::time::TimestampTz,
    pub updated_at: crate::types::time::TimestampTz,
}
impl<'a> From<PriceListRowBorrowed<'a>> for PriceListRow {
    fn from(
        PriceListRowBorrowed {
            id,
            organization_id,
            name,
            slug,
            external_id,
            created_by,
            created_at,
            updated_at,
        }: PriceListRowBorrowed<'a>,
    ) -> Self {
        Self {
            id,
            organization_id,
            name: name.into(),
            slug: slug.into(),
            external_id: external_id.map(|v| v.into()),
            created_by,
            created_at,
            updated_at,
        }
    }
}
#[derive(Debug, Clone, PartialEq)]
pub struct PriceListSummaryRow {
    pub id: i32,
    pub name: String,
    pub slug: String,
    pub external_id: Option<String>,
}
pub struct PriceListSummaryRowBorrowed<'a> {
    pub id: i32,
    pub name: &'a str,
    pub slug: &'a str,
    pub external_id: Option<&'a str>,
}
impl<'a> From<PriceListSummaryRowBorrowed<'a>> for PriceListSummaryRow {
    fn from(
        PriceListSummaryRowBorrowed {
            id,
            name,
            slug,
            external_id,
        }: PriceListSummaryRowBorrowed<'a>,
    ) -> Self {
        Self {
            id,
            name: name.into(),
            slug: slug.into(),
            external_id: external_id.map(|v| v.into()),
        }
    }
}
use crate::client::async_::GenericClient;
use futures::{self, StreamExt, TryStreamExt};
pub struct PriceListRowQuery<'c, 'a, 's, C: GenericClient, T, const N: usize> {
    client: &'c C,
    params: [&'a (dyn postgres_types::ToSql + Sync); N],
    stmt: &'s mut crate::client::async_::Stmt,
    extractor: fn(&tokio_postgres::Row) -> PriceListRowBorrowed,
    mapper: fn(PriceListRowBorrowed) -> T,
}
impl<'c, 'a, 's, C, T: 'c, const N: usize> PriceListRowQuery<'c, 'a, 's, C, T, N>
where
    C: GenericClient,
{
    pub fn map<R>(
        self,
        mapper: fn(PriceListRowBorrowed) -> R,
    ) -> PriceListRowQuery<'c, 'a, 's, C, R, N> {
        PriceListRowQuery {
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
pub struct PriceListSummaryRowQuery<'c, 'a, 's, C: GenericClient, T, const N: usize> {
    client: &'c C,
    params: [&'a (dyn postgres_types::ToSql + Sync); N],
    stmt: &'s mut crate::client::async_::Stmt,
    extractor: fn(&tokio_postgres::Row) -> PriceListSummaryRowBorrowed,
    mapper: fn(PriceListSummaryRowBorrowed) -> T,
}
impl<'c, 'a, 's, C, T: 'c, const N: usize> PriceListSummaryRowQuery<'c, 'a, 's, C, T, N>
where
    C: GenericClient,
{
    pub fn map<R>(
        self,
        mapper: fn(PriceListSummaryRowBorrowed) -> R,
    ) -> PriceListSummaryRowQuery<'c, 'a, 's, C, R, N> {
        PriceListSummaryRowQuery {
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
pub struct I32Query<'c, 'a, 's, C: GenericClient, T, const N: usize> {
    client: &'c C,
    params: [&'a (dyn postgres_types::ToSql + Sync); N],
    stmt: &'s mut crate::client::async_::Stmt,
    extractor: fn(&tokio_postgres::Row) -> i32,
    mapper: fn(i32) -> T,
}
impl<'c, 'a, 's, C, T: 'c, const N: usize> I32Query<'c, 'a, 's, C, T, N>
where
    C: GenericClient,
{
    pub fn map<R>(self, mapper: fn(i32) -> R) -> I32Query<'c, 'a, 's, C, R, N> {
        I32Query {
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
pub fn list_pricelists() -> ListPricelistsStmt {
    ListPricelistsStmt(crate::client::async_::Stmt::new(
        "SELECT pricelist.* FROM pricelist INNER JOIN ( SELECT group_pricelist.pricelist_id FROM group_pricelist INNER JOIN group_user ON group_user.group_id = group_pricelist.group_id WHERE group_user.user_id = $1 GROUP BY group_pricelist.pricelist_id ) AS requester_pricelists ON requester_pricelists.pricelist_id = pricelist.id WHERE pricelist.organization_id = $2 ORDER BY pricelist.name",
    ))
}
pub struct ListPricelistsStmt(crate::client::async_::Stmt);
impl ListPricelistsStmt {
    pub fn bind<'c, 'a, 's, C: GenericClient>(
        &'s mut self,
        client: &'c C,
        requester_id: &'a i32,
        organization_id: &'a i32,
    ) -> PriceListRowQuery<'c, 'a, 's, C, PriceListRow, 2> {
        PriceListRowQuery {
            client,
            params: [requester_id, organization_id],
            stmt: &mut self.0,
            extractor: |row| PriceListRowBorrowed {
                id: row.get(0),
                organization_id: row.get(1),
                name: row.get(2),
                slug: row.get(3),
                external_id: row.get(4),
                created_by: row.get(5),
                created_at: row.get(6),
                updated_at: row.get(7),
            },
            mapper: |it| PriceListRow::from(it),
        }
    }
}
impl<'c, 'a, 's, C: GenericClient>
    crate::client::async_::Params<
        'c,
        'a,
        's,
        ListPricelistsParams,
        PriceListRowQuery<'c, 'a, 's, C, PriceListRow, 2>,
        C,
    > for ListPricelistsStmt
{
    fn params(
        &'s mut self,
        client: &'c C,
        params: &'a ListPricelistsParams,
    ) -> PriceListRowQuery<'c, 'a, 's, C, PriceListRow, 2> {
        self.bind(client, &params.requester_id, &params.organization_id)
    }
}
pub fn list_pricelist_summaries() -> ListPricelistSummariesStmt {
    ListPricelistSummariesStmt(crate::client::async_::Stmt::new(
        "SELECT pricelist.id, pricelist.name, pricelist.slug, pricelist.external_id FROM pricelist INNER JOIN ( SELECT group_pricelist.pricelist_id FROM group_pricelist INNER JOIN group_user ON group_user.group_id = group_pricelist.group_id WHERE group_user.user_id = $1 GROUP BY group_pricelist.pricelist_id ) AS requester_pricelists ON requester_pricelists.pricelist_id = pricelist.id WHERE pricelist.organization_id = $2 ORDER BY pricelist.name",
    ))
}
pub struct ListPricelistSummariesStmt(crate::client::async_::Stmt);
impl ListPricelistSummariesStmt {
    pub fn bind<'c, 'a, 's, C: GenericClient>(
        &'s mut self,
        client: &'c C,
        requester_id: &'a i32,
        organization_id: &'a i32,
    ) -> PriceListSummaryRowQuery<'c, 'a, 's, C, PriceListSummaryRow, 2> {
        PriceListSummaryRowQuery {
            client,
            params: [requester_id, organization_id],
            stmt: &mut self.0,
            extractor: |row| PriceListSummaryRowBorrowed {
                id: row.get(0),
                name: row.get(1),
                slug: row.get(2),
                external_id: row.get(3),
            },
            mapper: |it| PriceListSummaryRow::from(it),
        }
    }
}
impl<'c, 'a, 's, C: GenericClient>
    crate::client::async_::Params<
        'c,
        'a,
        's,
        ListPricelistSummariesParams,
        PriceListSummaryRowQuery<'c, 'a, 's, C, PriceListSummaryRow, 2>,
        C,
    > for ListPricelistSummariesStmt
{
    fn params(
        &'s mut self,
        client: &'c C,
        params: &'a ListPricelistSummariesParams,
    ) -> PriceListSummaryRowQuery<'c, 'a, 's, C, PriceListSummaryRow, 2> {
        self.bind(client, &params.requester_id, &params.organization_id)
    }
}
pub fn get_pricelist() -> GetPricelistStmt {
    GetPricelistStmt(crate::client::async_::Stmt::new(
        "SELECT pricelist.* FROM pricelist WHERE pricelist.organization_id = $1 AND ( ($2::int IS NULL OR pricelist.id = $2) AND ($3::text IS NULL OR pricelist.external_id = $3) AND ($4::text IS NULL OR pricelist.slug = $4) )",
    ))
}
pub struct GetPricelistStmt(crate::client::async_::Stmt);
impl GetPricelistStmt {
    pub fn bind<'c, 'a, 's, C: GenericClient, T1: crate::StringSql, T2: crate::StringSql>(
        &'s mut self,
        client: &'c C,
        organization_id: &'a i32,
        id: &'a Option<i32>,
        external_id: &'a Option<T1>,
        slug: &'a Option<T2>,
    ) -> PriceListRowQuery<'c, 'a, 's, C, PriceListRow, 4> {
        PriceListRowQuery {
            client,
            params: [organization_id, id, external_id, slug],
            stmt: &mut self.0,
            extractor: |row| PriceListRowBorrowed {
                id: row.get(0),
                organization_id: row.get(1),
                name: row.get(2),
                slug: row.get(3),
                external_id: row.get(4),
                created_by: row.get(5),
                created_at: row.get(6),
                updated_at: row.get(7),
            },
            mapper: |it| PriceListRow::from(it),
        }
    }
}
impl<'c, 'a, 's, C: GenericClient, T1: crate::StringSql, T2: crate::StringSql>
    crate::client::async_::Params<
        'c,
        'a,
        's,
        GetPricelistParams<T1, T2>,
        PriceListRowQuery<'c, 'a, 's, C, PriceListRow, 4>,
        C,
    > for GetPricelistStmt
{
    fn params(
        &'s mut self,
        client: &'c C,
        params: &'a GetPricelistParams<T1, T2>,
    ) -> PriceListRowQuery<'c, 'a, 's, C, PriceListRow, 4> {
        self.bind(
            client,
            &params.organization_id,
            &params.id,
            &params.external_id,
            &params.slug,
        )
    }
}
pub fn get_pricelist_id() -> GetPricelistIdStmt {
    GetPricelistIdStmt(crate::client::async_::Stmt::new(
        "SELECT pricelist.id FROM pricelist WHERE pricelist.organization_id = $1 AND ( ($2::int IS NULL OR pricelist.id = $2) AND ($3::text IS NULL OR pricelist.external_id = $3) AND ($4::text IS NULL OR pricelist.slug = $4) )",
    ))
}
pub struct GetPricelistIdStmt(crate::client::async_::Stmt);
impl GetPricelistIdStmt {
    pub fn bind<'c, 'a, 's, C: GenericClient, T1: crate::StringSql, T2: crate::StringSql>(
        &'s mut self,
        client: &'c C,
        organization_id: &'a i32,
        id: &'a Option<i32>,
        external_id: &'a Option<T1>,
        slug: &'a Option<T2>,
    ) -> I32Query<'c, 'a, 's, C, i32, 4> {
        I32Query {
            client,
            params: [organization_id, id, external_id, slug],
            stmt: &mut self.0,
            extractor: |row| row.get(0),
            mapper: |it| it,
        }
    }
}
impl<'c, 'a, 's, C: GenericClient, T1: crate::StringSql, T2: crate::StringSql>
    crate::client::async_::Params<
        'c,
        'a,
        's,
        GetPricelistIdParams<T1, T2>,
        I32Query<'c, 'a, 's, C, i32, 4>,
        C,
    > for GetPricelistIdStmt
{
    fn params(
        &'s mut self,
        client: &'c C,
        params: &'a GetPricelistIdParams<T1, T2>,
    ) -> I32Query<'c, 'a, 's, C, i32, 4> {
        self.bind(
            client,
            &params.organization_id,
            &params.id,
            &params.external_id,
            &params.slug,
        )
    }
}
pub fn insert_pricelist() -> InsertPricelistStmt {
    InsertPricelistStmt(crate::client::async_::Stmt::new(
        "INSERT INTO pricelist ( name, slug, external_id, organization_id, created_by) VALUES ( $1, $2, $3, $4, $5) RETURNING id",
    ))
}
pub struct InsertPricelistStmt(crate::client::async_::Stmt);
impl InsertPricelistStmt {
    pub fn bind<
        'c,
        'a,
        's,
        C: GenericClient,
        T1: crate::StringSql,
        T2: crate::StringSql,
        T3: crate::StringSql,
    >(
        &'s mut self,
        client: &'c C,
        name: &'a T1,
        slug: &'a T2,
        external_id: &'a Option<T3>,
        organization_id: &'a i32,
        created_by: &'a i32,
    ) -> I32Query<'c, 'a, 's, C, i32, 5> {
        I32Query {
            client,
            params: [name, slug, external_id, organization_id, created_by],
            stmt: &mut self.0,
            extractor: |row| row.get(0),
            mapper: |it| it,
        }
    }
}
impl<
        'c,
        'a,
        's,
        C: GenericClient,
        T1: crate::StringSql,
        T2: crate::StringSql,
        T3: crate::StringSql,
    >
    crate::client::async_::Params<
        'c,
        'a,
        's,
        InsertPricelistParams<T1, T2, T3>,
        I32Query<'c, 'a, 's, C, i32, 5>,
        C,
    > for InsertPricelistStmt
{
    fn params(
        &'s mut self,
        client: &'c C,
        params: &'a InsertPricelistParams<T1, T2, T3>,
    ) -> I32Query<'c, 'a, 's, C, i32, 5> {
        self.bind(
            client,
            &params.name,
            &params.slug,
            &params.external_id,
            &params.organization_id,
            &params.created_by,
        )
    }
}
pub fn update_pricelist() -> UpdatePricelistStmt {
    UpdatePricelistStmt(crate::client::async_::Stmt::new(
        "UPDATE pricelist SET name = coalesce($1, name), slug = coalesce($2, slug), external_id = coalesce($3, external_id) WHERE id = $4",
    ))
}
pub struct UpdatePricelistStmt(crate::client::async_::Stmt);
impl UpdatePricelistStmt {
    pub async fn bind<
        'c,
        'a,
        's,
        C: GenericClient,
        T1: crate::StringSql,
        T2: crate::StringSql,
        T3: crate::StringSql,
    >(
        &'s mut self,
        client: &'c C,
        name: &'a Option<T1>,
        slug: &'a Option<T2>,
        external_id: &'a Option<T3>,
        id: &'a i32,
    ) -> Result<u64, tokio_postgres::Error> {
        let stmt = self.0.prepare(client).await?;
        client.execute(stmt, &[name, slug, external_id, id]).await
    }
}
impl<
        'a,
        C: GenericClient + Send + Sync,
        T1: crate::StringSql,
        T2: crate::StringSql,
        T3: crate::StringSql,
    >
    crate::client::async_::Params<
        'a,
        'a,
        'a,
        UpdatePricelistParams<T1, T2, T3>,
        std::pin::Pin<
            Box<dyn futures::Future<Output = Result<u64, tokio_postgres::Error>> + Send + 'a>,
        >,
        C,
    > for UpdatePricelistStmt
{
    fn params(
        &'a mut self,
        client: &'a C,
        params: &'a UpdatePricelistParams<T1, T2, T3>,
    ) -> std::pin::Pin<
        Box<dyn futures::Future<Output = Result<u64, tokio_postgres::Error>> + Send + 'a>,
    > {
        Box::pin(self.bind(
            client,
            &params.name,
            &params.slug,
            &params.external_id,
            &params.id,
        ))
    }
}
pub fn delete_pricelist() -> DeletePricelistStmt {
    DeletePricelistStmt(crate::client::async_::Stmt::new(
        "DELETE FROM pricelist WHERE organization_id = $1 AND id = $2",
    ))
}
pub struct DeletePricelistStmt(crate::client::async_::Stmt);
impl DeletePricelistStmt {
    pub async fn bind<'c, 'a, 's, C: GenericClient>(
        &'s mut self,
        client: &'c C,
        organization_id: &'a i32,
        id: &'a i32,
    ) -> Result<u64, tokio_postgres::Error> {
        let stmt = self.0.prepare(client).await?;
        client.execute(stmt, &[organization_id, id]).await
    }
}
impl<'a, C: GenericClient + Send + Sync>
    crate::client::async_::Params<
        'a,
        'a,
        'a,
        DeletePricelistParams,
        std::pin::Pin<
            Box<dyn futures::Future<Output = Result<u64, tokio_postgres::Error>> + Send + 'a>,
        >,
        C,
    > for DeletePricelistStmt
{
    fn params(
        &'a mut self,
        client: &'a C,
        params: &'a DeletePricelistParams,
    ) -> std::pin::Pin<
        Box<dyn futures::Future<Output = Result<u64, tokio_postgres::Error>> + Send + 'a>,
    > {
        Box::pin(self.bind(client, &params.organization_id, &params.id))
    }
}
pub fn allowed_pricelist_ids() -> AllowedPricelistIdsStmt {
    AllowedPricelistIdsStmt(crate::client::async_::Stmt::new(
        "SELECT DISTINCT group_pricelist.pricelist_id FROM group_pricelist INNER JOIN group_user ON group_user.group_id = group_pricelist.group_id INNER JOIN user_organization ON user_organization.user_id = group_user.user_id WHERE user_organization.organization_id = $1 AND group_user.user_id = $2",
    ))
}
pub struct AllowedPricelistIdsStmt(crate::client::async_::Stmt);
impl AllowedPricelistIdsStmt {
    pub fn bind<'c, 'a, 's, C: GenericClient>(
        &'s mut self,
        client: &'c C,
        organization_id: &'a i32,
        user_id: &'a i32,
    ) -> I32Query<'c, 'a, 's, C, i32, 2> {
        I32Query {
            client,
            params: [organization_id, user_id],
            stmt: &mut self.0,
            extractor: |row| row.get(0),
            mapper: |it| it,
        }
    }
}
impl<'c, 'a, 's, C: GenericClient>
    crate::client::async_::Params<
        'c,
        'a,
        's,
        AllowedPricelistIdsParams,
        I32Query<'c, 'a, 's, C, i32, 2>,
        C,
    > for AllowedPricelistIdsStmt
{
    fn params(
        &'s mut self,
        client: &'c C,
        params: &'a AllowedPricelistIdsParams,
    ) -> I32Query<'c, 'a, 's, C, i32, 2> {
        self.bind(client, &params.organization_id, &params.user_id)
    }
}
