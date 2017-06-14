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
        editList: false,
        addList: false,
      };
    }
    case 'SHOW_ADD_LIST_FORM': {
      return {
        ...state,
        addList: action.payload.addList,
      };
    }
    case 'SHOW_EDIT_LIST_FORM': {
      return {
        ...state,
        editList: action.payload.editList,
      };
    }
    case 'SHOW_LISTS': {
      return {
        ...state,
        addList: action.payload.addList,
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
      };
    }
    case 'EDIT_LIST_FULFILLED': {
      return {
        ...state,
      };
    }
    case 'DELETE_LIST_FULFILLED': {
      return {
        ...state,
      };
    }
    case 'SET_CURRENT_LIST_FULFILLED': {
      return {
        ...state,
        current_list: action.payload.list[0],
      };
    }
    default: {
      return state;
    }
  }
}
