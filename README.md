# MPP Esport

V1 d'une application de pronostics esport orientee League of Legends, avec un front Angular et une API NestJS.

## Prerequis

- Node.js `^22.22.3`, `^24.15.0` ou `>=26.0.0`
- Yarn `1.22.22`

## Fonctionnalites V1

- Calendrier de matchs LoL mockes.
- Pronostic du gagnant et du score.
- Points calcules automatiquement.
- Classement des joueurs.
- Pronostics persistés dans PostgreSQL avec Prisma.
- Matchs LoL à venir, en direct et terminés récupérés depuis PandaScore.
- Structure prete pour remplacer les donnees mockees par PandaScore ou une autre API esport.

## Demarrage

Installe les dependances :

```bash
yarn install
```

Installe PostgreSQL, puis crée une base nommée `mpp_esport` dans pgAdmin. Crée ensuite le fichier d'environnement de l'API :

```powershell
Copy-Item apps/api/.env.example apps/api/.env
```

Dans `apps/api/.env`, remplace `TON_MOT_DE_PASSE` par le mot de passe PostgreSQL et `TON_TOKEN_PANDASCORE` par le token privé disponible dans ton tableau de bord PandaScore, puis applique la migration :

`PANDASCORE_MAX_PAGES_PER_FEED=1` charge jusqu'à 100 matchs à venir, 100 matchs en cours et 100 résultats par actualisation afin de respecter le quota PandaScore.

Les matchs et résultats sont synchronisés dans PostgreSQL à minuit et midi. Pour lancer la synchronisation sans attendre :

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/esports/sync
```

La réponse indique le nombre de matchs, résultats et pronostics recalculés.

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

Par defaut :

- API NestJS : `http://localhost:3000/api`
- Web Angular : `http://localhost:4200`

## Prochaines etapes conseillees

- Ajouter une vraie authentification.
- Ajouter les ligues privees et invitations.
- Brancher une source de donnees esport.
- Ajouter une vraie authentification des joueurs.

## Déploiement

Crée une base PostgreSQL chez ton hébergeur, configure `DATABASE_URL`, puis utilise :

```bash
yarn build:api
yarn workspace @mpp-esport/api start:prod
```

`start:prod` applique automatiquement les migrations avant de lancer l'API.
