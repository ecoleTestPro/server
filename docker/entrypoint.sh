#!/bin/sh
# Entrypoint pour EcoleTestPro LMS

echo "========================================"
echo "  EcoleTestPro LMS - Starting..."
echo "  Environment: ${APP_ENV:-local}"
echo "========================================"

# Attendre MySQL (max 60s)
echo "Waiting for MySQL..."
timeout=60
while [ $timeout -gt 0 ]; do
    if php -r "new PDO('mysql:host=${DB_HOST:-mysql};port=3306', '${DB_USERNAME:-root}', '${DB_PASSWORD:-secret}');" 2>/dev/null; then
        echo "MySQL is ready!"
        break
    fi
    echo -n "."
    sleep 2
    timeout=$((timeout - 2))
done

if [ $timeout -le 0 ]; then
    echo ""
    echo "Warning: MySQL timeout - continuing anyway..."
fi

# Setup .env si nécessaire
if [ ! -f ".env" ] && [ -f ".env.example" ]; then
    echo "Creating .env..."
    cp .env.example .env
fi

# Générer la clé si nécessaire
if ! grep -q "^APP_KEY=base64:" .env 2>/dev/null; then
    echo "Generating app key..."
    php artisan key:generate --force || true
fi

# Storage link
php artisan storage:link 2>/dev/null || true

# Migrations (sauf si SKIP_MIGRATIONS=true)
if [ "${SKIP_MIGRATIONS}" != "true" ]; then
    echo "Running migrations..."
    php artisan migrate --force || echo "Migrations failed"
fi

# Cache selon environnement
if [ "${APP_ENV}" = "production" ]; then
    echo "Optimizing for production..."
    php artisan optimize || true
else
    echo "Clearing caches for dev..."
    php artisan optimize:clear || true
fi

# Permissions
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache 2>/dev/null || true

echo ""
echo "Application ready! Starting services..."
echo ""

# Lancer la commande (supervisord)
exec "$@"
