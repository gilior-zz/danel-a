import { SupportIssueResponse } from './../../models';


import { IFaQDal } from '../dal/faq/Ifaqdal';
import { FaqsSql, SupportIssues, SupportIssuesResponse } from '../dal/faq/faqs-sql';
import { SupportIssue } from '../../models';
import * as express from 'express'
import * as bodyParser from 'body-parser'




export class FaqRoutesHandler {
    faqDal: IFaQDal;
    constructor() {
        this.faqDal = new FaqsSql();
        this.faqDal.loadFaqS();
    }


    public delHandler(req, res) {
        // faqs.splice(faqs.indexOf(req['faq']), 1);
        console.log(`in  delHandler`);
        this.faqDal.deleteItem(req, res);
    }

    public async putHandler(req, res) {
        let l = await this.faqDal.UpdateItem(req, res);


    }

    public async  postHandler(req, res) {
        this.faqDal.AddItem(req, res);


    }

    public patchHandler(req) {
        for (let entry in req.body) {
            let newVal = req.body[entry];
            console.log(newVal);
            req['faq'][entry] = newVal;
        }
    }

    public getAllHandler(req, res): void {
       res.status(200).send(SupportIssuesResponse)
    }

    public getOneHandler(faq: SupportIssue, linkedFaq: SupportIssue, req) {
        linkedFaq = Object.assign(linkedFaq, faq);

        linkedFaq['links'] = {};
        let path = `http://${req.headers.host}/api/faq/?sln=${faq.sln}`;
        path = path.replace(' ', '%20');
        linkedFaq['links']['filterBySln'] = path;


    }
}

