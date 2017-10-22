import {NgRedux} from '@angular-redux/store'
import {IAppState} from '../redux/IAppState'
import {Injectable} from "@angular/core";
import {DataService} from "../services/data.service";
import {DanelVersionResponse, Module} from "../../models";

export const FILTER_ENVS = 'courses/FILTER';
export const REQUEST_ENVS_SUCCESS = 'courses/REQUEST_ENVS_SUCCESS';

@Injectable()
export class EnvAction {
  constructor(private  ngRedux: NgRedux<IAppState>, private dataService: DataService) {
  }

  getEnvs() {
    this.dataService.GetData<DanelVersionResponse>('envs')
      .subscribe(envsRsponse => {
        this.ngRedux.dispatch({
          type: REQUEST_ENVS_SUCCESS,
          envs: envsRsponse.vers
        })
      })
  }

  filterEnvs(mdl: Module) {
    this.ngRedux.dispatch({
      type: FILTER_ENVS,
      mdl
    })
  }
}
