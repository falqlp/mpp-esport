# MPP Esport

V1 d'une application de pronostics esport orientée League of Legends, avec un front Angular et une API NestJS.

## Prérequis

- Node.js `^22.22.3`, `^24.15.0` ou `>=26.0.0`
- Yarn `1.22.22`
- PostgreSQL

## Fonctionnalités V1

- Matchs LoL à venir, en direct et terminés récupérés depuis PandaScore.
- Pronostic du gagnant et du score.
- Points calculés automatiquement.
- Classement des joueurs.
- Pronostics et matchs persistés dans PostgreSQL avec Prisma.
- Profil personnalisable avec compétitions favorites (LEC, LCK, LCS, LPL, MSI, First Stand et Worlds).

## Démarrage

Installe les dépendances :

```bash
yarn install
```

Installe PostgreSQL, puis crée une base nommée `mpp_esport` dans pgAdmin. Crée ensuite le fichier d'environnement de l'API :

```powershell
Copy-Item apps/api/.env.example apps/api/.env
```

Dans `apps/api/.env`, remplace `TON_MOT_DE_PASSE` par le mot de passe PostgreSQL et `TON_TOKEN_PANDASCORE` par ton token privé PandaScore.

`PANDASCORE_MAX_PAGES_PER_FEED=1` charge jusqu'à 100 matchs à venir, 100 matchs en cours et 100 résultats par actualisation afin de respecter le quota PandaScore.

Applique les migrations :

```bash
yarn workspace @mpp-esport/api db:deploy
```

Lance l'API :

```bash
yarn dev:api
```

Lance le front dans un autre terminal :

```bash
yarn dev:web
```

Par défaut :

- API NestJS : `http://localhost:3000/api`
- Web Angular : `http://localhost:4200`

Une fois connecté, choisis tes compétitions dans **Mon profil > Compétitions suivies**. Le filtre **Mes compétitions favorites** regroupe tous les matchs correspondants. Pour LEC et LCK, le suivi porte sur la compétition entière et inclut donc tous les splits et playoffs, y compris les prochaines saisons.

### Dépannage Prisma

Si TypeScript indique qu'un modèle du schéma (par exemple `user`) n'existe pas sur `PrismaService`, le client Prisma généré est probablement obsolète. Régénère-le puis relance l'API :

```bash
yarn workspace @mpp-esport/api db:generate
yarn dev:api
```

## Actualiser les données PandaScore

L'API doit être lancée. Envoie une requête `POST` sans corps à l'endpoint de synchronisation.

Avec PowerShell :

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/esports/sync
```

Avec curl :

```bash
curl -X POST http://localhost:3000/api/esports/sync
```

La réponse ressemble à ceci :

```json
{
  "matchesSynced": 42,
  "resultsSynced": 8,
  "predictionsRecalculated": 5,
  "syncedAt": "2026-06-30T22:30:00.000Z"
}
```

Une synchronisation automatique est aussi lancée à minuit et midi.

## Prochaines étapes conseillées

- Ajouter une vraie authentification.
- Ajouter les ligues privées et invitations.
- Ajouter l'authentification des joueurs.

## Qualité du code

Lance ESLint sur l'API, le front Angular et ses templates :

```bash
yarn lint
```

Pour appliquer automatiquement les corrections disponibles :

```bash
yarn lint:fix
```

Formate automatiquement le TypeScript, les templates Angular, les styles et les fichiers de configuration avec Prettier :

```bash
yarn format
yarn format:check
```

La GitHub Action `.github/workflows/ci.yml` exécute automatiquement l'installation, le lint et les builds API/web sur chaque pull request et sur les pushes vers `main`.

Les tests backend suivent un workflow TDD et se lancent avec :

```bash
yarn test:api
yarn test:api:coverage
```

## Déploiement

Crée une base PostgreSQL chez ton hébergeur, configure `DATABASE_URL`, puis utilise :

```bash
yarn build:api
yarn workspace @mpp-esport/api start:prod
```

`start:prod` applique automatiquement les migrations avant de lancer l'API.
