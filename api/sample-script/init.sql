-- Création de la base de données
CREATE DATABASE "maillotariumdb";

-- Connexion à la base de données
\c "maillotariumdb"

-- Créer une saison
INSERT INTO saison ("anneeDebut", "anneeFin") VALUES (2025, 2026);

-- Créer un club
INSERT INTO club (name, country, country_code) VALUES 
('Arsenal', 'Angleterre', 'GB-ENG'), 
('FC Barcelone', 'Espagne', 'ES'), 
('Bayern Munich', 'Allemagne', 'DE'), 
('Juventus', 'Italie', 'IT'), 
('Paris Saint-Germain', 'France', 'FR'), 
('Ajax Amsterdam', 'Pays-Bas', 'NL');

-- Créer des tags
INSERT INTO tag (name) VALUES ('Vintage'), ('Authentique'), ('Edition Limitée');

-- Créer un maillot
WITH nouveau_maillot AS (
  INSERT INTO maillot ("clubId", "saisonId", type_maillot, image_url, marque, palette_couleur)
  VALUES (
    (SELECT id FROM club WHERE name = 'Arsenal' LIMIT 1),
    (SELECT id FROM saison WHERE "anneeDebut" = 2025 LIMIT 1),
    'home', 
    'http://localhost:9000/maillotariums3/angleterre/arsenal/2526/home.png', 
    'Adidas', 
    '["rouge", "blanc"]'::jsonb
  )
  RETURNING id
)
INSERT INTO maillot_tags ("maillotId", "tagId")
SELECT 
  nouveau_maillot.id, 
  tag.id 
FROM nouveau_maillot, tag 
WHERE tag.name IN ('Vintage', 'Authentique');