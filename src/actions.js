/* eslint-disable import/prefer-default-export,no-underscore-dangle */
const $BASE_URL = 'http://localhost:3005';

export function loadLists(user) {
  const url = `${$BASE_URL}/api/user/${user.id}/lists`;
  return {
    type: 'LOAD_LISTS',
    payload:
        fetch(url)
        .then(response => response.json())
        .then((data) => {
          const lists = data;
          return {
            lists,
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

export function showEditListForm(id) {
  const url = `${$BASE_URL}/api/lists/${id}`;
  return {
    type: 'SHOW_EDIT_LIST_FORM',
    payload: fetch(url)
        .then(response => response.json())
        .then((res) => {
          const list = res[0];
          const editList = true;
          return {
            list,
            editList,
          };
        }),
  };
}

export function showLists() {
  return {
    type: 'SHOW_LISTS',
    payload: { addList: false, editList: false, displayLists: true },
  };
}

export function showGames() {
  return {
    type: 'SHOW_GAMES_FOR_LIST',
    payload: { addList: false, editList: false, displayLists: false, gameForm: false },
  };
}

export function showGameForm() {
  return {
    type: 'SHOW_GAME_FORM',
    payload: { gameForm: true, displayLists: false },
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
                  const addList = res.addList;
                  return {
                    addList,
                  };
                }),
  };
}

export function editUserList(data) {
  const url = `${$BASE_URL}/api/list/${data.id}/edit`;
  return {
    type: 'EDIT_LIST',
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
                  const editList = res.editList;
                  return {
                    editList,
                  };
                }),
  };
}

export function deleteUserList(data) {
  const url = `${$BASE_URL}/api/list/${data.id}/delete`;
  return {
    type: 'DELETE_LIST',
    payload:
            fetch(url, {
              method: 'DELETE',
              body: JSON.stringify(data.user),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            })
                .then(response => response.json())
                .then((res) => {
                  const editList = res.editList;
                  return {
                    editList,
                  };
                }),
  };
}

export function setCurrentList(id) {
  const url = `${$BASE_URL}/api/lists/${id}`;
  return {
    type: 'SET_CURRENT_LIST',
    payload: fetch(url)
        .then(response => response.json())
        .then((res) => {
          const list = res;
          return {
            list,
          };
        }),
  };
}

export function addGameToList(data) {
  const url = `${$BASE_URL}/api/list/${data.list._id}/games/add`;
  return {
    type: 'ADD_GAME_TO_LIST',
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
                  const addedGame = res.addedGame;
                  return {
                    addedGame,
                  };
                }),
  };
}

export function deleteGameFromList(data) {
  const url = `${$BASE_URL}/api/list/${data.list._id}/games/delete`;
  return {
    type: 'DELETE_GAME_FROM_LIST',
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
                  const editGames = res.editGames;
                  return {
                    editGames,
                  };
                }),
  };
}

export function loadAllUser() {
  const url = `${$BASE_URL}/api/user/`;
  return {
    type: 'LOAD_ALL_USER',
    payload:
            fetch(url)
                .then(response => response.json())
                .then((data) => {
                  const users = data;
                  return {
                    users,
                  };
                }),
  };
}

export function asyncAdding(data) {
  return dispatch => new Promise((resolve) => {
    dispatch(addToList(data)).then(() => {
      dispatch(loadLists(data.user));
    });
    resolve();
  });
}

export function asyncEditing(data) {
  return dispatch => new Promise((resolve) => {
    dispatch(editUserList(data)).then(() => {
      dispatch(loadLists(data.user));
    });
    resolve();
  });
}

export function asyncDeleting(data) {
  return dispatch => new Promise((resolve) => {
    dispatch(deleteUserList(data)).then(() => {
      dispatch(loadLists(data.user));
    });
    resolve();
  });
}

export function asyncLoadGamesForList(id) {
  return dispatch => new Promise((resolve) => {
    dispatch(setCurrentList(id)).then(() => {
      dispatch(showGames());
    });
    resolve();
  });
}

export function asyncLoadUpdatedGamesForList(data) {
  return dispatch => new Promise((resolve) => {
    if (data.delete) {
      dispatch(deleteGameFromList(data)).then(() => {
        dispatch(asyncLoadGamesForList(data.list._id));
      });
    } else {
      dispatch(addGameToList(data)).then(() => {
        dispatch(asyncLoadGamesForList(data.list._id));
      });
    }
    resolve();
  });
}
