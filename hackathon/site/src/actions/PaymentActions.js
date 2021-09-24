import * as types from '../constant/actionTypes';
import APPCONFIG from '../constant/appConfig';
import axios from 'axios';

export const processPayment = (params) => {
  return (dispatch) => {
    return axios.post(`${APPCONFIG.apiUri}payment/processPayment`, params)
    .then(response => {
      dispatch(setStatus(types.PAYMENT_STATUS, response.data));
    }).catch((error) => {
      if (error.response) {
          if (error.response.status == 404){
            const message = "not found";
            console.log('message', message);
          }

          if (error.response.status == 422){
            dispatch(setStatus(types.PAYMENT_STATUS, error.response.data));
          }
      } else if (error.request) {
          console.log(error.request);
      } else {
          console.log('Error', error.message);
      }
      console.log(error.config);
    });
  };
};


export const getPaypalConfig = () => {
  return (dispatch) => {
    return axios.get(`${APPCONFIG.apiUri}payment/getPaypalConfig`)
    .then(response => {
      dispatch(setStatus(types.PAYPAL_CONFIG, response.data));
    }).catch((error) => {
      if (error.response) {
          if (error.response.status == 404){
            const message = "not found";
            console.log('message', message);
          }
      } else if (error.request) {
          console.log(error.request);
      } else {
          console.log('Error', error.message);
      }
      console.log(error.config);
    });
  };
};
  
export const setStatus = (type, data) => {
  return {
    type: type,
    payload: {
        data:data
    }
  };
};

export const resetProcessPaypalStatus = () => {
  return {type: types.RESET_PAYMENT_STATUS};
}

export const resetStatusPaypalConfig = () => {
  return {type: types.RESET_STATUS_PAYPAL_CONFIG};
}