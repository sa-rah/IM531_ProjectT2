const $BASE_URL = 'http://localhost:3005';

export function loginUser(data) {
  const url = `${$BASE_URL}/api/login`;
  return {
    type: 'LOGIN',
    payload:
            fetch(url, {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            })
                .then(response => response.json())
                .then((res) => {
                  console.log(res);
                  const loggedIn = res;
                  return {
                    loggedIn,
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
      } },
  };
}
