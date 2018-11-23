export interface IUser {
  id: string;
  login: string;
  avatarUrl: string;
  url: string;
}

export interface IIssue {
  id: string;
  title: string;
  url: string;
  author?: IUser;
  updatedAt: string;
}

export interface IRepository {
  id: string;
  name: string;
  description: string;
  url: string;
  stargazersCount: number;
  owner: IUser;
}
