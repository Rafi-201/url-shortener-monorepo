import amqp from "amqplib";
// import { BulkInsertService } from "../services/BulkInsertService";
import { Logger } from "../utils/Logger";
import { Url } from "../models/url.model";
import { rabbitmqConfig } from "../config/rabitmq.config";

export class RabbitMQConsumer {
  //   private channel: amqp.Channel;
  private channel!: amqp.Channel; // Use non-null assertion to satisfy TypeScript

  // private bulkInsertService: BulkInsertService;

  constructor(private queue: string = rabbitmqConfig.queueName) {
    // this.bulkInsertService = new BulkInsertService();
  }

  async connectToQueue() {
    try {
      const connection = await amqp.connect(rabbitmqConfig.url);
      this.channel = await connection.createChannel();
      await this.channel.assertQueue(this.queue, { durable: true });
      this.channel.consume(this.queue, this.handleMessage.bind(this), {
        noAck: false, // Changed to false to acknowledge messages explicitly
      });
      Logger.info(`Listening for messages on ${this.queue} queue.`);
    } catch (error) {
      Logger.error("Error connecting to RabbitMQ:", error);
    }
  }

  async handleMessage(message: amqp.ConsumeMessage | null) {
    if (message) {
      try {
        const data: Url = JSON.parse(message.content.toString());
        Logger.info("Received message:", data);
        // await this.bulkInsertService.processBulkInsert([data]); // Process the message
        this.channel.ack(message); // Acknowledge the message after successful processing
      } catch (error) {
        Logger.error("Error handling message:", error);
        this.channel.nack(message, false, false); // Reject the message without requeueing
      }
    } else {
      Logger.error("Received null message.");
    }
  }
}
