'use strict';

const Router = require('express').Router();
const request = require('request-promise');

const Repository = require('../lib/repoConstructor');

// Helper function to parse error messages
const _parseErr = (err) => {
  return JSON.parse(err.message.split('- ')[1]).message;
};

// Helper function moved outside of call due to async issues
// _fetchFollowersPromiseArr takes all 'a' or 'A' logins and makes a call to find followers
// This needs better error handling, but I ran into time constraints
// Also, this only fetches 30 followers at a time for now, but could be improved in future versions
const _fetchFollowersPromiseArr = (repoArr) => {
  return repoArr.map((repo) => {
    const followers = [];

    return request({
      uri: repo.ownerFollowersURL,
      headers: { 'User-Agent': 'Request-Promise' },
      json: true,
    })
      .then((followerRes) => {
        followerRes.forEach(follower => followers.push(follower.login));
        const newRepo = { ...repo, followers };
        return newRepo;
      })
      .catch(error => console.error(error));
  });
};

// GET ALL REPOSITORIES
Router.get('/api/repositories', (req, res) => {
  const repoArr = [];
  const repoWithFollowersArr = [];
  let repoErr;

  const fetchReposPromiseArr = [1000, 1670].map((point) => {
    return request({
      uri: `https://api.github.com/repositories?since=${point}`,
      headers: { 'User-Agent': 'Request-Promise' },
      json: true,
    })
      .then((response) => {
        response.map((repo) => {
          // if owner's login startswith 'a' or 'A',
          // construct Repository & push into repoWithFollowers array
          if (repo.owner.login.startsWith('a') || repo.owner.login.startsWith('A')) {
            return repoWithFollowersArr.push(new Repository(repo));
          }
          // else construct Repository object for each repository received & push into repoArr
          return repoArr.push(new Repository(repo));
        });
      })
      .catch((error) => {
        return repoErr = error;
      });
  });

  // first Promise.all processes the first calls for all repositories
  return Promise.all(fetchReposPromiseArr)
    // second Promise.all processes the followers for 'a' and 'A' logins
    .then(() => Promise.all(_fetchFollowersPromiseArr(repoWithFollowersArr)))
    // take all of the new repositories with follower lists and merge with the other array
    .then(followersArr => repoArr.concat(followersArr))
    .then((allRepos) => {
      if (repoErr) res.end(res.writeHead(repoErr.statusCode, _parseErr(repoErr), { 'content-type': 'application/json' }));
      return res.status(200).json(allRepos);
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
    return res.end(res.writeHead(err.statusCode, _parseErr(err), { 'content-type': 'application/json' }));
  });
});

module.exports = Router;
