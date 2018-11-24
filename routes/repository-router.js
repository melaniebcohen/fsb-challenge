const Router = require('express').Router();
const request = require('request-promise');
const fs = require('fs');
const path = require('path');

const Repository = require('../lib/repoConstructor');
const queryPoints = require('../lib/queryPoints');

const _parseErr = (err) => {
  return JSON.parse(err.message.split('- ')[1]).message;
};

// GET ALL REPOSITORIES
Router.get('/api/repositories', (req, res) => {
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

        return res.end(res.writeHead(statusCode, _parseErr(repoErr), { 'content-type': 'application/json' }));
      }

      const jsonArr = JSON.stringify(repoArr);

      return fs.writeFile('../data/repositories.json', jsonArr, 'utf8', () => {
        res.status(200).sendFile(path.join(__dirname, '../data/', 'repositories.json'));
        console.log('Successfully sent repositories.json');
      });
    })
    .catch(err => console.log(err));
});

// GET BACKUP REPOSITORIES (LOCAL)
Router.get('/api/repositories-backup', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../data/', 'repositoryBackup.json'), () => {
    return console.log('Succssfully sent repositoryBackup.json');
  });
});

// GET USER INFORMATION
Router.get('/api/followers/:userLogin', (req, res) => {
  return request({
    uri: `https://api.github.com/users/${req.params.userLogin}`,
    headers: { 'User-Agent': 'Request-Promise' },
    json: true,
  }).then((response) => {
    res.send(response);
  }).catch((err) => {
    const { statusCode } = err;

    return res.end(res.writeHead(statusCode, _parseErr(err), { 'content-type': 'application/json' }));
  });
});

module.exports = Router;
