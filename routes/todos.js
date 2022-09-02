const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos) 
// This is main route for todos/ , first thing it does is run 'ensureAuth' which is
// imported from middleware/auth.js file getTodos method in todo's controller

// TODO: Suggestions for Steam version of routes (feel free to modify, add to, or remove these comments):
//  rename routes\todos.js to routes\steam.js
//  rename comment occurrences of todos to steam for consistency (to avoid future confusion)
//  refactor todosController to steamController
//  steamController.getGames
//  steamController.getFriends
//  steamController.getAchievements
//  steamController.getStats

router.post('/createTodo', todosController.createTodo)

router.put('/markComplete', todosController.markComplete)

router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router