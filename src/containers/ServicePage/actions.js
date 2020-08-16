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
