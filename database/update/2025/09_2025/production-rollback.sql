-- ===============================================
-- SCRIPT DE ROLLBACK PRODUCTION
-- École Test Pro - OVH Production
-- Date: 2025-09-22
-- ===============================================

-- ATTENTION: Ce script annule les modifications du script production-update.sql
-- À utiliser UNIQUEMENT en cas de problème après la mise à jour

-- ===============================================
-- ROLLBACK 6: SUPPRIMER TABLE course_questions
-- ===============================================

DROP TABLE IF EXISTS course_questions;

-- Supprimer l'entrée de la table migrations
DELETE FROM migrations WHERE migration = '2025_09_11_125746_create_course_questions_table';

-- ===============================================
-- ROLLBACK 5: RESTAURER COLONNES TABLE appointments
-- ===============================================

-- Ajouter les colonnes supprimées
ALTER TABLE appointments
ADD COLUMN user_id BIGINT UNSIGNED NULL AFTER id,
ADD COLUMN admin_user_id BIGINT UNSIGNED NULL AFTER user_id,
ADD COLUMN status ENUM('pending', 'confirmed', 'completed', 'cancelled', 'no_show') NOT NULL DEFAULT 'pending' AFTER admin_user_id,
ADD COLUMN type ENUM('consultation', 'information', 'support', 'enrollment', 'other') NOT NULL DEFAULT 'consultation' AFTER status;

-- Recréer les contraintes de clés étrangères
ALTER TABLE appointments
ADD CONSTRAINT appointments_user_id_foreign
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
ADD CONSTRAINT appointments_admin_user_id_foreign
    FOREIGN KEY (admin_user_id) REFERENCES users (id) ON DELETE SET NULL;

-- Recréer les index
CREATE INDEX appointments_appointment_date_status_index ON appointments (appointment_date, status);
CREATE INDEX appointments_user_id_status_index ON appointments (user_id, status);
CREATE INDEX appointments_admin_user_id_appointment_date_index ON appointments (admin_user_id, appointment_date);

-- Supprimer l'entrée de la table migrations
DELETE FROM migrations WHERE migration = '2025_08_24_133908_remove_fields_from_appointments_table';

-- ===============================================
-- ROLLBACK 4: SUPPRIMER TABLE appointment_durations
-- ===============================================

DROP TABLE IF EXISTS appointment_durations;

-- Supprimer l'entrée de la table migrations
DELETE FROM migrations WHERE migration = '2025_08_13_145949_create_appointment_durations_table';

-- ===============================================
-- ROLLBACK 3: SUPPRIMER TABLE appointment_types
-- ===============================================

DROP TABLE IF EXISTS appointment_types;

-- Supprimer l'entrée de la table migrations
DELETE FROM migrations WHERE migration = '2025_08_13_145938_create_appointment_types_table';

-- ===============================================
-- ROLLBACK 2: SUPPRIMER COLONNES USER INFO DE enrollments
-- ===============================================

ALTER TABLE enrollments
DROP COLUMN IF EXISTS user_fullname,
DROP COLUMN IF EXISTS user_email,
DROP COLUMN IF EXISTS user_phone;

-- Supprimer l'entrée de la table migrations
DELETE FROM migrations WHERE migration = '2025_08_13_083033_add_user_info_to_enrollments_table';

-- ===============================================
-- ROLLBACK 1: SUPPRIMER COLONNE is_confirmed DE course_sessions
-- ===============================================

ALTER TABLE course_sessions
DROP COLUMN IF EXISTS is_confirmed;

-- Supprimer l'entrée de la table migrations
DELETE FROM migrations WHERE migration = '2025_09_05_092121_add_is_confirmed_to_course_sessions_table';

-- ===============================================
-- VÉRIFICATIONS FINALES ROLLBACK
-- ===============================================

-- Vérifier que les tables ont été supprimées
SELECT
    'course_questions' as table_name,
    (SELECT COUNT(*) FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'course_questions') as table_exists
UNION ALL
SELECT
    'appointment_types' as table_name,
    (SELECT COUNT(*) FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'appointment_types') as table_exists
UNION ALL
SELECT
    'appointment_durations' as table_name,
    (SELECT COUNT(*) FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'appointment_durations') as table_exists;

-- Vérifier que les colonnes ont été supprimées
SELECT
    'course_sessions.is_confirmed' as column_name,
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'course_sessions' AND COLUMN_NAME = 'is_confirmed') as column_exists
UNION ALL
SELECT
    'enrollments.user_fullname' as column_name,
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'enrollments' AND COLUMN_NAME = 'user_fullname') as column_exists;

-- Vérifier que les colonnes appointments ont été restaurées
SELECT
    'appointments.user_id' as column_name,
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'appointments' AND COLUMN_NAME = 'user_id') as column_exists
UNION ALL
SELECT
    'appointments.status' as column_name,
    (SELECT COUNT(*) FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'appointments' AND COLUMN_NAME = 'status') as column_exists;

-- ===============================================
-- FIN DU SCRIPT ROLLBACK
-- ===============================================