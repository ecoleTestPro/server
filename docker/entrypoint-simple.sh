#!/bin/sh

set -e

echo "🚀 Starting EcoleTestPro Application (simplified)..."

# Créer .env si nécessaire
if [ ! -f ".env" ]; then
    cp .env.example .env 2>/dev/null || cp .env .env 2>/dev/null || true
fi

# Nettoyer et optimiser
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Définir les permissions
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache 2>/dev/null || true
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache 2>/dev/null || true

echo "✨ Application is ready!"

# Exécuter la commande passée en paramètre
exec "$@"