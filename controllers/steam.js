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
      }}, (err, user) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Successfully updated user')
          res.redirect(`/steam/${user.steamID}`)
        }
      })
      // updates the user with steamID, owned games, etc
        //redirect to dashboard
    } catch (error) {
      console.error(error);
    }
  },
  
  //req.params = { steamID: < user steam ID here> }
  //also having ensureAuth passes in the current user
  getGames: async (req, res) => {
    console.log(req.user)
      try {
        // we need something like a fetch request here
        // import fetch from 'node-fetch' ... install this?

        const response = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${req.user.steamID}&format=json`);
        const ownedGames = await response.json()
        let games = []
        ownedGames.response.games.forEach(game => {
           games.push(game.appid)
        })
        console.log(games)
        await User.updateOne({"_id": req.user.id}, {$set: {
          gamesOwned: games,
        }}, (err, user) => {
          if (err) {
            console.log(err)
          } else {
            console.log('Successfully updated user')
            res.render('dashboard.ejs', {user: req.user})
          }
        })
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