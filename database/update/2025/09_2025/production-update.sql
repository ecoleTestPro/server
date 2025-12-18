-- ===============================================
-- SCRIPT DE MISE À JOUR BASE DE DONNÉES PRODUCTION
-- École Test Pro - OVH Production
-- Date: 2025-09-22
-- ===============================================

-- Vérification de l'existence des tables et colonnes avant mise à jour
-- Utiliser avec précaution en production !

-- ===============================================
-- 1. AJOUT COLONNE is_confirmed À course_sessions
-- Migration: 2025_09_05_092121_add_is_confirmed_to_course_sessions_table
-- ===============================================

-- Vérifier si la colonne existe déjà
SELECT COUNT(*) as column_exists
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'course_sessions'
  AND COLUMN_NAME = 'is_confirmed';

-- Si la colonne n'existe pas (result = 0), exécuter cette commande:
ALTER TABLE course_sessions
ADD COLUMN is_confirmed TINYINT(1) NOT NULL DEFAULT 0
AFTER tva;

-- ===============================================
-- 2. AJOUT INFORMATIONS UTILISATEUR À enrollments
-- Migration: 2025_08_13_083033_add_user_info_to_enrollments_table
-- ===============================================

-- Vérifier si les colonnes existent déjà
SELECT COUNT(*) as user_fullname_exists
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'enrollments'
  AND COLUMN_NAME = 'user_fullname';

-- Si les colonnes n'existent pas, les ajouter:
ALTER TABLE enrollments
ADD COLUMN user_fullname VARCHAR(255) NULL AFTER user_id,
ADD COLUMN user_email VARCHAR(255) NULL AFTER user_fullname,
ADD COLUMN user_phone VARCHAR(255) NULL AFTER user_email;

-- ===============================================
-- 3. CRÉATION TABLE appointment_types
-- Migration: 2025_08_13_145938_create_appointment_types_table
-- ===============================================

-- Vérifier si la table existe déjà
SELECT COUNT(*) as table_exists
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'appointment_types';

