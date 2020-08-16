import axios from 'axios';
import * as TYPE from './constants';
const URL = process.env.SERV_HOST || 'http://localhost:8000';

export const getListType = (payload) => {
  return {
    type: TYPE.GET_LIST_TYPE,
    payload,
  };
};

export const getListTypeAPI = () => {
  return async (dispatch) => {
    try {
      const result = await axios({
        method: 'GET',
        url: `${URL}/service/list-type`,
      });
      const { listType } = result.data;
      dispatch(getListType(listType));
    } catch (err) {
      console.log('Error:', err);
    }
  };
};

export const getList = (payload) => {
  return {
    type: TYPE.GET_LIST_SERVICE,
    payload,
  };
};

export const getListAPI = () => {
  return async (dispatch) => {
    try {
      const result = await axios({
        method: 'GET',
        url: `${URL}/service/list`,
      });
      const { listService } = result.data;
      dispatch(getList(listService));
    } catch (err) {
      console.log('Error:', err);
    }
  };
};

export const addServiceAPI = (service) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'POST',
        url: `${URL}/service/add-service`,
        data: { ...service },
      });
      dispatch(getListAPI());
    } catch (err) {
      console.log('Error:', err);
    }
  };
};

export const deleteServiceAPI = (id) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'POST',
        url: `${URL}/service/delete-service`,
        data: { id },
      });
      dispatch(getListAPI());
    } catch (err) {
      console.log('Error:', err);
    }
  };
};

export const editServiceAPI = ({ id, editedService }) => {
  return async (dispatch) => {
    try {
      await axios({
        method: 'POST',
        url: `${URL}/service/edit-service`,
        data: { id, editedService },
      });
      dispatch(getListAPI());
    } catch (err) {
      console.log('Error:', err);
    }
  };
};
