// import { LOAD_REPOS_SUCCESS, LOAD_REPOS, LOAD_REPOS_ERROR } from './constants';

let initState = {
  // userList: [],
  // userEdit: null,
  // keyword: "",
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    // case ActionType.ON_LIST_USER:
    //   state.userList=action.userList;
    //   return { ...state };

    // case ActionType.EDIT_USER:
    //   state.userEdit = action.user;
    //   return { ...state };

    // case ActionType.USER_FILTER:
    //   state.keyword = action.keyword;
    //   return { ...state };

    default:
      return { ...state };
  }
};

export default appReducer;
