import { APIGatewayEvent, Context } from "aws-lambda"
import { GithubClient } from "../services/GithubClient";

export async function handler(event: APIGatewayEvent, context: Context) {
    const client = new GithubClient();
    const data = await client.getLatestIssues();

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
}
