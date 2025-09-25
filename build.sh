#!/bin/bash

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les logs avec des couleurs
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Début du script
log "Début du processus de build..."

# Format Frontend
log "Formatage du code frontend..."
if npm run format; then
    success "Code formaté avec succès"
else
    error "Le formatage a échoué"
    exit 1
fi

# Lint Frontend
log "Vérification du linting frontend..."
if npm run lint; then
    success "Linting terminé avec succès"
else
    warning "Le linting a détecté des erreurs, mais le build continue..."
fi

# Tests
# log "Exécution des tests..."
# if ./vendor/bin/pest; then
#     success "Tests passés avec succès"
# else
#     error "Les tests ont échoué"
#     exit 1
# fi

# Compilation de l'application
log "Compilation de l'application avec npm run build..."
if npm run build; then
    success "Build terminé avec succès"
    
    # Vérification de l'existence du fichier manifest.json
    if [ -f "public/build/manifest.json" ]; then
        log "Copie du fichier manifest.json vers public/mix-manifest.json..."
        
        # Copie du fichier manifest.json
        if cp public/build/manifest.json public/mix-manifest.json; then
            success "Fichier manifest.json copié avec succès vers public/mix-manifest.json"
            success "Processus terminé avec succès"
            exit 0
        else
            error "Erreur lors de la copie du fichier manifest.json"
            exit 1
        fi
    else
        error "Le fichier public/build/manifest.json n'existe pas"
        exit 1
    fi
else
    error "Le build a échoué"
    exit 1
fi