import { GithubClient } from "./GithubClient";

describe("Github Client", () => {
    it("should create a new client instance", () => {
        const client = new GithubClient();

        expect(client).toBeDefined();
        expect(client).toBeInstanceOf(GithubClient);
    });
});
