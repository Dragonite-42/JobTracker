const db = require('../models/query');

const jobsController = {};

// GET jobs from jobs table
jobsController.getJobs = (req, res, next) => {
	const user_id = parseInt(req.params.user_id);
	const queryString = `SELECT * FROM jobs WHERE user_id=${user_id}`;
	db.query(queryString)
		.then((jobs) => {
			res.locals.allJobs = jobs.rows;
			return next();
		})
		.catch((err) => next(err));
};

module.exports = jobsController;
