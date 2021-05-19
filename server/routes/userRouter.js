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

// Verify user
router.get(
	'/login',
	userController.verifyUser,
	// use passport.authenticate(), specifying the 'local' strategy, to authenticate requests
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true, // displays message to user from getUserByUsername
	}),
	(req, res) => {
		res.status(200).json(res.locals.msg);
	}
);

// Logout
router.get('/logout', userController.logout, (req, res) => {
	req.logOut(); // from passport. clears sessions and logs user out
	// res.redirect('/login');
	res.status(200).json(res.locals.msg);
});

// maybe turn this into another middleware
// router.delete('/logout', (req, res) => {
// 	// need npm i method-override to call delete function from html
// 	req.logOut(); // from passport. clears sessions and logs user out
// 	res.redirect('/login');
// });

module.exports = router;
