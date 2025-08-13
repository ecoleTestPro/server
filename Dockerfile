# Build stage pour Node.js
FROM node:18-alpine AS node-builder

WORKDIR /app

# Copier les fichiers de dépendances Node
COPY package*.json ./
COPY yarn.lock* ./

# Installer les dépendances Node
RUN npm install || yarn install

# Copier le reste des fichiers de l'application
COPY . .

# Build des assets React/Inertia
RUN npm run build || yarn build

# Stage principal pour PHP/Laravel
FROM php:8.2-fpm-alpine

# Installer les dépendances système
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    zip \
    unzip \
    supervisor \
    nginx \
    nodejs \
    npm \
    mysql-client \
    bash

# Installer les extensions PHP nécessaires
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    pdo \
    pdo_mysql \
    gd \
    zip \
    bcmath \
    opcache \
    pcntl

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Créer l'utilisateur pour l'application
RUN adduser -D -g '' appuser

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier les fichiers de l'application
COPY --chown=appuser:appuser . .

# Copier les assets buildés depuis le stage node-builder
COPY --from=node-builder --chown=appuser:appuser /app/public/build ./public/build
COPY --from=node-builder --chown=appuser:appuser /app/public/hot ./public/hot 2>/dev/null || true

# Installer les dépendances PHP
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Créer les répertoires nécessaires et définir les permissions
RUN mkdir -p /var/www/html/storage/logs \
    && mkdir -p /var/www/html/storage/framework/sessions \
    && mkdir -p /var/www/html/storage/framework/views \
    && mkdir -p /var/www/html/storage/framework/cache \
    && mkdir -p /var/www/html/bootstrap/cache \
    && chown -R appuser:appuser /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Copier la configuration Nginx
COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf

# Copier la configuration PHP
COPY docker/php/php.ini /usr/local/etc/php/conf.d/custom.ini

# Copier la configuration Supervisor
COPY docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copier le script d'entrée
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Exposer les ports
EXPOSE 80 9000

# Définir l'utilisateur
USER appuser

# Point d'entrée
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# Commande par défaut
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]