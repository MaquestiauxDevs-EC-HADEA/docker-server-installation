# How to

Repo : https://github.com/MaquestiauxDevs-EC-HADEA/docker-server-installation

## Docker: How to prepare and use in Portainer

1. Create a Dockerfile with the necessary commands.
2. Create a docker-compose yaml file with the necessary information (eg. expose port, container name)
3. Build your image `docker build -t example-nodejs-pm2:latest .`
4. Save the builed image as tar `docker save example-nodejs-pm2:latest > example-nodejs-pm2_latest.tar`
5. Go in Portainer (https://localhost:9443/#!/2/docker/images) and import the create tar file
6. Go in Portainer Stack (https://localhost:9443/#!/2/docker/stacks) and add a stack by uploading the docker-compose yaml file.
7. The container should be running

Steps 1 to 5, can be achieved by executing the shell script `03-generate-docker-image.sh`
