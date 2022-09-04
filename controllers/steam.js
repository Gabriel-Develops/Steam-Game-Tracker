const User = require('../models/User')
const steam = require('../config/steamAuth')
const fetch = require('node-fetch')
require('dotenv').config({path: './config/.env'})

module.exports = {
  steamLogin: async (req, res) => {
    console.log(req.params)
    try {
      const redirectUrl = await steam.getRedirectUrl();
      return res.redirect(redirectUrl);
    } catch (error) {
      console.error(error)
    }
  },

  updateUser: async (req, res) => {
    console.log(req.params)
    try {
      const user = await steam.authenticate(req);
      console.log(user)
      // Updates user in db with steamId and steamUsername
      await User.updateOne({"_id": req.user.id}, {$set: {
        steamUserName: `${user.username}`,
        steamID: `${user.steamid}`
      }})
      // updates the user with steamID, owned games, etc
      console.log('Successfully updated user')
      //redirect to dashboard
      res.redirect(`/steam/${req.user.steamID}`)
    } catch (error) {
      console.error(error);
    }
  },
  
  //req.params = { steamID: < user steam ID here> }
  //also having ensureAuth passes in the current user
  getGames: async (req, res) => {
    console.log("req.user from steamController.getGames()", req.user)
    try {
      // fetch req in here, can't normally fetch from the server so installed node-fetch pkg and required it in server.js and here in the steam controller
      // requesting the user's owned games in json format
      // Retrieve the user's owned games using the WebAPI Key provided in .env, along with the user's steam ID, and include extended info for each game.
      // TODO: Automate setting up the WebAPI Key per user and storing in User's document in db, so that a user doesn't need to make their profile public to make use of these features.
      const response = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${req.user.steamID}&format=json&include_appinfo=true`)
      const ownedGames = await response.json()
      // Presort games by total time played in descending order
      const ownedGamesSorted = ownedGames.response.games.sort((a, b) => {
        return b.playtime_forever - a.playtime_forever
      })

      // updating the user DB to reflect any updates
      await User.updateOne({"_id": req.user.id}, {$set: {
        ownedGames: ownedGamesSorted,
      }})
      console.log('Successfully updated user')
      res.render('dashboard.ejs', {user: req.user, games: ownedGamesSorted})
    }
    catch (err) {
      console.log(err)
      res.redirect('/')
    }
  },

  //req.params = { steamID: < user steam ID here>, appId: < steam appID here > }
  getGameData: (req,res) => {
    console.log(req.params)
    res.render('dashboard.ejs')
  }
}

// sends user to a steam page to login
// user logs in
// redirected to a place of our choosing
// passing in the user's details - steam id