-- Création de la base de données
CREATE DATABASE "maillotariumdb";

-- Connexion à la base de données
\c "maillotariumdb"

-- Créer une saison
INSERT INTO saison ("anneeDebut", "anneeFin") VALUES (2025, 2026);

-- Créer un club
INSERT INTO club (nom, pays, ligue)
VALUES ('Paris Saint-Germain', 'France', 'Ligue 1');

-- Créer un maillot
INSERT INTO maillot ("clubId", "saisonId", type_maillot, image_url, marque, palette_couleur)
VALUES (
  '4542b975-616f-411f-a70c-77bd7f1f981e',
  1, 
  'domicile', 
  'http://localhost:9000/maillotariums3/angleterre/arsenal/2526/home.png', 
  'Adidas', 
  '["rouge", "blanc"]'::jsonb
);
