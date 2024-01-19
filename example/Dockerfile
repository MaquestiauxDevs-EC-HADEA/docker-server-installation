FROM node:gallium-slim

# Install oracle instant client
# Create utils directory
WORKDIR /opt/oracle
RUN apt update && \
    apt install libaio-dev wget unzip -y && \
    wget https://download.oracle.com/otn_software/linux/instantclient/1912000/instantclient-basic-linux.x64-19.12.0.0.0dbru.zip && \
    unzip instantclient-basic-linux.x64-19.12.0.0.0dbru.zip && \
    rm -f instantclient-basic-linux.x64-19.12.0.0.0dbru.zip
RUN cd instantclient*
RUN rm -f *jdbc* *occi* *mysql* *jar uidrvci genezi adrci 
RUN echo /opt/oracle/instantclient* > /etc/ld.so.conf.d/oracle-instantclient.conf && \
    ldconfig

#Add library path of oracle binrary to LD_LIBRARY_PATH
ENV LD_LIBRARY_PATH /opt/oracle/instantclient_19_12:$LD_LIBRARY_PATH
ENV PATH /opt/oracle/instantclient_19_12:$PATH

# Install PM2 Globally

RUN npm i -g pm2

# Create app directory
WORKDIR /usr/app

# Copy the app code 
COPY package*.json .
RUN npm i
COPY dist .

COPY ecosystem.config.js .

EXPOSE 3000

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]

