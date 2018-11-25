'use strict';

const Router = require('express').Router();
const request = require('request-promise');
const path = require('path');

const Repository = require('../lib/repoConstructor');

const _parseErr = (err) => {
  return JSON.parse(err.message.split('- ')[1]).message;
};

// GET ALL REPOSITORIES
Router.get('/api/repositories', (req, res) => {
  const repoArr = [];
  let repoErr;

  const promiseArr = [1000, 1670].map((point) => {
    return request({
      uri: `https://api.github.com/repositories?since=${point}`,
      headers: { 'User-Agent': 'Request-Promise' },
      json: true,
    }).then((response) => {
      return response.map((repo) => {
        // console.log(repo.owner)
        // if (repo.owner.login.startsWith('a') || repo.owner.login.startsWith('A')) {
        //   // if owner's login startswith 'a' or 'A', new request to provided API endpoint
        //   console.log('yo');
        //   return request({
        //     uri: repo.owner.followers_url,
        //     headers: { 'User-Agent': 'Request-Promise' },
        //     json: true,
        //   })
        //     .then((followersRes) => {
        //       const newRepo = repo;
        //       newRepo.followers = followersRes.length;
        //       console.log(newRepo)
        //       return repoArr.push(new Repository(newRepo));
        //     })
        //     .catch(console.error);
        // }
        return repoArr.push(new Repository(repo));
      });
    }).catch((error) => {
      console.log('error');
      return repoErr = error;
    });
  });

  return Promise.all(promiseArr)
    .then(() => {
      if (repoErr) {
        console.log(repoErr)
        const { statusCode } = repoErr;
        return res.end(res.writeHead(statusCode, _parseErr(repoErr), { 'content-type': 'application/json' }));
      }

      return res.status(200).json(repoArr);
    })
    .catch(err => console.log(err));
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
