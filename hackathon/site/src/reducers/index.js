import { combineReducers } from 'redux';
import reportReducer from './reportReducer';

const rootReducer = combineReducers({
  report: reportReducer
});

export default rootReducer;
