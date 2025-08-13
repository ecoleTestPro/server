# Makefile pour simplifier les commandes Docker

.PHONY: help build up down restart logs shell migrate seed fresh test npm-install npm-dev npm-build composer-install clean

help: ## Afficher cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## Construire les images Docker
	docker-compose build --no-cache

up: ## Démarrer tous les services
	docker-compose up -d
	@echo "✅ Application disponible sur http://localhost:8000"
	@echo "📊 phpMyAdmin disponible sur http://localhost:8080"
	@echo "📧 MailHog disponible sur http://localhost:8025"

down: ## Arrêter tous les services
	docker-compose down

restart: down up ## Redémarrer tous les services

logs: ## Voir les logs de tous les services
	docker-compose logs -f

logs-app: ## Voir les logs de l'application
	docker-compose logs -f app

shell: ## Accéder au shell du conteneur app
	docker-compose exec app sh

shell-mysql: ## Accéder au shell MySQL
	docker-compose exec mysql mysql -u root -psecret ecoletestpro

migrate: ## Exécuter les migrations
	docker-compose exec app php artisan migrate

migrate-fresh: ## Réinitialiser la base de données et exécuter les migrations
	docker-compose exec app php artisan migrate:fresh

seed: ## Exécuter les seeders
	docker-compose exec app php artisan db:seed

fresh: ## Réinitialiser la BDD avec les seeders
	docker-compose exec app php artisan migrate:fresh --seed

test: ## Exécuter les tests
	docker-compose exec app php artisan test

npm-install: ## Installer les dépendances NPM
	docker-compose exec app npm install

npm-dev: ## Lancer le serveur de développement Vite
	docker-compose exec node npm run dev

npm-build: ## Builder les assets pour la production
	docker-compose exec app npm run build

composer-install: ## Installer les dépendances Composer
	docker-compose exec app composer install

composer-update: ## Mettre à jour les dépendances Composer
	docker-compose exec app composer update

cache-clear: ## Vider tous les caches
	docker-compose exec app php artisan cache:clear
	docker-compose exec app php artisan config:clear
	docker-compose exec app php artisan route:clear
	docker-compose exec app php artisan view:clear

optimize: ## Optimiser l'application
	docker-compose exec app php artisan config:cache
	docker-compose exec app php artisan route:cache
	docker-compose exec app php artisan view:cache

storage-link: ## Créer le lien symbolique pour le storage
	docker-compose exec app php artisan storage:link

queue-work: ## Lancer le worker de queue
	docker-compose exec app php artisan queue:work

tinker: ## Lancer Tinker
	docker-compose exec app php artisan tinker

clean: ## Nettoyer les volumes Docker
	docker-compose down -v
	docker system prune -f

install: build up migrate seed storage-link npm-install npm-build ## Installation complète
	@echo "✨ Installation terminée !"
	@echo "🌐 Application : http://localhost:8000"
	@echo "📊 phpMyAdmin : http://localhost:8080"
	@echo "📧 MailHog : http://localhost:8025"

status: ## Vérifier le statut des conteneurs
	docker-compose ps