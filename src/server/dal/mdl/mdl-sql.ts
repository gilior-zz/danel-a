import { Imdl } from "server/dal/mdl/ImdlDal";
import { Module, ModuleResponse } from "../../../models";
import { MsNodeSqlDriverApiModule as v8 } from '../lib/MsNodeSqlDriverApiModule'
import * as _ from 'lodash'
import v8Connection = v8.v8Connection;
import v8PreparedStatement = v8.v8PreparedStatement;
import v8BindCb = v8.v8BindCb;
import v8BulkMgr = v8.v8BulkTableMgr;
import v8Error = v8.v8Error;
import { Danel,Home } from "../../dal/sql.config";
// import * as sql from 'mssql/msnodesqlv8'

export const sql: v8.v8driver = require('msnodesqlv8');
let conn_str = 'Driver={SQL Server Native Client 11.0};Server={USER-PC\\SQL};Database={info};Trusted_Connection={yes};';
export let ModulesResponse: ModuleResponse;
export class MdlSql implements Imdl {

    loadmdls(): void {
        var self = this;
        sql.open(Danel.conn_str_support, (err, conn) => {
            var pm = conn.procedureMgr();
            pm.callproc('ModulesTreeSelect', [], (err, results, output) => {
                let arr: Array<Module> = new Array();
                results.forEach(i => {
                    arr.push({ pID: i['ParentID'], id: i['ChildID'], name: i['Text'], children: null })
                })
                let tree = self.extractData(arr, null, null);
                ModulesResponse = { mdls: tree, time: new Date() }
                console.log('mdls is loaded');
                

            });
        });

    }

    private extractData(rowArr: Array<Module>, parent: Module, tree: Array<Module>): Array<Module> {
        var self = this;
        tree = tree != null ? tree : [];
        parent = parent != null ? parent : { id: 0, pID: 0, children: [], name: '' };

        var children = _.filter(rowArr, function (child) { return child.pID == parent.id; });

        if (!_.isEmpty(children)) {
            if (parent.id == 0) {
                tree = children;
            } else {
                parent['children'] = children;
            }
            _.each(children, function (child) { self.extractData(rowArr, child, tree) });
        }

        return tree;

    }




}