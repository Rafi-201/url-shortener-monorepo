import { UrlMapping } from "../entities/UrlMapping";

export interface UrlRepository {
  insertUrlMapping(urlMapping: UrlMapping): Promise<void>;
}
