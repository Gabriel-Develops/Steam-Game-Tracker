const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: { //storing user's ID with each created 'todo', so each unique user can see the todo's they created on their dashboard
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
