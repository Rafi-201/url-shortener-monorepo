export const rabbitmqConfig = {
  url: process.env.RABBITMQ_URL || "amqp://admin:password@localhost:5672", // RabbitMQ server URL (default to localhost for development)
  queueName: process.env.RABBITMQ_QUEUE || "url_queue", // Default queue name for messages
  prefetchCount: parseInt(process.env.RABBITMQ_PREFETCH_COUNT || "10", 10), // Prefetch count to control message flow
  username: "admin", // RabbitMQ username
  password: "password", // RabbitMQ password
};
