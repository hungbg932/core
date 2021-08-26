import * as types from '../constant/actionTypes';

const initialState = {
  list: {
    data: [],
    conditions: null,
    status: false
  },
  listByFilter: {
    data: []
  },
  createResult: {
    data: []
  },
  updateResult: {
    data: []
  },
  deleteResult: {
    data: []
  }
};

const report = (state = initialState, action) => {
  let list = state.list;
  switch (action.type) {
    case types.GET_ALL_REPORT_SUCCESS:
      return {
        ...state,
        list: {
          data: action.payload.data.data,
          conditions: action.payload.data.conditions,
          status: true
        }
      };
    case types.RESET_STATUS_REPORT_LIST:
      return {
        ...state,
        list: {
          ...list,
          status: false
        }
      };
    case types.GET_REPORT_BY_FILTER:
      return {
        ...state,
        listByFilter: {
          data: action.payload.data
        }
      };
    case types.CREATE_REPORT:
      return {
        ...state,
        createResult: {
          data: action.payload.data
        }
      };
    case types.UPDATE_REPORT:
      return {
        ...state,
        updateResult: {
          data: action.payload.data
        }
      };
    case types.DELETE_REPORT:
      return {
        ...state,
        deleteResult: {
          data: action.payload.data
        }
      };
    default:
      return state;
  }
};
export default report;
