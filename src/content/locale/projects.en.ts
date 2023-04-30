import { Project } from 'types/models';

const projects: Project[] = [
  {
    name: 'Diff Tools',
    lead: 'simple tool to visualize diff between json, url query params, text, ...',
    features: [],
    tags: ['react', 'tools', 'diff'],
    links: [
      {
        name: 'site',
        url: 'diff',
      },
    ],
  },
  {
    name: 'instrument tuner',
    lead: 'a chord tuner for multiple instruments',
    features: [],
    tags: ['react', 'music'],
    links: [
      {
        name: 'site',
        url: 'tuner',
      },
    ],
  },
  {
    name: 'guitar-chord',
    lead: 'a react component that displays guitar chords (editable and read-only)',
    features: [],
    tags: ['react', 'music', 'opensource'],
    links: [
      {
        name: 'demo',
        url: 'chord',
      },
      {
        name: 'npm',
        url: 'https://www.npmjs.com/package/guitar-chord-editor',
      },
    ],
  },
  {
    name: 'minesweeper',
    lead: 'A project made with my son',
    features: ['A classic...'],
    tags: ['nextjs', 'webapp'],
    links: [
      {
        name: 'site',
        url: 'minesweeper',
      },
    ],
  },
  {
    name: 'murals',
    lead: 'Montreal city murals',
    features: ['A way to discover...'],
    tags: ['nextjs', 'webapp', 'mtl'],
    links: [
      {
        name: 'site',
        url: 'murales',
      },
    ],
  },
  {
    name: 'capitales',
    lead: 'Learn country capitals',
    features: ['what score can you get? Play the quizz!!'],
    tags: ['node', 'webapp', 'backbone', 'gulp'],
    links: [
      {
        name: 'site',
        url: 'http://capitals.saadtazi.com',
      },
    ],
  },
  {
    name: 'packrep',
    lead: 'Find which npm package you should install.',
    features: [
      'shows package stats about npm packages and related github repos (activities, stars, ...)',
      'store your favorite packages for your next visit',
    ],
    tags: ['node', 'webapp', 'github api', 'npm', 'backbone'],
    links: [
      {
        name: 'site',
        url: 'http://packrep.saadtazi.com',
      },
    ],
  },
  {
    name: 'firefox-profile',
    lead: 'A nodejs package to create firefox profile that can be used with selenium.',
    features: [
      'create firefox profiles',
      'use, retrieve, alter existing profiles',
      'add extensions to a profile',
      'specify proxy settings',
      'set user preferences...',
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
    lead: "'real mock' webserver with dynamically configured routes (through node or restful-ish API).",
    features: [
      'create static or dynamic routes (text, json, function, templated responses...)',
      'configure response headers globally or specifically (per routes)',
      'captures requests for each call',
      'facilitates frontend development when the backend development is not done',
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
    lead: 'A Symfony Bundle to render Google Chart Tool, Google Chart Image API and Google Infographics.',
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
    lead: 'A php library to fetch oembed data.',
    tags: ['php', 'oembed'],
    links: [
      {
        name: 'github',
        icon: 'github',
        url: 'https://github.com/saadtazi/simple-oembed',
      },
      { name: 'oembed', url: 'http://oembed.com' },
    ],
  },
];

export default projects;
