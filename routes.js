'use strict';

require('rootpath')();
module.exports = new Routes();
var _ 			= require('lodash'),
	express 		= require('express'),
	app				= express(),
	Q				= require('q'),
	bodyParser 		= require('body-parser'),
	http 			= require('http'),
	fs 				= require('fs'),
	url 			= require('url'),
	wechat			= require('wechat'),
	crypto 			= require("crypto"),
	nodejieba 		= require("nodejieba"),
	wordPress 		= require('service/wordpress.js'),
	News			= require('utfaq/news.js'),
	request 		= require('request');

var wp = require( "wordpress" );

var invalidTerms = ['university of toronto', 'U of T', 'uoft', 'UofT', '多伦多大学', '多大', '多大攻略', '多伦多'];

//login info
var client = wp.createClient({
    url: "https://utfaq.com",
    username: "Lucas Chen",
    password: "lucaschen"
});



function Routes(options){
	this.options = options || {};
}

function sha1(str){
	var md5sum = crypto.createHash("sha1");
	md5sum.update(str);
	str = md5sum.digest("hex");
	return str;
}

/*
* 参考https://segmentfault.com/a/1190000003012131
*
*/
function validateToken(req,res){
	var query = url.parse(req.url,true).query;
	//console.log("*** URL:" + req.url);
	var signature = query.signature;
	var echostr = query.echostr;
	var timestamp = query['timestamp'];
	var nonce = query.nonce;
	var oriArray = new Array();
	oriArray[0] = nonce;
	oriArray[1] = timestamp;
	oriArray[2] = "weareutfaq";//这里是你在微信开发者中心页面里填的token
	oriArray.sort();
	var original = oriArray.join('');
	console.log("Original str : " + original);
	console.log("Signature : " + signature );
	var scyptoString = sha1(original);

	if(signature == scyptoString){
		res.reply('nihaoya');
		res.end(echostr);
		console.log("Confirm and send echo back");
	}else {
		res.end("false");
		console.log("Failed!");
	}
}

/**
 * Initialize application routing
 * 
 */
Routes.prototype.init = (app) => {

	/**
	 * Testing if service is alive
	 * 
	 * @public
	 */
	app.get('/ping', (req, res) => {
		res.json({ ping : true });
	});

	//validate the connection of the service
	// app.get('/wechat', validateToken);


	//main enrtry point for the messages
	app.use('/wechat', wechat('weareutfaq', function (req, res, next) {
		  // 微信输入信息都在req.weixin上
		  	let message = req.weixin;
		  	console.log(message);
		  	//console.log(nodejieba.cut(message.Content));

		  	client.getPost("7579", (error, post) => {
		  		let a = post;
			    
			    // News.getMaterials("news", 0, 5);
			    res.reply([
			    {
				    title: a.title,
				    description: '',
				    picurl: a.thumbnail.thumbnail,
				    url: a.link
				},
				{
				    title: a.title,
				    description: '',
				    picurl: a.thumbnail.thumbnail,
				    url: a.link
				},
				{
				    title: a.title,
				    description: '',
				    picurl: a.thumbnail.thumbnail,
				    url: a.link
				},
				{
				    title: a.title,
				    description: '',
				    picurl: a.thumbnail.thumbnail,
				    url: a.link
				}
				]);
			

			});
			
	}));
		
		
	



}