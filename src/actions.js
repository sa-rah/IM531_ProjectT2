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
    payload: { addList: false, editList: false, displayLists: false },
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


export function asyncAdding(data) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(addToList(data)).then(() => {
      dispatch(loadLists(data.user));
    });
    resolve();
  });
}

export function asyncEditing(data) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(editUserList(data)).then(() => {
      dispatch(loadLists(data.user));
    });
    resolve();
  });
}

export function asyncDeleting(data) {
  return dispatch => new Promise((resolve, reject) => {
    dispatch(deleteUserList(data)).then(() => {
      dispatch(loadLists(data.user));
    });
    resolve();
  });
}
