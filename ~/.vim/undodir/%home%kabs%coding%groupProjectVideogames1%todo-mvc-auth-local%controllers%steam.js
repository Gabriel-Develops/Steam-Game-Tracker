Vim�UnDo� ��N���1����0�)�1���!c7M5��                                       coc    _�                            ����                                                                                                                                                                                                                                                                                                                                                             c_�     �          8      &const Todo = require('../models/Todo')5��                                                5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             c_�     �          8      'const Todo = require('../models/Steam')5��                                                5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             c`     �   1   3          '            console.log('Deleted Todo')�   0   2          H            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})�   -   /          #    deleteTodo: async (req, res)=>{�   $   &          I            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{�                I            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{�                /            console.log('Todo has been added!')�                _            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})�                #    createTodo: async (req, res)=>{�      
          ^            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})�      	          C            const todoItems = await Todo.find({userId:req.user.id})�                     getTodos: async (req,res)=>{�          8      &const Todo = require('../models/User')5��                                              �                        C                     �       $                 �                     �       $                 -                    �       
                                     �                        I                    �                        �                    �                        t                    �    $                    �                    �    -   
                 �                    �    0                    /                    �    1   !                 �                    5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             c`     �   0   2          I            await Steam.findOneAndDelete({_id:req.body.todoIdFromJSFile})�   .   0          .        console.log(req.body.todoIdFromJSFile)�   $   &          J            await Steam.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{�                J            await Steam.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{�                "            res.redirect('/todos')�                `            await Steam.create({todo: req.body.todoItem, completed: false, userId: req.user.id})�   	             X            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})�      	          D            const todoItems = await Steam.find({userId:req.user.id})�         8      :            // Finding the todo's for the specific user ID5��                        �                     �                        �                     �    	                    �                    �                         Z                    �                        �                    �       7                 �                    �    $   7                 �                    �    .                                        �    0   7                 \                    5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             c`(     �         9       �         8    5��                          (                      �                          (                      �                         (                     �                         (                     �                         (                     �                         (                     �                        *                     5�_�      	                     ����                                                                                                                                                                                                                                                                                                                                                             c`B     �         9      const openID = require5��                         >                      5�_�      
           	          ����                                                                                                                                                                                                                                                                                                                                                             c`C     �         9      const openID = require()5��                         ?                      5�_�   	              
          ����                                                                                                                                                                                                                                                                                                                                                             c`d     �         :       �         :    �         9    5��                          C                      �                       /   C               /       5�_�   
                        ����                                                                                                                                                                                                                                                                                                                                                             c`g    �                const openID = require('')5��                          (                      5�_�                       .    ����                                                                                                                                                                                                                                                                                                                                                             c`�     �                /const SteamAuth = require("node-steam-openid");5��                          (       0               5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             cb�     �         8    �         8    5��                          (                      5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             cb�     �                 5��                          (                      5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             cb�    �         8    �         8    5��                          (               0       5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             chm     �                /const SteamAuth = require("node-steam-openid");5��                          (       0               5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             cho     �         9       �         8    5��                          (                      �                          (                      �                        4                     �                         .                      5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             chv     �          9      'const Steam = require('../models/User')5��                                              �        	                 	                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             ch{     �         9      const 5��                         -                      �                        2                     �                         <                      5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             ch~     �         9      const steam = require5��                         <                      5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             ch~     �         9      const steam = require()5��                         =                      5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             ch�    �         9      const steam = require('')5��                         >                      �                        A                     �                        A                     �                     
   A              
       �       !              	   H              	       �       !       	       	   H       	       	       �       !       	       	   H       	       	       5�_�                           ����                                                                                                                                                                                                                                                                                                                                      8          V       ch�     �             4   !    getSteams: async (req,res)=>{           console.log(req.user)           try{   ;            // Finding the steam's for the specific user ID   E            const steamItems = await Steam.find({userId:req.user.id})   _            const itemsLeft = await Steam.countDocuments({userId:req.user.id,completed: false})   Y            res.render('steams.ejs', {todos: todoItems, left: itemsLeft, user: req.user})           }catch(err){               console.log(err)   	        }       },   $    createSteam: async (req, res)=>{           try{   a            await Steam.create({steam: req.body.todoItem, completed: false, userId: req.user.id})   0            console.log('Steam has been added!')   #            res.redirect('/steams')           }catch(err){               console.log(err)   	        }       },   %    markComplete: async (req, res)=>{           try{   K            await Steam.findOneAndUpdate({_id:req.body.steamIdFromJSFile},{                   completed: true               })   *            console.log('Marked Complete')   '            res.json('Marked Complete')           }catch(err){               console.log(err)   	        }       },   '    markIncomplete: async (req, res)=>{           try{   K            await Steam.findOneAndUpdate({_id:req.body.steamIdFromJSFile},{                    completed: false               })   ,            console.log('Marked Incomplete')   )            res.json('Marked Incomplete')           }catch(err){               console.log(err)   	        }       },   $    deleteSteam: async (req, res)=>{   /        console.log(req.body.steamIdFromJSFile)           try{   J            await Steam.findOneAndDelete({_id:req.body.steamIdFromJSFile})   (            console.log('Deleted Steam')   "            res.json('Deleted It')           }catch(err){               console.log(err)   	        }       }5��           4               h       �              5�_�                            ����                                                                                                                                                                                                                                                                                                                                                V       ch�     �             5��                          h                      �                          h                      5�_�                           ����                                                                                                                                                                                                                                                                                                                                                V       ch�     �                   5��                         i                      �                         h                     �                         h                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                V       ci     �                   5��                         k                      �                         h                     �                         w                      5�_�                           ����                                                                                                                                                                                                                                                                                                                                                V       ci"     �                   steamLogin:  5��                         x                      5�_�                            ����                                                                                                                                                                                                                                                                                                                                                V       cob    �                   steamLogin: () 5��                         y                      �                         y                      5�_�                            ����                                                                                                                                                                                                                                                                                                                                                V       ch�     �      9        5��           4               h       �              5�_�                            ����                                                                                                                                                                                                                                                                                                                                                             c_�     �         8           getsteam: async (req,res)=>{�   	             X            res.render('steam.ejs', {steam: todoItems, left: itemsLeft, user: req.user})�                "            res.redirect('/steam')5��                        B                     �    	                    }                    �    	   %                 �                    �                        �                    5�_�                             ����                                                                                                                                                                                                                                                                                                                                                             c_�     �          8      'const Todo = require('../models/Steam')5��                                                5��