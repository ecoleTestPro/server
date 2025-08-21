<?php
// Fichier link.php à mettre dans /www/public/
$target = __DIR__ . '/../storage/app/public';
$link = __DIR__ . '/storage';

try {
    if (symlink($target, $link)) {
        echo "Lien créé avec succès !";
    } else {
        echo "Erreur lors de la création du lien.";
    }
} catch (Exception $e) {
    // echo "Erreur : " . $e->getMessage();
}
