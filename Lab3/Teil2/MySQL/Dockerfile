# Base Image
FROM debian:buster

# Environment variables
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password
ENV MYSQL_DATABASE=wordpress

# Install MarianDB Server
RUN apt-get update
RUN apt-get install -y mariadb-server 
RUN rm -rf /var/lib/apt/lists/*

# Create Directoty & Grant Access
RUN mkdir -p /var/run/mysqld /var/lib/mysql
RUN chmod 1777 /var/run/mysqld /var/lib/mysql

# Define Volume
VOLUME /var/lib/mysql/

# Init Database
RUN service mysql start \
    && mysqladmin -uroot password $MYSQL_ROOT_PASSWORD \
    && mysql --user=root --password=$MYSQL_ROOT_PASSWORD -e "CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};" \
    && mysql --user=root --password=$MYSQL_ROOT_PASSWORD -e "GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';" \
    && mysql --user=root --password=$MYSQL_ROOT_PASSWORD -e "FLUSH PRIVILEGES;"

# Expose port to 3306/tcp
EXPOSE 3306/tcp

# Run Command
CMD "mysqld"