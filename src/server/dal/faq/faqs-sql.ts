import { SupportIssueResponse } from './../../../models';



import { IFaQDal } from './Ifaqdal';

import * as _ from 'lodash'
import { MsNodeSqlDriverApiModule as v8 } from '../lib/MsNodeSqlDriverApiModule'

import v8Connection = v8.v8Connection;
import v8PreparedStatement = v8.v8PreparedStatement;
import v8BindCb = v8.v8BindCb;
import v8BulkMgr = v8.v8BulkTableMgr;
import v8Error = v8.v8Error;
// import * as sql from 'mssql/msnodesqlv8'

export const sql: v8.v8driver = require('msnodesqlv8');

import { IProcedureResult } from "mssql";
import { SupportIssue, SupportIssueLink } from "models";

export let SupportIssues: Array<SupportIssue>;
export let SupportIssuesResponse: SupportIssueResponse
// let conn_str: string = 'Driver={SQL Server Native Client 11.0};Server={DANEL-DB\\S16};Database={support_new};Trusted_Connection={yes};'
let conn_str = 'Driver={SQL Server Native Client 11.0};Server={USER-PC\\SQL};Database={info};Trusted_Connection={yes};';

var config = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client XX.0};Server={SERVER\\NAME};Database={dbName};Trusted_Connection={yes};',
};
export class FaqsSql implements IFaQDal {

    AddItem(req, res): void {
        var self = this;

        // Simulate server latency with 2 second delay
        sql.open(conn_str, (err, conn) => {
            var pm = conn.procedureMgr();
            pm.callproc('SupportIssuesUpdate', [null, req.body.prb, req.body.sln, -1], (err, results, output) => {
                let newID = output[1];


                let newFaq = { id: newID, mID: req.body.mID, prb: req.body.prb, sln: req.body.sln, ts: new Date(), lnks: req.body.lnks }

                newFaq.lnks.forEach(i => {
                    self.AddLnks(i, newFaq.id);
                })
                SupportIssues.push(newFaq);

                res.status(201).send(newFaq)

            });
        });


    }

    private AddLnks(supportIssueLink: SupportIssueLink, sID: number): void {
        sql.open(conn_str, function (err, conn) {
            var pm = conn.procedureMgr();
            // console.log(supportIssueLink);

            pm.callproc('SupportIssueLinksUpdate', [sID, supportIssueLink.pth, null], (err, results, output) => {

            });
        });
    }





    newFaq: SupportIssue;
    UpdateItem(req, res) {
        sql.open(conn_str, (err, conn) => {
            var pm = conn.procedureMgr();
            pm.callproc('SupportIssuesUpdate', [req.body.id, req.body.prb, req.body.sln, req.body.mID], (err, results, output) => {
                let item = SupportIssuesResponse.sis.find(i => i.id == req.params.faqID);
                item.mID = req.body.mID;
                item.prb = req.body.prb;
                item.sln = req.body.sln;
                item.ts = new Date();
                SupportIssuesResponse.time = new Date();
                res.status(204)
            });
        });


    }

    deleteItem(req, res): void {

        sql.open(conn_str, (err, conn) => {
            var pm = conn.procedureMgr();
            pm.callproc('SupportIssuesDelete', [req.params.faqID], (err, results, output) => {
                let item = SupportIssuesResponse.sis.find(i => i.id == req.params.faqID);
                SupportIssuesResponse.sis = SupportIssuesResponse.sis.filter(i => i != item);
                SupportIssuesResponse.time = new Date();
                res.status(204)
            });
        });

    }
    arr: Array<any> = new Array();

    loadFaqS() {
        var self = this;
        sql.open(conn_str, (err, conn) => {
            var pm = conn.procedureMgr();
            pm.callproc('SupportIssuesSelect', [], (err, results, output) => {
                self.arr.push(results);
                if (self.arr.length == 2) {
                    self.extractData()
                }
            });
        });

    }



    extractData() {
        let sis: Array<SupportIssue> = [];
        this.arr[0].forEach(i => {
            sis.push({ id: i.ID, prb: i.Problem, sln: i.Solution, mID: i.ModuleID, ts: i.TimeStamp })
        })
        let sisLnk: Array<SupportIssueLink> = [];
        this.arr[1].forEach(i => {
            sisLnk.push({ id: i.ID, sIid: i.SupportIssueID, pth: i.Path, nm: '' })
        })
        let grpd = _.groupBy(sisLnk, 'sIid');

        _.each(grpd, (lnk) => {


            let si = sis.find(item => item.id == lnk[0].sIid);

            if (si != null) {
                si.lnks = [];
                _.each(lnk, (i) => {
                    si.lnks.push({ id: i.id, sIid: +i.sIid, pth: i.pth, nm: i.nm });
                })
            }
            SupportIssues = sis;



        })
        SupportIssuesResponse = { sis: SupportIssues, time: new Date() };
        console.log('faqs is loaded');
    }
}
