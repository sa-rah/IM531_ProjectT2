import defaultTheme from '../theme';

export default function reducer(state = {
  lists: [],
  current_games: [],
  theme: defaultTheme,
  displayLists: false,
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
        displayLists: true,
      };
    }
    case 'LOAD_GAMES_FOR_LIST_FULFILLED': {
      return {
        ...state,
        current_games: action.payload.games,
        displayLists: false,
      };
    }
    default: {
      return state;
    }
  }
}
