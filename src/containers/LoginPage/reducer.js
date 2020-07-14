import { UPDATE_CURRENT_USER } from './constants';

let initState = {
  currentUser: null,
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      console.log(action);
      state.currentUser = action.user;
      return { ...state };

    default:
      return { ...state };
  }
};

export default loginReducer;
