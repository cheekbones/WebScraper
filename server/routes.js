(function () {
    'use strict';

    // Fields
    // var fs = require('fs');
    var request = require('request');
    var cheerio = require('cheerio');
    var router = require('express').Router();

    // Configuration...
    router.get('/list', getList);

    // Functions...
    function getList(req, res) {
        var username = new Buffer('wow_lon').toString('base64');
        var password = new Buffer('hoy1hoy2').toString('base64');
        var options = {
            url: 'https://www.tipidpc.com/forumbookmarks.php',
            path: '/actions/loginAction.php',
            method: 'GET',
            port: 443,
            auth: {
                user: username,
                pass: password
            }
        }

        request(options, function (error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);
                var title, topic, listItem;
                var json = { items: [] };

                console.log($('#main').text());
                $('.forumtopics li').each(function (i, element) {
                    title = $(element).children('h4').children('a').text();
                    topic = $(element).children('p').children('a').text();
                    json.items.push({ title, topic });
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