import defaultTheme from '../theme';

export default function reducer(state = {
  lists: [],
  current_list: {},
  theme: defaultTheme,
  displayLists: true,
  addList: false,
  editList: false,
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
    case 'SHOW_ADD_LIST_FORM': {
      return {
        ...state,
        addList: action.payload.addList,
      };
    }
    case 'SHOW_LISTS': {
      return {
        ...state,
        addList: action.payload.addList,
        displayLists: action.payload.displayLists,
      };
    }
    case 'ADD_LIST_FULFILLED': {
      return {
        ...state,
        addList: action.payload.addList,
      };
    }
    default: {
      return state;
    }
  }
}
