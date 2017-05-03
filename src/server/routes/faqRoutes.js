"use strict";
exports.__esModule = true;
var express = require("express");
var faqRoutesLogic_1 = require("../routesLogic/faqRoutesLogic");
var faqRoutesHandler = new faqRoutesLogic_1.FaqRoutesHandler();
var faqs = new Array();
for (var index = 0; index < 20; index++) {
    faqs.push({ prb: "prb " + index, sln: "sln " + index, id: index });
}
exports.faqRouter = express.Router();
exports.faqRouter.use('/:faqId', function (req, res, next) {
    console.log(req.query.sln);
    req['faq'] = faqs.find(function (i) { return (req.params.faqId == null || i.id == req.params.faqId)
        && (req.query.sln == null || i.sln == req.query.sln); });
    if (req['faq'] == null)
        res.send(404, 'no sux faq');
    else
        next();
});
//http://localhost:3000/api/faq (w/out body) 
exports.faqRouter.route('/')
    .get(function (req, res) {
    var sorted = faqs.sort(function (a, b) { return a.id - b.id; });
    var linkedFaqs = [];
    faqRoutesHandler.getAllHandler(faqs, linkedFaqs, req);
    res.json(linkedFaqs);
})
    .post(function (req, res) {
    faqs.push(req.body);
    res.send(201, req.body);
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
    faqRoutesHandler.delHandler(req, faqs);
    res.send(204, req['faq']);
});
