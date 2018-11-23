const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const { apolloServer } = require('./graphql/server');
const { getLatestRepositories, getFeaturedRepositories, getIssues } = require('./graphql/schema');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

apolloServer.applyMiddleware({ app, path: '/graphql' });

// API calls
app.get('/api/repositories/latest', async (req, res) => {
  var repositories = await getLatestRepositories();
  res.json(repositories);
});

app.get('/api/repositories/featured', async (req, res) => {
  var repositories = await getFeaturedRepositories();
  res.json(repositories);
});

app.get('/api/issues', async (req, res) => {
  var issues = await getIssues();
  res.json(issues);
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname+'client/build/index.html'))
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));