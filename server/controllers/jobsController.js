const db = require('../models/jobModels');

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

// POST job to jobs table
jobsController.addJob = (req, res, next) => {
	console.log('we are in jobController')
	console.log(req.body);
	const { userId, companyName, jobTitle, jobDescriptionLink, progression, nextAppointment, contact, entryPoint, offer } = req.body
	const addJobQuery = `
	INSERT INTO jobs (user_id, company_name, job_title, job_description_link, progression, next_appointment, contact, entry_point, offer)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

	const values = [userId, companyName, jobTitle, jobDescriptionLink, progression, nextAppointment, contact, entryPoint, offer]

	db.query(addJobQuery, values)
		.then((addedJob) => {
			res.locals.message = 'Job has been successfully added';
			return next();
		})
		.catch((err) => next({message: 'Error has occured at jobsController.addJob'}));
}

module.exports = jobsController;
