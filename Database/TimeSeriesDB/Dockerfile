# Use the official InfluxDB image from Docker Hub
FROM influxdb:latest

# Set the environment variables (optional, adjust if needed)
ENV INFLUXDB_HTTP_AUTH_ENABLED=true
ENV INFLUXDB_ADMIN_USER=admin
ENV INFLUXDB_ADMIN_PASSWORD=admin_password
ENV INFLUXDB_DB=my_database

# Expose the default InfluxDB HTTP API port
EXPOSE 8086

# Expose the default InfluxDB UDP port (if you're using UDP for data ingestion)
EXPOSE 8089

# Run InfluxDB when the container starts
CMD ["influxd"]
