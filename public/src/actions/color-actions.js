import superagent from 'superagent';

export const multipleColorsFetch = (colors) => ({
  type: 'MULTIPLE_COLORS_FETCH',
  payload: colors,
});

export const singleColorFetch = (color) => ({
  type: 'SINGLE_COLOR_FETCH',
  payload: color,
});

export const allColorsFetchRequest = (page) => (dispatch, getState) => {
  return superagent.get(`https://hh-challenge.herokuapp.com/api/colors?page=${page}`)
    .set('Access-Control-Allow-Origin', '*')
    .then(res => {
      dispatch(multipleColorsFetch(res.body));
      return res;
    });
};

export const colorFetchRequest = (hex) => (dispatch, getState) => {
  return superagent.get(`https://hh-challenge.herokuapp.com/api/color/${hex}`)
    .set('Access-Control-Allow-Origin', '*')
    .then(res => {
      dispatch(singleColorFetch(res.body));
      return res;
    });
};

export const colorFamilyFetchRequest = (family, page) => (dispatch, getState) => {
  return superagent.get(`https://hh-challenge.herokuapp.com/api/colors/${family}?page=${page}`)
    .set('Access-Control-Allow-Origin', '*')
    .then(res => {
      dispatch(multipleColorsFetch(res.body));
      return res;
    });
};

export const randomFetchRequest = () => (dispatch, getState) => {
  return superagent.get(`https://hh-challenge.herokuapp.com/api/random`)
    .set('Access-Control-Allow-Origin', '*')
    .then(res => {
      dispatch(singleColorFetch(res.body));
      return res;
    });
};
