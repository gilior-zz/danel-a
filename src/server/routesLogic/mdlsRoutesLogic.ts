
import {  Module } from '../../models';
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { ImdlDal } from "../dal/mdl/ImdlDal";
import { MdlSql } from "../dal/mdl/mdl-sql";




export class MdlsRoutesHandler {
    mdlDal: ImdlDal;
    constructor() {
        this.mdlDal = new MdlSql();
         this.mdlDal.loadmdls().then(i=>{
             console.log('ended load mdls');
             
         })

    }
     public getAllHandler(req): Array<Module> {
        // faqs.forEach(i => {
        // let linkedFaq = Object.assign({}, i);
        // linkedFaq['links'] = {};
        // linkedFaq['links']['self'] = `http://${req.headers.host}/api/faq/${i.id}`
        return null;
        // })
    }
}