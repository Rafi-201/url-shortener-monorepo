// import { Url } from "../models/url.model";
// import { UrlRepository } from "../repositories/url.repository";
// import { Logger } from "../utils/Logger";

// export class BulkInsertService {
//   private urlRepository: UrlRepository;
//   constructor() {
//     this.urlRepository = new UrlRepository();
//   }

//   public async processBulkInsert(urls: Url[]) {
//     try {
//       Logger.info(`Inserting ${urls.length} URL mappings.`);
//       await this.urlRepository.bulkInsert(urls);
//     } catch (error) {
//       Logger.error("Error during bulk insert:", error);
//     }
//   }
// }
