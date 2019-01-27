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
		if (err) {
			cb(err);
			return;
		}
		cb(null, userDocument);
	});
});

passport.use(new LocalStrategy((username, password, next) => {
	User.findOne({ username }, (err, foundUser) => {
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

		debugger;

	//This functionality may be omitted if all user info is stored in JWT payload.
		cb(null, jwtPayload);

	// return User.findOneById(jwtPayload.id)
	// 	.then(user => {
	// 		return cb(null, user);
	// 	})
	// 	.catch(err => {
	// 		return cb(err);
	// 	});
}
));
