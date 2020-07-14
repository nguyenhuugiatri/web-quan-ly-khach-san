import { combineReducers } from 'redux';
import appReducer from './containers/App/reducer';

const rootReducer = combineReducers({
  global: appReducer,
});

export default rootReducer;
