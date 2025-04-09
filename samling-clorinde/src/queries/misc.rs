// This file was generated with `clorinde`. Do not modify.

use crate::client::async_::GenericClient;
use futures::{self, StreamExt, TryStreamExt};
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
pub fn migrate_revision() -> MigrateRevisionStmt {
    MigrateRevisionStmt(crate::client::async_::Stmt::new(
        "SELECT migrations.revision FROM migrations",
    ))
}
pub struct MigrateRevisionStmt(crate::client::async_::Stmt);
impl MigrateRevisionStmt {
    pub fn bind<'c, 'a, 's, C: GenericClient>(
        &'s mut self,
        client: &'c C,
    ) -> I32Query<'c, 'a, 's, C, i32, 0> {
        I32Query {
            client,
            params: [],
            stmt: &mut self.0,
            extractor: |row| row.get(0),
            mapper: |it| it,
        }
    }
}
pub fn set_migrate_revision() -> SetMigrateRevisionStmt {
    SetMigrateRevisionStmt(crate::client::async_::Stmt::new(
        "SELECT set_migrate_revision($1)",
    ))
}
pub struct SetMigrateRevisionStmt(crate::client::async_::Stmt);
impl SetMigrateRevisionStmt {
    pub fn bind<'c, 'a, 's, C: GenericClient>(
        &'s mut self,
        client: &'c C,
        revision: &'a i32,
    ) -> I32Query<'c, 'a, 's, C, i32, 1> {
        I32Query {
            client,
            params: [revision],
            stmt: &mut self.0,
            extractor: |row| row.get(0),
            mapper: |it| it,
        }
    }
}
