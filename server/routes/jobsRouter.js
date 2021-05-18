const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');

// GET jobs for specified user
router.get('/getJobs/:user_id', jobsController.getJobs, (req, res) =>
	res.status(200).json(res.locals.allJobs)
);

//POST job for specified user
router.post('/addJob/', jobsController.addJob, (req, res) =>
	res.status(200).json(res.locals.message)
);

module.exports = router;
