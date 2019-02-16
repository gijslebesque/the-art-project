const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');
const bcrypt        = require('bcryptjs');
const passport      = require('passport');
const passportJWT 	= require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT 	= passportJWT.ExtractJwt;

passport.serializeUser((loggedInUser, cb) => {
	cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
	
	User.findById(userIdFromSession, (err, userDocument) => {
		debugger;
		if (err) {
			cb(err);
			return;
		}
		cb(null, userDocument);
	});
});



passport.use(new LocalStrategy((username, password, next) => {
	//Update to find by email
	User.findOne({ username }, (err, foundUser) => {
		debugger;
		if (err) {
			next(err);
			return;
		}

		if (!foundUser) {
			next(null, false, { message: 'Incorrect username' });
			return;
		}

		if (!bcrypt.compareSync(password, foundUser.password)) {
			next(null, false, { message: 'Incorrect password' });
			return;
		}
		
		next(null, foundUser);
	});
}));

passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey   : process.env.SECRET
	},
	(jwtPayload, cb) => {
		cb(null, jwtPayload);

	}
));
