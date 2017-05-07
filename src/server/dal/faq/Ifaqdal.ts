import { IProcedureResult } from 'mssql';
import { SupportIssue } from '../../../models';
export interface IFaQDal {


    loadFaqS():  Promise<Array<SupportIssue>>;
}
 