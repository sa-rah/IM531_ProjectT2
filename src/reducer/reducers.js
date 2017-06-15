import defaultTheme from '../theme';

export default function reducer(state = {
  lists: [],
  users: [],
  current_list: {},
  theme: defaultTheme,
  displayLists: true,
  addList: false,
  editList: false,
  fetching: false,
}, action) {
  switch (action.type) {
    case 'LOAD_LISTS': {
      return {
        ...state,
      };
    }
    case 'LOAD_LISTS_PENDING': {
      return {
        ...state,
        displayLists: true,
        fetching: true,
      };
    }
    case 'LOAD_LISTS_FULFILLED': {
      return {
        ...state,
        lists: action.payload.lists,
        displayLists: true,
        fetching: false,
      };
    }
    case 'SHOW_ADD_LIST_FORM': {
      return {
        ...state,
        addList: action.payload.addList,
      };
    }
    case 'SHOW_EDIT_LIST_FORM_FULFILLED': {
      return {
        ...state,
        current_list: action.payload.list,
        editList: action.payload.editList,
      };
    }
    case 'SHOW_LISTS': {
      return {
        ...state,
        addList: action.payload.addList,
        editList: action.payload.editList,
        displayLists: action.payload.displayLists,
      };
    }
    case 'SHOW_GAMES_FOR_LIST': {
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
        id: action.payload.id,
        editList: false,
        fetching: false,
      };
    }
    case 'ADD_LIST_PENDING': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'EDIT_LIST_FULFILLED': {
      return {
        ...state,
        addList: false,
        editList: action.payload.editList,
        fetching: false,
      };
    }
    case 'EDIT_LIST_PENDING': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'DELETE_LIST_FULFILLED': {
      return {
        ...state,
        addList: false,
        editList: false,
        fetching: false,
      };
    }
    case 'DELETE_LIST_PENDING': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'SET_CURRENT_LIST_PENDING': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'SET_CURRENT_LIST_FULFILLED': {
      return {
        ...state,
        current_list: action.payload.list[0],
        fetching: false,
      };
    }
    case 'ADD_GAME_TO_LIST_PENDING': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'ADD_GAME_TO_LIST_FULFILLED': {
      return {
        ...state,
        fetching: false,
      };
    }
    case 'DELETE_GAME_FROM_LIST_PENDING': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'DELETE_GAME_FROM_LIST_FULFILLED': {
      return {
        ...state,
        fetching: false,
      };
    }
    case 'LOAD_ALL_USER_FULFILLED': {
      return {
        ...state,
        users: action.payload.users,
      };
    }
    default: {
      return state;
    }
  }
}
