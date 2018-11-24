export interface IUser {
  id: string;
  login: string;
  avatarUrl: string;
  url: string;
}

export interface IIssue {
  id: string;
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

export interface IRepository {
  id: string;
  name: string;
  description: string;
  url: string;
  stargazers: IStargazers;
  owner: IUser;
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
