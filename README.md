# Ciné-Genesis AI — installation

## Fichiers
- `server.js` : serveur Node/Express et API Replicate
- `public/index.html` : interface web mobile
- `package.json` : dépendances et commande de démarrage

## Déploiement Render
1. Créez un dépôt GitHub et téléversez tous les fichiers en conservant le dossier `public`.
2. Dans Render, créez un **Web Service** connecté à ce dépôt.
3. Runtime : Node. Build command : `npm install`. Start command : `npm start`.
4. Dans Environment, ajoutez `REPLICATE_API_TOKEN` comme **KEY**, puis collez votre token Replicate comme **VALUE**. Ne mettez jamais le token dans GitHub ou le HTML.
5. Déployez. Testez `https://VOTRE-SERVICE.onrender.com/api/health`.
6. `apiKeyConfigured` doit être `true`.

L'interface se sert du même domaine par défaut. Si elle est hébergée séparément, indiquez l'URL du serveur dans le champ « Serveur API ».

## Remarque
La génération Replicate peut être facturée selon votre compte et l'usage du modèle. Vérifiez les tarifs et le statut de votre compte Replicate.
