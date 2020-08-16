import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';
import roomReducer from './containers/RoomPage/reducer';
import roomListTableReducer from './containers/RoomListPage/reducer';
import roomType from './containers/RoomTypeListPage/reducer';
import serviceReducer from './containers/ServicePage/reducer';

const rootReducer = combineReducers({
  global: appReducer,
  room: roomReducer,
  roomTableList: roomListTableReducer,
  service: serviceReducer,
  roomType,
});

export default rootReducer;
