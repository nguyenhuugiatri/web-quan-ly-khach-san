import axios from 'axios';
import * as TYPE from './constants';
import { message } from 'antd';
const URL = process.env.SERV_HOST || 'http://localhost:8000';
export const fetchRoomType = (payload) => {
  return {
    type: TYPE.FETCH_ROOM_TYPE,
    payload,
  };
};

export const fetchRoomTypeAPI = () => {
  return (dispatch) => {
    axios.get(`${URL}/roomtype/list`).then((res) => {
      let result = Array.from(res.data.roomType, (v) => {
        v.key = v.id;
        return v;
      });
      dispatch(fetchRoomType(result));
    });
  };
};
export const updateTotal = (total) => {
  return {
    type: TYPE.UPDATE_TOTAL,
    payload: total,
  };
};
export const updateEditing = (rowkey) => {
  return {
    type: TYPE.UPDATE_EDITING,
    payload: rowkey,
  };
};
export const updateRoomTypeAPI = (fields) => {
  return (dispatch) => {
    axios
      .patch(`${URL}/roomtype/update`, fields)
      .then((res) => {
        if (res.status === 200) {
          message.success({ content: res.data.message });
          dispatch(fetchRoomTypeAPI());
          dispatch(updateEditing());
        } else {
          message.error({ content: res.data.message });
        }
      })
      .catch((err) => {
        message.error({ content: err });
      });
  };
};
export const updateVisible = () => {
  return {
    type: TYPE.UPDATE_VISIBLE,
  };
};
export const updateVisibleFalse = () => {
  return {
    type: TYPE.VISIBLE_FALSE,
  };
}
export const insertRoomType = (fields) => {
    return(dispatch)=>{
      axios.post(`${URL}/roomtype/insert`,fields).then(r=>{
        if(r.status===200){
          message.success({content:r.data.message})
          dispatch(fetchRoomTypeAPI())
        }else{
          message.error({content:r.data.message})
        }
      })
    }
}