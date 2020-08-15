import * as TYPE from './constants';

const initialState = {
  listRoomType: [],
  isediting: '',
  total: '',
  visible: false,
  currentPage:1
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPE.FETCH_ROOM_TYPE:
      state.listRoomType = payload;
      state.total = payload.length;
      return { ...state };
    case TYPE.UPDATE_EDITING:
      if (typeof payload === 'undefined') {
        state.isediting = '';
      } else {
        state.isediting = payload;
      }
      return { ...state };
    case TYPE.UPDATE_TOTAL:
      state.total = payload;
      return { ...state };
    case TYPE.UPDATE_VISIBLE:
      state.visible = !state.visible;
      return { ...state };
    case TYPE.VISIBLE_FALSE:
      state.visible = false;
      return { ...state };
    case TYPE.CANCEL_EDIT:
      state.isediting = '';
      return { ...state };
    default:
      return state;
  }
};
