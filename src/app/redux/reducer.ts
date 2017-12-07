import {IAppState} from './IAppState'
import {FILTER_ENVS, REQUEST_ENVS_SUCCESS} from '../environment/env.action'
import {DanelVersion} from "../../models";

const initialState: IAppState = {
  versions: [],
  filteredVersions: []
}

function filterEnvs(state: IAppState, action): IAppState {

  let res: DanelVersion[]=[];
  if (action.mdl == null) return;
  if (action.mdl != null) {
    state.versions.forEach(i => {
      i.forEach(j => {
        if (j.lckdMdls !== null && j.lckdMdls.includes(action.mdl.id)) {
          res.push(j);

        }
      })
    })
    return Object.assign({}, state, {
      filteredEnvs: res      
    })
  }
}


function storeEnvs(state, action): IAppState {
  return Object.assign({}, state, {
    versions: action.envs,
    filteredVersions: action.envs
  })
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_ENVS:
      return filterEnvs(state, action);
    case REQUEST_ENVS_SUCCESS:
      return storeEnvs(state, action)
    default:
      return state;
  }
}

