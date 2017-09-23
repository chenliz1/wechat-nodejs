'use strict';

require('rootpath')();

module.exports = new Controller();
var _ 			= require('lodash'),
	express 		= require('express'),
	app				= express(),
	Q				= require('q'),
	bodyParser 		= require('body-parser'),
	http 			= require('http'),
	fs 				= require('fs'),
	wechat			= require('wechat'),
	wcapi			= require('wechat-api'),
	crypto 			= require("crypto"),
	nodejieba 		= require("nodejieba"),
	schedule 		= require('node-schedule'),
	request 		= require('request');

var api = new wcapi('wx7c9689e6f3dd8a45', '4e5acd6d0e82d7920d071ef05dbdb9fa');

function Controller(options){
	this.options = options || {};
	this.token = '';
};

Controller.prototype.latestToken = () => {
	api.getLatestToken((err, token) => {
		this.token = token;
		console.log(this.token);
	});


};