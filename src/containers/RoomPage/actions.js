import axios from 'axios';
import showNotification from '../../utils/showNotification';
import { STATUS } from '../../utils/constants';
import {
  GET_LIST_ROOM,
  GET_LIST_CUSTOMER_TYPE,
  UPDATE_CHECK_IN_CUSTOMER,
  UPDATE_CHECK_IN_ROOM,
  CHECK_OUT,
} from './constants';

const URL = process.env.SERV_HOST || 'http://localhost:8000';

export const getListRoom = (listRoom) => {
  return {
    type: GET_LIST_ROOM,
    listRoom,
  };
};

export const getCustomerType = (listCustomerType) => {
  return {
    type: GET_LIST_CUSTOMER_TYPE,
    listCustomerType,
  };
};

export const updateCheckInCustomer = (customer) => {
  return {
    type: UPDATE_CHECK_IN_CUSTOMER,
    customer,
  };
};

export const updateCheckInRoom = (room) => {
  return {
    type: UPDATE_CHECK_IN_ROOM,
    room,
  };
};

export const checkOut = (checkOutInfo) => {
  return {
    type: CHECK_OUT,
    checkOutInfo,
  };
};

export const getListRoomAPI = () => {
  return (dispatch) => {
    axios
      .get(`${URL}/room/list`)
      .then((res) => {
        if (res.data) {
          dispatch(getListRoom(res.data));
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

export const getListCustomerTypeAPI = () => {
  return (dispatch) => {
    axios
      .get(`${URL}/customer/listType`)
      .then((res) => {
        if (res.data) {
          const { listCustomerType } = res.data;
          dispatch(getCustomerType(listCustomerType));
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

export const searchCustomerByPhoneAPI = (phone) => {
  return (dispatch) => {
    axios({
      method: 'POST',
      url: `${URL}/customer/getByPhone`,
      data: { phone },
    })
      .then((result) => {
        const { customer } = result.data;
        if (customer) {
          dispatch(updateCheckInCustomer(customer));
        }
      })
      .catch((err) => {
        if (err && err.response) {
          const { message } = err.response.data;
          showNotification(STATUS.ERROR, message);
          dispatch(updateCheckInCustomer({}));
        }
      });
  };
};

export const fillCheckOutCustomerAPI = (idRoom) => {
  return (dispatch) => {
    axios({
      method: 'POST',
      url: `${URL}/customer/getCheckOutCustomerByPhone`,
      data: { idRoom },
    })
      .then((result) => {
        const { checkOutCustomer } = result.data;
        if (checkOutCustomer) {
          dispatch(updateCheckInCustomer(checkOutCustomer));
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

export const checkOutAPI = (idRoom) => {
  return (dispatch) => {
    axios({
      method: 'POST',
      url: `${URL}/room/checkOut`,
      data: { idRoom },
    })
      .then((result) => {
        const { roomCheckOut, total } = result.data;
        if (roomCheckOut && total) {
          dispatch(checkOut({ ...roomCheckOut, total }));
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

export const checkInAPI = (data) => {
  return axios({
    method: 'POST',
    url: `${URL}/customer/checkIn`,
    data,
  })
    .then((result) => {
      const { message } = result.data;
      if (message) {
        showNotification(STATUS.SUCCESS, message);
      }
    })
    .catch((err) => {
      if (err && err.response) {
        const { message } = err.response.data;
        showNotification(STATUS.ERROR, message);
      }
    });
};
