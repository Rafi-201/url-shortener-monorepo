<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>InfluxDB Docker Setup</title>
</head>
<body>
    <h1>InfluxDB Docker Setup</h1>
    <p>This repository provides a Docker setup for running InfluxDB, a popular time series database.</p>

    <h2>Dockerfile</h2>
    <p>This Dockerfile builds an image to run InfluxDB inside a container. The InfluxDB service is configured to expose ports for HTTP API and UDP communication.</p>

    <h3>Dockerfile Content</h3>
    <pre>
        <code>
FROM influxdb:latest

# Set environment variables (optional, adjust if needed)
ENV INFLUXDB_HTTP_AUTH_ENABLED=true
ENV INFLUXDB_ADMIN_USER=admin
ENV INFLUXDB_ADMIN_PASSWORD=admin_password
ENV INFLUXDB_DB=my_database

# Expose default InfluxDB HTTP API port
EXPOSE 8086

# Expose UDP port (optional)
EXPOSE 8089

# Start InfluxDB service
CMD ["influxd"]
        </code>
    </pre>

    <h2>How to Build and Run</h2>
    <h3>1. Clone this repository</h3>
    <pre>
        <code>
git clone https://github.com/your-username/influxdb-docker.git
cd influxdb-docker
        </code>
    </pre>

    <h3>2. Build the Docker image</h3>
    <pre>
        <code>
docker build -t influxdb-tsdb .
        </code>
    </pre>

    <h3>3. Run the Docker container</h3>
    <p>Run the following command to start the container. This will expose the InfluxDB service on port 8086.</p>
    <pre>
        <code>
docker run -d -p 8086:8086 --name influxdb-container influxdb-tsdb
        </code>
    </pre>

    <h2>Optional: Data Persistence</h2>
    <p>To persist InfluxDB data on your local machine, you can mount a volume to the container:</p>
    <pre>
        <code>
docker run -d -p 8086:8086 -v /path/to/local/storage:/var/lib/influxdb --name influxdb-container influxdb-tsdb
        </code>
    </pre>

    <h2>Configuration</h2>
    <p>If you want to customize the InfluxDB configuration, you can create a custom configuration file and copy it into the container during build time.</p>
    <pre>
        <code>
COPY influxdb.conf /etc/influxdb/influxdb.conf
        </code>
    </pre>

    <h2>Accessing InfluxDB</h2>
    <p>Once the container is running, you can access InfluxDB using the HTTP API at <strong>http://localhost:8086</strong>.</p>

    <h2>Docker Compose (Optional)</h2>
    <p>If you prefer to use Docker Compose, here's an example <code>docker-compose.yml</code> configuration:</p>

    <pre>
        <code>
version: '3'

services:
  influxdb:
    image: influxdb:latest
    environment:
      INFLUXDB_HTTP_AUTH_ENABLED: "true"
      INFLUXDB_ADMIN_USER: "admin"
      INFLUXDB_ADMIN_PASSWORD: "admin_password"
      INFLUXDB_DB: "my_database"
    ports:
      - "8086:8086"
    volumes:
      - /path/to/local/storage:/var/lib/influxdb
    restart: unless-stopped
        </code>
    </pre>

    <h3>To run with Docker Compose:</h3>
    <pre>
        <code>
docker-compose up -d
        </code>
    </pre>

    <h2>License</h2>
    <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>
</body>
</html>
