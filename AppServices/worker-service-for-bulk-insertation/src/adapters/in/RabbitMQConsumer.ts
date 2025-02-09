// src/adapters/in/RabbitMQConsumer.ts
import { connect } from "amqplib";
import { ProcessMessageService } from "../../core/useCases/ProcessMessageService";
import { UrlRepositoryImpl } from "../out/repositories/UrlRepository";
import { Logger } from "../../infrastructure/utils/Logger";

class RabbitMQConsumer {
  private channel: any;
  private queue: string = "url_queue";

  constructor() {
    this.init();
  }

  private async init() {
    try {
      const connection = await connect(
        process.env.RABBITMQ_HOST || "amqp://localhost"
      );
      this.channel = await connection.createChannel();
      await this.channel.assertQueue(this.queue, { durable: true });

      this.channel.consume(this.queue, async (msg: any) => {
        if (msg) {
          const message = JSON.parse(msg.content.toString());
          await this.processMessage(message);
          this.channel.ack(msg);
        }
      });
    } catch (error) {
      Logger.error("Error connecting to RabbitMQ", error);
    }
  }

  private async processMessage(message: any) {
    const urlRepository = new UrlRepositoryImpl(); // Provide the concrete implementation
    const service = new ProcessMessageService(urlRepository); // Inject the repository into the service
    await service.process(message);
  }
}

export default RabbitMQConsumer;
