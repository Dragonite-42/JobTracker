const { Pool } = require('pg');

const PG_URI =
	'postgres://zdkkkscr:g4D1FGXn45XwqAn6lW__kVGIAjt5XNfD@queenie.db.elephantsql.com/zdkkkscr';

const pool = new Pool({
	connectionString: PG_URI,
});

module.exports = {
	query: (text, params, callback) => {
		return pool.query(text, params, callback);
	},
};
