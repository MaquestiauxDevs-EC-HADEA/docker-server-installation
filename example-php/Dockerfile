FROM httpd:2.4-alpine3.16

RUN apk update \
    && apk add --no-cache \
    nano \
    gcompat \
    libc6-compat \
    git \
    wget \
    unzip \
    g++ \
    gcc \
    make \
    libaio-dev \
    php \
    php8-dev \
    php-pear \
    php-fpm \
    php-session \
    php-fileinfo \
    php-xml \
    php-xmlreader \
    php-xmlwriter \
    php8-simplexml \
    php8-xsl \
    php-mbstring \
    php-json \
    php-opcache \
    php-pdo \
    php-phar \
    php-tokenizer \
    php-zip \
    php-bz2 \
    php-curl \
    php-gd \
    php-openssl \
    php-ctype \
    php-ldap \
    php8-pecl-mcrypt \
    php8-zlib \
    composer \
    supervisor

RUN ln -s /lib/libc.so.6 /usr/lib/libresolv.so.2

# Download and install Oracle Instant Client (Oracle 21)
# Replace the URL with the correct one for your architecture (e.g., x86_64)
RUN wget https://download.oracle.com/otn_software/linux/instantclient/2111000/instantclient-basic-linux.x64-21.11.0.0.0dbru.zip \
    && wget https://download.oracle.com/otn_software/linux/instantclient/2111000/instantclient-sdk-linux.x64-21.11.0.0.0dbru.zip \
    && wget https://download.oracle.com/otn_software/linux/instantclient/2111000/instantclient-sqlplus-linux.x64-21.11.0.0.0dbru.zip \
    && unzip instantclient-basic-linux.x64-21.11.0.0.0dbru.zip -d /usr/local/oracle/ \
    && unzip instantclient-sdk-linux.x64-21.11.0.0.0dbru.zip -d /usr/local/oracle/ \
    && unzip instantclient-sqlplus-linux.x64-21.11.0.0.0dbru.zip -d /usr/local/oracle/ \
    && mv /usr/local/oracle/instantclient_21_11 /usr/local/oracle/instantclient
# Set environment variables for Oracle Instant Client
ENV LD_LIBRARY_PATH=/usr/local/oracle/instantclient
ENV ORACLE_HOME=/usr/local/oracle/instantclient
ENV PATH $PATH:/usr/local/oracle/instantclient
# Run ldconfig to update the shared library cache
RUN ldconfig /etc/ld.so.conf.d

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
RUN pecl channel-update pecl.php.net \
    && pecl download oci8-3.0.1 \
    && tar xzf oci8-3.0.1.tgz \
    && cd oci8-3.0.1 \
    && phpize \
    && ./configure --with-oci8=instantclient,/usr/local/oracle/instantclient \
    && make \
    && make install \
    && echo "extension=oci8.so" >> /etc/php8/conf.d/oci8.ini

WORKDIR /usr/local/apache2/htdocs

COPY ./sources .

EXPOSE 80

CMD ["supervisord","-n", "-c", "/etc/supervisor/supervisord.conf"]