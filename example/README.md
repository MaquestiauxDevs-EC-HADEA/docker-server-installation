# How to

Repo : https://github.com/MaquestiauxTesting/docker-express-pm2

## Docker: How to prepare and use in Portainer

1. Create a Dockerfile with the necessary commands.
2. Create a docker-compose yaml file with the necessary information (eg. expose port, container name)
3. Build your image `docker build -t testsdocker:latest .`
4. Save the builed image as tar `docker save testsdocker:latest > testsdocker_latest.tar`
5. Go in Portainer (https://localhost:9443/#!/2/docker/images) and import the create tar file
6. Go in Portainer Stack (https://localhost:9443/#!/2/docker/stacks) and add a stack by uploading the docker-compose yaml file.
7. The container should be running
