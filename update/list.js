var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var list = express.Router();
var spiders = require('../module/db').spiders;
var crypto = require('crypto');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/spiderdb');
var db = mongoose.connection;
var debug = require('debug')('blog:update');

debug('读取列表');

function readList(url,callback){
	request(url,function(err,res){
		if(err) return console.error(err);

		var $ = cheerio.load(res.body.toString());

		var classList = [];
		$('.articleList .articleCell').each(function(){
			var $that= $(this);
			var item = {
				name : "project",
				title : $that.find('.atc_title a').text(),
				url : $that.find('.atc_title a').attr('href'),
				time : $that.find('.atc_tm').text()
			};
			
			var s = item.url.match(/blog_([a-zA-Z0-9]+)\.html/);
			if(Array.isArray(s)){
				item.id = s[1];
				var newPost= new spiders(item);
				newPost.save(function(err,docs){
					console.log(err);
				})
				classList.push(item);
			}
		});
		
		var nextPage = $('.SG_pgnext a').attr('href');
		if(nextPage){
			readList(nextPage,function(err,classList2){
				if(err) callback(err);
				callback(null,classList.concat(classList2));
			})
		}else{
			callback(null,classList);
		}
	});
};

readList('http://blog.sina.com.cn/s/articlelist_2709769335_0_1.html',function(err,articleList){
	if(err) return console.log(err);
	return articleList;
});

module.exports.readList = readList;


