


import { IFaQDal } from './Ifaqdal';

import * as _ from 'lodash'
import * as sql from 'mssql'
import { IProcedureResult } from "mssql";
import { SupportIssue, SupportIssueLink } from "models";

export let SupportIssues: Array<any>;
export class FaqsSql implements IFaQDal {


    async  generateRequest(): Promise<sql.Request> {
        const pool1 = new sql.ConnectionPool(
            {
                user: 'liorg',
                password: '123qwe!@#asd',
                server: 'DANEL-DB\\S16',
                database: 'support_new'
            }
        )
        await pool1.connect();
        let sqlRequest = await pool1.request();
        return sqlRequest;
    }

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

        let res = await this.AddFaq(req);
        let newID = res.output.newID;
        console.log(newID);
        let newFaq = { id: newID, prb: req.body.prb, sln: req.body.sln, ts: new Date().getDate(), lnks: req.body.lnks };
        SupportIssues.push(newFaq);
        newFaq.lnks.forEach(i => {
            this.AddLnks(i, newFaq.id);
        })
        return res;
    }




    private async AddLnks(supportIssueLink: SupportIssueLink, sID: number): Promise<any> {

        let sqlReqeust = await this.generateRequest();
        sqlReqeust
            .input('@SupportIssueID', sql.NVarChar, sID)
            .input('Path', sql.NVarChar, supportIssueLink.pth)

            .execute('SupportIssueLinksUpdate').then((res) => {

            });
    }

    private async  AddFaq(req): Promise<sql.IProcedureResult<any>> {


        let sqlReqeust = await this.generateRequest();
        return sqlReqeust
            .output('newID', sql.Int)
            .input('ID', null)
            .input('Problem', sql.NVarChar, req.body.prb)
            .input('Solution', sql.NVarChar, req.body.sln)
            .input('ModuleID', sql.Int, -1)
            .execute('SupportIssuesUpdate')
        // .then((res) => {
        //     let newID = res.output.newID;
        //     console.log(newID);
        //     let newFaq = { id: newID, prb: req.body.prb, sln: req.body.sln, ts: new Date().getDate(), lnks: req.body.lnks };
        //     SupportIssues.push(newFaq);
        //     console.log(newFaq);

        //     return newFaq;
        // });




    }

    async  UpdateItem(req): Promise<any> {
        try {
            let sqlReqeust = await this.generateRequest();
            sqlReqeust
                .input('ID', sql.Int, req.body.id)
                .input('Problem', sql.NVarChar, req.body.prb)
                .input('Solution', sql.NVarChar, req.body.sln)
                .input('ModuleID', sql.NVarChar, req.body.mID)
                .execute('[SupportIssuesUpdate]').then(() => {
                    var item = SupportIssues.find(i => i.id == req.body.id);
                    if (item != null) {
                        item.sln = req.body.sln;
                        item.prb = req.body.prb;
                    }
                });
        }
        catch (err) {
            console.log(err);

            return Promise.resolve(null);
        }
    }

    async  deleteItem(req): Promise<any> {
        try {
            let sqlReqeust = await this.generateRequest();
            sqlReqeust
                .input('ID', sql.Int, req.params.faqID)
                .execute('[SupportIssuesDelete]').then(() => {
                    var index = SupportIssues.indexOf(req['faq'], 0);
                    if (index > -1) {
                        SupportIssues.splice(index, 1);
                    }

                    SupportIssues.slice()
                });
        }
        catch (err) {
            console.log(err);

            return Promise.resolve(null);
        }
    }

    async  loadFaqS(): Promise<Array<SupportIssue>> {
        try {
            let sqlReqeust = await this.generateRequest();
            sqlReqeust
                .execute('SupportIssuesSelect').then(this.extractData);
        }
        catch (err) {
            console.log(err);

            return Promise.resolve(null);
        }
    }

    extractData(res: IProcedureResult<any>) {
        let sis: Array<SupportIssue> = [];
        res.recordsets[0].forEach(i => {
            sis.push({ id: i.ID, prb: i.Problem, sln: i.Solution, mID: i.ModuleID, ts: i.TimeStamp })
        })

        let sisLnk: Array<SupportIssueLink> = [];
        res.recordsets[1].forEach(i => {
            sisLnk.push({ id: i.ID, sIid: i.SupportIssueID, pth: i.Path, nm: '' })
        })

        let grpd = _.groupBy(sisLnk, 'sIid');

        _.each(grpd, (lnk) => {


            let si = sis.find(item => item.id == lnk[0].sIid);

            if (si != null) {
                si.lnks = [];
                // console.log(si);

                _.each(lnk, (i) => {
                    // console.log(i);

                    si.lnks.push({ id: i.id, sIid: +i.sIid, pth: i.pth, nm: i.nm });
                    // console.log(si);
                })
            }
            // console.log(sis);
            SupportIssues = sis;
            return sis;
        })

    }
}
