# 🎓 TestPro LMS (Learning Management System)

> Application LMS personnalisée développée pour **TestPro**, basée sur Laravel avec interface utilisateur moderne.

## 📌 À propos

Ce projet est une application web LMS (système de gestion d'apprentissage) entièrement personnalisée pour répondre aux besoins spécifiques de **TestPro**. Elle permet la gestion de formations, utilisateurs, certifications, la mise en avant des services proposées par la société TestPro.

---

## 🧰 Prérequis techniques

Avant de commencer, assurez-vous que votre environnement dispose des outils suivants :

- [Docker](https://www.docker.com/) & Docker Compose (`v2.x`)
- Git
- Bash ou terminal Unix-like (ou WSL sous Windows)

---

## 🛠️ Configuration locale (sans Docker)

### 1. Installer les dépendances

```bash
composer install
npm install
```

### 2. Générer le fichier `.env`

```bash
cp .env.example .env
php artisan key:generate
```

### 3. Démarrer le serveur local

```bash
php artisan serve
```

Accédez à l'application via :  
👉 [http://localhost:8000](http://localhost:8000)

> ⚠️ Cette méthode est recommandée pour le développement local uniquement.

---

## 🐳 Exécution du projet avec Docker

Pour une configuration plus proche de la production, nous utilisons Docker avec une architecture multi-stage.

### ✅ Avantages :
- Isolation des environnements
- Reproductibilité
- Sécurité renforcée (exécution en non-root)
- Intégration automatique des builds frontend et backend

---

## 📦 Stack technique

| Service       | Version     | Description                            |
|---------------|-------------|----------------------------------------|
| PHP           | 8.2 FPM     | Environnement principal                |
| Node.js       | 20          | Build des assets frontend              |
| Composer      | v2.7        | Gestion des dépendances PHP            |
| Base OS       | Alpine      | Légèreté et sécurité                   |

---

## 🔧 Extensions PHP nécessaires

- `pdo`, `pdo_mysql`, `pdo_sqlite`
- `intl`, `zip`, `bcmath`, `opcache`
- `gd` (avec support `freetype`, `jpeg`)
- `curl`, `mbstring`, `tokenizer`

---

## 🗂️ Variables d'environnement

Renommez et configurez le fichier `.env.example` :

```bash
cp .env.example .env
```

> Si vous utilisez Docker Compose, décommentez cette ligne dans `docker-compose.yml` :
```yaml
# env_file: ./.env
```

---

## ▶️ Lancer l’application avec Docker

```bash
docker compose up --build
```

### 📡 Ports exposés
- `9000`: PHP-FPM (à utiliser avec Nginx ou Apache en frontal)

> 💡 Note : Ce setup ne contient pas de serveur web (Nginx/Apache). Vous pouvez l’ajouter dans le `docker-compose.yml`.

---

## 📁 Répertoires critiques

Les répertoires suivants sont configurés comme accessibles en écriture :

- `storage/`
- `bootstrap/cache/`

---

## 🎨 Assets Frontend

Le build frontend est automatisé pendant le processus Docker grâce à Vite et Node.js. Aucune action manuelle n’est nécessaire.

> ✅ Pas besoin de faire `npm run build` manuellement.

---

## 👤 Utilisateur système

L'application s'exécute en tant qu'utilisateur non root (`appuser`) pour des raisons de sécurité.

---

## 🧪 Services additionnels (optionnels)

Si vous avez besoin de services supplémentaires comme une base de données ou un cache Redis, ajoutez-les à `docker-compose.yml` et configurez `.env` en conséquence.

Exemples :
- MySQL / MariaDB
- PostgreSQL
- Redis
- Mailhog (pour tester les mails en dev)

---
## 🚀 Mise en ligne sur un serveur

Ces étapes expliquent comment déployer l'application sur un serveur distant.

1. **Préparer le serveur**
   - Installer Docker et Docker Compose.
   - Cloner ce dépôt sur le serveur :

   ```bash
   git clone <votre_repo> lms && cd lms
   ```

2. **Configurer l'environnement**
   Copiez le fichier `.env.example` puis générez la clé de l'application :

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Lancer les services**
   Construisez et démarrez les conteneurs en arrière-plan :

   ```bash
   docker compose up -d --build
   ```

4. **Exposer l'application**
   Placez un serveur web (Nginx ou Apache) en tant que proxy inverse devant le conteneur PHP-FPM. Le fichier `000-default.conf` fournit un exemple de configuration Apache.

5. **Automatiser le démarrage**
   Configurez `systemd` ou un autre service de supervision pour relancer automatiquement les conteneurs après un redémarrage du serveur.

Une fois ces étapes terminées, l'application sera accessible en ligne via l'URL de votre serveur.

---

## 📚 Documentation additionnelle

Pour plus d’informations :
- [Documentation Laravel officielle](https://laravel.com/docs)
- [Vite documentation](https://vitejs.dev/guide/)

---

## 🤝 Contribution

Toute contribution à ce projet est la bienvenue ! Merci de respecter les bonnes pratiques Laravel et de suivre les conventions du projet.

---

## 📄 Licence

MIT License – voir le fichier [LICENSE](LICENSE) pour plus d'informations.

