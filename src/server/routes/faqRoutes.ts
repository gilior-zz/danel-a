import {  SupportIssues } from '../dal/faq/faqs-sql';



import * as express from 'express'
import * as bodyParser from 'body-parser'

import { SupportIssue } from "../../models";
import { FaqRoutesHandler } from "../routesLogic/faqRoutesLogic";


let faqRoutesHandler: FaqRoutesHandler = new FaqRoutesHandler();


export const faqRouter = express.Router();
faqRouter.use('/:faqId', (req, res, next) => {
    console.log(req.query.sln);

    req['faq'] = SupportIssues.find(i => (req.params.faqId == null || i.id == req.params.faqId)
        && (req.query.sln == null || i.sln == req.query.sln));

    if (req['faq'] == null) res.send(404, 'no sux faq');
    else next();
})

//http://localhost:3000/api/faq (w/out body) 
faqRouter.route('/')
    .get((req, res) => {
        // let sorted = SupportIssues.sort((a, b) => { return a.id - b.id });
        let linkedFaqs = [];
        let response = faqRoutesHandler.getAllHandler(req);
        res.json(response);
    })
    .post((req, res) => {

        res.send(201, req.body);
    }
    )



//http://localhost:3000/api/faq/0[1,2,3,4)
faqRouter.route('/:faqID')
    .get((req, res) => {
        let linkedFaq = {};
        faqRoutesHandler.getOneHandler(req['faq'], linkedFaq, req)
        res.json(linkedFaq);
    })
    .put((req, res) => {
        faqRoutesHandler.putHandler(req);
        res.send(200, req.body);
    }
    )
    .patch((req, res) => {
        faqRoutesHandler.patchHandler(req);
        res.send(200, req.body);
    }
    )

    .delete((req, res) => {
        faqRoutesHandler.delHandler(req.params.faqId);
        res.send(204, req['faq']);
    }
    );





