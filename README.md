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
