import Knex, { Knex as KnexType } from "knex";

// Constants for DB configurations
const DB_QUERY_EVENT = "query";
const DB_ERROR_EVENT = "query-error";
const KNEX_DIALECT = "pg";
const PG_SQL_PORT = "5432";
const MIN_POOL_SIZE = 2;
const MAX_POOL_SIZE = parseInt(process.env.MAX_POOL_SIZE || "30");

// KnexFactory class for creating and managing database connection
export class KnexFactory {
  private knex: KnexType | null = null;

  // Singleton pattern ensures only one instance of Knex is used across the app
  public getKnexInstance(): KnexType {
    if (!this.knex) {
      this.knex = Knex({
        client: KNEX_DIALECT,
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          port: parseInt(process.env.DB_PORT || PG_SQL_PORT),
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          requestTimeout: 60 * 1000, // Timeout in milliseconds
        },
        pool: {
          min: MIN_POOL_SIZE,
          max: MAX_POOL_SIZE,
          idleTimeoutMillis: 30000, // Idle timeout to clear up unused connections
        },
      });

      this.knex
        .on(DB_QUERY_EVENT, (queryData) => {
          if (process.env.ENABLE_DB_QUERY_LOGS) {
            let query = queryData.sql.replace(/\s\s+/g, " ");
            queryData.bindings.forEach((param, i) => {
              query = query.replace(
                new RegExp(`@p${i}\\b`),
                typeof param === "string" ? `'${param}'` : param
              );
            });
            console.log("[QUERY]", query);
            console.log(
              "[QUERY-PARAMETERS]: ",
              JSON.stringify(queryData.bindings)
            );
          }
        })
        .on(DB_ERROR_EVENT, (errorData) => {
          console.error("[DATABASE-ERROR] " + errorData);
          console.error(
            "[DATABASE-ERROR-MESSAGE] " +
              errorData.message.replace(/\s+/gm, " ")
          );
          // Throw or handle the error as needed
          process.exit(1); // Optional: force app exit on DB connection error
        });
    }
    return this.knex;
  }

  // Optional: Method to close the connection gracefully
  public async closeConnection(): Promise<void> {
    if (this.knex) {
      await this.knex.destroy();
      this.knex = null;
    }
  }
}
