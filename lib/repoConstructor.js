class Repository {
  constructor(repo) {
    this.repositoryId = repo.id;
    this.ownerLogin = repo.owner.login;
    this.ownerId = repo.owner.id;
    this.ownerAvatar = repo.owner.avatar_url;
    this.ownerFollowersURL = repo.owner.followers_url;
  }
}

module.exports = Repository;
