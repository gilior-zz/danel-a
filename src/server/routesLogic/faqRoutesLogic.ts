

import { IFaQDal } from '../dal/faq/Ifaqdal';
import { FaqsSql, SupportIssues } from '../dal/faq/faqs-sql';
import { SupportIssue } from '../../models';
import * as express from 'express'
import * as bodyParser from 'body-parser'




export class FaqRoutesHandler {
    faqDal: IFaQDal;
    constructor() {
        this.faqDal = new FaqsSql();
        this.faqDal.loadFaqS();
    }


    public delHandler(req) {
        // faqs.splice(faqs.indexOf(req['faq']), 1);
        console.log(`in  delHandler`);
        this.faqDal.deleteItem(req);
    }

    public putHandler(req) {
        this.faqDal.UpdateItem(req)
    }

    public async  postHandler(req): Promise<SupportIssue> {
        let res = await this.faqDal.AddItem(req);
        return res;
    }

    public patchHandler(req) {
        for (let entry in req.body) {
            let newVal = req.body[entry];
            console.log(newVal);
            req['faq'][entry] = newVal;
        }
    }

    public getAllHandler(req): Array<SupportIssue> {
        // faqs.forEach(i => {
        // let linkedFaq = Object.assign({}, i);
        // linkedFaq['links'] = {};
        // linkedFaq['links']['self'] = `http://${req.headers.host}/api/faq/${i.id}`
        return SupportIssues;
        // })
    }

    public getOneHandler(faq: SupportIssue, linkedFaq: SupportIssue, req) {
        linkedFaq = Object.assign(linkedFaq, faq);

        linkedFaq['links'] = {};
        let path = `http://${req.headers.host}/api/faq/?sln=${faq.sln}`;
        path = path.replace(' ', '%20');
        linkedFaq['links']['filterBySln'] = path;


    }
}

