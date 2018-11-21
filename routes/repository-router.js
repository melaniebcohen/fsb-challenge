'use strict';

const Router = require('express').Router();
const Repository = require('../model/repository');
const request = require('request-promise');

// GET ALL REPOSITORIES
Router.get('/api/repositories', (req, res) => {
  let options = {
    uri: 'https://api.github.com/repositories?since=1000',
    headers: { 
      'User-Agent': 'Request-Promise',
    },
    json: true,
  };

  request(options)
    .then((response) => {
      return res.send({ response });
    })
    .catch(console.log); // tbd!
});


module.exports = Router;