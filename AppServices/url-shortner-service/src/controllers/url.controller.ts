import { Request, Response } from "express";
import { UrlService } from "../services/url.service";
import { error } from "console";

export class UrlController {
  constructor(private readonly urlService: UrlService) {}
  public async createShortUrl(req: Request, res: Response) {
    const { url } = req.body;
    console.log("🚀 ~ UrlController ~ createShortUrl ~ url:", url);
    if (!url) {
      res.status(400).json({ error: "url is required" });
      return;
    }

    try {
      const shortUrl = this.urlService.createShortUrl(url);
      res.status(201).json({
        status: "success",
        message: "Short URL created successfully",
        shortUrl,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to create short URL" });
    }
  }
}
