import * as types from '../constant/actionTypes';

const initialState = {
  list: {
    data: []
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
  switch (action.type) {
    case types.GET_ALL_REPORT_SUCCESS:
      return {
        ...state,
        list: {
          data: action.payload.data
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
