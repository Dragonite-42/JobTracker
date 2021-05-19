const db = require('../models/query');
const bcrypt = require('bcryptjs');

const userController = {};

// CREATE new user account
userController.addUser = (req, res, next) => {
	const { firstname, lastname, username, email, password } = req.body;
	const salt = bcrypt.genSaltSync(10);
	const hashed_password = bcrypt.hashSync(password, salt);
	const queryString = `INSERT INTO users(firstname,
		lastname,
		username,
    email,
		hashed_password)
    VALUES('${firstname}', '${lastname}', '${username}', '${email}', '${hashed_password}')`;
	db.query(queryString)
		.then(() => {
			console.log('success');
			return next();
		})
		.catch((err) => {
			// res.redirect('/createAccount');
			return next({ log: err, message: 'userController.addUser failed' });
		});
};

// DELETE user account
userController.deleteUser = (req, res, next) => {
	const { id } = req.body;
	console.log('id', id);
	const query = `DELETE FROM users WHERE _id=${id}`;
	db.query(query)
		.then(() => {
			return next();
		})
		.catch((err) => next(err));
};

// VERIFY user exists
userController.verifyUser = (req, res, next) => {
	const { username, password } = req.body;
	const queryString = `SELECT * FROM users WHERE username='${username}'`;

	db.query(queryString)
		.then((user) => {
			// check if username exists on users table
			if (user.rows.length === 0) {
				res.locals.msg =
					'The username and password you entered did not match our records. Please double-check and try again.';
				return next();
			}

			// verify login information
			// console.log(
			// 	'userController HEREEEE',
			// 	password,
			// 	user.rows[0].hashed_password
			// );
			const verified = bcrypt.compareSync(
				password,
				user.rows[0].hashed_password
			);

			if (verified) {
				res.locals.msg = 'You have been successfully logged in.';
			} else {
				res.locals.msg =
					'The username and password you entered did not match our records. Please double-check and try again.';
			}
			return next();
		})
		.catch((err) => next(err));
};

// LOGOUT
userController.logout = (req, res, next) => {
	res.locals.msg = "You're logged out!";
	return next();
};

// Check for user authentication
userController.checkAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
};

module.exports = userController;
