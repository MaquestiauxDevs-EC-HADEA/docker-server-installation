#!/bin/bash
echo "First arg: $1"
if [ "$1" == "dev" ]; then
    echo "Running in development mode"
    docker image rm example-php:dev
    docker build -t example-php:dev .
    docker save example-php:dev > example-php-dev.tar
    docker image rm example-php:dev
fi

if [ "$1" == "prod" ]; then
    echo "Running in production mode"
    docker image rm example-php:latest
    docker build -t example-php:latest .
    docker save example-php:latest > example-php.tar
    docker image rm example-php:latest
fi