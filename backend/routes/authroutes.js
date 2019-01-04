const express    = require('express');
const authRoutes = express.Router();

const passport   = require('passport');
const bcrypt     = require('bcryptjs');

// the user model
const User       = require('../models/User');

authRoutes.post('/signup', (req, res, next) => {
    const {name, email, password } = req.body;

    if (!name || !password || !email) {
      res.json({ message: 'Provide username and password' });
      return;
    }

    if(password.length < 7){
        res.json({ message: 'Please make your password at least 7 characters long for secutiry purposes.' });
        return;
    }
  
    User.findOne({ email:email }, '_id', (err, foundUser) => {
      if (foundUser) {
        res.json({ message: 'There is already an account with this email address' });
        return;
      }
  
      const salt     = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
  
      const theUser = new User({
        name:name,
        email:email,
        password: hashPass
      });
  
      theUser.save((err) => {
        if (err) {
          res.json({ message: 'Something went wrong saving user to Database' });
          return;
        }
  
        req.login(theUser, (err) => {
          if (err) {
            res.json({ message: 'Something went wrong with automatic login after signup' });
            return;
          }
  
          res.status(200).json(req.user);
        });
        });
      });
    });



    authRoutes.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, theUser, failureDetails) => {
          if (err) {
            res.json({ message: 'Something went wrong authenticating user' });
            return;
          }
      
          if (!theUser) {
            res.json({message: "sorry, we coun't find that account"});
            return;
          }
      
          req.login(theUser, (err) => {
            if (err) {
              res.json({ message: 'Something went wrong logging in' });
              return;
            }
      
            // We are now logged in (notice req.user)
            res.status(200).json(req.user);
          });
        })(req, res, next);
      });

      authRoutes.post('/logout', (req, res, next) => {
        req.logout();
        res.json({ message: 'Success' });
      });

      authRoutes.get('/loggedin', (req, res, next) => {
        if (req.user) {
          res.status(200).json(req.user);
          return;
        }
        res.status(403).json({ message: 'Unauthorized' });
      });


module.exports = authRoutes;

