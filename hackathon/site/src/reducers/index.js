import { combineReducers } from 'redux';
import reportReducer from './reportReducer';
import paymentReducer from './paymentReducer';

const rootReducer = combineReducers({
  report: reportReducer,
  payment: paymentReducer
});

export default rootReducer;
