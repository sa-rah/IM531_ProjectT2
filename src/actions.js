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

export function showAddListForm() {
  return {
    type: 'SHOW_ADD_LIST_FORM',
    payload: { addList: true },
  };
}

export function showLists() {
  return {
    type: 'SHOW_LISTS',
    payload: { addList: false, displayLists: true },
  };
}

export function addToList(data) {
  const url = `${$BASE_URL}/api/user/${data.user.id}/list/add`;
  return {
    type: 'ADD_LIST',
    payload:
        fetch(url, {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
            .then(response => response.json())
            .then((res) => {
              const addList = res;
              return {
                addList,
              };
            }),
  };
}
