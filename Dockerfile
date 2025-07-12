# Use PHP 8.2 with Apache as the base image
FROM php:8.2-apache

# Set working directory inside the web root
WORKDIR /var/www/html

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    libzip-dev \
    mariadb-server \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql bcmath zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Enable Apache mod_rewrite
RUN a2enmod rewrite
RUN a2enmod headers
# Use the provided Apache vhost configuration
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf
# Copy Laravel project files
COPY . .

# Set correct permissions
# RUN chown -R www-data:www-data /var/www/html \
#     && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache


# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# Install node js dependencies
RUN apt-get install -y nodejs npm && \
    npm install -g n && \
    n stable && \
    npm install && \
    npm run build

#RUN php artisan config:clear
RUN php artisan config:clear \
    && php artisan cache:clear \
    && php artisan view:clear \
    && php artisan config:cache

# Install phpMyAdmin
RUN mkdir -p /usr/share/phpmyadmin && \
    curl -sSL https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.tar.gz | tar -xz --strip-components=1 -C /usr/share/phpmyadmin && \
    ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin && \
    chown -R www-data:www-data /usr/share/phpmyadmin

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd mysqli pdo pdo_mysql bcmath zip

COPY config.inc.php /usr/share/phpmyadmin/config.inc.php
# COPY 000-default.conxf /etc/apache2/sites-enabled/000-default.conf
# RUN cat /etc/apache2/sites-enabled/000-default.conf

# Expose ports
EXPOSE 80

# Start Apache and MySQL
CMD apache2-foreground
