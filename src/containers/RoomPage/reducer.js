import { GET_LIST_ROOM } from './constants';

let initState = {
  listRoom: null,
};

const roomReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_LIST_ROOM:
      state.listRoom = action.listRoom;
      return { ...state };

    default:
      return { ...state };
  }
};

export default roomReducer;
