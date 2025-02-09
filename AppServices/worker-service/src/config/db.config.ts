import { Pool } from "pg";

export const db = new Pool({
  user: "dbuser",
  host: "database",
  database: "url_shortener",
  password: "password",
  port: 5432,
});
