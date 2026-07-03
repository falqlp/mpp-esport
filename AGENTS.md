# Bonnes pratiques pour les assistants IA

## Architecture du front Angular

- Ne jamais concentrer plusieurs écrans ou domaines fonctionnels dans `AppComponent`.
- Utiliser la structure Angular standard pour les composants non triviaux : un fichier `.ts`, un template `.html` et une feuille de style `.css`. Ne pas compacter HTML, CSS ou TypeScript sur une seule ligne.
- Regrouper les fichiers de chaque composant dans un dossier dédié portant le nom du composant.
- Réserver les templates et styles inline aux composants réellement minuscules et sans logique de présentation durable.
- `AppComponent` doit rester un composant d'orchestration : chargement de l'état global, session et navigation principale.
- Extraire un composant autonome par écran ou responsabilité métier (authentification, bandeau, pronostics, résultats, classement, profil).
- Extraire les éléments réutilisés dans plusieurs écrans (filtres, cartes de match, sélecteurs) dès que leur logique devient non triviale.
- Garder les formulaires et leurs validations dans le composant fonctionnel qui les affiche.
- Préférer des entrées/sorties explicites entre composants et éviter les dépendances implicites au composant racine.
- Avant de terminer une évolution UI, vérifier que le composant modifié reste lisible et n'accumule pas une nouvelle responsabilité indépendante.

## Internationalisation

- Tout texte visible par l'utilisateur doit toujours être traduit en anglais, français, espagnol, portugais, allemand et italien.
- Ne jamais ajouter de texte d'interface en dur dans un composant ou un template ; utiliser le service et le pipe de traduction existants.
- Toute nouvelle clé de traduction doit être renseignée dans les six langues avant de terminer la modification.
- Les dates, nombres, messages d'erreur, notifications et libellés d'accessibilité doivent respecter la langue sélectionnée.
- Conserver la détection initiale de la langue du navigateur et le repli sur l'anglais lorsqu'elle n'est pas prise en charge.

## Validation

- Travailler en TDD pour toute nouvelle logique : écrire d'abord un test qui échoue, implémenter le minimum nécessaire, puis refactorer avec les tests au vert.
- Toute correction de bug doit commencer par un test de non-régression qui reproduit le défaut.
- Ne pas considérer une tâche backend terminée sans tests automatisés couvrant le comportement ajouté ou modifié.
- Compiler l'application concernée après chaque refactor structurel.
- Exécuter `yarn format` après les modifications et `yarn format:check` avant de terminer.
- Préserver les comportements existants pendant un découpage ; séparer autant que possible le refactor des changements fonctionnels.

## Modélisation relationnelle

- Représenter les liens métier entre entités par des relations Prisma et des clés étrangères en base de données.
- Ne pas utiliser une donnée d'affichage ou métier mutable (pseudo, nom, libellé) comme substitut à l'identifiant d'une entité.
- Définir explicitement les règles de suppression des relations et les contraintes d'unicité associées.
- Lorsqu'une API doit afficher une donnée liée, la charger par la relation tout en conservant les identifiants comme références persistées.
