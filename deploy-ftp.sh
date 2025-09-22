#!/bin/bash

# Configuration - À remplacer par vos valeurs ou variables d'environnement
FTP_SERVER="your-server.com"
FTP_USERNAME="your-username"
FTP_PASSWORD="your-password"
FTP_PATH="/public_html" # ou /www selon votre hébergeur

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérification des prérequis
command -v lftp >/dev/null 2>&1 || {
    error "lftp n'est pas installé. Installez-le avec: sudo apt-get install lftp"
    exit 1
}

# Build du projet
log "🏗️ Build du projet..."
npm run build || { error "Build npm échoué"; exit 1; }
success "Build frontend terminé"

# Copie du manifest
log "📝 Copie du manifest.json..."
cp public/build/manifest.json public/mix-manifest.json || { error "Copie manifest échoué"; exit 1; }

# Installation des dépendances PHP pour production
log "📦 Installation des dépendances Composer..."
composer install --no-dev --optimize-autoloader || { error "Installation Composer échouée"; exit 1; }

# Optimisation Laravel
log "⚡ Optimisation Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Création du fichier .env.production si nécessaire
if [ ! -f ".env.production" ]; then
    log "📋 Création du fichier .env.production..."
    cp .env.example .env.production
    echo "⚠️  N'oubliez pas de configurer .env.production avec vos paramètres de production!"
fi

# Déploiement FTP
log "🚀 Déploiement vers le serveur FTP..."

lftp -e "
set ssl:verify-certificate false
set ftp:list-options -a
set cmd:fail-exit true
set net:timeout 30
set net:max-retries 3
set net:reconnect-interval-base 5

open ftp://$FTP_USERNAME:$FTP_PASSWORD@$FTP_SERVER

# Upload des fichiers avec exclusions
mirror --reverse \
    --delete \
    --verbose \
    --parallel=5 \
    --exclude-glob=.git/ \
    --exclude-glob=node_modules/ \
    --exclude-glob=tests/ \
    --exclude-glob=storage/app/public/ \
    --exclude-glob=storage/logs/ \
    --exclude-glob=storage/framework/cache/data/ \
    --exclude-glob=storage/framework/sessions/ \
    --exclude-glob=storage/framework/views/ \
    --exclude=.env \
    --exclude=.env.local \
    --exclude=.env.testing \
    --exclude=docker-compose.yml \
    --exclude=Dockerfile \
    --exclude=.dockerignore \
    --exclude=*.md \
    --exclude=.vscode/ \
    --exclude=.idea/ \
    --exclude=.claude/ \
    --exclude=build.sh \
    --exclude=deploy-ftp.sh \
    --exclude=start.sh \
    --exclude=Makefile \
    --exclude=composer.lock \
    --exclude=package-lock.json \
    --exclude=vite.config.ts \
    --exclude=tsconfig.json \
    --exclude=eslint.config.js \
    --exclude=.prettierrc \
    --exclude=.prettierignore \
    ./ $FTP_PATH

# Upload du fichier .env.production vers .env
put .env.production -o $FTP_PATH/.env

quit
" || { error "Déploiement FTP échoué"; exit 1; }

success "✅ Déploiement terminé avec succès!"

# Instructions post-déploiement
echo ""
echo "📌 Actions manuelles requises sur le serveur :"
echo "  1. Vérifier les permissions des dossiers storage et bootstrap/cache (755 ou 775)"
echo "  2. Créer le lien symbolique storage si nécessaire"
echo "  3. Vider le cache si des erreurs apparaissent"
echo "  4. Vérifier la configuration du .env"
echo "  5. Exécuter les migrations si nécessaire"