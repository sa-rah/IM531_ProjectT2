/* eslint-disable import/prefer-default-export */
export function loadLists(lists) {
  return {
    type: 'LOAD_LISTS',
    payload: lists,
  };
}
