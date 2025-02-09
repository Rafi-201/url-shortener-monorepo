// src/infrastructure/config/rabbitmqConfig.ts
import dotenv from "dotenv";

dotenv.config();

const rabbitmqConfig = {
  host: process.env.RABBITMQ_HOST || "localhost", // RabbitMQ host
  port: process.env.RABBITMQ_PORT ? parseInt(process.env.RABBITMQ_PORT) : 5672, // RabbitMQ port
  username: process.env.RABBITMQ_USER || "guest", // RabbitMQ username
  password: process.env.RABBITMQ_PASSWORD || "guest", // RabbitMQ password
  queue: process.env.RABBITMQ_QUEUE || "myQueue", // RabbitMQ queue name
  exchange: process.env.RABBITMQ_EXCHANGE || "myExchange", // RabbitMQ exchange name
  routingKey: process.env.RABBITMQ_ROUTING_KEY || "myRoutingKey", // RabbitMQ routing key
};

export { rabbitmqConfig };
