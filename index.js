const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/repos', (req, res) => {
  var repos = [ 
    {
      "id": "MDEwOlJlcG9zaXRvcnkxNTQ1MjkxOQ==",
      "name": "go-ethereum",
      "description": "Official Go implementation of the Ethereum protocol",
      "url": "https://github.com/ethereum/go-ethereum",
      "stargazersCount": 21810,
      "owner": {
        "id": "MDEyOk9yZ2FuaXphdGlvbjYyNTA3NTQ=",
        "login": "ethereum",
        "avatarUrl": "https://avatars3.githubusercontent.com/u/6250754?v=4",
        "url": "https://github.com/ethereum"
      }
    },
    {
      "id": "MDEwOlJlcG9zaXRvcnk2NDcwMDkzNA==",
      "name": "openzeppelin-solidity",
      "description": "OpenZeppelin is a library for secure smart contract development",
      "url": "https://github.com/OpenZeppelin/openzeppelin-solidity",
      "stargazersCount": 6382,
      "owner": {
        "id": "MDEyOk9yZ2FuaXphdGlvbjIwODIwNjc2",
        "login": "OpenZeppelin",
        "avatarUrl": "https://avatars3.githubusercontent.com/u/20820676?v=4",
        "url": "https://github.com/OpenZeppelin"
      }
    },
    {
      "id": "MDEwOlJlcG9zaXRvcnk0MDg5MjgxNw==",
      "name": "solidity",
      "description": "Solidity, the Contract-Oriented Programming Language",
      "url": "https://github.com/ethereum/solidity",
      "stargazersCount": 6348,
      "owner": {
        "id": "MDEyOk9yZ2FuaXphdGlvbjYyNTA3NTQ=",
        "login": "ethereum",
        "avatarUrl": "https://avatars3.githubusercontent.com/u/6250754?v=4",
        "url": "https://github.com/ethereum"
      }
    },    
    {
      "id": "MDEwOlJlcG9zaXRvcnkxNTQ2MDY2Ng==",
      "name": "aleth",
      "description": "Aleth – Ethereum C++ client, tools and libraries",
      "url": "https://github.com/ethereum/aleth",
      "stargazersCount": 3441,
      "owner": {
        "id": "MDEyOk9yZ2FuaXphdGlvbjYyNTA3NTQ=",
        "login": "ethereum",
        "avatarUrl": "https://avatars3.githubusercontent.com/u/6250754?v=4",
        "url": "https://github.com/ethereum"
      }
    }
  ];
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