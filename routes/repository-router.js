'use strict';

const Router = require('express').Router();
const request = require('request-promise');
const fs = require('fs');
const path = require('path');
const Repository = require('../lib/repoConstructor');

// GET ALL REPOSITORIES
Router.get('/api/repositories', (req, res) => {
  // not the best solution... obvs
  const points = [ 1000, 1584, 1848, 2288, 2665, 3092, 3370, 3781, 4089, 4599, 5015, 5450, 5970, 6621, 7133, 7574 ];
  const repoArr = [];
  let repoErr;

  // let promiseArr = points.map((point) => {
  //   return request({
  //     uri: `https://api.github.com/repositories?since=${point}`,
  //     headers: { 'User-Agent': 'Request-Promise' },
  //     json: true,
  //   }).then((response) => {
  //     response.forEach((repo) => {
  //       if (repo.owner.login.startsWith('a') || repo.owner.login.startsWith('A')) {
  //         repoArr.push(new Repository(repo));
  //       }
  //     });
  //   }).catch((error) => {
  //     repoErr = error;
  //   });
  // });

  // return Promise.all(promiseArr)
  //   .then(() => {
  //     if (repoErr) {
  //       console.log(repoErr.message)
  //     }

  //     const jsonArr = JSON.stringify(repoArr);

      // fs.writeFile('repositories.json', jsonArr, 'utf8', (file) => {
      //   console.log('success');

        res.status(200).sendFile(path.join(__dirname, '../', 'repositories.json'));
    //   });
    //   // return res.status(200).sendFile('repositories.json');
    // })
    // .catch((err) => {
    //   console.log(err)
    // });

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
