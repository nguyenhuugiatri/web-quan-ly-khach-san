import {
  GET_LIST_ROOM,
  UPDATE_CHECK_IN_CUSTOMER,
  UPDATE_CHECK_IN_ROOM,
} from './constants';

let initState = {
  listRoom: null,
  checkInCustomer: {},
  checkInRoom: {},
};

const roomReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_LIST_ROOM:
      state.listRoom = action.listRoom;
      return { ...state };

    case UPDATE_CHECK_IN_CUSTOMER:
      state.checkInCustomer = action.customer;
      return { ...state };

    case UPDATE_CHECK_IN_ROOM:
      state.checkInRoom = action.room;
      return { ...state };

    default:
      return { ...state };
  }
};

export default roomReducer;
