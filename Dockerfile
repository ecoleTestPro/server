# syntax=docker/dockerfile:1

# ----- Build Stage -----
FROM php:8.2-fpm-alpine AS build

# Install system dependencies and PHP extensions
RUN apk add --no-cache git curl bash icu-dev oniguruma-dev zip libpng-dev libjpeg-turbo-dev freetype-dev nodejs npm \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql pdo_sqlite intl zip bcmath gd opcache

WORKDIR /app

# Copy application source
COPY . .

# Install PHP and Node dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction \
    && npm install \
    && npm run build

# ----- Final Stage -----
FROM php:8.2-fpm-alpine AS final

# Install only runtime dependencies and PHP extensions
RUN apk add --no-cache bash icu oniguruma libpng libjpeg-turbo freetype \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql pdo_sqlite intl zip bcmath gd opcache

WORKDIR /app

# Copy built application from the build stage
COPY --from=build /app /app

# Ensure correct permissions for writable directories
RUN chown -R www-data:www-data storage bootstrap/cache

USER www-data

EXPOSE 9000
CMD ["php-fpm"]
