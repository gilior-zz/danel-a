import {DanelVersion} from "../../models";

export interface IAppState {
  versions: DanelVersion[][];
  filteredVersions: DanelVersion[][]
}
