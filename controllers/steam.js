const User = require('../models/User')
const steamAuth = require('../config/steamAuth')
const steam = require('../middleware/steam')
require('dotenv').config({path: './config/.env'})

module.exports = {
  steamLogin: async (req, res) => {
    console.log(req.params)
    try {
      const redirectUrl = await steamAuth.getRedirectUrl();
      return res.redirect(redirectUrl);
    } catch (error) {
      console.log(error)
    }
  },

  updateUser: async (req, res) => {
    console.log(req.params)
    try {
      const user = await steamAuth.authenticate(req);
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
      console.log(error);
    }
  },
  
  //req.params = { steamID: < user steam ID here> }
  //also having ensureAuth passes in the current user
  getGames: async (req, res) => {
    try {
      let ownedGamesSorted = await steam.getSortedGames(req)
//      ownedGamesSorted.map((game) => {
//                game.total_achievements= getGameAchievements(game.appid)
//                game.user_achievements = getUserGameAchievements(game.appid,req.params.steamID)
//                return game
//            })
      const playerIsPublic = await steam.getPlayerPublicStatus(req)
      console.log("🐟 Player is public?", playerIsPublic)
      // updating the user DB to reflect any updates
      await User.updateOne({"_id": req.user.id}, {$set: {
        ownedGames: ownedGamesSorted,
      }})

      res.render('dashboard.ejs', {
        user: req.user,
        games: ownedGamesSorted,
        playerIsPublic
      })
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
