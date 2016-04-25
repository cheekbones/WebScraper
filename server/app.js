(function () {
    'user strict';

    // Fields...
    var express = require('express');
    var bodyParser = require('body-parser');
    var port = 8081;
    var app = express();
    var router = express.Router();

    // Configuration...
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/api', require('./routes'));

    // Startup...
    app.listen(port);
    console.log('Listening on port ' + port);
})();