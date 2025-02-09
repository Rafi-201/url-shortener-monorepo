# Use the official RabbitMQ image with management plugin
FROM rabbitmq:management

# Set environment variables (Optional)
# You can define custom user and password if needed
ENV RABBITMQ_DEFAULT_USER=guest
ENV RABBITMQ_DEFAULT_PASS=guest

# Expose ports for AMQP and Management Web UI
EXPOSE 5672 15672

# Start RabbitMQ server (the entrypoint is already set in the base image)
CMD ["rabbitmq-server"]
