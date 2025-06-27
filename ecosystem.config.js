// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "home-credis",
      script: "serve",
      args: "-s dist -l 3051",
    },
  ],
};
