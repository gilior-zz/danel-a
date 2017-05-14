import { IProcedureResult } from 'mssql';
import { SupportIssue } from '../../../models';
export interface IFaQDal {


    loadFaqS(): Promise<Array<SupportIssue>>;
    deleteItem(req): Promise<any>;
    UpdateItem(req): Promise<any>;
    AddItem(req): Promise<SupportIssue>;
}
