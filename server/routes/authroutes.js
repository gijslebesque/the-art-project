const express    = require('express');
const authRoutes = express.Router();
const jwt        = require('../config/jwt');
const passport   = require('passport');
const bcrypt     = require('bcryptjs');

const User       = require('../models/User');

authRoutes.post('/register', (req, res, next) => {
    const {username, email, password } = req.body;

    if (!username || !password || !email) {
      res.json({ message: 'Provide username and password' });
      return;
    }

    if(password.length < 7){
        res.json({ message: 'Please make your password at least 7 characters long for secutiry purposes.' });
        return;
    }
  
    User.findOne({ $or:[{username: username}, {email:email}] }, '_id', (err, foundUser) => {
        if (foundUser) {
            res.json({ message: 'There is already an account with this email address or username' });
            return;
        }
  
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
    
        const theUser = new User({
            username:username,
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
                let token = jwt.generateToken(req.user);
                res.status(200).json({user: req.user, token:token});
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
            res.status(500).json({message: "sorry, we coun't find that account"});
            return;
        }
    
        req.login(theUser, {session: false}, (err) => {
            if (err) {
                res.status(500).json({ message: 'Something went wrong logging in' });
                return;
            }
        
            let token = jwt.generateToken(req.user);
            res.status(200).json({user: req.user, token:token});
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


authRoutes.get('/getUserInfo', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json(req.user);
});


module.exports = authRoutes;

