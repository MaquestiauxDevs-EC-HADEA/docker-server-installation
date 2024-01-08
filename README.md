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

dckr_pat_V5zbCBPzn4s_8Ae6i2E7PLL9h7k
