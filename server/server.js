const express = require('express');
const path = require('path');
const app = express();

const jobsRouter = require('./routes/jobsRouter');
const PORT = 3000;

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle requests for static files
app.use(express.static(path.resolve(__dirname, '../client')));

// handle routes
app.use('/jobs', jobsRouter);

//catch-all error handler for unknown routes
app.use('*', (req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 500,
	};
	const errorObj = Object.assign({}, defaultErr, err);
	return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
	console.log(`Server is listening on: localhost:${PORT}`);
});

module.exports = app;
