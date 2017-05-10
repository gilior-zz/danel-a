
import { IFaQDal } from './Ifaqdal';

import * as _ from 'lodash'
import * as sql from 'mssql'
import { IProcedureResult } from "mssql";
import { SupportIssue, SupportIssueLink } from "models";

export let SupportIssues: Array<any>;
export class FaqsSql implements IFaQDal {
    async  deleteItem(id: any): Promise<any> {
        try {
            const pool1 = new sql.ConnectionPool(
                {
                    user: 'lior',
                    password: '1234',
                    server: '127.0.0.1',
                    database: 'info'
                }
            )
            await pool1.connect();
            await pool1.request() // or: new sql.Request(pool1) 
                .input('@ID', id)
                .execute('SupportIssueLinksDelete');
        }
        catch (err) {
            console.log(err);

            return Promise.resolve(null);
        }
    }

    async  loadFaqS(): Promise<Array<SupportIssue>> {
        try {
            const pool1 = new sql.ConnectionPool(
                {
                    user: 'lior',
                    password: '1234',
                    server: '127.0.0.1',
                    database: 'info'
                }
            )
            await pool1.connect();
            await pool1.request() // or: new sql.Request(pool1) 
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
