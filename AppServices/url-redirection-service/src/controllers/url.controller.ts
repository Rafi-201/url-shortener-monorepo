import { Request, Response } from "express";
import { UrlService } from "../services/url.service";

export class UrlController{
    constructor(private readonly urlService:UrlService){}

    public async redirectUrl(req: Request, res: Response){
        try {
            const shortUrl = req.params.shortUrl;

            const originalUrl = await this.urlService.getOriginalUrl(shortUrl);

            if (!originalUrl) {
                return res.status(404).json({ message: "URL not found" });
            }

            return res.redirect(originalUrl);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}