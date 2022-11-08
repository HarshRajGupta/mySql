function updateEntry(db) {
	return async (req, res) => {
		const { id, name, dob } = req.body;
        console.log('DEBUG: ', id, name, dob);
		if (!id || (!name && !dob))
			return res.json({
				sucess: false,
				status: 'error',
				message: 'Please provide an ID and a name or dob',
			});
		if (name) {
			const q = `UPDATE FROM 'SUBMISSIONS' SET 'NAME' = '${name}' WHERE ID = '${id}';`;
			await db.query(q, (err, results) => {
				if (err) {
					console.error('ERROR: ', err);
					res.json({
						sucess: false,
						status: 'error',
						message: err.message,
					});
				}
			});
		}
		if (dob) {
			const q = `UPDATE FROM SUBMISSIONS SET DOB=${dob} WHERE ID=${id};`;
			await db.query(q, (err, results) => {
				if (err) {
					console.error('ERROR: ', err);
					res.json({
						sucess: false,
						status: 'error',
						message: err.message,
					});
				}
			});
		}
		const q = `SELECT * FROM SUBMISSIONS WHERE ID=${id};`;
		await db.query(q, (err, results) => {
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

module.exports = updateEntry;
