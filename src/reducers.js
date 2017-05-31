import lists from './lists';
import defaultTheme from './theme';

export default function reducer(state = {
  lists: { ...lists },
  theme: defaultTheme,
}, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
