import * as types from '../constant/actionTypes';
import APPCONFIG from '../constant/appConfig';
import axios from 'axios';

export const getPartial = (params) => {
  return (dispatch) => {
    return axios.post(`${APPCONFIG.apiUri}report/getPartial`, params)
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

export const getReportByFilter = (params) => {
  return (dispatch) => {
    return axios.post(`${APPCONFIG.apiUri}report/getByFilter`, params)
    .then(response => {
      dispatch(success(types.GET_REPORT_BY_FILTER, response.data));
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

export const createReport = (params) => {
  return (dispatch) => {
    return axios.post(`${APPCONFIG.apiUri}report/create`, params)
    .then(response => {
      dispatch(success(types.CREATE_REPORT, response.data));
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

export const updateReport = (id, params) => {
  return (dispatch) => {
    return axios.post(`${APPCONFIG.apiUri}report/update/${id}`, params)
    .then(response => {
      dispatch(success(types.UPDATE_REPORT, response.data));
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

export const deleteReport = (id) => {
  return (dispatch) => {
    return axios.post(`${APPCONFIG.apiUri}report/delete/${id}`)
    .then(response => {
      dispatch(success(types.DELETE_REPORT, response.data));
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

export const success = (type, data) => {
  return {
    type: type,
    payload: {
      data
    }
  };
};

export const resetStatusReportList = () => {
  return {
    type: types.RESET_STATUS_REPORT_LIST
  };
};
