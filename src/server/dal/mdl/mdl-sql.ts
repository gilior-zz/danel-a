import { ImdlDal } from "server/dal/mdl/ImdlDal";
import { Module } from "../../../models";

export class MdlSql implements ImdlDal {
    async loadmdls(): Promise<Module[]> {
        return Promise.resolve(null);
    }




}