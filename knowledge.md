# Knowledge

## Calculs des métriques

Les métriques sont visibles sur [ce document](https://docs.google.com/spreadsheets/d/1FXv36ht0WlSnH3cwbiGjvSaOsV_KpONfYL8G5lK9mzo/edit#gid=0).

### Sans automatisation

#### Date de la période considérée

Aller sur JIRA sur la [vu backlog](https://jira.sg.social.gouv.fr/secure/RapidBoard.jspa?rapidView=263&view=planning.nodetail&issueLimit=100) et relevé les dates du sprint **ACTIF**.

#### Nombre de déploiements

Aller sur [Scalingo](https://dashboard.scalingo.com/apps/osc-fr1/helios/deploy/list) pour relever les déploiements effectués pendant la période considérée.

#### Fréquence de déploiements

Aller sur le document. La fréquence de déploiements par jour se calcule alors : NOMBRE_DE_DÉPLOIEMENTS / NOMBRE_DE_JOURS_OUVRÉS.

#### Relevé les *incidents*

Aller sur JIRA pour relever tous les *incidents* (tickets bugs avec criticité *highest*)

#### Change failure rate

Identifier les déploiements Scalingo liés à la mise en production des incidents. Faire le ratio entre le nombre de ces déploiements et le nombre total de déploiements durant la période considérée.

#### Mean time to restore

Sur JIRA, cette métrique se calcule en moyennant le temps de passage des tickets entre la colonne "À faire" (apparition sur le board) et "terminé" (résolution complète de l'incident)

## Stack technique

### Spike sur Github pages

#### Mise en place

J'ai tenté de concevoir une appli React avec seulement un front-end, hébergé statiquement sur github pages.
C'est presque trop facile, une commande permet d'initialiser une appli React avec du typescript :

```sh
npx create-react-app helios-metriques --template typescript
```

Et puis j'ai suivi [ce tuto](https://github.com/gitname/react-gh-pages#3-install-the-gh-pages-npm-package) pour déployer sur Github pages.

Appli disponible, succès !

#### Le problème des CORS

Seulement voilà, les applis front, c'est facile mais c'est restreint.

Par exemple, si un server sert du javascript (*aka* le serveur github pages), eh bien ça restreint les requêtes (*fetch*) de ce javascript - exécuté par le navigateur du client - à n'accepter des réponses de serveur que sous certaines conditions.

Et parmi ces conditions, il faut la présence d'un certain header dans les réponses des serveurs requêtés. Ce header c'est le **Access-Control-Allow-Origin**. S'il n'est pas présent, la requête n'aboutira pas.

Le serveur d'API scalingo ainsi que celui de JIRA n'émettent pas ce header dans leurs réponses rendant impossible des requêtes vers eux venant d'un frontend.

#### Donc ...

L'application ne sera pas viable avec une appli full frontend. Il me faut un moyen de requêter les différentes API.

### Spike avec NestJS

Là encore, il suffit d'une commande :

```ts
nest new helios-metriques
```

En rentrant quelques informations, le boilerplate est généré et l'appli tourne.

Côté archi, je réutilise ce qu'on a établi dans le code d'Helios, pour davantage de cohérence et de facilité de maintenance. Je constate par contre que c'est moins adapté au framework *NestJS* où il faut importer / exporter des modules pour les injecter autre part. On a ici les **UseCasesModules** qui doivent importer les **GatewaysModules** - soit du métier qui importe de l’infra ...

```ts
@Module({
  imports: [GatewaysModule],
  providers: [...],
  exports: [...],
})
export class UseCasesModules {}
```

Il doit exister une façon de mieux compartimenter le côté métier mais je m'y prends mal ?

## JIRA

Il me faut des données des sprints de JIRA. Je ne comprends toujours pas bien comment est structurée la hiérarchie des données JIRA, un *board* contient des *sprints*, et les *sprints* contiennent des *issues* ? C'est quoi un *project* alors ?

### Authentification

Je cherche un moyen d'utiliser un token, mais je ne trouve aucun moyen d'en générer un pour mon compte. Apparemment, l'API gère une authentification basique à base d'identifiant et mot de passe - ça fera l'affaire.

Quelques tentatives plus tard sur Postman, et un export en *NodeJS - axios* et quelques adaptations pour du typescript (non sans prises de tête), mon appli est capable de requêter JIRA.

### Requêter les endpoint

La doc de l'API JIRA ne me satisfait pas vraiment, manque de lisibilité, je passe par google pour savoir quel endpoint taper pour obtenir ce que je veux, *stackoverflow* ne déçoit jamais (ou presque).

La bonne nouvelle est que si l'API se base sur des *id* uniques (de *board*, de *sprint* ou d'*issue*), ils sont facilement trouvables car affichés dans les URL quand on navigue simplement.

J'ai les informations des *sprints* de notre *board* - cool !

## Scalingo
