import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import path from "path";
import { GithubClient } from "./server/github/GithubClient";
import apolloServer from "./server/graphql/server";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

apolloServer.applyMiddleware({ app, path: "/graphql" });

// API calls
app.get("/api/repositories/latest", async (req, res) => {

  const client = new GithubClient();
  const result = await client.getLatestRepositories();
  res.json(result);
});

app.get("/api/repositories/featured", async (req, res) => {

  const client = new GithubClient();
  const result = await client.getFeaturedRepositories();
  res.json(result);
});

app.get("/api/issues", async (req, res) => {

  const client = new GithubClient();
  const result = await client.getLatestIssues();
  res.json(result);
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "client/build/index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
