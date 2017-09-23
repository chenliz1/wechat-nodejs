'use strict';

require('rootpath')();

var express 		= require('express'),
	app				= express(),
	Q				= require('q'),
	bodyParser 		= require('body-parser'),
	http 			= require('http'),
	url 			= require('url'),
	crypto			= require('crypto'),
	fs 				= require('fs'),
	wechat			= require('wechat'),
	routes 			= require('routes.js'),
	wordPress 		= require('service/wordpress.js'),
	wp_DataBase		= require('service/wordpressDB.js'),
	Controller		= require('utfaq/controller.js'),
	request 		= require('request');


var chatbotApp = function(){

	let self = this;

	self.initialize = () => {

		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());
		// app.use(express.static('./report'));
		app.use(express.query());

		
		routes.init(app);
		http.createServer(app).listen(process.env.PORT);

		//wordPress.load();
		//Controller.latestToken();
		wp_DataBase.connect();


	};
}

var chatbot = new chatbotApp();

chatbot.initialize();

// 终端打印如下信息
console.log('Server running');