#!/usr/bin/env bash
clorinde \
    schema \
    --destination=samling-clorinde \
    --queries-path=./samling/queries \
    ./samling/migrations/*.sql
cargo fmt -p samling-clorinde
