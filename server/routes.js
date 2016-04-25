(function () {
    'use strict';

    // Fields
    // var fs = require('fs');
    var request = require('request');
    var cheerio = require('cheerio');
    var router = require('express').Router();

    // Configuration...
    router.put('/list/:id', getList);

    // Functions...
    function getList(req, res) {
        // var url = +req.params.url;
        var url = 'https://tipidpc.com/viewitem.php?iid=' + req.params.id;
        
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
                
                res.status(200).send(json);
            }
        });
    }
    
    module.exports = router;
})();