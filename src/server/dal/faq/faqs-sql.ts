


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

export let SupportIssues: Array<any>;
let conn_str: string = 'Driver={SQL Server Native Client 11.0};Server={DANEL-DB\\S16};Database={support_new};Trusted_Connection={yes};'
// let conn_str = 'Driver={SQL Server Native Client 11.0};Server={USER-PC\\SQL};Database={info};Trusted_Connection={yes};';

var config = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client XX.0};Server={SERVER\\NAME};Database={dbName};Trusted_Connection={yes};',
};
export class FaqsSql implements IFaQDal {


    // async  generateRequest(): Promise<sql.Request> {
    //     var config = {
    //         driver: 'msnodesqlv8',
    //         connectionString: 'Driver={SQL Server Native Client 11.0};Server={USER-PC\\SQL};Database={noyaDB};Trusted_Connection={yes};',
    //     };

    //     sql.connect(config)
    //         .then(function () {
    //             console.log('connected to noyaDB');

    //         })
    //         .catch(function (err) {
    //             console.log(err);
    //         });

    //     const pool1 = new sql.ConnectionPool(
    //         {
    //             // user: 'liorg',
    //             // password: '123qwe!@#asd',
    //             server: 'DANEL-DB\\S16',
    //             database: 'support_new',

    //         }
    //     )
    //     await pool1.connect();
    //     let sqlRequest = await pool1.request();
    //     return sqlRequest;
    // }

    async  AddItem(req): Promise<SupportIssue> {

        // this.AddFaq(req).then(res => {
        //     let newID = res.output.newID;
        //     console.log(newID);
        //     let newFaq = { id: newID, prb: req.body.prb, sln: req.body.sln, ts: new Date().getDate(), lnks: req.body.lnks };
        //     SupportIssues.push(newFaq);
        //     newFaq.lnks.forEach(i => {
        //         this.AddLnks(i, newFaq.id);
        //     })
        // }

        // )

        this.AddFaq(req);       
        SupportIssues.push(this.newFaq);
        this.newFaq.lnks.forEach(i => {
            this.AddLnks(i, this.newFaq.id);
        })
        return Promise.resolve(this.newFaq);
    }




    private async AddLnks(supportIssueLink: SupportIssueLink, sID: number): Promise<any> {

        // let sqlReqeust = await this.generateRequest();
        // sqlReqeust
        //     .input('@SupportIssueID', sql.NVarChar, sID)
        //     .input('Path', sql.NVarChar, supportIssueLink.pth)

        //     .execute('SupportIssueLinksUpdate').then((res) => {

        //     });
        sql.open(conn_str, function (err, conn) {
            var pm = conn.procedureMgr();
            pm.callproc('SupportIssueLinksUpdate', [sID, supportIssueLink.pth], (err, results, output) => {

            });
        });
    }
    newFaq:SupportIssue;
    private async  AddFaq(req) {
        var self = this;
        // let sqlReqeust = await this.generateRequest();
        // return sqlReqeust
        //     .output('newID', sql.Int)
        //     .input('ID', null)
        //     .input('Problem', sql.NVarChar, req.body.prb)
        //     .input('Solution', sql.NVarChar, req.body.sln)
        //     .input('ModuleID', sql.Int, -1)
        //     .execute('SupportIssuesUpdate')
        console.log('in AddFaq');

        sql.open(conn_str, function (err, conn) {
            var pm = conn.procedureMgr();
            pm.callproc('SupportIssuesUpdate', [null, req.body.prb, req.body.sln, -1], (err, results, output) => {
                let newID = output[1];
                console.log(newID);
                self.newFaq={id:newID,mID:req.body.mID,prb:req.body.prb,sln:req.body,ts:new Date(),lnks:req.body.lnks}
            });
        });
    }

    async  UpdateItem(req): Promise<any> {
        // try {
        //     let sqlReqeust = await this.generateRequest();
        //     sqlReqeust
        //         .input('ID', sql.Int, req.body.id)
        //         .input('Problem', sql.NVarChar, req.body.prb)
        //         .input('Solution', sql.NVarChar, req.body.sln)
        //         .input('ModuleID', sql.NVarChar, req.body.mID)
        //         .execute('[SupportIssuesUpdate]').then(() => {
        //             var item = SupportIssues.find(i => i.id == req.body.id);
        //             if (item != null) {
        //                 item.sln = req.body.sln;
        //                 item.prb = req.body.prb;
        //             }
        //         });
        // }
        // catch (err) {
        //     console.log(err);

        //     return Promise.resolve(null);
        // }


        sql.open(conn_str, function (err, conn) {
            var pm = conn.procedureMgr();
            pm.callproc('SupportIssuesUpdate', [req.body.id, req.body.prb, req.body.sln, req.body.mID], (err, results, output) => {
            });
        });


    }

    async  deleteItem(req): Promise<any> {
        // try {
        //     let sqlReqeust = await this.generateRequest();
        //     sqlReqeust
        //         .input('ID', sql.Int, req.params.faqID)
        //         .execute('[SupportIssuesDelete]').then(() => {
        //             var index = SupportIssues.indexOf(req['faq'], 0);
        //             if (index > -1) {
        //                 SupportIssues.splice(index, 1);
        //             }

        //             SupportIssues.slice()
        //         });
        // }
        // catch (err) {
        //     console.log(err);

        //     return Promise.resolve(null);
        // }
        sql.open(conn_str, function (err, conn) {
            var pm = conn.procedureMgr();
            pm.callproc('SupportIssuesDelete', [req.params.faqID], (err, results, output) => {
            });
        });

    }
    arr: Array<any> = new Array();
    loadFaqS() {

        var self = this;
        // try {
        //     let sqlReqeust = await this.generateRequest();
        //     sqlReqeust
        //         .execute('SupportIssuesSelect').then(this.extractData);
        // }
        // catch (err) {
        //     console.log(err);

        //     return Promise.resolve(null);
        // }
        sql.open(conn_str, function (err, conn) {
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

    }
}
