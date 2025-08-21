# 🐳 Guide Docker pour EcoleTestPro

Ce guide explique comment lancer l'application EcoleTestPro avec Docker.

## 📋 Prérequis

- Docker (version 20.10+)
- Docker Compose (version 2.0+)
- Make (optionnel, pour utiliser le Makefile)

## 🚀 Installation Rapide

### Méthode 1 : Avec Make (Recommandé)

```bash
# Installation complète en une commande
make install
```

Cette commande va :
- Construire les images Docker
- Démarrer tous les services
- Exécuter les migrations
- Installer les dépendances
- Compiler les assets

### Méthode 2 : Avec Docker Compose

```bash
# 1. Copier le fichier d'environnement
cp .env.docker .env

# 2. Construire les images
docker-compose build

# 3. Démarrer les services
docker-compose up -d

# 4. Installer les dépendances Composer
docker-compose exec app composer install

# 5. Générer la clé d'application
docker-compose exec app php artisan key:generate

# 6. Exécuter les migrations
docker-compose exec app php artisan migrate

# 7. Créer le lien symbolique pour le storage
docker-compose exec app php artisan storage:link

# 8. Installer les dépendances NPM et compiler les assets
docker-compose exec app npm install
docker-compose exec app npm run build
```

## 🌐 Accès aux Services

Une fois l'installation terminée, vous pouvez accéder aux services suivants :

| Service | URL | Description |
|---------|-----|-------------|
| **Application** | http://localhost:8000 | Application Laravel/React |
| **phpMyAdmin** | http://localhost:8080 | Interface de gestion MySQL |
| **MailHog** | http://localhost:8025 | Interface pour visualiser les emails |
| **MySQL** | localhost:3306 | Base de données |
| **Redis** | localhost:6379 | Cache et queues |

### Identifiants par défaut

