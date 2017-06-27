export class DanelVersion {
  vr: Version;
  dbName: string;
  fp: string;
  _Version: number;
  serverName: string;
  listenerPort: number;
  notificationPort: number;
  clientFolder: string;
  winServiceName: string;
  winNotificationName: string;
  winServiceIsUp: boolean;
  winNotificationIsUp: boolean;
  id: number;
  winNotificationStatus: ServiceControllerStatus;
  winListenerStatus: ServiceControllerStatus;
  wcfport: string;
  notificationSubscriptionsPort: string;
  winListenerStatusIsCahnging: boolean;
  winNotificationStatusIsCahnging: boolean;
  version: string;
  listenerPorts: string;
  notificationPorts: string;
}

export enum ServiceControllerStatus {
  NotExists = -1,
  ContinuePending = 5,
  Paused = 7,
  PausePending = 6,
  Running = 4,
  StartPending = 2,
  Stopped = 1,
  StopPending = 3,
}

export class Version {
  _Major: number; _Minor: number; _Build: number; _Revision: number;
}
export class DanelVersionResponse {
  vers: DanelVersion[][];
  flatVers: DanelVersion[];
  ver: DanelVersion;
  time: Date;
}

export class Link {
  ctg: string;
  nm: string;
  pth: string;
}

export class LinkResponse {
  lnks: Link[][];
  time: Date;
}
export class SupportIssue {
  id?: number;
  prb?: string
  sln?: string
  mID?: number;
  mod?: Module;
  ts?: Date;
  lnks?: SupportIssueLink[];
  mdlName?: string

}
export class SupportIssueLink {
  id?: number;
  sIid?: number;
  pth: string;
  nm: string;
}
export class SupportIssueResponse {
  sis: SupportIssue[]
  time: Date;
}
export class Module {
  id: number;
  pID?: number
  children: Module[]
  name: string
}

export class ModuleResponse {
  mdls: Module[]
  time: Date;
}

export class Roller {
  id: number;
  msg: string
  time: Date;
}

export class NewsResponse {
  news: Roller[]
  time: Date;
}



