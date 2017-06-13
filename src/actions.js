/* eslint-disable import/prefer-default-export */
const $BASE_URL = 'http://localhost:3005';

export function loadLists(user) {
  const url = `${$BASE_URL}/api/user/${user.id}/lists`;
  return {
    type: 'LOAD_LISTS',
    payload:
        fetch(url)
        .then(response => response.json())
        .then((data) => {
          const lists = Object.keys(data).map(key => data[key]);
          return {
            lists,
          };
        }),
  };
}

export function loadGamesForList(id, user) {
  const url = `${$BASE_URL}/api/user/${user.id}/list/${id}/games`;
  return {
    type: 'LOAD_GAMES_FOR_LIST',
    payload:
        fetch(url)
            .then(response => response.json())
            .then((data) => {
              const games = data;
              return {
                games,
              };
            }),
  };
}
