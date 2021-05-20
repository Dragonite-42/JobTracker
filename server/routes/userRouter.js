const express = require('express');
const router = express.Router();
const passport = require('passport');
const jobsController = require('../controllers/jobsController');
const userController = require('../controllers/userController');

// Create a user account
router.post(
	'/createAccount',
	userController.addUser,
	(req, res) => res.status(200).json({ success: true })
	// res.redirect('/login');
);

// Delete a user account
router.delete('/deleteAccount', userController.deleteUser, (req, res) =>
	res.status(200).json({ success: true })
);

// router.get('/loginpage', (req, res) => {
// 	res.redirect('../../client/index.html');
// });

// Verify user
router.post(
	'/login',
	userController.verifyUser,
	// use passport.authenticate(), specifying the 'local' strategy, to authenticate requests
	passport.authenticate('local', {
		// successRedirect: '/', // routes not working
		// failureRedirect: '/',
		// failureRedirect: '/loginpage', // change this to page you want to redirect to
		// failureFlash: true, // displays message to user from getUserByUsername
		failureFlash: 'Please try again', // displays message to user from getUserByUsername
	}),
	(req, res) => {
		console.log('res.req.session', res.req.session);
		console.log('res.req.session.auth', res.req.session.auth);
		res.locals.auth = res.req.session.auth;
		// res.status(200).json(res.req.session.auth);
		res.status(200).json(res.locals.auth);
	}
);

router.get('/checkSession', (req, res) => {
	console.log('/checkSession route');
	// console.log('req.session', req.session);
	res.locals.auth = { auth: req.session.auth };
	console.log('res.locals.auth', req.session.auth);
	res.status(200).json(res.locals.auth);
});

// Logout
router.get('/logout', userController.logout, (req, res) => {
	req.logOut(); // from passport. clears sessions and logs user out
	res.redirect('/');
	// res.status(200).json(res.locals.msg);
});

// maybe turn this into another middleware
// router.delete('/logout', (req, res) => {
// 	// need npm i method-override to call delete function from html
// 	req.logOut(); // from passport. clears sessions and logs user out
// 	res.redirect('/login');
// });

module.exports = router;
