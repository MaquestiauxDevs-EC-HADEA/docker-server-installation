# Installation for the server

## Portainer

### Portainer Server

Execute the shell script `01-install-portainer.sh`. This script will create a volume for storing portainer information and create a container that will host the portainer application. By default, it will use the latest version of portainer Community Edition.

You can check the linux installation guide at https://docs.portainer.io/start/install-ce/server/docker/linux

If you browser do not open automatically go to https://localhost:9443

You will have to create a administration account

E.G.

username: supervisor

password: APassword12CharMin!

You then need to create an environment. E.G. Docker Standalone which for this you need to create an agent.

#### Portainer Agent

Through the application interface, select to create a new environment for Docker Standalone.

It will provide a script to create a portainer agent; you can execute the shell script `02-portainer-agent.sh`. This script will create a new container specific to the agent.

In the interface, you should gives an environment name and also the environment address.

E.G.

name: docker-local-env

Environment address: 10.0.0.10:9001

### How to prepare your dockerised app and use it in Portainer

1. Create a Dockerfile with the necessary commands.
2. Create a docker-compose yaml file with the necessary information (eg. expose port, container name)
3. Build your app (located into the example folder) `npx tsc` (transcode ts to js, The code should be builded into the ./dist folder)
4. Build your image `docker build -t testsdocker:latest .`
5. Save the builed image as tar `docker save testsdocker:latest > testsdocker_latest.tar`
6. Go in Portainer (https://localhost:9443/#!/2/docker/images) and import the create tar file
7. Go in Portainer Stack (https://localhost:9443/#!/2/docker/stacks) and add a stack by uploading the docker-compose yaml file.
8. The container should be running (https://localhost:9443/#!/2/docker/containers)

Steps 1 to 5, can be achieved by executing the shell script `03-generate-docker-image.sh`

ref: dckr_pat_V5zbCBPzn4s_8Ae6i2E7PLL9h7k