-- Si la table n'existe pas (result = 0), la créer:
CREATE TABLE appointment_types (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    icon VARCHAR(255) NULL,
    color VARCHAR(255) NOT NULL DEFAULT '#6366f1',
    description TEXT NULL,
    default_duration INT NOT NULL DEFAULT 30,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    UNIQUE KEY appointment_types_slug_unique (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 4. CRÉATION TABLE appointment_durations
-- Migration: 2025_08_13_145949_create_appointment_durations_table
-- ===============================================

-- Vérifier si la table existe déjà
SELECT COUNT(*) as table_exists
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'appointment_durations';

-- Si la table n'existe pas (result = 0), la créer:
CREATE TABLE appointment_durations (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    duration INT NOT NULL,
    label VARCHAR(255) NOT NULL,
    description TEXT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 5. MODIFICATION TABLE appointments (SUPPRESSION COLONNES)
-- Migration: 2025_08_24_133908_remove_fields_from_appointments_table
-- ===============================================

-- ATTENTION: Cette migration supprime des données !
-- Faire un BACKUP avant d'exécuter ces commandes

-- Vérifier si la table appointments existe
SELECT COUNT(*) as table_exists
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'appointments';

-- Vérifier quelles colonnes existent encore
SELECT COLUMN_NAME
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'appointments'
  AND COLUMN_NAME IN ('user_id', 'admin_user_id', 'status', 'type');

-- Si les colonnes existent encore, les supprimer avec précaution:
-- BACKUP RECOMMANDÉ AVANT CETTE OPÉRATION !

-- Supprimer les contraintes de clés étrangères d'abord
ALTER TABLE appointments DROP FOREIGN KEY IF EXISTS appointments_user_id_foreign;
ALTER TABLE appointments DROP FOREIGN KEY IF EXISTS appointments_admin_user_id_foreign;

-- Supprimer les index
DROP INDEX IF EXISTS appointments_appointment_date_status_index ON appointments;
DROP INDEX IF EXISTS appointments_user_id_status_index ON appointments;
DROP INDEX IF EXISTS appointments_admin_user_id_appointment_date_index ON appointments;

-- Supprimer les colonnes
ALTER TABLE appointments
DROP COLUMN IF EXISTS user_id,
DROP COLUMN IF EXISTS admin_user_id,
DROP COLUMN IF EXISTS status,
DROP COLUMN IF EXISTS type;

-- ===============================================
-- 6. CRÉATION TABLE course_questions
-- Migration: 2025_09_11_125746_create_course_questions_table
-- ===============================================

-- Vérifier si la table existe déjà
SELECT COUNT(*) as table_exists
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'course_questions';

-- Si la table n'existe pas (result = 0), la créer:
CREATE TABLE course_questions (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    course_id BIGINT UNSIGNED NOT NULL,
    civility VARCHAR(255) NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NULL,
    message TEXT NOT NULL,
    accepts_privacy_policy TINYINT(1) NOT NULL DEFAULT 0,
    is_answered TINYINT(1) NOT NULL DEFAULT 0,
    admin_response TEXT NULL,
    answered_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    PRIMARY KEY (id),
    KEY course_questions_course_id_created_at_index (course_id, created_at),
    KEY course_questions_is_answered_index (is_answered),
    CONSTRAINT course_questions_course_id_foreign
        FOREIGN KEY (course_id) REFERENCES courses (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 7. DONNÉES INITIALES (SEEDERS)
-- ===============================================

-- Insertion des types de rendez-vous par défaut
INSERT IGNORE INTO appointment_types (name, slug, icon, color, description, default_duration, is_active, sort_order, created_at, updated_at) VALUES
('Consultation', 'consultation', '💬', '#3B82F6', 'Consultation individuelle avec un conseiller', 30, 1, 1, NOW(), NOW()),
('Information', 'information', 'ℹ️', '#10B981', 'Demande d\'informations sur nos formations', 15, 1, 2, NOW(), NOW()),
('Support', 'support', '🛠️', '#F59E0B', 'Support technique ou aide', 20, 1, 3, NOW(), NOW()),
('Inscription', 'enrollment', '📝', '#8B5CF6', 'Aide à l\'inscription aux formations', 45, 1, 4, NOW(), NOW()),
('Autre', 'other', '📋', '#6B7280', 'Autre type de rendez-vous', 30, 1, 5, NOW(), NOW());

-- Insertion des durées de rendez-vous par défaut
INSERT IGNORE INTO appointment_durations (duration, label, description, is_active, sort_order, created_at, updated_at) VALUES
(15, '15 min', 'Consultation rapide', 1, 1, NOW(), NOW()),
(30, '30 min', 'Consultation standard', 1, 2, NOW(), NOW()),
(45, '45 min', 'Consultation approfondie', 1, 3, NOW(), NOW()),
(60, '1h', 'Consultation complète', 1, 4, NOW(), NOW()),
(90, '1h30', 'Entretien détaillé', 1, 5, NOW(), NOW());

-- ===============================================
-- 8. VÉRIFICATIONS FINALES
-- ===============================================

-- Vérifier que toutes les tables existent
SELECT
    'course_sessions' as table_name,
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'course_sessions' AND COLUMN_NAME = 'is_confirmed') as has_is_confirmed
UNION ALL
SELECT
    'enrollments' as table_name,
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'enrollments' AND COLUMN_NAME = 'user_fullname') as has_user_info
UNION ALL
SELECT
    'appointment_types' as table_name,
    (SELECT COUNT(*) FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'appointment_types') as table_exists
UNION ALL
SELECT
    'appointment_durations' as table_name,
    (SELECT COUNT(*) FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'appointment_durations') as table_exists
UNION ALL
SELECT
    'course_questions' as table_name,
    (SELECT COUNT(*) FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'course_questions') as table_exists;

-- ===============================================
-- 9. MISE À JOUR DE LA TABLE migrations
-- ===============================================

-- Ajouter les entrées dans la table migrations pour marquer ces migrations comme exécutées
INSERT IGNORE INTO migrations (migration, batch) VALUES
('2025_09_05_092121_add_is_confirmed_to_course_sessions_table',
 (SELECT COALESCE(MAX(batch), 0) + 1 FROM (SELECT batch FROM migrations) as m)),
('2025_08_13_083033_add_user_info_to_enrollments_table',
 (SELECT COALESCE(MAX(batch), 0) + 1 FROM (SELECT batch FROM migrations) as m)),
('2025_08_13_145938_create_appointment_types_table',
 (SELECT COALESCE(MAX(batch), 0) + 1 FROM (SELECT batch FROM migrations) as m)),
('2025_08_13_145949_create_appointment_durations_table',
 (SELECT COALESCE(MAX(batch), 0) + 1 FROM (SELECT batch FROM migrations) as m)),
('2025_08_24_133908_remove_fields_from_appointments_table',
 (SELECT COALESCE(MAX(batch), 0) + 1 FROM (SELECT batch FROM migrations) as m)),
('2025_09_11_125746_create_course_questions_table',
 (SELECT COALESCE(MAX(batch), 0) + 1 FROM (SELECT batch FROM migrations) as m));

-- ===============================================
-- FIN DU SCRIPT
-- ===============================================

-- RECOMMANDATIONS:
-- 1. BACKUP complet de la base avant exécution
-- 2. Tester d'abord sur une copie de la base
-- 3. Exécuter en mode maintenance
-- 4. Vérifier les résultats après chaque section
-- 5. Surveiller les logs d'erreurs