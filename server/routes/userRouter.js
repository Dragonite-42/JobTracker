const express = require('express');
const router = express.Router();
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
router.get('/login', userController.verifyUser, (req, res) => {
	res.status(200).json(res.locals.msg);
});

// Logout
router.get('/logout', userController.logout, (req, res) => {
	res.status(200).json(res.locals.msg);
});

module.exports = router;
