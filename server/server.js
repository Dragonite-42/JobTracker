// Bring in env variables if in development mode
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const jobsRouter = require('./routes/jobsRouter');
const userRouter = require('./routes/userRouter');
const app = express();
const db = require('./models/query');

const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const getUserByUsername = async (username) => {
	let userData;
	const queryString = `SELECT * FROM users WHERE username='${username}'`;
	await db
		.query(queryString)
		.then((user) => {
			// console.log('rows', user.rows);
			// console.log('rows length', user.rows.length);
			// console.log('rows[0]', user.rows[0]);
			if (user.rows.length !== 0) {
				// console.log('user found:', user.rows[0]);
				userData = user.rows[0];
			} else {
				// console.log('user not found');
				return null;
			}
			// return user.row.length;
			// return next();
		})
		.catch((err) => {
			// console.log(err);
			return null;
			// return next({ log: err, message: 'username not found' });
		});
	return userData;
};

const getUserById = async (id) => {
	let userData;
	const queryString = `SELECT * FROM users WHERE _id=${id}`;
	await db
		.query(queryString)
		.then((user) => {
			if (user.rows.length !== 0) {
				// console.log('USER FOUND BY ID:', user.rows[0]);
				userData = user.rows[0];
			} else {
				console.log('user not found');
				return null;
			}
			// return user.row.length;
			// return next();
		})
		.catch((err) => {
			console.log('ERROR HERE', err);
			return null;
			// return next({ log: err, message: 'username not found' });
		});
	return userData;
};

const initializePassport = require('./passport-config');
// second parameter, function, gets user by username
initializePassport(
	passport,
	getUserByUsername,
	getUserById
	// REFACTOR getUserByUsername and getUserById to look at database
	// (username) => users.find((user) => user.username === username), // getUserByUsername
	// (id) => users.find((user) => user.id === _id) // getUserById
);

const PORT = 3000;
const cors = require('cors');

// handle parsing request body
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());
// app.use(express.cookieParser());
// app.use(express.bodyParser());

app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false, // don't save session variables if nothing  has changed
		saveUninitialized: false, // don't save empty value in session if there's no value
	})
);

// In a Connect or Express-based application, passport.initialize() middleware is required to initialize Passport. If your application uses persistent login sessions, passport.session() middleware must also be used.
app.use(passport.initialize());
app.use(passport.session()); // store variables to persist across entire session

// handle requests for static files
app.use(express.static(path.resolve(__dirname, '../client')));

// // Check for user authentication
// const checkAuthenticated = (req, res, next) => {
// 	if (req.isAuthenticated()) {
// 		return next();
// 	}

// 	res.redirect('/login');
// };

// Renders homepage
app.get('/', (req, res) => {
	res.render('../client/index.html'); // could add user's name here
});

app.get('/loginpage', (req, res) => {
	res.render('../client/login.html');
});

// handle routes
app.use('/jobs', jobsRouter);
app.use('/users', userRouter);

//catch-all error handler for unknown routes
app.use('*', (req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 500,
	};
	const errorObj = Object.assign({}, defaultErr, err);
	console.log('ERROR TYPE: ', err);
	console.log('errerObj log', errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
	console.log(`Server is listening on: localhost:${PORT}`);
});

module.exports = app;
