import defaultTheme from '../theme';

export default function reducer(state = {
  lists: [],
  theme: defaultTheme,
  user: {
    id: '',
    name: '',
  },
}, action) {
  switch (action.type) {
    case 'LOAD_LISTS': {
      return {
        ...state,
      };
    }
    case 'LOAD_LISTS_FULFILLED': {
      return {
        ...state,
        lists: action.payload.lists,
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
