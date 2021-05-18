const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client')));

app.listen(PORT, () => {
	console.log(`Server is listening on: localhost:${PORT}`);
});

module.exports = app;
