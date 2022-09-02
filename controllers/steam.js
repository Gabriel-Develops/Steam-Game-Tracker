const User = require('../models/User')
const steam = require('../config/steamAuth')

module.exports = {
    getSteams: async (req,res)=>{
        console.log(req.user)
        try{
            // Finding the steam's for the specific user ID
            const steamItems = await Steam.find({userId:req.user.id})
            const itemsLeft = await Steam.countDocuments({userId:req.user.id,completed: false})
            res.render('steams.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createSteam: async (req, res)=>{
        try{
            await Steam.create({steam: req.body.todoItem, completed: false, userId: req.user.id})
            console.log('Steam has been added!')
            res.redirect('/steams')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Steam.findOneAndUpdate({_id:req.body.steamIdFromJSFile},{
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
            await Steam.findOneAndUpdate({_id:req.body.steamIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteSteam: async (req, res)=>{
        console.log(req.body.steamIdFromJSFile)
        try{
            await Steam.findOneAndDelete({_id:req.body.steamIdFromJSFile})
            console.log('Deleted Steam')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    
