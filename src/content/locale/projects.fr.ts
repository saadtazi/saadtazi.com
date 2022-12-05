import { Project } from 'types/models';

const projects: Project[] = [
  {
    name: 'démineur',
    lead: 'Un projet fait avec mon fils',
    features: ['Un classic...'],
    tags: ['nextjs', 'webapp'],
    links: [
      {
        name: 'site',
        url: '/fr/minesweeper',
      },
    ],
  },
  {
    name: 'murals',
    lead: 'Les murales de Montreal',
    features: ['Une façon de découvrir..'],
    tags: ['nextjs', 'webapp'],
    links: [
      {
        name: 'site',
        url: 'murales',
      },
    ],
  },
  {
    name: 'capitales',
    lead: 'Apprenez les capitales du monde.',
    features: ['Quel score serez-vous capable de faire?'],
    tags: ['node', 'webapp', 'backbone', 'gulp'],
    links: [
      {
        name: 'site',
        url: 'http://capitales.saadtazi.com',
      },
    ],
  },
  {
    name: 'packrep',
    lead: 'Trouver quel npm package vous devriez installer.',
    features: [
      'visualiser des statistiques du package npm et des "repositoris" github (activités, stars, ...)',
      'sauvegarder vos packages préférés pour votre prochaine visite',
    ],
    tags: ['node', 'webapp', 'github api', 'npm', 'backbone'],
    links: [
      {
        name: 'site web',
        url: 'http://packrep.saadtazi.com',
      },
    ],
  },
  {
    name: 'firefox-profile',
    lead: 'Package nodejs permettant la création de profil firefox pouvant être utilisé pour des tests selenium.',
    features: [
      'créer des profils firefox',
      'utiliser et modifier des profils existants',
      'ajouter des extensions ("add-ons") aux profils',
      'configurer le proxy utilisé par firefox',
      'configurer les préférences du profil',
    ],
    tags: ['nodejs', 'selenium', 'npm', 'MIT'],
    links: [
      {
        name: 'github',
        icon: 'github',
        url: 'http://github.com/saadtazi/firefox-profile-js',
      },
    ],
  },
  {
    name: 'fakr',
    lead: 'Un "vrai serveur web de mock" configurable au travers d\'API "restful-ish".',
    features: [
      'créer des routes statiques ou dynamiques (texte, json, function...)',
      'permet de configurer les entêtes des réponses http globalement ou spécifiquement (par route)',
      'peut capturer les informations de la requêtes pour chaque appel',
      'facilite le dévelopement "frontend" quand le "backend" n\'est pas accessible',
    ],
    tags: ['nodejs', 'expressjs', 'tests', 'npm', 'MIT'],
    links: [
      {
        name: 'github',
        icon: 'github',
        url: 'https://github.com/saadtazi/fakr-node',
      },
    ],
  },
  {
    name: 'SaadTaziGChartBundle',
    lead: 'Un "bundle" Symfony qui permet de générer des graphes en utilisant Google Chart Tool, Google Chart Image API et Google Infographics.',
    tags: ['symfony', 'google chart', 'packagist'],
    links: [
      {
        name: 'github',
        icon: 'github',
        url: 'https://github.com/saadtazi/SaadTaziGChartBundle',
      },
    ],
  },
  {
    name: 'simple-oembed',
    lead: 'Une librarie php qui permet de récupérer des données oembed.',
    tags: ['php', 'oembed'],
    links: [
      {
        name: 'github',
        icon: 'github',
        url: 'https://github.com/saadtazi/simple-oembed',
      },
      {
        name: 'oembed',
        // icon: "github",
        url: 'http://oembed.com',
      },
    ],
  },
];

export default projects;
