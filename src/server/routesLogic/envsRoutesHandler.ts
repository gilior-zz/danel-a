import { envsResponse } from '../dal/envs/envs-sql';
import { EnvsSql } from '../dal/envs/envs-sql';




import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Ienvs } from "../dal/envs/Ienvsdal";





export class EnvsRoutesHandler {
    envsDal: Ienvs;
    constructor() {
        this.envsDal = new EnvsSql();
        this.envsDal.loadEnvs();

    }
    public getAllHandler(req, res): void {
        // faqs.forEach(i => {
        // let linkedFaq = Object.assign({}, i);
        // linkedFaq['links'] = {};
        // linkedFaq['links']['self'] = `http://${req.headers.host}/api/faq/${i.id}`
        // console.log(newsResponse);

        res.status(200).send(envsResponse);

        // })
    }
}