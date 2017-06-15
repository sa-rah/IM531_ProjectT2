const $BASE_URL = 'http://localhost:3005';

export function loginUser(data) {
  const url = `${$BASE_URL}/api/user/login`;
  return {
    type: 'LOGIN',
    payload: fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
          .then(response => response.json())
          .then((res) => {
            const loggedIn = res.login;
            const id = res.id;
            const name = res.name;
            const mail = res.mail;
            const lists = res.lists;
            return {
              loggedIn,
              id,
              mail,
              name,
              lists,
            };
          }).catch(error => error),
  };
}

export function showRegisterForm() {
  return {
    type: 'SHOW_REGISTER_FORM',
    payload: { register: true },
  };
}

export function showLoginForm() {
  return {
    type: 'SHOW_LOGIN_FORM',
    payload: { register: false },
  };
}

export function registerUser(data) {
  const url = `${$BASE_URL}/api/user/add`;
  return {
    type: 'REGISTER_USER',
    payload: fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
            .then(response => response.json())
            .then((res) => {
              const loggedIn = res.login;
              const id = res.id;
              const name = res.name;
              const mail = res.mail;
              const lists = res.lists;
              const register = res.register;
              return {
                loggedIn,
                register,
                mail,
                name,
                id,
                lists,
              };
            }),
  };
}

export function logoutUser() {
  return {
    type: 'LOGOUT',
    payload: { loggedIn: false,
      user_data: {
        id: '',
        name: '',
        mail: '',
        lists: '',
      },
      message: '',
    },
  };
}
