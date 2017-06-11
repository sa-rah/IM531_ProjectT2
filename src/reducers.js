import lists from './lists';
import defaultTheme from './theme';

export default function reducer(state = {
  lists: [...lists],
  theme: defaultTheme,
  user: {
    id: '1',
    name: 'Sarah',
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
    default: {
      return state;
    }
  }
}
