# Use Ubuntu image
FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

# Install softwares
RUN apt-get update && \
    apt-get install -y nginx nano certbot python3-certbot-nginx cron curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy Nginx config file
COPY docker-resources/nginx/default.conf /etc/nginx/sites-available/default

# Nginx.conf
COPY docker-resources/nginx/nginx.conf /etc/nginx/nginx.conf

# Set working directory
WORKDIR /var/www/html/website

# Expose port 80 and 443
EXPOSE 8080

# Copy start service script
COPY docker-resources/start-service.sh /usr/local/bin/start-service.sh
RUN chmod +x /usr/local/bin/start-service.sh

# Start the service
ENTRYPOINT ["/usr/local/bin/start-service.sh"]
