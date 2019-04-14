const morgan = require('morgan');

// Basic stdout stream logger
const logger = morgan(function (tokens, req, res) {
	let body = Object.assign({}, req.body);
	
	delete body.password;
	delete body.retype;
	delete body.access_token;

	let uid = 'uid=N/A';
	if (req.user && req.user.uid)
		uid = 'uid='+req.user.uid;

	let url = tokens.url(req, res).split('token=')[0]

	return [
		uid,
		new Date(),
		req.headers['x-real-ip'], // get the real IP and not localhost (need to configure NGINX for this)
		tokens['remote-user'](req, res)	,
		tokens.method(req, res),
		url,
		tokens.status(req, res),
		tokens['response-time'](req, res) + ' ms',
		JSON.stringify(body)
	].join(' ')
});

module.exports = logger;