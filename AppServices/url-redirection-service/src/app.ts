import express from "express";
import dotenv from "dotenv";

import { KnexFactory } from "./knexFactory";
import { UrlRepository } from "./repositories/url.repository";
import { UrlService } from "./services/url.service";
import { UrlController } from "./controllers/url.controller";
import { globalErrorHandler } from "./middleware/app-error.middleware";


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Initialize Knex instance
const db = new KnexFactory().getKnexInstance();

// Initialize the repository, service, and controller
const urlRepository = new UrlRepository(db);
const urlService = new UrlService(urlRepository);
const urlController = new UrlController(urlService);

// Define the route for shortening a URL
app.post("/shorten", urlController.redirectUrl.bind(urlController));

app.use(globalErrorHandler);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
