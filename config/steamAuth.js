const SteamAuth = require("node-steam-openid");
require('dotenv').config({path: './config/.env'})


// NEED TO ADD HTTPS IN PROD
const steam = new SteamAuth({
  realm: `http://localhost:${process.env.PORT}/`, // Site name displayed to users on logon
  returnUrl: `http://localhost:${process.env.PORT}/steam/updateUser/`, // Your return route NEED TO ADD HTTPS IN PRODUCTION
  apiKey: process.env.STEAM_API_KEY // Steam API key
});

module.exports = steam
