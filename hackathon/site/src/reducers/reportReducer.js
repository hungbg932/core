import * as types from '../constant/actionTypes';

const initialState = {
  list: {
    data: []
  }
};

const report = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_REPORT_SUCCESS:
      return {
        ...state,
        list: {
          data: action.payload.data
        }
      };
    default:
      return state;
  }
};
export default report;
