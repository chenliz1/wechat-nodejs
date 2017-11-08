'use strict';

require('rootpath')();
module.exports = new News();
var _ 			= require('lodash'),
	express 		= require('express'),
	app				= express(),
	Q				= require('q'),
	bodyParser 		= require('body-parser'),
	http 			= require('http'),
	fs 				= require('fs'),
	url 			= require('url'),
	wechat			= require('wechat'),
	wechatapi		= require('wechat-api'),
	crypto 			= require("crypto"),
	nodejieba 		= require("nodejieba"),
	wordPress 		= require('service/wordpress.js'),
	request 		= require('request');

var appid = 'wx7c9689e6f3dd8a45';
var appsecret = '4e5acd6d0e82d7920d071ef05dbdb9fa';
// var appid = 'wx1ec36606643b81c6';
// var appsecret = '020ee19d193cdd2dd390b7c3f954a5a5';
var api = new wechatapi(appid, appsecret);

function News(options){
	this.options = options || {};
	this.token = '';
};

News.prototype.latestToken = () => {
	api.getLatestToken((err, token) => {
		this.token = token;
		console.log(this.token);
		return
	});
};

News.prototype.uploadNews = (news) => {
	api.uploadNewsMaterial(news, (err, result) => {
		console.log(result);
		return 
	});
};

News.prototype.getMaterials = (type, offset, count) => {
	api.getMenu((err, result, res) => {
		console.log(res);
		return 
	});
}
