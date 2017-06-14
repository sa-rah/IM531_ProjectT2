export default function userReducer(state = {
  user_data: {
    id: '',
    name: '',
    mail: '',
  },
  loggedIn: false,
  register: false,
  message: '',
}, action) {
  switch (action.type) {
    case 'LOGIN_FULFILLED': {
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        user_data: { id: action.payload.id, name: action.payload.name, mail: action.payload.mail },
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
      };
    }
    case 'SHOW_REGISTER_FORM': {
      return {
        ...state,
        register: action.payload.register,
      };
    }
    case 'SHOW_LOGIN_FORM': {
      return {
        ...state,
        register: action.payload.register,
      };
    }
    case 'REGISTER_USER_FULFILLED': {
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        register: action.payload.register,
        user_data: { name: action.payload.name, mail: action.payload.mail, id: action.payload.id },
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