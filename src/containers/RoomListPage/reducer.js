import {
  GET_LIST_ROOM,
  UPDATE_TOTAL,
  CANCEL_EDITING,
  EDITING,
  GET_LIST_ROOM_TYPE,
  UPDATE_VISIBLE,
} from './constants';

let initState = {
  listRoom: [],
  total: 0,
  isEditing: '',
  listRoomType: [],
  visible:false
};
const roomListReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_LIST_ROOM:
      state.listRoom = action.listRoom;
      return { ...state };
    case UPDATE_TOTAL:
      state.total = action.total;
      return { ...state };
    case CANCEL_EDITING:
      state.isEditing = '';
      return { ...state };
    case EDITING:
      state.isEditing = action.editingRow;
      return { ...state };
    case GET_LIST_ROOM_TYPE:
      state.listRoomType = action.listRoomType;
      return { ...state };
    case UPDATE_VISIBLE:
      state.visible = !state.visible;
      return { ...state };
    default:
      return { ...state };
  }
};

export default roomListReducer;
