'use strict';

require('rootpath')();

var _ 			= require('lodash'),
	express 		= require('express'),
	app				= express(),
	Q				= require('q'),
	bodyParser 		= require('body-parser'),
	http 			= require('http'),
	fs 				= require('fs'),
	wechat			= require('wechat'),
	crypto 			= require("crypto"),
	nodejieba 		= require("nodejieba"),
	schedule 		= require('node-schedule'),
	wp_Database		= require('./wordpressDB.js'),
	request 		= require('request');

var wordPress = new WordPress();
module.exports = wordPress;

var wp = require( "wordpress" );
var client = wp.createClient({
    url: "https://utfaq.com",
    username: "Lucas Chen",
    password: "lucaschen"
});

var textSanitizer = (rawText) => {

	rawText = rawText.trim().toLowerCase().replace(/[~`!@#$%^*()+=<>?,.;'"-·～！@#¥%……&*（）「」【】、|-=——+《》，。／？；：]+/g, '').split(' ');

	var cleanText = [];

	_.each(rawText, (word) => {
		cleanText.push(word);
	});

	return cleanText;
};

function WordPress(options){
	let self = this;
	this.options = options || {};
	this.publishPosts = [];
	this.wordMap = {};
	this.termMap = {};

	/* Schedule a re-load everyday at 5 am local time */
	let job = schedule.scheduleJob({ hour: 11, minute: 7 }, () => {
		this.load();
	});
}

/*
 * load the publiced posts on the utfaq.com 
 */
WordPress.prototype.load = function(){
	let self = this;

	// return client.getPosts((error, posts) => {
	// 	console.log(posts.length);
	// 	_.each(posts, (post, key) => {
	// 		console.log(post.title);
	// 		if (post.status == 'publish') {
	// 			self.publishPosts.push(post);

	// 			let wordlist = nodejieba.cut(post.title);
	// 			_.each(wordlist, (word, key) => {
	// 				if ((word in self.wordMap) == false) {
	// 					self.wordMap[word] = [post];
	// 				} 
	// 				else {
	// 					self.wordMap[word].push(post);
	// 				}
	// 			});

	// 			_.each(post.termNames, (name, key) => {
	// 				if ((name in self.termMap) == false) {
	// 					self.termMap[name] = [post];
	// 				} 
	// 				else {
	// 					self.termMap[name].push(post);
	// 				}
	// 			});

	// 		}

	// 	});
		
	// 	return;

	// });



};