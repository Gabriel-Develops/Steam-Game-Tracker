const SteamAuth = require("node-steam-openid");

const steam = new SteamAuth({
    realm: `https://localhost:${process.env.PORT}`, // Site name displayed to users on logon
  returnUrl: `https://localhost:${process.env.PORT}/steam/updateUser`, // Your return route
  apiKey: process.env.STEAM_API_KEY // Steam API key
});

module.exports = steam
