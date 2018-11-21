'use strict';

const Router = require('express').Router();
const request = require('request-promise');

// GET ALL REPOSITORIES
Router.get('/api/repositories', (req, res) => {
  const points = [ 1000, 1100, 1200, 1300, 1400, 1500, 1600 ];
  const repoArr = [];

  let promiseArr = points.map((point) => {
    return request({
      uri: `https://api.github.com/repositories?since=${point}`,
      headers: { 'User-Agent': 'Request-Promise' },
      json: true,
    }).then((response) => {
      response.forEach((repo) => {
        if (repo.owner.login.startsWith('a') || repo.owner.login.startsWith('A')) {
          repoArr.push(repo);
        }
      });
      // return res.send(repoArr);
    }).catch((error) => {
      console.log(error.message); // Needs work
    });
  });

  return Promise.all(promiseArr)
    .then(() => console.log(repoArr))
    .catch(() => console.log('womp'));
});

module.exports = Router;