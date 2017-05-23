import { newsResponse } from './../dal/news/news-sql';
import { NewsSql } from '../dal/news/news-sql';




import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Inews } from "../dal/news/Inews";





export class RlrsRoutesHandler {
    newsDal: Inews;
    constructor() {
        this.newsDal = new NewsSql();
        this.newsDal.loadNews();

    }
    public getAllHandler(req, res): void {
        // faqs.forEach(i => {
        // let linkedFaq = Object.assign({}, i);
        // linkedFaq['links'] = {};
        // linkedFaq['links']['self'] = `http://${req.headers.host}/api/faq/${i.id}`
        console.log(newsResponse);
        
        res.status(200).send(newsResponse);

        // })
    }
}