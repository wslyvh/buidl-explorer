import { Query } from "react-apollo";
import { ISearchRepositories } from "../../types";

interface ISearchRepositoryResults {
	searchRepositories: ISearchRepositories;
}

interface ISearchArguments {
	first: number;
	type: string;
	startCursor?: string;
	endCursor?: string;
}

export class SearchRepositoryQuery extends Query<ISearchRepositoryResults, ISearchArguments> {}
