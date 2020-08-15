import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';
import roomReducer from './containers/RoomPage/reducer';
import roomListTableReducer from './containers/RoomListPage/reducer'
import roomType from './containers/RoomTypeListPage/reducer'
const rootReducer = combineReducers({
  global: appReducer,
  room: roomReducer,
  roomTableList: roomListTableReducer,
  roomType
});

export default rootReducer;
