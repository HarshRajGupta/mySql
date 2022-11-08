const cloudinary = require('cloudinary').v2;
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
	secure: true,
});

const getDataUri = require('../datauri');
function entry(db) {
	return async (req, res) => {
		const myCloud = await cloudinary.uploader.upload(
			getDataUri(req.file).content,
		);
		const q =
			'INSERT INTO `SUBMISSIONS` (`NAME`, `DOB`, `COUNTRY`, `FILEURL`, `ID`) VALUES (?);';
		const { v4: uuidv4 } = require('uuid');
		const value = [
			req.body.name,
			req.body.dob,
			req.body.country,
			myCloud.secure_url,
			uuidv4(),
		];
		await db.query(q, [value], (err, results) => {
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

module.exports = entry;
