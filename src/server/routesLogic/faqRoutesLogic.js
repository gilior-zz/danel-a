"use strict";
exports.__esModule = true;
var FaqRoutesHandler = (function () {
    function FaqRoutesHandler() {
    }
    FaqRoutesHandler.prototype.delHandler = function (req, faqs) {
        faqs.splice(faqs.indexOf(req['faq']), 1);
    };
    FaqRoutesHandler.prototype.putHandler = function (req) {
        req['faq'].prb = req.body.prb;
        req['faq'].sln = req.body.sln;
    };
    FaqRoutesHandler.prototype.patchHandler = function (req) {
        for (var entry in req.body) {
            var newVal = req.body[entry];
            console.log(newVal);
            req['faq'][entry] = newVal;
        }
    };
    FaqRoutesHandler.prototype.getAllHandler = function (faqs, linkedFaqs, req) {
        faqs.forEach(function (i) {
            var linkedFaq = Object.assign({}, i);
            linkedFaq['links'] = {};
            linkedFaq['links']['self'] = "http://" + req.headers.host + "/api/faq/" + i.id;
            linkedFaqs.push(linkedFaq);
        });
    };
    FaqRoutesHandler.prototype.getOneHandler = function (faq, linkedFaq, req) {
        linkedFaq = Object.assign(linkedFaq, faq);
        linkedFaq['links'] = {};
        var path = "http://" + req.headers.host + "/api/faq/?sln=" + faq.sln;
        path = path.replace(' ', '%20');
        linkedFaq['links']['filterBySln'] = path;
    };
    return FaqRoutesHandler;
}());
exports.FaqRoutesHandler = FaqRoutesHandler;
