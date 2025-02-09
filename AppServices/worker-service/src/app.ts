import { rabbitmqConfig } from "./config/rabitmq.config";
import { RabbitMQConsumer } from "./consumers/RabbitMQConsumer";

import dotenv from "dotenv";
dotenv.config();

const startWorker = async () => {
  const consumer = new RabbitMQConsumer(rabbitmqConfig.queueName);
  await consumer.connectToQueue();
};

startWorker().catch((error) => {
  console.error("Error starting worker:", error);
});
