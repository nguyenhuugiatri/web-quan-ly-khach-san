import axios from 'axios';
import showNotification from '../../utils/showNotification';
import { STATUS } from '../../utils/constants';
import { UPDATE_CURRENT_USER } from './constants';

const URL = process.env.SERV_HOST || 'http://localhost:8000';

export const updateCurrentUser = (user) => {
  return {
    type: UPDATE_CURRENT_USER,
    user,
  };
};

export const login = (user) => {
  return (dispatch) => {
    axios({
      method: 'POST',
      url: `${URL}/user/login`,
      data: user,
    })
      .then((result) => {
        const { user, message } = result.data;
        if (user) {
          localStorage.setItem('loggedInUser', JSON.stringify(result.data));
          dispatch(updateCurrentUser(user));
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
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('loggedInUser');
    dispatch(updateCurrentUser(null));
  };
};
