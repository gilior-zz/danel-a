import { IProcedureResult } from 'mssql';
import { SupportIssue } from '../../../models';
export interface IFaQ {
    loadFaqS();
    deleteItem(req, res): void;
    UpdateItem(req, res):void;
    AddItem(req, res): void;
}
