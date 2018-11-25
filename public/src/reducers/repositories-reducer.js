export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case 'REPOSITORIES_FETCH':
      return payload;
    default:
      return state;
  }
};
