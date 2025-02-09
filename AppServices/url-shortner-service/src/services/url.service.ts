import { RabbitMqConfig } from "../config/rabbitmq.config";
import { RabbitMQPublisher } from "../queue/RabbitMQPublisher";
import { Base62Encoder } from "../utils/Base62Encoder";

export class UrlService {
  constructor(private readonly rabbitMqPublisher: RabbitMQPublisher) {}
  public async createShortUrl(longUrl: string): Promise<string> {
    const uniqueId = Date.now();
    console.log("🚀 ~ UrlService ~ createShortUrl ~ uniqueId:", uniqueId);
    const shortUrl = `http://short.ly/${Base62Encoder.encode(uniqueId)}`;

    const event = {
      longUrl,
      shortUrl,
      createAt: new Date(),
    };
    console.log("🚀 ~ UrlService ~ createShortUrl ~ event:", event);

    await this.rabbitMqPublisher.publish(RabbitMqConfig.queueName, event);

    return shortUrl;
  }
}
