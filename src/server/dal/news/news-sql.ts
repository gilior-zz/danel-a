import * as _ from 'lodash'
import { MsNodeSqlDriverApiModule as v8 } from '../lib/MsNodeSqlDriverApiModule'

import v8Connection = v8.v8Connection;
import v8PreparedStatement = v8.v8PreparedStatement;
import v8BindCb = v8.v8BindCb;
import v8BulkMgr = v8.v8BulkTableMgr;
import v8Error = v8.v8Error;


export const sql: v8.v8driver = require('msnodesqlv8');


import { RollerResponse, Roller } from "models";
import { Inews } from "server/dal/news/Inews";


export let RollersResponse: RollerResponse
// let conn_str: string = 'Driver={SQL Server Native Client 11.0};Server={DANEL-DB\\S16};Database={support_new};Trusted_Connection={yes};'
let conn_str = 'Driver={SQL Server Native Client 11.0};Server={USER-PC\\SQL};Database={info};Trusted_Connection={yes};';

var config = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client XX.0};Server={SERVER\\NAME};Database={dbName};Trusted_Connection={yes};',
};

export class NewsSql implements Inews {
    arr: Array<any> = new Array();
    loadNews(): void {
        var self = this;
        sql.open(conn_str, (err, conn) => {
            var pm = conn.procedureMgr();
            pm.callproc('rollerSelect', [], (err, results, output) => {
                self.arr.push(results);
                if (self.arr.length == 2) {
                    self.extractData()
                }
            });
        });

    }



    extractData() {
        let rlrs: Array<Roller> = [];
        this.arr.forEach(i => {
            rlrs.push({ id: i.rol_id, msg: i.rol_massage, time: i.rol_timeStamp })
        })

        RollersResponse = { rlrs: rlrs, time: new Date() };
        console.log('faqs is loaded');
    }

}