import RabbitMQConsumer from "./src/adapters/in/RabbitMQConsumer";

import dotenv from "dotenv";

dotenv.config();

// Start the RabbitMQ consumer to listen for messages
new RabbitMQConsumer();
