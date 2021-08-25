import * as types from '../constant/actionTypes';

const initialState = {
  list: {
    data: [{ id: 1, stt: 1, date: '24/08/2021', title: 'Báo cáo 1' }]
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
