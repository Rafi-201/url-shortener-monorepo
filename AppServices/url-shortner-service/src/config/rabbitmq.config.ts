export class RabbitMqConfig {
  static url =
    process.env.RABBITMQ_URL || "amqp://admin:password@localhost:5672"; // Use the Docker service name `rabbitmq`
  static queueName = "url_queue";
}
