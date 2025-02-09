// import { Url } from "../models/url.model";
// import { Logger } from "../utils/Logger";

// export class UrlRepository {
//   async bulkInsert(urlMappings: Url[]) {
//     try {
//       const insertQuery = `
//         INSERT INTO url_mappings (long_url, short_url, created_at)
//         VALUES ?
//         ON CONFLICT (long_url) DO NOTHING
//       `;

//       const values = urlMappings.map((urlMapping) => [
//         urlMapping.longUrl,
//         urlMapping.shortUrl,
//         urlMapping.createdAt,
//       ]);

//       await db.query(insertQuery, [values]);
//       Logger.info("Bulk insert successful");
//     } catch (error) {
//       Logger.error("Error inserting URL mappings:", error);
//     }
//   }
// }
