const User = require('../models/User')
const steam = require('../config/steamAuth')


module.exports = {
  steamLogin: async (req, res) => {
    try {
      const redirectUrl = await steam.getRedirectUrl();
      return res.redirect(redirectUrl);
    } catch (error) {
      console.error(error)
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await steam.authenticate(req);
      // console.log(user)

      // Updates user in db with steamId and steamUsername
      await User.updateOne({"_id": req.user.id}, {$set: {
        steamUserName: `${user.username}`,
        steamID: `${user.steamid}`
      }}, (err, user) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Successfully updated user')
        }
      })

      res.redirect('/todos')
      // updates the user with steamId, owned games, etc
        //redirect to dashboard
    } catch (error) {
      console.error(error);
      // redirect somewhere safe
    }
  }
}

// sends user to a steam page to login
// user logs in
// redirected to a place of our choosing
// passing in the user's details - steam id