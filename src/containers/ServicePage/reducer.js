import * as ACTION from './constants';

const initialState = {
  listService: [],
  listType: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION.GET_LIST_TYPE:
      state.listType = payload;
      console.log(state.listType);
      return { ...state };

    case ACTION.GET_LIST_SERVICE:
      return { ...state };
    default:
      return state;
  }
};
