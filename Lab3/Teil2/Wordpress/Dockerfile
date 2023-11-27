# Base Image
FROM debian:buster

# Environment variables
ENV WORDPRESS_DB_HOST=localhost:3306
ENV WORDPRESS_DB_USER=user
ENV WORDPRESS_DB_PASSWORD=password
ENV WORDPRESS_DB_NAME=wordpress
ENV DEBIAN_FRONTEND noninteractive

# Install Packages 
RUN apt-get update && \
    apt-get install -y \
    apache2 \
    libapache2-mod-php \
    php \
    php-curl \
    php-gd \
    php-mbstring \
    php-mysql \
    php-xml \
    php-xmlrpc \
    unzip \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Set Working Directory
WORKDIR /var/www/html

# Setup Website
RUN wget -O wordpress.zip https://wordpress.org/latest.zip && \
    unzip wordpress.zip && \
    rm wordpress.zip && \ 
    chown -R www-data:www-data /var/www/html

# Define Volume 
VOLUME /var/www/html

# Expose Port to 80/tcp
EXPOSE 80/tcp

# Runn Command
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]