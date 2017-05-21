import { ModulesResponse } from './../dal/mdl/mdl-sql';


import { Module } from '../../models';
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Inews } from "server/dal/news/Inews";
import { NewsSql, RollersResponse } from "server/dal/news/news-sql";




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
        res.status(200).send(RollersResponse);

        // })
    }
}