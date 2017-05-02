export class DanelVersion {
  vr: Version;
  dbName: string;
  fp: string;
}

export class Version {
  _Major: number; _Minor: number; _Build: number; _Revision: number;
}
export class DanelVersionResponse {
  vers: DanelVersion[];
  time: Date;
}

export class Link {
  ctg: string;
  nm: string;
  pth: string;
}

export class LinkResponse {
  lnks: Link[];
  time: Date;
}
export class SupportIssue {
  del?: boolean;
  id?: number;
  prb?: string
  sln?: string
  mID?: number;
  mod?: Module;
  ts?: Date;
  lnks?: SupportIssueLink[];

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

export class RollerResponse {
  rlrs: Roller[]
  time: Date;
}



