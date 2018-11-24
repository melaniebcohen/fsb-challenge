'use strict';

const Router = require('express').Router();
const request = require('request-promise');
const fs = require('fs');
const path = require('path');

const Repository = require('../lib/repoConstructor');
const queryPoints = require('../lib/queryPoints');

// GET ALL REPOSITORIES
Router.get('/api/repositories', (req, res) => {
  // not the best solution... 
  const repoArr = [];
  let repoErr;

  const promiseArr = queryPoints.map((point) => {
    return request({
      uri: `https://api.github.com/repositories?since=${point}`,
      headers: { 'User-Agent': 'Request-Promise' },
      json: true,
    }).then((response) => {
      response.forEach((repo) => {
        if (repo.owner.login.startsWith('a') || repo.owner.login.startsWith('A')) {
          repoArr.push(new Repository(repo));
        }
      });
    }).catch((error) => {
      return repoErr = error;
    });
  });

  return Promise.all(promiseArr)
    .then(() => {
      if (repoErr) {
        const { statusCode } = repoErr;
        const messageObj = JSON.parse(repoErr.message.split('- ')[1]).message;

        return res.end(res.writeHead(statusCode, messageObj, { 'content-type': 'application/json' }));
      }

      const jsonArr = JSON.stringify(repoArr);

      fs.writeFile('repositories.json', jsonArr, 'utf8', (file) => {
        console.log('Successfully sent file');

        res.status(200).sendFile(path.join(__dirname, '../', 'repositories.json'));
      });
      // return res.status(200).sendFile('repositories.json');
    })
    .catch((err) => {
      console.log(err)
    });
});

Router.get('/api/followers/:userLogin', (req, res) => {
  return request({
    uri: `https://api.github.com/users/${req.params.userLogin}`,
    headers: { 'User-Agent': 'Request-Promise' },
    json: true,
  }).then((response) => {
    // console.log(response)
    res.send(response);
  }).catch((error) => {
    // repoErr = error;
    console.log(error);
  });
});

module.exports = Router;
