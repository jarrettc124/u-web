// // grab the mongoose module
// var mongoose = require('mongoose');

// // define our nerd model
// // module.exports allows us to pass this to other files when it is called
// module.exports = mongoose.model('Nerd', {
// 	name : {type : String, default: ''}
// });





var JwtStrategy = require('passport-jwt').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;

// load up the user model
var User = require('../app/models/user');
var config = require('../config/database'); // get db config file
var configAuth = require('./auth'); // get Instagram app credentials

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              console.log("this is the user ", user);
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));

  passport.use(new InstagramStrategy({
      clientID          : configAuth.instagramAuth.clientID,
      clientSecret      : configAuth.instagramAuth.clientSecret,
      callbackURL       : configAuth.instagramAuth.callbackURL,
      passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  },

  function(req, accesstoken, refreshtoken, profile, done) {
      console.log("This is the user", req.account);
      console.log("token is", accesstoken);
      console.log("refreshtoken is", refreshtoken);
      console.log("profile is", profile);
      // asynchronous
      process.nextTick(function() {

          if (!req.user) {

              // find the user in the database based on their instagram id
              User.findOne({ 'instagramId' : profile.id}, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that instagram id, create them
                    var newUser = new User();  

                    // set all of the instagram information in our user model
                    newUser.instagram.id                   = profile.id; // set the users instagram id
                    newUser.instagram.username             = profile.username; // we will save the token that instagram provides to the user
                    newUser.instagram.displayName          = profile.displayName;
                    newUser.instagram.token                = accesstoken; 
                    newUser.instagram.profile_picture      = profile._json.data.profile_picture;

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                        console.log("This is the error" + err.errors); //HERE IS WHERE THE ERROR COMES UP
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }
             });   
          } else {
              User.findById(req.user._id, function(err, user) {
              if (err) {
                done(err, null);
              } else {
                user.instagram.id    = profile.id; // set the users instagram id
                user.instagram.username = profile.username; // we will save the token that instagram provides to the user
                user.instagram.displayName  = profile.displayName;
                user.instagram.token = accesstoken;
                user.instagram.profile_picture = profile._json.data.profile_picture;
                user.save(function(err, user) {
                  if (err) {
                    done(err, null);
                  } else {
                    return done(null, user);
                  }
                });
              }
            });
          }
        });
    }));

};