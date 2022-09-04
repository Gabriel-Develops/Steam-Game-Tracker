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
    console.log(req.user)
      try {
        // fetch req in here, can't normally fetch from the server so installed node-fetch pkg and required it in server.js and here in the steam controller
        // requesting the user's owned games in json format
        console.log("Requesting with Steam ID:", req.user.steamID)
        const response = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${req.user.steamID}&format=json`);
        const ownedGames = await response.json()
        const games = []
        // pushing each appID to the games array
        ownedGames.response.games.forEach(game => {
           games.push(game.appid)
        })
        // updating the user DB to reflect any updates
        await User.updateOne({"_id": req.user.id}, {$set: {
          gamesOwned: games,
        }})
        console.log('Successfully updated user')
        res.render('dashboard.ejs', {user: req.user})
        } catch (err){
      console.log(err)
      res.redirect('/')
    }
  },

  //req.params = { steamID: < user steam ID here>, appId: < steam appID here > }
  getGameData: (req,res) => {
    console.log(req.params)
    res.render('todos.ejs')
  }
}

// sends user to a steam page to login
// user logs in
// redirected to a place of our choosing
// passing in the user's details - steam id