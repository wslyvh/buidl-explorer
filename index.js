const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { apolloServer } = require('./graphql/server');

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

apolloServer.applyMiddleware({ app, path: '/graphql' });

const { repositories, issues } = require('./mocks'); // Mocked data

// API calls
app.get('/api/repos', (req, res) => {
  res.json(repositories);
});

app.get('/api/issues', (req, res) => {
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