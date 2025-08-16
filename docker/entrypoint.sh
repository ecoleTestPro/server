#!/bin/sh

set -e

echo "🚀 Starting EcoleTestPro Application..."

# Attendre que MySQL soit prêt (limité à 30 secondes)
echo "⏳ Waiting for MySQL to be ready..."
counter=0
until [ $counter -gt 15 ] || mysql -h"${DB_HOST:-mysql}" -u"${DB_USERNAME:-root}" -p"${DB_PASSWORD:-secret}" --skip-ssl -e "SELECT 1" > /dev/null 2>&1; do
  echo "MySQL is unavailable - sleeping (attempt $counter/15)"
  sleep 2
  counter=$((counter+1))
done

if [ $counter -gt 15 ]; then
  echo "⚠️ MySQL connection timeout - continuing anyway..."
else
  echo "✅ MySQL is ready!"
fi

# Générer la clé d'application si elle n'existe pas
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
fi

# Générer une clé d'application si nécessaire
if ! grep -q "^APP_KEY=base64:" .env; then
    echo "🔑 Generating application key..."
    php artisan key:generate --force
fi

# Optimiser l'application
echo "🔧 Optimizing application..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Exécuter les migrations
echo "📊 Running database migrations..."
php artisan migrate --force

# Seed la base de données (optionnel, commentez si non nécessaire)
# echo "🌱 Seeding database..."
# php artisan db:seed --force

# Créer le lien symbolique pour le storage
echo "🔗 Creating storage link..."
php artisan storage:link || true

# Installer et compiler les assets si nécessaire
if [ "$APP_ENV" = "local" ] || [ "$APP_ENV" = "development" ]; then
    echo "📦 Installing Node dependencies..."
    npm install
    
    echo "🏗️ Building assets..."
    npm run build
fi

# Nettoyer les caches
echo "🧹 Clearing caches..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Recréer les caches optimisés
echo "🚀 Creating optimized caches..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Définir les permissions correctes
echo "🔒 Setting permissions..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

echo "✨ Application is ready!"

# Exécuter la commande passée en paramètre
exec "$@"