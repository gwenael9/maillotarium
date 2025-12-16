-- Création de la base de données
CREATE DATABASE "maillotariumdb";

-- Connexion à la base de données
\c "maillotariumdb"

-- Créer une saison
INSERT INTO saison ("anneeDebut", "anneeFin") VALUES (2025, 2026);

-- Créer un club
INSERT INTO club (name, country) VALUES ('Arsenal', 'Angleterre');

-- Créer un maillot
-- Ajouter le maillot dans le s3 manuellement
INSERT INTO maillot ("clubId", "saisonId", type_maillot, image_url, marque, palette_couleur)
VALUES (
  (SELECT id FROM club WHERE name = 'Arsenal' LIMIT 1),
  (SELECT id FROM saison WHERE "anneeDebut" = 2025 LIMIT 1),
  'home', 
  'http://localhost:9000/maillotariums3/angleterre/arsenal/2526/home.png', 
  'Adidas', 
  '["rouge", "blanc"]'::jsonb
);