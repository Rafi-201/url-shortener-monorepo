import express from "express";
import { AppConfig } from "./config/app.config";
import { RabbitMQPublisher } from "./queue/RabbitMQPublisher";
import { UrlService } from "./services/url.service";
import { UrlController } from "./controllers/url.controller";
import { RabbitMqConfig } from "./config/rabbitmq.config";

const app = express();
app.use(express.json());

// RabbitMQ Publisher
const rabbitMqPublisher = new RabbitMQPublisher(RabbitMqConfig.url);
rabbitMqPublisher.connect().then(() => console.log("RabbitMQ connected"));

// Initialize Service and Controller
const urlService = new UrlService(rabbitMqPublisher);
const urlController = new UrlController(urlService);

//Routes
app.post("/api/shorten", urlController.createShortUrl.bind(urlController));

app.listen(AppConfig.PORT, () => {
  console.log(`Server running at localhost:${AppConfig.PORT}`);
});
