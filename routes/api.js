const express = require('express');
const router = express.Router();
let note = require('./note');

// for middleware
// intercepting everything
router.use(function (req, res, next) {
	console.log('API request made: ' + req.originalUrl);
	next(); // passes control to next handler
});

router.use('/note', note);

module.exports = router;