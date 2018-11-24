import superagent from 'superagent';

export const repositoriesFetch = repositories => ({
  type: 'REPOSITORIES_FETCH',
  payload: repositories,
});

export const repositoriesFetchRequest = () => (dispatch) => {
  return superagent.get('http://localhost:3000/api/repositories')
    .set('Access-Control-Allow-Origin', '*')
    .then((res) => {
      const arr = res.body.sort((a, b) => {
        return a.repositoryId - b.repositoryId;
      });
      return dispatch(repositoriesFetch(arr));
    })
    .catch((err) => {
      return err;
    });
};

export const followersFetchRequest = userLogin => () => {
  return superagent.get(`http://localhost:3000/api/followers/${userLogin}`)
    .set('Access-Control-Allow-Origin', '*')
    .then((res) => {
      return res.body;
    });
};
