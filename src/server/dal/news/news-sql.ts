

import * as _ from 'lodash'
import { MsNodeSqlDriverApiModule as v8 } from '../lib/MsNodeSqlDriverApiModule'

import v8Connection = v8.v8Connection;
import v8PreparedStatement = v8.v8PreparedStatement;
import v8BindCb = v8.v8BindCb;
import v8BulkMgr = v8.v8BulkTableMgr;
import v8Error = v8.v8Error;
import { Danel, Home } from "../../dal/sql.config";

export const sql: v8.v8driver = require('msnodesqlv8');


import { NewsResponse, Roller } from "models";
import { Inews } from "server/dal/news/Inews";


export let newsResponse: NewsResponse

var config = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client XX.0};Server={SERVER\\NAME};Database={dbName};Trusted_Connection={yes};',
};

export class NewsSql implements Inews {
    arr: Array<any> = new Array();
    loadNews(): void {
        var self = this;
        sql.open(Danel.conn_str_support, (err, conn) => {
            var pm = conn.procedureMgr();
            pm.callproc('rollerSelect', [], (err, results, output) => {
                self.arr = results;
                self.extractData()

            });
        });

    }



    extractData() {
        let rlrs: Array<Roller> = new Array();
       


        this.arr.forEach(i => {
            rlrs.push({ id: i.rol_id, msg: i.rol_massage, time: i.rol_timeStamp })
        })


        newsResponse = { news: rlrs, time: new Date() };



        console.log('news is loaded');
    }

}