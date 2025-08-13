-- Script d'initialisation de la base de données

-- Créer la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS ecoletestpro
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Utiliser la base de données
USE ecoletestpro;

-- Créer un utilisateur dédié si nécessaire
-- CREATE USER IF NOT EXISTS 'ecoletestpro_user'@'%' IDENTIFIED BY 'secret';
-- GRANT ALL PRIVILEGES ON ecoletestpro.* TO 'ecoletestpro_user'@'%';
-- FLUSH PRIVILEGES;

-- Configuration des paramètres MySQL pour Laravel
SET GLOBAL max_allowed_packet = 100 * 1024 * 1024;
SET GLOBAL max_connections = 1000;
SET GLOBAL connect_timeout = 300;
SET GLOBAL wait_timeout = 600;
SET GLOBAL interactive_timeout = 600;