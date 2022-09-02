const SteamAuth = require("node-steam-openid");

const steam = new SteamAuth({
    realm: `https://localhost:${process.env.PORT}`, // Site name displayed to users on logon
  returnUrl: `https://localhost:${process.env.PORT}/steam/updateUser`, // Your return route
  apiKey: "9B4E063468097CEECB414E4AA3BA5F6E" // Steam API key
});

module.exports = steam
