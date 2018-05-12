const express = require('express')
const app = express()
let api = require('./routes/api');

// for middleware
// intercepting everything
app.use(function (req, res, next) {
	console.log('Request made: ' + req.originalUrl);
	next();
});

app.get('/hello', (req, res) => res.send('Hello World!'))


function errorHandler (err, req, res, next) {
	res.status(500);
	res.send(err);
}


app.use('/api', api);
app.use(errorHandler);

app.listen(3000, () => console.log('Example app listening on port 3000!'))