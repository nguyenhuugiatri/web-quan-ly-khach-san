import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';
import roomReducer from './containers/RoomPage/reducer';
import roomListTableReducer from './containers/RoomListPage/reducer'
const rootReducer = combineReducers({
  global: appReducer,
  room: roomReducer,
  roomTableList: roomListTableReducer
});

export default rootReducer;
