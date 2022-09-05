const Todo = require('../models/Todo')

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
    // console.log(userStatsForGame)
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

module.exports = {
    getTodos: async (req,res)=>{
        console.log('es',req.params)
        try{
            // Finding the todo's for the specific user ID
            const totalAchievements = await getGameAchievements(req.params.appID)
            const userAchievements = await getUserGameAchievements(req.params.appID,req.params.steamID)
            const todoItems = await Todo.find({userId:req.user.id, appId: req.params.appID})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false, appId: req.params.appID})
            console.log('todoItems', todoItems, itemsLeft)
            res.render('todos.ejs', {
                gameName: req.params.gameName,
                todos: todoItems, 
                left: itemsLeft, 
                user: req.user, 
                appID: req.params.appID,
                totalAchievements: totalAchievements,
                userAchievements: userAchievements,
            })
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        console.log(req.params)
        try{
            await Todo.create({
                todo: req.body.todoItem, 
                completed: false, 
                userId: req.user.id,
                steamId: req.params.steamID,
                appId: req.params.appID
            })
            console.log('Todo has been added!')
            res.redirect(`/todos/${req.user.steamID}/${req.params.appID}`)
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    
