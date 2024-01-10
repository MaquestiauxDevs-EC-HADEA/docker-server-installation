FROM node:gallium

ENV HTTP_PORT 3000
ENV HTTP_HOST 0.0.0.0

ENV MAIL_HOST hadea-btsf-maildev
ENV MAIL_PORT 25
ENV MAIL_ADMIN hadea-is@ext.ec.europa.eu
ENV MAIL_NO_REPLY automated-notifications@nomail.ec.europa.eu

ENV DATABASE_HOST hadea-btsf-database
ENV DATABASE_PORT 1521
ENV DATABASE_SID ORCLCDB
ENV DATABASE_SERVICE_NAME ORCLCDB
ENV DATABASE_USER HADEA_BTSF
ENV DATABASE_USER_PWD eqntqgiwxp1$

# Install oracle instant client
# Create utils directory
WORKDIR /opt/oracle
RUN apt update
RUN apt install libaio-dev -y
RUN wget https://download.oracle.com/otn_software/linux/instantclient/1912000/instantclient-basic-linux.x64-19.12.0.0.0dbru.zip
RUN unzip instantclient-basic-linux.x64-19.12.0.0.0dbru.zip
RUN rm -f instantclient-basic-linux.x64-19.12.0.0.0dbru.zip
RUN cd instantclient*
RUN rm -f *jdbc* *occi* *mysql* *jar uidrvci genezi adrci
RUN echo /opt/oracle/instantclient* > /etc/ld.so.conf.d/oracle-instantclient.conf
RUN ldconfig

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
COPY dist/server.js .

COPY pm2.config.prod.js pm2.config.js

EXPOSE 3000

CMD [ "pm2-runtime", "start", "pm2.config.js" ]

