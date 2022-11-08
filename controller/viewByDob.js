function viewByDob(db) {
	return async (req, res) => {
		const q = 'SELECT * FROM `SUBMISSIONS` ORDER BY `DOB`;';
		await db.query(q, (err, results) => {
			if (err) {
				console.error('ERROR: ', err);
				res.send(err);
			} else {
				console.log('DEBUG: ', results);
				res.send(results);
			}
		});
	};
}

module.exports = viewByDob;
