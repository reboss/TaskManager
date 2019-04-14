"use strict";

const fs = require("fs"),
	path = require("path"),
	models = require("../models"),
	errors = require('../config/errors');

let controllers = {};

// read in controllers from controller directory and
// combine them into a single object
fs
.readdirSync(__dirname)
.filter(function(file) {
	// don't read include index.js
	return (file.indexOf(".") !== 0) && (file !== "index.js");
})
.forEach(function(file) {
	// pass models and errors object to controller in context 
	let controller = require(path.join(__dirname, file))(models, errors);
	let key = file.slice(0, file.indexOf('.'));
	controllers[key] = controller;
});

module.exports = controllers;