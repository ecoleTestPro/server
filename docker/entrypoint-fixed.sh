#!/bin/sh

set -e

echo "🚀 Starting EcoleTestPro Application..."

# Créer les dossiers nécessaires (supervisord utilise /dev/stdout)
mkdir -p /tmp

# Créer .env si nécessaire
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
    else
        echo "APP_KEY=" > .env
    fi
fi

# Nettoyer les caches
php artisan config:clear || true
php artisan route:clear || true  
php artisan view:clear || true

# Créer les répertoires de storage Laravel
mkdir -p storage/logs storage/framework/sessions storage/framework/views storage/framework/cache bootstrap/cache

# Définir les permissions
chown -R www-data:www-data storage bootstrap/cache || true
chmod -R 775 storage bootstrap/cache || true

echo "✨ Application is ready!"

# Exécuter la commande passée en paramètre
exec "$@"