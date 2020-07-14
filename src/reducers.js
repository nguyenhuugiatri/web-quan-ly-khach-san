import { combineReducers } from 'redux';
import appReducer from './reducer';

const rootReducer = combineReducers({
  global: appReducer,
});

export default rootReducer;
