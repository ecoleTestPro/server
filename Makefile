# Makefile pour EcoleTestPro LMS

.DEFAULT_GOAL := help

# Variables
COMPOSE := docker compose -f docker-compose.yml
COMPOSE_DEV := $(COMPOSE) --profile dev
EXEC := $(COMPOSE) exec
EXEC_APP := $(EXEC) app

# Couleurs
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[1;33m
NC := \033[0m

.PHONY: dev prod stop build clean status logs logs-app logs-mysql logs-redis shell \
        up-app up-mysql up-redis up-phpmyadmin up-mailhog \
        migrate fresh seed test tinker cache-clear optimize \
        composer-install npm-install npm-build npm-dev install help

# =============================================================================
##@ Docker
# =============================================================================

dev: ## Démarrer en mode développement
	@echo "$(BLUE)Starting dev...$(NC)"
	$(COMPOSE_DEV) up -d
	@echo "$(GREEN)Ready!$(NC)"
	@echo "   App:        http://localhost"
	@echo "   phpMyAdmin: http://localhost:8099"
	@echo "   MailHog:    http://localhost:8025"

prod: ## Démarrer en mode production
	@echo "$(BLUE)Starting prod...$(NC)"
	$(COMPOSE) up -d app mysql redis
	@echo "$(GREEN)Production ready!$(NC)"

stop: ## Arrêter tous les conteneurs
	$(COMPOSE_DEV) down
	@echo "$(GREEN)Stopped$(NC)"

build: ## Construire les images
	$(COMPOSE) build --no-cache

clean: ## Nettoyer volumes et conteneurs
	$(COMPOSE_DEV) down -v --remove-orphans
	docker system prune -f
	@echo "$(GREEN)Cleaned$(NC)"

status: ## Statut des conteneurs
	$(COMPOSE) ps -a

logs: ## Logs de tous les services
	$(COMPOSE) logs -f

logs-app: ## Logs app
	$(COMPOSE) logs -f app

logs-mysql: ## Logs mysql
	$(COMPOSE) logs -f mysql

logs-redis: ## Logs redis
	$(COMPOSE) logs -f redis

shell: ## Shell dans le conteneur app
	$(EXEC_APP) sh

# =============================================================================
##@ Services individuels
# =============================================================================

up-app: ## Démarrer app
	$(COMPOSE) up -d app

up-mysql: ## Démarrer MySQL
	$(COMPOSE) up -d mysql

up-redis: ## Démarrer Redis
	$(COMPOSE) up -d redis

up-phpmyadmin: ## Démarrer phpMyAdmin
	$(COMPOSE_DEV) up -d phpmyadmin

up-mailhog: ## Démarrer MailHog
	$(COMPOSE_DEV) up -d mailhog

# =============================================================================
##@ Laravel
# =============================================================================

migrate: ## Migrations
	$(EXEC_APP) php artisan migrate

fresh: ## Reset BDD + migrations + seeders
	$(EXEC_APP) php artisan migrate:fresh --seed

seed: ## Seeders
	$(EXEC_APP) php artisan db:seed

test: ## Tests
	$(EXEC_APP) php artisan test

tinker: ## Tinker
	$(EXEC_APP) php artisan tinker

cache-clear: ## Vider les caches
	$(EXEC_APP) php artisan optimize:clear

optimize: ## Optimiser l'application
	$(EXEC_APP) php artisan optimize

# =============================================================================
##@ Dépendances
# =============================================================================

composer-install: ## Installer dépendances PHP
	$(EXEC_APP) composer install

npm-install: ## Installer dépendances Node
	$(EXEC_APP) npm install --legacy-peer-deps

npm-build: ## Build assets production
	$(EXEC_APP) npm run build

npm-dev: ## Lancer Vite dev server
	$(EXEC_APP) npm run dev

# =============================================================================
##@ Installation
# =============================================================================

install: build dev ## Installation complète
	@echo "$(YELLOW)Waiting for services...$(NC)"
	@sleep 15
	$(MAKE) composer-install
	$(MAKE) npm-install
	$(MAKE) migrate
	$(MAKE) seed
	$(EXEC_APP) php artisan storage:link
	$(MAKE) npm-build
	@echo "$(GREEN)Installation complete!$(NC)"

# =============================================================================
##@ Aide
# =============================================================================

help: ## Afficher cette aide
	@awk 'BEGIN {FS = ":.*##"; printf "\n$(BLUE)Usage:$(NC) make $(GREEN)<target>$(NC)\n"} \
		/^[a-zA-Z_-]+:.*?##/ { printf "  $(GREEN)%-16s$(NC) %s\n", $$1, $$2 } \
		/^##@/ { printf "\n$(YELLOW)%s$(NC)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
