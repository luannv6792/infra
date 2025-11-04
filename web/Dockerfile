# Dockerfile for PHP frontend
FROM php:8.1-apache

# enable mod_rewrite if needed
RUN a2enmod rewrite

# copy app
COPY . /var/www/html/

# set permissions (if needed)
RUN chown -R www-data:www-data /var/www/html

# expose port 80 inside container
EXPOSE 80

# default command handled by image
