/* eslint-disable import/prefer-default-export */
const $BASE_URL = 'http://localhost:3005';

export function loginUser(data) {
  console.log(data);
  const url = `${$BASE_URL}/api/login`;
  return {
    type: 'LOGIN',
    payload:
        fetch(url)
        .then(response => response.json())
        .then(() => {
          const loggedIn = true;
          return {
            loggedIn,
          };
        }),
  };
}

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

export function loadUser(userData) {
  const url = `${$BASE_URL}/api/user/${userData.id}`;
  return {
    type: 'LOAD_USER_DATA',
    payload:
            fetch(url)
                .then(response => response.json())
                .then((data) => {
                  const user = data;
                  return {
                    user,
                  };
                }),
  };
}
