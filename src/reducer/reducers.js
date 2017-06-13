import defaultTheme from '../theme';

export default function reducer(state = {
  lists: [],
  theme: defaultTheme,
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
    default: {
      return state;
    }
  }
}
