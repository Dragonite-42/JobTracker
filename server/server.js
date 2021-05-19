const express = require('express');
const path = require('path');
const app = express();

const jobsRouter = require('./routes/jobsRouter');
const userRouter = require('./routes/userRouter');

const PORT = 3000;
const cors = require('cors');

// handle parsing request body
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// handle requests for static files
app.use(express.static(path.resolve(__dirname, '../client')));

// Renders homepage
// app.get('/', (req, res) => {
// 	res.render('../client/index.html');
// });

// handle routes
app.use('/jobs', jobsRouter);
app.use('/users', userRouter);

//catch-all error handler for unknown routes
app.use('*', (req, res) => res.sendStatus(404));

//global error handler
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 500,
	};
	const errorObj = Object.assign({}, defaultErr, err);
	console.log('ERROR TYPE: ', err);
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
	console.log(`Server is listening on: localhost:${PORT}`);
});

module.exports = app;
