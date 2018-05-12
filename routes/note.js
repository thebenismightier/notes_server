const express = require('express')
const router = express.Router();
const note_factory = require('../factories/note_factory');

const ID_PATTERN = '[0-9]+';
// for middleware
// intercepting everything
router.use(function (req, res, next) {
	console.log('Note request made: ' + req.originalUrl);
	next(); // passes control to next handler
});

// throw
router.get('/error', (req, res) => {
	throw "Error is thrown";
});

// get all notes
router.get('/all', function (req, res) {
	res.send("Sending all notes.");
});

// creating note 
router.post('/', function (req, res) {
	let noteBody = req.query.noteBody;

	if (noteBody) {
		let noteId;
		res.send(noteBody);
	}
});

// getting note
router.route(`/:noteId(${ID_PATTERN})`)
.get(function (req, res) {
	let noteId = req.params.noteId;

	if (noteId) {	
		let notePromise = new note_factory().getNote(noteId); 
		notePromise.then((result) => {
			res.send(result);
		})
		.catch(function(err) {
			throw err;
		});
	}
	else {
		res.status(422).send('Param noteId required.');
	}
})
// deleting note
.delete(function (req, res) {
	let noteId = req.params.noteId;

	if (noteId) {
		res.send("Deleting " + noteId);
	}
})
// updating note
.put(function (req, res) {
	let noteId = req.params.noteId;
	let noteBody = req.query.noteBody;

	if (noteId && noteBody) {
		res.send("Updating " + noteId + " with '" + noteBody + "'");
	}
	else {
		res.status(422);
		if (!noteId) {
			res.send('Param noteId required.');
		}
		else {
			res.send('Param noteBody required.');
		}
	}
});



module.exports = router;