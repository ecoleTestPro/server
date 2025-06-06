# syntax=docker/dockerfile:1

# --- Build stage: install PHP dependencies ---
FROM composer:2.7 AS vendor

WORKDIR /app

# Copy only composer files first for better cache usage
COPY --link composer.json composer.lock ./

# Install PHP dependencies (vendor/)
RUN composer install --no-dev --prefer-dist --no-interaction --no-scripts --optimize-autoloader

# --- Build stage: build frontend assets ---
FROM node:20-alpine AS frontend

WORKDIR /app

# Copy only package files first for better cache usage
COPY --link package.json package-lock.json ./

# Install node dependencies and build assets
RUN npm ci

# Copy the rest of the frontend source
COPY --link resources/ ./resources/
COPY --link vite.config.ts ./vite.config.ts
COPY --link tsconfig.json ./tsconfig.json

RUN npm run build

# --- Final stage: production image ---
FROM php:8.2-fpm-alpine AS final

# Install system dependencies and PHP extensions
RUN apk add --no-cache \
    bash \
    icu-dev \
    libzip-dev \
    oniguruma-dev \
    sqlite-libs \
    zlib-dev \
    libpng-dev \
    jpeg-dev \
    freetype-dev \
    git \
    curl \
    && docker-php-ext-install pdo pdo_mysql pdo_sqlite intl zip bcmath opcache \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd

# Install Composer (for artisan, if needed at runtime)
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy application source (excluding files via .dockerignore)
COPY --link . .

# Copy vendor from build stage
COPY --from=vendor /app/vendor ./vendor

# Copy built frontend assets
COPY --from=frontend /app/resources/js/pages ./resources/js/pages
COPY --from=frontend /app/public/build ./public/build

# Ensure storage and bootstrap/cache are writable
RUN mkdir -p storage bootstrap/cache \
    && chown -R appuser:appgroup storage bootstrap/cache \
    && chmod -R ug+rw storage bootstrap/cache

USER appuser

# Expose port 9000 for php-fpm
EXPOSE 9000

# Entrypoint: php-fpm
CMD ["php-fpm"]
