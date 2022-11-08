function deleteEntry(db) {
	return async (req, res) => {
		const q = 'DELETE FROM `SUBMISSIONS` WHERE ID=?;';
		const { id } = req.body;
		await db.query(q, id, (err, results) => {
			if (err) {
				console.error('ERROR: ', err);
				res.json({
					sucess: false,
					status: 'error',
					message: err.message,
				});
			} else {
				console.log('DEBUG: ', results);
				res.json({
					sucess: true,
					status: 'success',
					message: results,
				});
			}
		});
	};
}

module.exports = deleteEntry;
