'use strict';

module.exports = new Database();
require('rootpath')();

var mysql 	= require('mysql'),
	Logger	= require('./logger');

function Database(options){
	this.options = options || {};
};

Database.prototype.connect = function(){

	const self = this;

	this.connection = mysql.createConnection({
		host		: process.env.MYSQL_HOST,
		user		: process.env.MYSQL_USER,
		password	: process.env.MYSQL_PASSWORD,
		database	: process.env.MYSQL_DATABASE
	});

	this.connection.connect((err) => {

		if (err) {
			return console.log(err);
		}

		return console.log("Connected to MySQL / Host: " + process.env.MYSQL_HOST + " / Schema: " + process.env.MYSQL_DATABASE);
	});

};