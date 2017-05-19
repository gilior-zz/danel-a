import { SupportIssues } from '../dal/faq/faqs-sql';



import * as express from 'express'
import * as bodyParser from 'body-parser'

import { SupportIssue } from "../../models";
import { FaqRoutesHandler } from "../routesLogic/faqRoutesLogic";


let faqRoutesHandler: FaqRoutesHandler = new FaqRoutesHandler();


export const faqRouter = express.Router({ mergeParams: true });
faqRouter.use('/:faqId', (req, res, next) => {

    // console.log(req.query.sln);
    console.log(req.params.faqId);

    req['faq'] = SupportIssues.find(i => (req.params.faqId == null || i.id == req.params.faqId)
        && (req.query.sln == null || i.sln == req.query.sln));

    if (req['faq'] == null) res.send(404, 'no sux faq');
    else next();
})

//http://localhost:3000/api/faq (w/out body) 
faqRouter.route('/')
    .get((req, res) => {
        faqRoutesHandler.getAllHandler(req, res);

    })
    .post((req, res) => {
        faqRoutesHandler.postHandler(req, res);
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
        faqRoutesHandler.putHandler(req, res);
        res.send(200, req.body);
    }
    )
    .patch((req, res) => {
        faqRoutesHandler.patchHandler(req);
        res.send(200, req.body);
    }
    )

    .delete((req, res) => {


        faqRoutesHandler.delHandler(req, res);
        res.send(205, req['faq']);
    }
    );





