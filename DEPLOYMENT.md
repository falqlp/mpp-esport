# Déploiement gratuit

Le dépôt est préparé pour cette architecture :

- Angular sur GitHub Pages : `https://falqlp.github.io/mpp-esport/`
- API NestJS sur Render : `https://mpp-esport-api.onrender.com/`
- PostgreSQL sur Supabase

## 1. Créer la base Supabase

1. Créer un projet gratuit sur Supabase.
2. Dans **Connect**, copier l'URL **Session pooler** sur le port `5432`.
3. Conserver cette URL pour la variable Render `DATABASE_URL`.

Le Session pooler est compatible IPv4 et adapté à l'API persistante. L'URL doit se terminer par
`?sslmode=require`. Les caractères spéciaux du mot de passe doivent être encodés pour une URL.

## 2. Créer l'API Render

1. Dans Render, choisir **New > Blueprint**.
2. Connecter le dépôt GitHub `falqlp/mpp-esport`.
3. Sélectionner le fichier `render.yaml` à la racine.
4. Renseigner les deux secrets demandés :
   - `DATABASE_URL` : URL Session pooler de Supabase ;
   - `PANDASCORE_API_TOKEN` : token privé PandaScore.
5. Lancer le déploiement.

`AUTH_SECRET` est généré automatiquement. Les migrations Prisma sont appliquées au démarrage de
l'API.

Si Render attribue une autre URL que `https://mpp-esport-api.onrender.com`, mettre cette URL dans
`apps/web/src/environments/environment.production.ts`, puis pousser la modification.

## 3. Activer GitHub Pages

1. Pousser les changements sur la branche `main`.
2. Ouvrir **Settings > Pages** dans le dépôt GitHub.
3. Choisir **GitHub Actions** comme source.
4. Vérifier le workflow **Deploy GitHub Pages** dans l'onglet **Actions**.

Chaque push sur `main` reconstruit et republie automatiquement le site.

## 4. Vérifier

1. Ouvrir `https://mpp-esport-api.onrender.com/api/esports/matches`.
2. Ouvrir `https://falqlp.github.io/mpp-esport/`.
3. Tester l'inscription, la connexion, la synchronisation et la création d'un pronostic.

Le premier appel à Render après 15 minutes sans trafic peut prendre environ une minute, car les
services gratuits sont mis en veille. Un projet Supabase gratuit peu actif peut également être mis
en pause.
