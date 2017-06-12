export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

export default function userReducer(state = {
  loggedIn: false,
}, action) {
  switch (action.type) {
    case 'LOGIN_FULFILLED': {
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
      };
    }
    default: {
      return state;
    }
  }
}
