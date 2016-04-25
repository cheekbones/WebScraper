(function () {
	var express = require('express');
	var fs = require('fs');
	var request = require('request');
	var cheerio = require('cheerio');
	var app = express();

	app.get('/webscraper', function (req, res) {
		var url = 'https://tipidpc.com/viewitem.php?iid=39425823';
		// var options = {
		// url : 'https://tipidpc.com/index.php',
		// path : '/esse3/auth/Logon.do',
		// method : 'GET',
		// port: 443,
		// authorization : {
		// username: user,
		// password: pass
		// }
		// }

		request(url, function (error, response, html) {
			if (!error) {
				var $ = cheerio.load(html);
				var name, price;
				var json = { name: "", price: "" };

				$('.itemname').filter(function () {
					var data = $(this);
					name = data.text();
					json.name = name;
				})

				$('.itemprice').filter(function () {
					var data = $(this);
					price = data.text();
					json.price = price;
				})

				fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
					console.log('File successfully written! - Check your project directory for the output.json file');
				})

				res.send('Check your console!');
			}
		});
	})

	app.listen('8081')
	console.log('Magic happens on port 8081');
	exports = module.exports = app;

	// https://scotch.io/tutorials/scraping-the-web-with-node-js
})();