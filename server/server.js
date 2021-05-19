// Bring in env variables if in development mode
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const path = require('path');
const jobsRouter = require('./routes/jobsRouter');
const userRouter = require('./routes/userRouter');
const app = express();

const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const initializePassport = require('./passport-config');
// second parameter, function, gets user by username
initializePassport(
	passport,
	(username) => users.find((user) => user.username === username),
	(id) => users.find((user) => user.id === _id)
);

const PORT = 3000;

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false, // don't save session variables if nothing  has changed
		saveUninitialized: false, // don't save empty value in session if there's no value
	})
);
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
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
	console.log(`Server is listening on: localhost:${PORT}`);
});

module.exports = app;
