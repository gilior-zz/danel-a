"use strict";
exports.__esModule = true;
var faqRoutesLogic_1 = require("./routesLogic/faqRoutesLogic");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var csrf = require("csurf");
var faqRoutes_1 = require("./routes/faqRoutes");
var app = express();
var csrfObj = csrf({ cookie: true });
console.log('hello');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "DELETE,GET,HEAD,POST,PUT,OPTIONS,TRACE");
    next();
});
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
app.use('/api/faq', faqRoutes_1.faqRouter);
app.all('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../index.html'));
    // res.render(path.join(__dirname + '/../index.html'));
});
// this.app.get('/', (req: core.Request, res: core.Response) => {
//     res.send('welcome')
// })
app.listen(port, function () {
    console.log(path.join(__dirname + '/../index.html'));
    console.log("listening on port " + port);
});
var foo = (function () {
    function foo() {
    }
    return foo;
}());
new faqRoutesLogic_1.FaqRoutesHandler();
