'use strict';

const Router = require('express').Router();
const request = require('request-promise');
const fs = require('fs');
const path = require('path');

// GET ALL REPOSITORIES
Router.get('/api/repositories', (req, res) => {
  // const points = [ 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900 ];
  // // const repoArr = [];

  // // let promiseArr = points.map((point) => {
  // //   return request({
  // //     uri: `https://api.github.com/repositories?since=${point}`,
  // //     headers: { 'User-Agent': 'Request-Promise' },
  // //     json: true,
  // //   }).then((response) => {
  // //     response.forEach((repo) => {
  // //       if (repo.owner.login.startsWith('a') || repo.owner.login.startsWith('A')) {
  // //         repoArr.push(repo);
  // //       }
  // //     });
  // //   }).catch((error) => {
  // //     console.log(error.message); // Needs work
  // //   });
  // // });

  // return Promise.all(promiseArr)
  //   .then(() => {
  //     // console.log(repoArr);
  //     // const jsonArr = JSON.stringify(repoArr);
  //     fs.writeFile('repositories.json', jsonArr, 'utf8', (file) => {
  //       console.log('success');

  //       res.sendFile(path.join(__dirname, '../', 'repositories.json'));

  //       // return res.status(200).sendFile('repositories.json', path.join(__dirname, '../'));
  //     });
  //     // return res.status(200).sendFile('repositories.json');
  //   })
  //   .catch((err) => console.log(err));
    res.sendFile(path.join(__dirname, '../', 'repositories.json'));

});

module.exports = Router;