import * as types from '../actions/types';

const employees = (state = { byId: {}, allIds: [] }, action) => {
  switch (action.type) {
    case types.GET_EMPLOYEES_SUCCESS: {
      const byId = {};
      const allIds = [];

      action.payload.data.forEach((employee) => {
        allIds.push(employee._id);
        byId[employee._id] = {
          ...employee,
        };
      });

      return {
        ...state,
        allIds,
        byId,
      };
    }

    case types.ADD_EMPLOYEES_SUCCESS: {
      return {
        ...state,
        allIds: [
          ...state.allIds,
          action.payload._id,
        ],
        byId: {
          ...state.byId,
          [action.payload._id]: {
            ...action.payload,
          },

        },
      };
    }
    case types.UPDATE_EMPLOYEES_SUCCESS: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            ...action.payload.update,
          },
        },
      };
    }
    case types.DELETE_EMPLOYEES_SUCCESS: {
      delete state.byId[action.payload];

      return {
        ...state,
        allIds: state.allIds.filter(currentId => currentId !== action.payload),
      };
    }
    default: return state;
  }
};

export default employees;
