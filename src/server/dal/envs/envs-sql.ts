

import * as _ from 'lodash'
import { MsNodeSqlDriverApiModule as v8 } from '../lib/MsNodeSqlDriverApiModule'

import v8Connection = v8.v8Connection;
import v8PreparedStatement = v8.v8PreparedStatement;
import v8BindCb = v8.v8BindCb;
import v8BulkMgr = v8.v8BulkTableMgr;
import v8Error = v8.v8Error;
import { Danel, Home } from "../../dal/sql.config";

export const sql: v8.v8driver = require('msnodesqlv8');


import { DanelVersionResponse, DanelVersion } from "models";
import { Ienvs } from "server/dal/envs/Ienvsdal";


export let envsResponse: DanelVersionResponse

var config = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client XX.0};Server={SERVER\\NAME};Database={dbName};Trusted_Connection={yes};',
};


export class EnvsSql implements Ienvs {
    rowArr: Array<any> = new Array();
    loadEnvs(): void {
        var self = this;

        let splittedSrvs = Danel.conn_str_srvs.split(';');


        let srvsNum = splittedSrvs.length;
        let counter: number = 0;

        splittedSrvs.forEach(i => {


            sql.open(`Driver={SQL Server Native Client 11.0};Server={${i}};Database={master};Trusted_Connection={yes};`, (err, conn) => {

                let res = conn.query(Danel.env_proc, [], (err, results, output) => {




                    // console.log(results.length);
                    // if (self.arr.length == srvsNum)
                    // self.extractData();
                    self.rowArr.push(results);
                });
                res.on('done', result => {
                    // console.log('done');
                    counter++;
                    if (counter == srvsNum)
                        self.extractData();
                })
            }
            )
        })
    }

    private generateClientLocation(clientLocation: string, serverName: string): string {

        var mainFolder = clientLocation.substring(0, 2);
        // console.log(mainFolder);


        if (mainFolder != "\\")
            clientLocation = clientLocation.replace(mainFolder, `\\${serverName}`);
        // console.log(clientLocation);

        return clientLocation;
    }

    extractData() {

        let arr: Array<DanelVersion> = new Array();
        this.rowArr.forEach(i => {


            let rawClientLocation = i[0].clientLocation;


            let serverName = i[0].serverName;
            let clientLocation = this.generateClientLocation(rawClientLocation, serverName);
            arr.push({ vr: { _Major: i[0].MajorVersion, _Minor: i[0].MinorVersion, _Build: i[0].SubVersion, _Revision: i[0].BuildNumber }, dbName: i[0].DB_NAME, fp: clientLocation });
        })

        // console.log(arr[0]);
        let l = _.groupBy(arr, (i) => {
            i.vr._Major + '#'
                + i.vr._Minor + '#'
                + i.vr._Build + '#'
                + i.vr._Revision
        });
        console.log(l);
        let ll = _.toArray(l);
        envsResponse = { vers: ll, time: new Date() }

        // let rlrs: Array<Roller> = new Array();



        // this.arr.forEach(i => {
        //     rlrs.push({ id: i[0].rol_id, msg: i[0].rol_massage, time: i[0].rol_timeStamp })
        // })


        // newsResponse = { news: rlrs, time: new Date() };



        // console.log('news is loaded');
    }

}