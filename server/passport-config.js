// PASSPORT SETUP
// npm i passport passport-local express-session express-flash

// create passport-config.js to modularize passport logic, inside initialize function
// require initialize into server.js
// invoke with passport from passport package

// To use local version of passport
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');

// initialize function contains logic, to be invoked in server.js
const initialize = (passport, getUserByUsername, getUserById) => {
	// authentiates user
	const authenticateUser = async (username, password, done) => {
		// console.log('USERNAME', username);
		const user = await getUserByUsername(username);
		// console.log('USER DATA HERE:', user);
		if (user === null) {
			return done(null, false, { message: 'No user with that email' });
		}
		// console.log('passport-config pw check', password, user.hashed_password);
		try {
			if (bcrypt.compareSync(password, user.hashed_password)) {
				// If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.
				// console.log('PASSWORD CORRECT');
				return done(null, user);
			} else {
				// If the credentials are not valid (for example, if the password is incorrect), done should be invoked with false instead of a user to indicate an authentication failure.
				// An additional info message can be supplied to indicate the reason for the failure. This is useful for displaying a flash message prompting the user to try again.
				// console.log('PASSWORD INCORRECT');
				return done(null, false, { message: 'Password incorrect' });
			}
		} catch (e) {
			// if an exception occurred while verifying the credentials (for example, if the database is not available), done should be invoked with an error, in conventional Node style.
			return done(e);
		}
	};

	// pass in what our username is called. password defaults to password
	passport.use(new LocalStrategy({ username: 'username' }, authenticateUser));
	passport.serializeUser((user, done) => {
		// console.log('USER', user);
		done(null, user._id);
	}); // save id into session
	passport.deserializeUser((id, done) => {
		// console.log('USERBYID', getUserById(id));
		return done(null, getUserById(id));
	});
};

module.exports = initialize;
