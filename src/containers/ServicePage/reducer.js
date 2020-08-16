import * as ACTION from './constants';

const initialState = {
  listService: [],
  listType: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION.GET_LIST_TYPE:
      state.listType = payload;
      return { ...state };

    case ACTION.GET_LIST_SERVICE:
      state.listService = payload;
      return { ...state };
    default:
      return state;
  }
};
