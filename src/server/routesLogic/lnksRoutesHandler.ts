import { lnkResponse } from './../dal/lnks/lnks-sql';
import { LnksSql } from '../dal/lnks/lnks-sql';




import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Ilnks } from "../dal/lnks/Ilnks";





export class LnksRoutesHandler {
    lnksDal: Ilnks;
    constructor() {
        this.lnksDal = new LnksSql();
        this.lnksDal.loadLnks();

    }
    public getAllHandler(req, res): void {
        // faqs.forEach(i => {
        // let linkedFaq = Object.assign({}, i);
        // linkedFaq['links'] = {};
        // linkedFaq['links']['self'] = `http://${req.headers.host}/api/faq/${i.id}`
        // console.log(newsResponse);
        
        res.status(200).send(lnkResponse);

        // })
    }
}