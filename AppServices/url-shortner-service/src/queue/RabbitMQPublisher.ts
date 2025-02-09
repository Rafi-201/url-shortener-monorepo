import { connect, Channel, Connection } from "amqplib";

export class RabbitMQPublisher {
  //   private channel!: Channel;
  private connection!: Connection;
  private channel!: Channel;

  constructor(private readonly rabbitMqUrl: string) {}

  /**
   * Establishes a connection and creates a channel.
   */
  async connect(): Promise<void> {
    console.log(
      "🚀 ~ RabbitMQPublisher ~ connect ~ this.rabbitMqUrl:",
      this.rabbitMqUrl
    );
    try {
      this.connection = await connect(this.rabbitMqUrl); // Establish connection
      this.channel = await this.connection.createChannel(); // Create channel
      console.log("RabbitMQ connection established.");
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error);
      throw new Error("Failed to connect to RabbitMQ.");
    }
  }

  /**
   * Publishes a message to the specified queue.
   * @param queue - The name of the queue
   * @param message - The message object to send
   */
  async publish(queue: string, message: object): Promise<void> {
    if (!this.channel) {
      throw new Error("RabbitMQ channel is not initialized.");
    }

    try {
      // Ensure the queue exists
      await this.channel.assertQueue(queue, { durable: true });

      // Publish the message to the queue
      this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
        persistent: true, // Ensures message durability
      });

      console.log(`Message published to queue "${queue}":`, message);
    } catch (error) {
      console.error("Error publishing message:", error);
      throw new Error("Failed to publish message.");
    }
  }

  /**
   * Closes the connection and channel gracefully.
   */
  async close(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
        console.log("RabbitMQ channel closed.");
      }

      if (this.connection) {
        await this.connection.close();
        console.log("RabbitMQ connection closed.");
      }
    } catch (error) {
      console.error("Error closing RabbitMQ connection:", error);
    }
  }
}
