const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();

const mysql = require('mysql');
const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
	multipleStatements: true,
});

db.connect(function (err) {
	if (err) console.error(err);
	else console.log('DEBUG: ', 'Connected!');
});

// VIEW SUBMISSIONS BY NAME
const viewByName = require('./controller/viewByName');
app.get('/', viewByName(db));

// VIEW SUBMISSIONS BY DOB
const viewByDob = require('./controller/viewByDob');
app.get('/dob', viewByDob(db));

// DELETE SUBMISSION
const deleteEntry = require('./controller/delete');
app.delete('/', deleteEntry(db));

// FORM SUBMISSION
const singleUpload = require('./multer');
const entry = require('./controller/insert');
app.post('/', singleUpload, entry(db));

// UPDATE SUBMISSION
const updateEntry = require('./controller/update');
app.put('/', updateEntry(db));

// PORT CONTROL
const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`DEBUG: Server listening on port ${port}`);
});
