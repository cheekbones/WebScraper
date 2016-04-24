var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/webscraper', function(req, res){
    // The URL we will scrape from - in our example Anchorman 2.
    var url = 'https://tipidpc.com/viewitem.php?iid=39422149';
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
	
    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html
    request(url, function(error, response, html){
        // First we'll check to make sure no errors occurred when making the request
        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture...
            var name, price;
            var json = { name : "", price : "" };
			
			// We'll use the unique header class as a starting point.
            $('.itemname').filter(function(){
				// Let's store the data we filter into a variable so we can easily see what's going on.
                var data = $(this);

				// In examining the DOM we notice that the title rests within the first child element of the header tag. 
				// Utilizing jQuery we can easily navigate and get the text by writing the following code:
                name = data.text();

				// Once we have our title, we'll store it to the our json object.
                json.name = name;
            })
			
			$('.itemprice').filter(function(){
				var data = $(this);
				price = data.text();
				json.price = price;
			})
        
			fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

				console.log('File successfully written! - Check your project directory for the output.json file');

			})

			// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
			res.send('Check your console!');
		}
    });
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;



// https://scotch.io/tutorials/scraping-the-web-with-node-js