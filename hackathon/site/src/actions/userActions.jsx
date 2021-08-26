import * as types from '../constant/actionTypes';
import APPCONFIG from '../constant/appConfig';
import axios from 'axios';

export const getPartial = (params) => {
  return (dispatch) => {
    return axios.get(`${APPCONFIG.apiUri}user/getPartial`, {params})
    .then(response => {
      dispatch(getPartialSuccess(response.data, true));
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

export const getDetail = (userId) => {
  return (dispatch) => {
    return axios.get(`${APPCONFIG.apiUri}user/getById/${userId}`)
    .then(response => {
      dispatch(getDetailSuccess(types.GET_DETAIL_USER, response.data));
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

export const getPartialSuccess = (data, status) => {
  return {
    type: types.GET_PARTIAL_USER_SUCCESS,
    payload: {
      data,
      status
    }
  };
};

export const getDetailSuccess = (type, data) => {
  return {
    type: type,
    payload: {
      data,
      status: true
    }
  };
};
