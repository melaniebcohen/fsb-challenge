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
    it('should return information about a single user', (done) => {
      return request.get('http://localhost:3000/api/repositories')
        .then((res) => {
          if (!res.message) {
            expect(typeof res.body).toBe('object');
            expect(res.body[0]).toHaveProperty('repositoryId');
            expect(res.body.length).toEqual(123);
            done();
          }
        });
    });
  });

  describe('GET: /api/repositories-backup', () => {
    it('should return a local list of repositories', (done) => {
      return request.get('http://localhost:3000/api/repositories-backup')
        .then((res) => {
          expect(res.body[0]).toEqual({
            repositoryId: 1008,
            ownerLogin: 'andykent',
            ownerId: 614,
            ownerAvatar: 'https://avatars3.githubusercontent.com/u/614?v=4',
            ownerFollowersURL: 'https://api.github.com/users/andykent/followers',
          });
          expect(res.body.length).toEqual(123);
          expect(typeof res.body).toEqual('object');
          done();
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
