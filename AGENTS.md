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

## Validation

- Travailler en TDD pour toute nouvelle logique : écrire d'abord un test qui échoue, implémenter le minimum nécessaire, puis refactorer avec les tests au vert.
- Toute correction de bug doit commencer par un test de non-régression qui reproduit le défaut.
- Ne pas considérer une tâche backend terminée sans tests automatisés couvrant le comportement ajouté ou modifié.
- Compiler l'application concernée après chaque refactor structurel.
- Exécuter `yarn format` après les modifications et `yarn format:check` avant de terminer.
- Préserver les comportements existants pendant un découpage ; séparer autant que possible le refactor des changements fonctionnels.
