const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

// Embedded document for game info retrieved from Steam API
const GameSchema = new mongoose.Schema({
    appid: Number,
    name: String,
    playtime_forever: Number,
    img_icon_url: String,
    has_community_visible_stats: Boolean,
    playtime_windows_forever: Number,
    playtime_mac_forever: Number,
    playtime_linux_forever: Number,
    rtime_last_played: Number
})

// Embedded document for game info retrieved from Steam API
const RecentGameSchema = new mongoose.Schema({
    appid: Number,
    name: String,
    playtime_2weeks: Number,
    playtime_forever: Number,
    img_icon_url: String,
    playtime_windows_forever: Number,
    playtime_mac_forever: Number,
    playtime_linux_forever: Number,
})

const UserSchema = new mongoose.Schema({
  //Won't be using userName
  //userName: { type: String, unique: true },
  email: { 
    type: String, 
    unique: true },
  password: String,
  steamUserName: String,
  steamID: String,
  // Array of game objects containing info about each of the user's owned games
  ownedGames: [GameSchema]
})


// Password hash middleware.
 
 UserSchema.pre('save', function save(next) {
  const user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})


// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}


module.exports = mongoose.model('User', UserSchema)
