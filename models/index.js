"use strict";

const fs = require("fs"),
	path = require("path");

let models = {};

// read in all json models into a single object
fs
.readdirSync(__dirname)
.filter(function(file) {
	// don't include index.js
	return (file.indexOf(".") !== 0) && (file !== "index.js");
})
.forEach(function(file) {
	let model = require(path.join(__dirname, file));
	let key = file.slice(0, file.indexOf('.'));
	models[key] = model.data;
});

module.exports = models;