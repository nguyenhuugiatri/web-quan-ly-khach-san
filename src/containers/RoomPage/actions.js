import axios from 'axios';
import showNotification from '../../utils/showNotification';
import { STATUS } from '../../utils/constants';
import { GET_LIST_ROOM } from './constants';

const URL = process.env.SERV_HOST || 'http://localhost:8000';

export const gerListRoom = (listRoom) => {
  return {
    type: GET_LIST_ROOM,
    listRoom,
  };
};

export const gerListRoomAPI = () => {
  return (dispatch) => {
    axios
      .get(`${URL}/room`)
      .then((res) => {
        if (res.data) {
          dispatch(gerListRoom(res.data));
        }
      })
      .catch((err) => {
        if (err && err.response) {
          const { message } = err.response.data;
          showNotification(STATUS.ERROR, message);
        }
      });
  };
};
