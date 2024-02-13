#!/usr/bin/zsh
echo "*****************************"
echo "Create App and Generate the Docker image"
echo "*****************************"

if [ "$#" -eq 0 ]; then
    echo "Error: No argument provided. Please provide 'dev' or 'prod'."
    exit 1
fi

echo "First arg: $1"
if [ "$1" = "dev" ]; then
    echo "Running in development mode"
    yes | cp configs/supervisor/supervisord.dev.conf configs/supervisor/supervisord.conf
    docker image rm example-php:dev
    docker build -t example-php:dev .
    docker save example-php:dev > example-php-dev.tar
    echo "Second arg: $2"
    if [ "$2" = "up" ]; then
        docker compose up
    else
        docker image rm example-php:dev
    fi
fi

if [ "$1" = "prod" ]; then
    echo "Running in production mode"
    yes | cp configs/supervisor/supervisord.prod.conf configs/supervisor/supervisord.conf
    docker image rm example-php:latest
    docker build -t example-php:latest .
    docker save example-php:latest > example-php.tar
    docker image rm example-php:latest
fi