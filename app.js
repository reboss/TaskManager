"use strict"

const express = require('express'),
	http = require('http'),
	bodyParser = require('body-parser'),
	path = require('path');

const app = express();

// try loading in a configuration file
try {
	require("./config/.env");
} catch (e) {
	console.log("No environment file found");
}

// allows cross origin requests from client when in development mode
if (process.env.NODE_ENV !== 'production') {
	console.log('NODE_ENV != production => cors policy is unrestricted!')
	app.use(require('cors')())
}

// use body parser for converting URL encoding to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// configured stdout logger
const logger = require("./config/logger");
app.use(logger);

// require routers into object { routerName: Router }
// filename of router will be the subdirectory
// i.e. GET /v1/routerName
const routers = require("./routers");
Object.entries(routers).forEach(([name, router]) => {
	app.use(`/v1/${name}`, router);
});

// serve production build of React frontend
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('/*', (req, res, next) => {
	res.sendFile(path.join(__dirname, "frontend/build/index.html"));
})

// default error handler, all routes that error will redirect execution 
// to this handler function
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({
		status: 500,
		code: errors.SERVER_MALFUNCTION_STOP,
		message: "Internal Server Error"
	});
});

// initialize server for incoming connections
const server = http.Server(app);
const port = process.env.PORT || 3001;

server.listen(port, function () {
	console.log(`Server listening @ http://localhost:${port}`);
});