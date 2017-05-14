import { IProcedureResult } from 'mssql';
import { Module } from '../../../models';
export interface ImdlDal {


    loadmdls(): Promise<Array<Module>>;

}
