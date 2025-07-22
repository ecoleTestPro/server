# Use PHP 8.2 with Apache as the base image
FROM php:8.2-apache

# Set working directory
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

# Copy Laravel project files
COPY . .


# Create required Laravel directories and set permissions
RUN mkdir -p /var/www/html/storage \
    && mkdir -p /var/www/html/bootstrap/cache \
    && mkdir -p /var/www/html/database \
    && touch /var/www/html/database/database.sqlite \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database


# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

RUN php artisan config:clear
RUN php artisan config:clear \
    && php artisan cache:clear \
    && php artisan view:clear \
    && php artisan config:cache

# Install phpMyAdmin
# RUN mkdir -p /usr/share/phpmyadmin && \
#     curl -sSL https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.tar.gz | tar -xz --strip-components=1 -C /usr/share/phpmyadmin && \
#     ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin && \
#     chown -R www-data:www-data /usr/share/phpmyadmin

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd mysqli pdo pdo_mysql bcmath zip

# COPY config.inc.php /usr/share/phpmyadmin/config.inc.php
COPY docker/000-default.conf /etc/apache2/sites-enabled/000-default.conf
RUN cat /etc/apache2/sites-enabled/000-default.conf
COPY docker/.env /var/www/html/.env
RUN cat /var/www/html/.env

# Expose ports
# EXPOSE 8000

RUN php artisan key:generate \
    && php artisan migrate --force \
    && php artisan db:seed --force \
    && php artisan storage:link 
 
# Start Apache and MySQL
RUN apache2-foreground

CMD ["php", "artisan", "serve"]