const express = require('express')
const router = express.Router()
const steamController = require('../controllers/steam') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, steamController.steamLogin) 
// This is main route for steam/ , first thing it does is run 'ensureAuth' which is
// imported from middleware/auth.js file getsteam method in todo's controller

// TODO: Suggestions for Steam version of routes (feel free to modify, add to, or remove these comments):
//  rename routes\steam.js to routes\steam.js
//  rename comment occurrences of steam to steam for consistency (to avoid future confusion)
//  refactor steamController to steamController
//  steamController.getGames
//  steamController.getFriends
//  steamController.getAchievements
//  steamController.getStats
// steam-openID would go here too

module.exports = router
