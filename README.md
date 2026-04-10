# POQ

### Prénom Ouvert Québec

Prénom Ouvert Québec est un projet personnel visant à interpréter les données brutes disponibles sur le site Données Ouvertes Québec.
Ce projet n’utilise pas d’API personnalisée.

Il est possible d'accéder à [POQ ici](https://jerebern.github.io/POQ/)

### Pourquoi ce projet?

La plupart des plateformes de visualisation de ces données n’offrent pas d’interprétations précises à l’aide de graphiques et sont malheureusement remplies de publicités.

### Les jeux de données

Il est possible que certains prénoms n’aient aucun sens, par exemple LXXXXXXXXXXXXXXXX, ALEXISXXXXXXXXXXX. Ceci est dû à une erreur dans les jeux de données.

### Fonctionnement

Récupération des données disponibles sur Données Québec

- [Banque de prénoms garçons](https://www.donneesquebec.ca/recherche/dataset/banque-de-prenoms-garcons)
- [Banque de prénoms filles](https://www.donneesquebec.ca/recherche/dataset/banque-de-prenoms-filles)

Insertion des données disponibles dans l’IndexedDB du navigateur

Visualisation des jeux de données

### Bugs

- POQ n’est présentement pas compatible avec Firefox (IndexedDB trop volumineuse)
- Il y a un bug avec le tri des données dans le tableau
- Il faudrait migrer vers des csv car données Québec semble avoir des problème avec l'API quelque fois
