

import * as _ from 'lodash'
import { MsNodeSqlDriverApiModule as v8 } from '../lib/MsNodeSqlDriverApiModule'

import v8Connection = v8.v8Connection;
import v8PreparedStatement = v8.v8PreparedStatement;
import v8BindCb = v8.v8BindCb;
import v8BulkMgr = v8.v8BulkTableMgr;
import v8Error = v8.v8Error;
import { Danel, Home } from "../../dal/sql.config";

export const sql: v8.v8driver = require('msnodesqlv8');


import { LinkResponse, Link } from "models";
import { Ilnks } from "server/dal/lnks/Ilnks";


export let lnkResponse: LinkResponse

var config = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client XX.0};Server={SERVER\\NAME};Database={dbName};Trusted_Connection={yes};',
};

export class LnksSql implements Ilnks {
    rowArr: Array<any> = new Array();
    loadLnks(): void {
        var self = this;
        sql.open(Danel.conn_str_support, (err, conn) => {
            var pm = conn.procedureMgr();
            pm.callproc('SystemLinksSelect', [], (err, results, output) => {
                self.rowArr = results;
                self.extractData()

            });
        });

    }



    extractData() {
        let lnks: Array<Link> = new Array();



        this.rowArr.forEach(i => {
            lnks.push({ pth: i.path, nm: i.name, ctg: i.category });
        })

        let grpd = _.groupBy(lnks, 'ctg');
        let grpdArr = _.toArray(grpd);
        lnkResponse = { lnks: grpdArr, time: new Date() };



        console.log('lnks is loaded');
    }

}