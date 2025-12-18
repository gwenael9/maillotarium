## Flux de création d'un maillot

La création d'un maillot se fait en **deux étapes** :

1. API : Enregistrement des métadonnées et récupération d'une autorisation d'upload.
2. S3 : Envoie direct du fichier via l'URL d'autorisation (dans le front).

### Etape 1 : Initialiser le maillot (local)

Envoyer le informations du maillot à l'API pour générer l'URL de stockage.

- URL : POST http://localhost:4000/maillot
- Body (JSON) :

```json
{
  "clubId": "uuid",
  "saisonId": "uuid",
  "type_maillot": "home",
  "marque": "Adidas",
  "tagsIds": ["uuid", "uuid"]
}
```

- Réponse attendue :

```json
{
  "message": "Maillot initialisé. Veuillez uploader l'image via l'URL fournie.",
  "uploadUrl": "http://localhost:9000/maillotariums3/angleterre/arsenal/2526/home.png?X-Amz-Algorithm=..."
}
```

### Etape 2 : Upload l'image (depuis le front)

Cette requête envoie le fichier directement sur le s3 sans repasser par l'API.

- Méthode : PUT
- URL : Collez l'**uploadUrl** entière reçue à l'étape précédente.
- Headers :
  - **Content-TYpe** : **image/png** (doit être identique au format prévu).
- Body :
  1. Onglet **binary** (Postman)
  2. Choisir le fichier.
- Puis envoyer. Si succès, on reçoit un code 200.