**Base de données MySQL :**
- Host : mysql (depuis l'intérieur de Docker)
- Database : ecoletestpro
- Username : root
- Password : secret

**phpMyAdmin :**
- Username : root
- Password : secret

## 📦 Structure des Services

### Services principaux

1. **app** : Application Laravel avec PHP-FPM
2. **nginx** : Serveur web
3. **mysql** : Base de données MySQL 8.0
4. **redis** : Cache et gestion des queues
5. **node** : Compilation des assets React/Vite

### Services de développement

1. **phpmyadmin** : Interface web pour MySQL
2. **mailhog** : Capture des emails en développement

## 🛠️ Commandes Utiles

### Avec Make

```bash
# Démarrer les services
make up

# Arrêter les services
make down

# Voir les logs
make logs

# Accéder au shell du conteneur
make shell

# Exécuter les migrations
make migrate

# Vider les caches
make cache-clear

# Lancer les tests
make test

# Voir toutes les commandes disponibles
make help
```

### Avec Docker Compose

```bash
# Démarrer les services
docker-compose up -d

# Arrêter les services
docker-compose down

# Voir les logs
docker-compose logs -f

# Accéder au shell
docker-compose exec app sh

# Exécuter une commande Artisan
docker-compose exec app php artisan [commande]

# Exécuter une commande NPM
docker-compose exec app npm [commande]
```

## 🔧 Configuration

### Variables d'environnement

Les variables d'environnement sont définies dans le fichier `.env`. Un fichier `.env.docker` est fourni avec les valeurs par défaut pour Docker.

### Volumes persistants

Les données suivantes sont persistées dans des volumes Docker :
- Base de données MySQL : `mysql_data`
- Cache Redis : `redis_data`

### Ports utilisés

- **8000** : Application web (Nginx)
- **3306** : MySQL
- **6379** : Redis
- **8080** : phpMyAdmin
- **8025** : MailHog (interface web)
- **1025** : MailHog (SMTP)
- **5173** : Vite dev server (en développement)

## 🐛 Dépannage

### L'application ne démarre pas

```bash
# Vérifier les logs
docker-compose logs app

# Reconstruire les images
docker-compose build --no-cache

# Redémarrer les services
docker-compose restart
```

### Erreur de permissions

```bash
# Corriger les permissions
docker-compose exec app chown -R www-data:www-data storage bootstrap/cache
docker-compose exec app chmod -R 775 storage bootstrap/cache
```

### Base de données non accessible

```bash
# Vérifier que MySQL est démarré
docker-compose ps mysql

# Se connecter à MySQL
docker-compose exec mysql mysql -u root -psecret

# Recréer la base de données
docker-compose exec app php artisan migrate:fresh
```

### Problèmes avec NPM/Node

```bash
# Nettoyer et réinstaller
docker-compose exec app rm -rf node_modules
docker-compose exec app npm install
docker-compose exec app npm run build
```

## 🔄 Mise à jour

Pour mettre à jour l'application :

```bash
# 1. Arrêter les services
make down

# 2. Récupérer les dernières modifications
git pull

# 3. Reconstruire les images
make build

# 4. Démarrer les services
make up

# 5. Exécuter les migrations
make migrate

# 6. Recompiler les assets
make npm-build
```

## 🧹 Nettoyage

Pour nettoyer complètement l'installation Docker :

```bash
# Arrêter et supprimer les conteneurs, réseaux et volumes
make clean

# Ou manuellement
docker-compose down -v
docker system prune -af
```

## 📝 Notes

- Le conteneur `app` exécute automatiquement les migrations au démarrage
- Les workers de queue et le scheduler Laravel sont gérés par Supervisor
- Les emails sont capturés par MailHog en développement
- Les assets React sont compilés avec Vite
- Le cache Redis est utilisé pour les sessions et les queues

## 🤝 Support

En cas de problème, vérifiez :
1. Les logs avec `make logs`
2. Le statut des services avec `make status`
3. La documentation Laravel et React

---

*Happy coding! 🚀*




## 🐳 Exécution avec Docker

Pour un environnement plus proche de la production, Docker est recommandé.

### ✅ Avantages

* Isolation complète des services
* Reproductibilité de l’environnement
* Sécurité renforcée (exécution en utilisateur non-root)
* Build automatique du backend et du frontend

---

## 📦 Stack technique

| Service  | Version | Rôle                                     |
| -------- | ------- | ---------------------------------------- |
| PHP      | 8.2 FPM | Environnement principal Laravel          |
| Node.js  | 20      | Compilation et build des assets frontend |
| Composer | 2.7     | Gestionnaire de dépendances PHP          |
| OS Base  | Alpine  | Système léger et sécurisé                |

---

## 🔧 Extensions PHP requises

* `pdo`, `pdo_mysql`, `pdo_sqlite`
* `intl`, `zip`, `bcmath`, `opcache`
* `gd` (avec support `freetype` et `jpeg`)
* `curl`, `mbstring`, `tokenizer`

---

## 🗂️ Variables d’environnement

Renommer et configurer le fichier `.env.example` :

```bash
cp .env.example .env
```

> Avec Docker, vous pouvez décommenter dans `docker-compose.yml` :

```yaml
# env_file: ./.env
```

---

## ▶️ Lancer avec Docker

```bash
docker compose up --build
```

### 📡 Ports exposés

* `9000` : PHP-FPM (à utiliser derrière Nginx ou Apache)

> 💡 Ce setup ne contient pas de serveur web intégré. Ajoutez-en un si nécessaire.

---

## 📁 Répertoires à permission d’écriture

* `storage/`
* `bootstrap/cache/`

---

## 🎨 Build des assets frontend

Le build est géré automatiquement via **Vite** dans le processus Docker.
Aucune exécution manuelle de `npm run build` n’est nécessaire.

---

## 👤 Sécurité

L’application s’exécute avec l’utilisateur **`appuser`** (non-root) pour renforcer la sécurité.

---

## 🧪 Services additionnels (optionnels)

* MySQL / MariaDB
* PostgreSQL
* Redis
* Mailhog (test d’envoi d’e-mails)

Ajoutez-les dans `docker-compose.yml` et mettez à jour `.env` si besoin.

---