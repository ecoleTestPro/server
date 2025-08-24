# Documentation Backoffice - Module Formations

## Vue d'ensemble

Le module de formations du backoffice EcoleTestPro permet de gérer l'ensemble du cycle de vie des formations : création, modification, gestion des catégories, sessions, et références partenaires. Cette documentation détaille chaque fonctionnalité et comment les utiliser.

## Table des matières

1. [Page principale des formations](#page-principale-des-formations)
2. [Création et édition de formations](#création-et-édition-de-formations)
3. [Gestion des catégories](#gestion-des-catégories)
4. [Gestion des sessions](#gestion-des-sessions)
5. [Références partenaires](#références-partenaires)
6. [Structure des données](#structure-des-données)

---

## Page principale des formations

### Accès
**Route :** `/dashboard/courses`  
**Fichier :** `resources/js/pages/dashboard/courses/index.tsx`

### Fonctionnalités principales

#### 1. **Barre d'outils (CourseToolBarTwo)**
- **Recherche** : Filtrage en temps réel des formations par titre
- **Modes d'affichage** :
  - 🔲 **Mode carte** : Affichage en grille avec aperçu visuel
  - 📄 **Mode liste** : Affichage tabulaire détaillé
- **Bouton "Créer"** : Accès direct à la création d'une nouvelle formation
- **Actualiser** : Recharge des données depuis le serveur

#### 2. **Filtres disponibles**
- **Tous** : Affiche toutes les formations
- **Publiées** : Formations visibles sur le site public
- **En vedette** : Formations mises en avant
- **Non publiées** : Brouillons et formations en préparation

#### 3. **Actions sur les formations**
- ✏️ **Modifier** : Édition complète de la formation
- 👁️ **Voir** : Aperçu de la formation
- 🗑️ **Supprimer** : Suppression (avec confirmation)
- 📅 **Gérer les sessions** : Planification des sessions de formation

---

## Création et édition de formations

### Pages d'accès
- **Création :** `/dashboard/courses/create`
- **Édition :** `/dashboard/courses/{id}/edit`
- **Fichier principal :** `resources/js/components/courses/form/edit-course.form.tsx`

### Structure du formulaire

Le formulaire est organisé en sections accordéon pour une meilleure UX :

#### 1. **Informations de base** (CourseBasicInfoForm)
- **Titre*** : Nom de la formation (requis)
- **Extrait** : Description courte pour les listes
- **Catégorie*** : Sélection parmi les catégories existantes
- **Auteur*** : Nom du formateur/créateur
- **Durée*** : Durée totale de la formation
- **Nombre de cours** : Nombre de modules/sessions

#### 2. **Informations tarifaires**
- **Prix*** : Prix affiché au public
- **Prix régulier** : Prix barré (promotion)
- **Format d'affichage** : Formatage automatique en français (ex: 1 500 €)

#### 3. **Récurrence et modalités** (CourseAdditionnalForm)
- **Périodicité** :
  - Unité : Jour, Semaine, Mois, Année
  - Valeur : Nombre d'unités
- **Mode de localisation*** :
  - "En présentiel ou à distance" (par défaut)
  - Options personnalisables

#### 4. **Médias**
- **Image principale** : Vignette de la formation
- **Logo** : Logo associé à la formation
- **Logo organisation** : Logo du partenaire/organisme
- **Vidéo** : Fichier vidéo de présentation
- **Galerie** : Multiple images pour illustrer la formation

#### 5. **Contenus détaillés** (Éditeurs riches)
Chaque section utilise CKEditor pour un formatage avancé :

- **Contenu** : Description détaillée du programme
- **Public cible** : À qui s'adresse la formation
- **Objectifs pédagogiques** : Compétences acquises
- **Points forts** : Avantages spécifiques
- **Évaluation** : Méthodes d'évaluation
- **Prérequis** : Connaissances nécessaires
- **Pourquoi choisir ce cours ?** : Arguments de vente
- **Examen** : Modalités d'examen

### Validation du formulaire

Le système effectue une validation avant soumission :
- ✅ Champs obligatoires vérifiés
- ✅ Format des prix validé
- ✅ Cohérence des données
- ❌ Messages d'erreur contextuels

### Sauvegarde
- **Création** : `POST /dashboard/courses/store`
- **Modification** : `POST /dashboard/courses/update`
- **État** : Brouillon ou Publié
- **Retour** : Redirection vers la liste avec message de confirmation

---

## Gestion des catégories

### Accès
**Route :** `/dashboard/categories`  
**Fichier :** `resources/js/pages/dashboard/categories/index.tsx`

### Vue hiérarchique

Le système gère une **structure arborescente** des catégories :

#### Affichage
- 📁 **Catégories parentes** : Avec icône dossier
- 📄 **Sous-catégories** : Indentées avec icône tag
- ➡️ **Expansion/Réduction** : Boutons pour naviguer dans l'arbre
- 📊 **Statistiques** : Comptage des catégories et sous-catégories

#### Actions disponibles
- ✏️ **Modifier** : Édition du titre et de l'image
- ➕ **Ajouter sous-catégorie** : Création d'une catégorie enfant
- 🗑️ **Supprimer** : Suppression avec gestion des dépendances

### Formulaire de catégorie

#### Champs disponibles
- **Titre*** : Nom de la catégorie (max 50 caractères)
- **Image** : Vignette optionnelle (JPEG, PNG, JPG, max 2MB)
- **Catégorie parente** : Seulement en mode sous-catégorie
- **Mise en avant** : Checkbox pour les catégories vedettes
- **Couleur** : Code couleur hexadécimal (7 caractères)

#### Modes de fonctionnement

1. **Mode création normale**
   - Tous les champs disponibles
   - Catégorie parente masquée
   - Création d'une catégorie racine

2. **Mode sous-catégorie**
   - Catégorie parente pré-sélectionnée et affichée
   - Impossible de modifier le parent
   - Interface adaptée avec indication visuelle

### Gestion des conflits
- ✅ **Déduplication automatique** : Évite les doublons d'ID
- ✅ **Validation hiérarchique** : Prévient les boucles infinies
- ✅ **Nettoyage des données** : Structure cohérente garantie

---

## Gestion des sessions

### Accès
**Composant :** `CourseSessionCreateDrawer`  
**Activation :** Depuis la liste des formations → Bouton "Sessions"

### Fonctionnalités

#### 1. **Vue d'ensemble**
- 📅 **Sessions existantes** : Liste des sessions programmées
- 🔍 **Recherche par date** : Filtrage rapide
- ✏️ **Modification** : Édition des sessions existantes

#### 2. **Création de sessions**
- ➕ **Ajout multiple** : Plusieurs sessions en une fois
- 📅 **Dates de début/fin** : Sélecteurs de dates
- 📍 **Localisation** : Lieu de formation
- 💾 **Sauvegarde groupée** : Validation de toutes les sessions

#### 3. **Gestion avancée**
- 📋 **Duplication** : Copie des sessions similaires
- 🗑️ **Suppression** : Retrait de sessions
- ✏️ **Modification en lot** : Changements multiples

### Cas d'usage typiques

1. **Formation récurrente**
   - Créer plusieurs sessions avec dates différentes
   - Même lieu, même programme
   - Planning régulier (hebdomadaire, mensuel)

2. **Formation multi-sites**
   - Sessions identiques dans différents lieux
   - Adaptation aux contraintes géographiques
   - Gestion centralisée

---

## Références partenaires

### Accès
**Composant :** `CourseReferenceDrawer`  
**Activation :** Depuis l'édition d'une formation → "Gérer les références"

### Fonctionnement

#### 1. **Génération automatique de tags**
- **Format** : `ref-{slug-formation}`
- **Exemple** : Formation "Formation Excel" → Tag `ref-formation-excel`
- **Avantage** : Cohérence et unicité garanties

#### 2. **Sélection des partenaires**
- 🏢 **Liste complète** : Tous les partenaires disponibles
- 🔍 **Recherche** : Filtrage par nom ou tag
- ☑️ **Sélection multiple** : Cases à cocher
- 🏷️ **Affichage par tags** : Regroupement par catégories

#### 3. **Sauvegarde et synchronisation**
- ⚡ **Mise à jour temps réel** : Pas de rechargement de page
- ✅ **Validation** : Vérification des associations
- 🔄 **Synchronisation** : Cohérence avec les autres modules

### Processus type

1. **Ouverture du drawer** → Chargement automatique des références existantes
2. **Sélection des partenaires** → Interface intuitive avec preview
3. **Validation** → Sauvegarde instantanée
4. **Fermeture** → Mise à jour de l'affichage principal

---

## Structure des données

### Modèle Formation (ICourse)

```typescript
interface ICourse {
    id?: number;
    title: string;                    // Titre de la formation
    slug: string;                     // URL-friendly identifier
    description: ICourseDescription;   // Contenus détaillés
    excerpt: string;                  // Description courte
    
    category_id: number;              // ID de la catégorie
    category?: ICourseCategory;       // Relation catégorie
    
    duration: string;                 // Durée (ex: "3 jours")
    lectures: number;                 // Nombre de cours
    
    price: number;                    // Prix public
    regular_price?: number;           // Prix avant réduction
    
    author: string;                   // Nom du formateur
    
    // Récurrence
    periodicity_unit: PeriodicityUnitEnum; // DAY, WEEK, MONTH, YEAR
    periodicity_value: number;        // Valeur numérique
    
    // Modalités
    location_mode: string;            // Mode de localisation
    
    // Relations
    partners?: IPartner[];            // Partenaires associés
    sessions?: ICourseSession[];      // Sessions programmées
    
    // États
    is_published: boolean;            // Publié/Brouillon
    is_featured: boolean;             // Mis en avant
    
    // Médias
    thumbnail?: string;               // Image principale
    logo?: string;                    // Logo de la formation
    org_logo?: string;                // Logo partenaire
    video?: string;                   // Vidéo de présentation
    gallery?: string[];               // Galerie d'images
    
    // Métadonnées
    created_at: Date;
    updated_at: Date;
}
```

### Modèle Catégorie (ICourseCategory)

```typescript
interface ICourseCategory {
    id: number;
    title: string;                    // Nom de la catégorie
    slug: string;                     // URL-friendly
    
    parent_id?: number;               // ID du parent (null pour racine)
    children?: ICourseCategory[];     // Sous-catégories
    
    image?: {                         // Image optionnelle
        id: number;
        src: string;
    };
    
    is_featured: boolean;             // Mise en avant
    color?: string;                   // Couleur hexa (#FF0000)
    
    // Compteurs
    courses_count?: number;           // Nombre de formations
}
```

### Modèle Session (ICourseSession)

```typescript
interface ICourseSession {
    id: number;
    course_id: number;                // ID de la formation
    course?: ICourse;                 // Relation formation
    
    start_date: Date;                 // Date de début
    end_date: Date;                   // Date de fin
    location: string;                 // Lieu de formation
    
    // États
    is_active: boolean;               // Session active
    max_participants?: number;        // Limite de participants
    current_participants?: number;    // Inscrits actuels
}
```

---

## Bonnes pratiques

### Pour les administrateurs

1. **Organisation des catégories**
   - Créer une hiérarchie logique (max 2-3 niveaux)
   - Utiliser des noms explicites
   - Ajouter des images représentatives

2. **Création de formations**
   - Commencer par les informations de base
   - Remplir tous les contenus détaillés
   - Tester en mode brouillon avant publication

3. **Gestion des sessions**
   - Planifier à l'avance
   - Vérifier les conflits de dates
   - Maintenir les informations à jour

4. **Références partenaires**
   - Associer les bons partenaires
   - Vérifier la cohérence des tags
   - Valider les associations

### Conseils techniques

- ⚡ **Performance** : Les images sont automatiquement optimisées
- 🔒 **Sécurité** : Validation côté client ET serveur
- 📱 **Responsive** : Interface adaptée à tous les écrans
- ♿ **Accessibilité** : Respecte les standards WCAG
- 🌍 **Internationalisation** : Support multi-langues intégré

---

## Support et maintenance

### Logs et debugging
- Les erreurs sont loggées automatiquement
- Console développeur pour le debug frontend
- Toast notifications pour les retours utilisateur

### Points d'extension
- Ajout de nouveaux champs via les formulaires
- Personnalisation des validations
- Extension des types de médias supportés

---

*Documentation générée automatiquement le 22/08/2025 - Version 1.0*