import * as types from '../constant/actionTypes';
import APPCONFIG from '../constant/appConfig';
import axios from 'axios';

export const getAllReport = () => {
  return (dispatch) => {
    return axios.get(`${APPCONFIG.apiUri}report/getAll`)
    .then(response => {
      dispatch(getSuccess(response.data));
    }).catch((error) => {
      if (error.response) {
        if (error.response.status == 404) {
          // const message = "not found";
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

export const getSuccess = (data) => {
  return {
    type: types.GET_ALL_REPORT_SUCCESS,
    payload: {
      data
    }
  };
};
