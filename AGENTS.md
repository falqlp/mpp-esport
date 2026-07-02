# Bonnes pratiques pour les assistants IA

## Architecture du front Angular

- Ne jamais concentrer plusieurs écrans ou domaines fonctionnels dans `AppComponent`.
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
- Préserver les comportements existants pendant un découpage ; séparer autant que possible le refactor des changements fonctionnels.
