# 🎓 TestPro LMS (Learning Management System)

> **Application LMS personnalisée** développée pour **TestPro**, basée sur Laravel, avec une interface utilisateur moderne et responsive.

---

## 📌 À propos

**TestPro LMS** est une application web de gestion de l’apprentissage (**Learning Management System**) conçue sur mesure pour répondre aux besoins spécifiques de **TestPro**.
Elle permet notamment de gérer :

* Les formations et certifications
* Les utilisateurs et leurs accès
* La mise en avant des services proposés par la société **TestPro**

---

## 🧰 Prérequis techniques

Avant de commencer, assurez-vous que votre environnement dispose des outils suivants :

* Git
* Bash ou terminal Unix-like (ou WSL sous Windows)
* [Docker](https://www.docker.com/) & Docker Compose (`v2.x`) **ou** XAMPP / WAMP
* PHP >= 8.2
* Node.js >= 20
* Composer >= 2.7

---

## 🛠️ Installation locale (sans Docker)

### 1️⃣ Installer les dépendances

```bash
composer install
npm install
```

### 2️⃣ Générer et configurer le fichier `.env`

```bash
cp .env.example .env
php artisan key:generate
php artisan storage:link
```

### 3️⃣ Lancer le serveur local

```bash
php artisan serve
```

Accès à l’application : [http://localhost:8000](http://localhost:8000)

> ⚠️ Cette méthode est **réservée au développement local**.

---

## 🛠️ Déploiement manuel (sans Docker)

1. Placer le fichier `.htaccess` à la racine de `public_html` ou `www`
   ```bash
   <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteRule ^(.*)$ public/$1 [L]
   </IfModule>
   ```
2. Configurer la base de données dans `.env`
3. Lancer :

   ```bash
   php artisan storage:link
   php artisan migrate --seed
   ```

> ⚠️ Pour un environnement de production, privilégiez Docker ou un serveur correctement configuré.

---

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

## 🚀 Déploiement sur serveur distant

1. **Préparer le serveur**

   * Installer Docker & Docker Compose
   * Cloner le dépôt

     ```bash
     git clone <votre_repo> lms && cd lms
     ```

2. **Configurer l’environnement**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Lancer l’application**

   ```bash
   docker compose up -d --build
   ```

4. **Mettre en place le proxy inverse** (Nginx ou Apache) vers le conteneur PHP-FPM.

5. **Automatiser le redémarrage** avec `systemd` ou autre service de supervision.

---

## 📚 Ressources

* [Laravel Documentation](https://laravel.com/docs)
* [Vite Documentation](https://vitejs.dev/guide/)

---

## 🤝 Contribution

Les contributions sont les bienvenues !
Merci de suivre :

* Les bonnes pratiques Laravel
* Les conventions internes du projet

---

## 📄 Licence

Sous licence **MIT** – voir [LICENSE](LICENSE) pour plus d’informations.

---

Si tu veux, je peux aussi te préparer une **version avec table des matières automatique** pour naviguer rapidement dans le fichier sur GitHub.
Veux-tu que je te fasse cette version ?
