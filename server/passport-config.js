// PASSPORT SETUP
// npm i passport passport-local express-session express-flash

// create passport-config.js to modularize passport logic, inside initialize function
// require initialize into server.js
// invoke with passport from passport package

// To use local version of passport
const LocalStrategy = require('passport-local');

const bcrypt = require('bcryptjs');

// initialize function contains logic, to be invoked in server.js
const initialize = (passport, getUserByUsername, getUserById) => {
	// authentiates user
	const authenticateUser = (username, password, done) => {
		const user = getUserByUsername(username);
		if (user === null) {
			return done(null, false, { message: 'No user with that email' });
		}

		try {
			if (bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, { message: 'Password incorrect' });
			}
		} catch (e) {
			return done(e);
		}
	};

	// pass in what our username is called. password defaults to password
	passport.use(new LocalStrategy({ username: 'username' }, authenticateUser));
	passport.serializeUser((user, done) => done(null, user.id)); // save id into session
	passport.deserializeUser((id, done) => {
		return done(null, getUserById(id));
	});
};

module.exports = initialize;
