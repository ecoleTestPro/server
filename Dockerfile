# =============================================================================
# Dockerfile pour EcoleTestPro LMS
# Multi-stage build: Node.js (assets) + PHP/Laravel (application)
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Build des assets Node.js
# -----------------------------------------------------------------------------
FROM node:18-alpine AS node-builder

WORKDIR /app

# Copier uniquement les fichiers de dépendances pour optimiser le cache Docker
COPY package.json package-lock.json* yarn.lock* ./

# Installer les dépendances Node
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Copier le reste des fichiers nécessaires au build
COPY vite.config.* tsconfig*.json tailwind.config.* postcss.config.* ./
COPY resources/ ./resources/
COPY public/ ./public/

# Build des assets React/Inertia pour la production
ARG APP_ENV=production
RUN if [ "$APP_ENV" = "production" ]; then \
        npm run build; \
    else \
        mkdir -p /app/public/build; \
    fi

# -----------------------------------------------------------------------------
# Stage 2: Application PHP/Laravel
# -----------------------------------------------------------------------------
FROM php:8.2-fpm-alpine AS app

# Arguments de build
ARG APP_ENV=production
ARG UID=1000
ARG GID=1000

# Labels pour la documentation
LABEL maintainer="EcoleTestPro Team"
LABEL description="Laravel + React LMS Application"
LABEL version="1.0"

# Variables d'environnement
ENV APP_ENV=${APP_ENV} \
    COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_HOME=/tmp/composer

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
    mysql-client \
    bash \
    shadow \
    nodejs \
    npm \
    && rm -rf /var/cache/apk/*

# Installer les extensions PHP nécessaires
RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo \
        pdo_mysql \
        gd \
        zip \
        bcmath \
        opcache \
        pcntl \
    && pecl install redis \
    && docker-php-ext-enable opcache redis \
    && apk del .build-deps

# Installer Composer depuis l'image officielle
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Créer l'utilisateur www-data avec UID/GID configurables
RUN deluser www-data 2>/dev/null || true \
    && delgroup www-data 2>/dev/null || true \
    && addgroup -g ${GID} -S www-data \
    && adduser -u ${UID} -S -G www-data -s /bin/sh www-data

# Définir le répertoire de travail
WORKDIR /var/www/html

# Copier les fichiers de dépendances PHP en premier (optimisation cache)
COPY --chown=www-data:www-data composer.json composer.lock ./

# Installer les dépendances PHP (sans scripts pour accélérer)
RUN composer install \
    --no-dev \
    --no-scripts \
    --no-autoloader \
    --prefer-dist \
    --no-interaction

# Copier le reste des fichiers de l'application
COPY --chown=www-data:www-data . .

# Copier les assets buildés depuis le stage node-builder
COPY --from=node-builder --chown=www-data:www-data /app/public/build ./public/build

# Finaliser l'installation Composer (dump-autoload + scripts)
RUN composer dump-autoload --optimize \
    && if [ "$APP_ENV" = "production" ]; then \
        composer run-script post-autoload-dump --no-interaction || true; \
    fi

# Créer le fichier .env si nécessaire
RUN if [ ! -f .env ]; then \
        cp .env.example .env 2>/dev/null || echo "APP_KEY=" > .env; \
    fi

# Créer les répertoires nécessaires et définir les permissions
RUN mkdir -p \
        storage/logs \
        storage/framework/sessions \
        storage/framework/views \
        storage/framework/cache/data \
        bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Copier les fichiers de configuration
RUN rm -rf /etc/nginx/http.d/*
COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf
COPY docker/php/php.ini /usr/local/etc/php/conf.d/custom.ini
COPY docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copier et configurer le script d'entrée
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Créer les répertoires pour les logs
RUN mkdir -p /var/log/supervisor /var/log/nginx \
    && chown -R www-data:www-data /var/log/supervisor /var/log/nginx

# Exposer les ports
EXPOSE 80 9000

# Définir l'utilisateur par défaut (root pour entrypoint, puis www-data)
# L'entrypoint gère le changement d'utilisateur si nécessaire

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD php-fpm -t || exit 1

# Point d'entrée
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# Commande par défaut
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
