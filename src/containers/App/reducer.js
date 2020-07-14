import { UPDATE_CURRENT_USER } from './constants';

let initState = {
  currentUser: null,
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      state.currentUser = action.user;
      return { ...state };

    default:
      return { ...state };
  }
};

export default appReducer;
