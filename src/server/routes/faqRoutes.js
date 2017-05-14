"use strict";
exports.__esModule = true;
var faqs_sql_1 = require("../dal/faq/faqs-sql");
var express = require("express");
var faqRoutesLogic_1 = require("../routesLogic/faqRoutesLogic");
var faqRoutesHandler = new faqRoutesLogic_1.FaqRoutesHandler();
exports.faqRouter = express.Router({ mergeParams: true });
exports.faqRouter.use('/:faqId', function (req, res, next) {
    // console.log(req.query.sln);
    console.log(req.params.faqId);
    req['faq'] = faqs_sql_1.SupportIssues.find(function (i) { return (req.params.faqId == null || i.id == req.params.faqId)
        && (req.query.sln == null || i.sln == req.query.sln); });
    if (req['faq'] == null)
        res.send(404, 'no sux faq');
    else
        next();
});
//http://localhost:3000/api/faq (w/out body) 
exports.faqRouter.route('/')
    .get(function (req, res) {
    // let sorted = SupportIssues.sort((a, b) => { return a.id - b.id });
    var linkedFaqs = [];
    var response = faqRoutesHandler.getAllHandler(req);
    res.json(response);
})
    .post(function (req, res) {
    var l = faqRoutesHandler.postHandler(req);
    l.then(function (result) {
        res.send(201, result);
    });
});
//http://localhost:3000/api/faq/0[1,2,3,4)
exports.faqRouter.route('/:faqID')
    .get(function (req, res) {
    var linkedFaq = {};
    faqRoutesHandler.getOneHandler(req['faq'], linkedFaq, req);
    res.json(linkedFaq);
})
    .put(function (req, res) {
    faqRoutesHandler.putHandler(req);
    res.send(200, req.body);
})
    .patch(function (req, res) {
    faqRoutesHandler.patchHandler(req);
    res.send(200, req.body);
})["delete"](function (req, res) {
    faqRoutesHandler.delHandler(req);
    res.send(205, req['faq']);
});
