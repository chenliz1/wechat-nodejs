'use strict';

module.exports = new Logger();


var $Logger 	= require('log4js').getLogger();

function Logger(options){
	this.options = options || {};
};

Logger.prototype.error = function(message, source){

	return $Logger.error(message);
};

Logger.prototype.info = function(message, source){
	return $Logger.info(message);
};

