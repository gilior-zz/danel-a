import { ModulesResponse } from './../dal/mdl/mdl-sql';


import { Module } from '../../models';
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Imdl } from "../dal/mdl/ImdlDal";
import { MdlSql } from "../dal/mdl/mdl-sql";




export class MdlsRoutesHandler {
    mdlDal: Imdl;
    constructor() {
        this.mdlDal = new MdlSql();
        this.mdlDal.loadmdls();

    }
    public getAllHandler(req, res): void {
        // faqs.forEach(i => {
        // let linkedFaq = Object.assign({}, i);
        // linkedFaq['links'] = {};
        // linkedFaq['links']['self'] = `http://${req.headers.host}/api/faq/${i.id}`
        res.status(200).send(ModulesResponse);

        // })
    }
}