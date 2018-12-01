import { Query } from "react-apollo";
import { IRepository } from "../../types";

interface IRepositoryData {
    searchRepositories: IRepository[];
}

interface IQueryVariables {
    first: number;
}

export class SearchRepositoryQuery extends Query<IRepositoryData, IQueryVariables> { }
