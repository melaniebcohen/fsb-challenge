'use strict';

const request = require('superagent');
const server = require('../server.js');
const serverToggle = require('../lib/server-toggle');

require('jest');

describe('Repository Router', () => {
  beforeAll(done => serverToggle.serverOn(server, done));
  afterAll(done => serverToggle.serverOff(server, done));

  // This test will only work without rate limiting
  describe('GET: /api/followers/:userLogin', () => {
    it('should return public repositories information', (done) => {
      return request.get('http://localhost:3000/api/repositories')
        .then((res) => {
          if (!res.message) {
            expect(typeof res.body).toBe('object');
            expect(res.body[0]).toHaveProperty('repositoryId');
            done();
          }
        });
    });
  });

  // This test will only work without rate limiting
  describe('GET: /api/followers/:userLogin', () => {
    it('should return information about a single user', (done) => {
      return request.get('http://localhost:3000/api/followers/andykent')
        .then((res) => {
          if (!res.message) {
            expect(res.body.login).toEqual('andykent');
            expect(res.body).toHaveProperty('node_id');
            expect(res.body.node_id).toEqual('MDQ6VXNlcjYxNA==');
            expect(res.body.followers).toEqual(71);
            done();
          }
        });
    });
  });
});
