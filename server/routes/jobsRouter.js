const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');

// GET jobs for specified user
router.get('/getJobs/:user_id', jobsController.getJobs, (req, res) =>
	res.status(200).json(res.locals.allJobs)
);

//POST job for specified user
router.post('/addJob', jobsController.addJob, (req, res) =>
	res.status(200).json(res.locals.addedJob)
);

//DELETE job for specified user
router.delete('/deleteJob', jobsController.deleteJob, (req, res) =>
	res.status(200).json(res.locals.message)
);

//PATCH specified job for specified user
router.patch('/editJob', jobsController.editJob, (req, res) =>
	res.status(200).json(res.locals.message)
);

module.exports = router;
