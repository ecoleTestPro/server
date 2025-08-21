# 🚀 Déploiement manuel (hébergement mutualisé, sans Docker)

## 1. Configuration du `.htaccess`

Placer ce fichier dans `public_html/public` ou `www/public` :

```apache
<IfModule mod_rewrite.c>
   <IfModule mod_negotiation.c>
      Options -MultiViews -Indexes
   </IfModule>

   RewriteEngine On

   # Handle Authorization Header
   RewriteCond %{HTTP:Authorization} .
   RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

   # Redirect Trailing Slashes If Not A Folder...
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteCond %{REQUEST_URI} (.+)/$
   RewriteRule ^ %1 [L,R=301]

   # Send Requests To Front Controller...
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ index.php [L]
</IfModule>
```

➡️ Supprimer le fichier `.htaccess` qui se trouve à la racine de `www/` ou `public_www/`.
➡️ **Recommandé** : faire pointer directement le domaine vers le dossier `public` (exemple : `testpro-group.com -> www/public`).

---

## 2. Configuration de l’environnement

Modifier le fichier `.env` :

* Connexion à la base de données
* Variables spécifiques au domaine (`APP_URL=https://ton-domaine.com`, etc.)

---

## 3. Commandes artisan (si SSH disponible)

```bash
php artisan storage:link
php artisan migrate --seed
```

⚠️ Si SSH n’est **pas disponible**, utiliser un script PHP temporaire pour `storage:link` ou configurer une règle `.htaccess` (voir doc spécifique).

---

## 4. Vidage manuel du cache (sans artisan)

En cas d’erreurs après déploiement, supprimer manuellement ces fichiers/dossiers via FTP :

* `bootstrap/cache/*.php`
  (supprimer tous les fichiers sauf `.gitignore`)
* `storage/framework/cache/*`
* `storage/framework/views/*`
* `storage/framework/sessions/*`

Cela équivaut à :

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

---

## 5. Fichiers spécifiques à ajuster

### 🔑 ReCaptcha (`resources/js/data/data.constant.ts`)

```ts
// Pour localhost
// export const RECAPTCHA_SITE_KEY_PUBLIC: string = "clé-local-public";
// export const RECAPTCHA_SITE_KEY_PRIVATE: string = "clé-local-privée";

// Pour production (ex: testpro-group.com)
export const RECAPTCHA_SITE_KEY_PUBLIC: string = "clé-prod-public";
export const RECAPTCHA_SITE_KEY_PRIVATE: string = "clé-prod-privée"; 
```

---

### 🎨 CSS personnalisé (`resources/views/app.blade.php`)

Si erreur *"custom css not found"*, remplacer :

```blade
{{-- custom css --}}
<link rel="stylesheet" href="{{ mix('css/custom.css') }}">
```

par :

```blade
{{-- On prod --}}
<link rel="stylesheet" href="{{ asset('css/custom.css') }}">
```

---

👉 Veux-tu que je t’ajoute aussi une **checklist finale** (genre ✅ connexion DB, ✅ storage accessible, ✅ cache vidé, etc.) pour ton déploiement afin de ne rien oublier ?
