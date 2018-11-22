const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/repos', (req, res) => {
  var repos = [ "Repo #1", "Repo #2" ];
  res.json(repos);
});

app.get('/api/issues', (req, res) => {
    var issues = [ "Issue #1", "Issue #2" ];
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