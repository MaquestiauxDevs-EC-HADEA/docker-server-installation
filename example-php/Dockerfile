FROM httpd:2.4-alpine3.16

RUN apk update
RUN apk add gcompat
RUN apk add libc6-compat
RUN apk add git
RUN apk add wget
RUN apk add unzip
RUN apk add g++
RUN apk add gcc
RUN apk add make
RUN apk add libaio-dev
# https://pkgs.alpinelinux.org/packages?name=php*&branch=v3.16&repo=community&arch=x86_64&maintainer=
RUN apk add php
RUN apk add php8-dev
RUN apk add php-pear
RUN apk add php-fpm
RUN apk add php-session
RUN apk add php-fileinfo
RUN apk add php-xml
RUN apk add php-xmlreader
RUN apk add php-xmlwriter
RUN apk add php8-simplexml
RUN apk add php8-xsl
RUN apk add php-mbstring
RUN apk add php-json
RUN apk add php-opcache
RUN apk add php-pdo
RUN apk add php-phar
RUN apk add php-tokenizer
RUN apk add php-zip
RUN apk add php-bz2
RUN apk add php-curl
RUN apk add php-gd
RUN apk add php-openssl
RUN apk add php-ctype
RUN apk add php-ldap
RUN apk add php8-pecl-mcrypt
RUN apk add php8-zlib
RUN apk add composer
RUN apk add supervisor

RUN ln -s /lib/libc.so.6 /usr/lib/libresolv.so.2

# Download and install Oracle Instant Client (Oracle 21)
# Replace the URL with the correct one for your architecture (e.g., x86_64)
RUN wget https://download.oracle.com/otn_software/linux/instantclient/2111000/instantclient-basic-linux.x64-21.11.0.0.0dbru.zip
RUN wget https://download.oracle.com/otn_software/linux/instantclient/2111000/instantclient-sdk-linux.x64-21.11.0.0.0dbru.zip
RUN wget https://download.oracle.com/otn_software/linux/instantclient/2111000/instantclient-sqlplus-linux.x64-21.11.0.0.0dbru.zip
RUN unzip instantclient-basic-linux.x64-21.11.0.0.0dbru.zip -d /usr/local/oracle/
RUN unzip instantclient-sdk-linux.x64-21.11.0.0.0dbru.zip -d /usr/local/oracle/
RUN unzip instantclient-sqlplus-linux.x64-21.11.0.0.0dbru.zip -d /usr/local/oracle/
RUN mv /usr/local/oracle/instantclient_21_11 /usr/local/oracle/instantclient
# Set environment variables for Oracle Instant Client
ENV LD_LIBRARY_PATH=/usr/local/oracle/instantclient
ENV ORACLE_HOME=/usr/local/oracle/instantclient
ENV PATH $PATH:/usr/local/oracle/instantclient
# Run ldconfig to update the shared library cache
RUN ldconfig /etc/ld.so.conf.d

COPY ./src /usr/local/apache2/htdocs
COPY ./configs/php.ini /etc/php8/php.ini
COPY ./configs/www.conf /etc/php8/php-fpm.d/www.conf
COPY ./configs/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./configs/supervisor/supervisord.conf /etc/supervisor/supervisord.conf
COPY ./configs/supervisor/conf.d/ /etc/supervisor/conf.d/

# OCI8
# https://pecl.php.net/package/oci8
# Use 'pecl install oci8-3.2.1' to install for PHP 8.1.
# Use 'pecl install oci8-3.0.1' to install for PHP 8.0.
WORKDIR /temp
RUN pecl channel-update pecl.php.net
RUN pecl download oci8-3.0.1
RUN tar xzf oci8-3.0.1.tgz
WORKDIR /temp/oci8-3.0.1
RUN phpize
RUN ./configure --with-oci8=instantclient,/usr/local/oracle/instantclient
RUN make
RUN make install
RUN echo "extension=oci8.so" >> /etc/php8/conf.d/oci8.ini

WORKDIR /usr/local/apache2/htdocs

CMD ["supervisord","-n", "-c", "/etc/supervisor/supervisord.conf"]