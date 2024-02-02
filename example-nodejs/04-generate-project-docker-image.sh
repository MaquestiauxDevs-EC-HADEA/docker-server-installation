#!/bin/bash
npm run build
echo "First arg: $1"
if [ "$1" == "dev" ]; then
    yes | cp ecosystem.dev.config.js ecosystem.config.js
    echo "Running in development mode"
    npm run build
    docker image rm example-nodejs-pm2:dev
    docker build -t example-nodejs-pm2:dev .
    docker save example-nodejs-pm2:dev > example-nodejs-pm2-dev.tar
    docker image rm example-nodejs-pm2:dev
fi

if [ "$1" == "prod" ]; then
    yes | cp ecosystem.prod.config.js ecosystem.config.js
    echo "Running in production mode"
    npm run build
    docker image rm example-nodejs-pm2:latest
    docker build -t example-nodejs-pm2:latest .
    docker save example-nodejs-pm2:latest > example-nodejs-pm2.tar
    docker image rm example-nodejs-pm2:latest
fi