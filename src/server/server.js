"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var csrf = require("csurf");
var faqRoutes_1 = require("./routes/faqRoutes");
var Server = (function () {
    function Server() {
        this.app = express();
        this.csrfObj = csrf({ cookie: true });
        console.log('hello');
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        // this.app.use(this.csrfObj)
        // this.app.use((req, res, next) => {
        //     var csrfToken = req.csrfToken();
        //     res.locals._csrf = csrfToken;
        //     res.cookie('XSRF-TOKEN', csrfToken);
        //     console.log('XSRF-TOKEN ' + csrfToken);
        //     next();
        // });
        // this.registerStatic();
        var port = process.env.port || 3000;
        this.app.use('/api/faq', faqRoutes_1.faqRouter);
        this.app.all('/*', function (req, res) {
            res.sendFile(path.resolve(__dirname + '/../index.html'));
            // res.render(path.join(__dirname + '/../index.html'));
        });
        // this.app.get('/', (req: core.Request, res: core.Response) => {
        //     res.send('welcome')
        // })
        this.app.listen(port, function () {
            console.log(path.join(__dirname + '/../index.html'));
            console.log("listening on port " + port);
        });
    }
    Server.prototype.registerStatic = function () {
        console.log('in registerStatic');
        var staticEx = express.static(path.join(__dirname, "."), {
            maxAge: 90000
        });
        this.app.use('/', function (req, res, next) {
            console.log("STATIC: " + req.url);
            staticEx(req, res, next);
        });
    };
    return Server;
}());
exports.Server = Server;
