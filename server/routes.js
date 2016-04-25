(function () {
    'use strict';

    // Fields
    // var fs = require('fs');
    var request = require('request');
    var cheerio = require('cheerio');
    var router = require('express').Router();

    // Configuration...
    router.post('/list', getList);

    // Functions...
    function getList(req, res) {
        var url = req.body.url;
        console.log(url);

        request(url, function (error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);
                var name, price;
                var json = { items: [] };
                
                $('#idx_ifs_new li').each(function(i, element) {
                    name = $(element).children('h4').children('a').text();
                    price = $(element).children('strong').text();
                    json.items.push({ name, price });
                });
                
                res.status(200).send(json);
            }
            else {
                req.connection.destroy();     
            }
        });
    }
    
    module.exports = router;
})();