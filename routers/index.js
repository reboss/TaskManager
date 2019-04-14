"use strict";

const fs = require("fs"),
	path = require("path"),
	controllers = require("../controllers"),
	express = require('express');

let routers = {};

// read all routers into a single object
fs
.readdirSync(__dirname)
.filter(function(file) {
	// don't include index.js
	return (file.indexOf(".") !== 0) && (file !== "index.js");
})
.forEach(function(file) {
	// pass controllers and express to the 	router in context
	let router = require(path.join(__dirname, file))(controllers, express);
	let key = file.slice(0, file.indexOf('.'));
	routers[key] = router;
});

module.exports = routers;