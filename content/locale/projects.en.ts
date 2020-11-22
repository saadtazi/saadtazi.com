import { Project } from "types/models";

const projects: Project[] = [
  {
    name: "capitales",
    lead: "Learn country capitals",
    features: ["what score can you get? Play the quizz!!"],
    tags: ["node", "webapp", "backbone", "gulp"],
    links: [
      {
        name: "site",
        url: "http://capitals.saadtazi.com",
      },
    ],
  },
  {
    name: "packrep",
    lead: "Find which node package you should install.",
    features: [
      "shows package stats about npm packages and related github repos (activities, stars, ...)",
      "store your favorite packages for your next visit",
    ],
    tags: ["node", "webapp", "github api", "npm", "backbone"],
    links: [
      {
        name: "site",
        url: "http://packrep.saadtazi.com",
      },
    ],
  },
  {
    name: "firefox-profile",
    lead:
      "A nodejs package to create firefox profile that can be used with selenium.",
    features: [
      "create firefox profiles",
      "use, retrieve, alter existing profiles",
      "add extensions to a profile",
      "specify proxy settings",
      "set user preferences...",
    ],
    tags: ["nodejs", "selenium", "npm", "MIT"],
    links: [
      {
        name: "github",
        iconClass: "github",
        url: "http://github.com/saadtazi.com/firefox-profile-js",
      },
    ],
  },
  {
    name: "fakr",
    lead:
      "'real mock' webserver with dynamically configured routes (through node or restful-ish API).",
    features: [
      "create static or dynamic routes (text, json, function, templated responses...)",
      "configure response headers globally or specifically (per routes)",
      "captures requests for each call",
      "facilitates frontend development when the backend development is not done",
    ],
    tags: ["nodejs", "expressjs", "tests", "npm", "MIT"],
    links: [
      {
        name: "github",
        icon: "github",
        url: "https://github.com/saadtazi/fakr-node",
      },
    ],
  },
  {
    name: "SaadTaziGChartBundle",
    lead:
      "A Symfony Bundle to render Google Chart Tool, Google Chart Image API and Google Infographics.",
    tags: ["symfony", "google chart", "packagist"],
    links: [
      {
        name: "github",
        icon: "github",
        url: "https://github.com/saadtazi/SaadTaziGChartBundle",
      },
    ],
  },
  {
    name: "simple-oembed",
    lead: "A php library to fetch oembed data.",
    tags: ["php", "oembed"],
    links: [
      {
        name: "github",
        icon: "github",
        url: "https://github.com/saadtazi/simple-oembed",
      },
      { name: "oembed", url: "http://oembed.com" },
    ],
  },
];

export default projects;
