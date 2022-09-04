const User = require('../models/User')
const steam = require('../config/steamAuth')
const fetch = require('node-fetch')
require('dotenv').config({path: './config/.env'})


async function getSortedGames(req) {
  // fetch req in here, can't normally fetch from the server so installed node-fetch pkg and required it in server.js and here in the steam controller
  // requesting the user's owned games in json format
  // Retrieve the user's owned games using the WebAPI Key provided in .env, along with the user's steam ID, and include extended info for each game.
  // TODO: Automate setting up the WebAPI Key per user and storing in User's document in db, so that a user doesn't need to make their profile public to make use of these features.
  const ownedGamesResponse = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${req.user.steamID}&format=json&include_appinfo=true`)
  const ownedGames = await ownedGamesResponse.json()
  // Presort games by total time played in descending order
  return ownedGames.response.games.sort((a, b) => {
    return b.playtime_forever - a.playtime_forever
  })
}


async function getGameAchievements(appid) {
    //fetch game Schema from Steam Web API, which includes most stats
  const entireGameStatsResponse = await fetch(`https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${process.env.STEAM_API_KEY}&appid=${appid}`)
    const entireGameStats = await entireGameStatsResponse.json()
    if(entireGameStats.game.availableGameStats&&entireGameStats.game.availableGameStats.achievements){
    return entireGameStats.game.availableGameStats.achievements.length
    }
    else{
        return 0
    }
    //from response json object, look at the achievement array and count the elements
    // For an explanation, check the Steam WebAPI docs under:
    // ISteamUserStats Interface > GetSchemaForGame 
    //https://partner.steamgames.com/doc/webapi/ISteamUserStats
}

async function getUserGameAchievements(appid,steamid) {
    //fetch game user stats from Steam Web API, which includes most stats
  const userStatsForGameResponse = await fetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=${process.env.STEAM_API_KEY}&steamid=${steamid}&appid=${appid}`)
  const userStatsForGame = await userStatsForGameResponse.json();
    console.log(userStatsForGame)
    if(userStatsForGame.playerstats&&userStatsForGame.playerstats.achievements){
    return userStatsForGame.playerstats.achievements.length
    }
    else{
        return 0
    }
    //return userStatsForGame.game.availableGameStats.achievements.length
    //from response json object, look at the achievement array and count the elements
    // For an explanation, check the Steam WebAPI docs under:
    // ISteamUserStats Interface > GetUserStatsForGame 
    //https://partner.steamgames.com/doc/webapi/ISteamUserStats
}

async function getPlayerPublicStatus(req) {
  // Check if the user's profile is public
  const playerPublicStatusResponse = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${req.user.steamID}`)
  const playerPublicStatus = await playerPublicStatusResponse.json()
  // For an explanation, check the Steam WebAPI docs under:
  // GetPlayerSummaries (v0002) > Return Value > Public Data > communityvisibilitystate
  // https://developer.valvesoftware.com/wiki/Steam_Web_API
  return playerPublicStatus.response.players[0].communityvisibilitystate === 3
}


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
    try {
      let ownedGamesSorted = await getSortedGames(req)
//      ownedGamesSorted.map((game) => {
//                game.total_achievements= getGameAchievements(game.appid)
//                game.user_achievements = getUserGameAchievements(game.appid,req.params.steamID)
//                return game
//            })
      const playerIsPublic = await getPlayerPublicStatus(req)
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

// sends user to a steam page to login
// user logs in
// redirected to a place of our choosing
// passing in the user's details - steam id
