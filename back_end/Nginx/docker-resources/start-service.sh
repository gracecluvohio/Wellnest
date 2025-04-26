#!/bin/bash

# Start Nginx
nginx -g "daemon off;"

cat /var/log/nginx/error.log