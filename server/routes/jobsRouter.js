const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');

// GET jobs for specified user
router.get('/getJobs/:user_id', jobsController.getJobs, (req, res) =>
	res.status(200).json(res.locals.allJobs)
);

module.exports = router;
