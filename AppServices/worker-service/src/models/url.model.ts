export class Url {
  longUrl: string;
  shortUrl: string;
  createdAt: Date;

  constructor(longUrl: string, shortUrl: string) {
    this.longUrl = longUrl;
    this.shortUrl = shortUrl;
    this.createdAt = new Date();
  }
}
