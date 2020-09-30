export interface ISearchRepositories {
  repositoryCount: number;
  pageInfo: IPageInfo;
  nodes: INode[];
}

export interface IPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface INode {
  id: string;
}

export interface IRepository extends INode {
  name: string;
  description: string;
  url: string;
  stargazers: IStargazers;
  owner: IUser;
  primaryLanguage: ILanguage;
  languages: ILanguages;
}

export interface IUser extends INode {
  login: string;
  avatarUrl: string;
  url: string;
}

export interface IIssue extends INode {
  number: number;
  title: string;
  bodyText: string;
  url: string;
  labels: ILabels;
  author?: IUser;
  repository?: IRepository;
  createdAt: string;
  updatedAt: string;
}

export interface IStargazers {
  totalCount: number;
}

export interface ILabels {
  totalCount: number;
}

export interface ILabelNodes {
  name: string;
  color: string;
}

export interface ILanguages {
  totalCount: number;
  nodes: ILanguage;
}

export interface ILanguage extends INode {
  name: string;
  color: string;
}
