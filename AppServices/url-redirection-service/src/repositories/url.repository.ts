import { Knex } from "knex";

export class UrlRepository{
    constructor(private readonly db: Knex){}
}