import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';
import roomReducer from './containers/RoomPage/reducer';

const rootReducer = combineReducers({
  global: appReducer,
  room: roomReducer,
});

export default rootReducer;
