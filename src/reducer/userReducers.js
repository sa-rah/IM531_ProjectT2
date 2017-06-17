export default function userReducer(state = {
  user_data: {
    id: '',
    name: '',
    mail: '',
    lists: [],
  },
  loggedIn: false,
  register: false,
  message: '',
}, action) {
  switch (action.type) {
    case 'LOGIN_FULFILLED': {
      if (typeof action.payload.loggedIn === 'undefined') {
        return {
          ...state,
          message: 'Login not possible!',
          loggedIn: false,
        };
      }
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        user_data: {
          id: action.payload.id,
          name: action.payload.name,
          mail: action.payload.mail,
          lists: action.payload.lists,
        },
      };
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        message: 'Login not possible.',
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        user_data: action.payload.user_data,
        loggedIn: action.payload.loggedIn,
        message: action.payload.message,
      };
    }
    case 'SET_ERROR_MESSAGE': {
      return {
        ...state,
        message: action.payload.message,
      };
    }
    case 'SHOW_REGISTER_FORM': {
      return {
        ...state,
        register: action.payload.register,
        message: '',
      };
    }
    case 'SHOW_LOGIN_FORM': {
      return {
        ...state,
        register: action.payload.register,
        message: '',
      };
    }
    case 'REGISTER_USER_FULFILLED': {
      if (typeof action.payload.register === 'undefined') {
        return {
          ...state,
          message: 'Registration not possible!',
          loggedIn: false,
          register: false,
        };
      }
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        register: action.payload.register,
        user_data: { name: action.payload.name,
          mail: action.payload.mail,
          id: action.payload.id,
          lists: action.payload.lists },
      };
    }
    case 'LOAD_USER_DATA': {
      return {
        ...state,
      };
    }
    case 'LOAD_USER_DATA_FULFILLED': {
      return {
        ...state,
        user: action.payload.user,
      };
    }
    default: {
      return state;
    }
  }
}
