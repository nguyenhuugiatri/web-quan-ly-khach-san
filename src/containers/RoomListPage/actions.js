import {
  GET_LIST_ROOM,
  UPDATE_TOTAL,
  EDITING,
  CANCEL_EDITING,
  GET_LIST_ROOM_TYPE,
  UPDATE_VISIBLE,
} from './constants';
import { message } from 'antd';
import axios from 'axios';
const URL = process.env.SERV_HOST || 'http://localhost:8000';

export const getListRoom = (listRoom) => {
  return {
    type: GET_LIST_ROOM,
    listRoom,
  };
};

export const getListRoomAPI = () => {
  return (dispatch) => {
    axios.get(`${URL}/room/list`).then((result) => {
      let roomList = Array.from(result.data, (room) => {
        room.key = room.id;
        return room;
      });
      roomList.sort((c, d) => {
        return c.name.match(/\d+/g) - d.name.match(/\d+/g);
      });
      dispatch(getListRoom(roomList));
    });
  };
};
export const getListRoomType = (listRoomType) => {
  return {
    type: GET_LIST_ROOM_TYPE,
    listRoomType: listRoomType,
  };
};
export const getListRoomTypeAPI = () => {
  return (dispatch) => {
    axios.get(`${URL}/roomtype/list`).then((res) => {
      if (res) {
        dispatch(getListRoomType(res.data.roomType));
      }
    });
  };
};
export const updateInformationRoom = (fields) => {
  let key = 'UPDATE_ROOM';
  return (dispatch) => {
    message.loading({ content: 'Updating', key });
    axios.patch(`${URL}/room/update`, fields).then((res) => {
      if (res.status === 200) {
        message.success({ content: res.data.message, key });
        dispatch(getListRoomAPI());
      } else if (res.status === 400) {
        message.error({ content: res.data.message, key });
      }
    });
    dispatch(cancelEdit());
  };
};

export const deleteRoom = (id) => {
  let key = 'DELETE_ROOM';
  return (dispatch) => {
    message.loading({ content: 'Updating', key });
    axios.patch(`${URL}/room/delete`, { id }).then((r) => {
      if (r.status === 200) {
        message.success({ content: r.data.message, key });
        dispatch(getListRoomAPI());
      } else if (r.status === 400) {
        message.error({ content: r.data.message, key });
      } else if (r.status === 404) {
        message.info({ content: r.data.message, key });
      }
    });
  };
};
export const createRoom = (fields) => {
  return (dispatch) => {
    axios.post(`${URL}/room/insert`, fields).then((res) => {
      message.success({ content: res.data.message });
      dispatch(getListRoomAPI());
    });
  };
};
export const updateVisible = () => {
  return {
    type: UPDATE_VISIBLE,
  };
};
export const updateTotal = (total) => {
  return {
    type: UPDATE_TOTAL,
    total,
  };
};

export const editingRow = (editingRow) => {
  return {
    type: EDITING,
    editingRow,
  };
};
export const cancelEdit = () => {
  return { type: CANCEL_EDITING };
};
