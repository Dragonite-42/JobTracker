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

// POST job to jobs table
jobsController.addJob = (req, res, next) => {
	console.log('req.body', req.body)
	const {
		user_id,
		company_name,
		job_title,
		notes,
		progression,
		next_appointment,
		contact,
	} = req.body;
	const addJobQuery = `
	INSERT INTO jobs (user_id, company_name, job_title, notes, progression, next_appointment, contact)
	VALUES ($1, $2, $3, $4, $5, $6, $7)`;

	const values = [
		user_id,
		company_name,
		job_title,
		notes,
		progression,
		next_appointment,
		contact,
	];

	db.query(addJobQuery, values)
		.then((addedJob) => {
			console.log(addedJob)
			res.locals.message = 'Job has been successfully added';
			return next();
		})
		.catch((err) =>
			next({ message: 'Error has occured at jobsController.addJob' })
		);
};

// DELETE job from jobs table
jobsController.deleteJob = (req, res, next) => {
	const { id } = req.body;
	const deleteJobQuery = `DELETE FROM jobs WHERE _id=${id}`;

	db.query(deleteJobQuery)
		.then((deletedJob) => {
			res.locals.message = 'Job has been successfully removed';
			return next();
		})
		.catch((err) =>
			next({ message: 'Error has occured at jobsController.deleteJob' })
		);
};

// PATCH (edit) specified job from jobs table
jobsController.editJob = (req, res, next) => {
	const { jobId, next_appointment, progression, notes } = req.body;

	let editJobQuery = `SET `;
	const values = [];

	if (next_appointment) {
		editJobQuery += 'next_appointment = $1';
		values.push(next_appointment);
	} else if (progression) {
		editJobQuery += 'progression = $1';
		values.push(progression);
	} else {
		editJobQuery += `notes = $1`;
		values.push(notes);
	}

	const complete = `UPDATE jobs ` + editJobQuery + ` WHERE _id=${jobId} `;

	db.query(complete, values)
		.then((editedJob) => {
			res.locals.message = 'Job has been successfully edited';
			return next();
		})
		.catch((err) => {
			console.log(err);
			return next({ message: 'Error has occured at jobsController.deleteJob' });
		});
};

module.exports = jobsController;
