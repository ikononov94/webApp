import * as types from '../actions/types';

const departments = (state = { byId: {}, allIds: [] }, action) => {
  switch (action.type) {
    case types.GET_DEPARTMENTS_SUCCESS: {
      const byId = {};
      const allIds = [];

      action.payload.data.forEach((department) => {
        allIds.push(department._id);
        byId[department._id] = {
          ...department,
        };
      });

      return {
        ...state,
        allIds,
        byId,
      };
    }

    case types.ADD_DEPARTMENTS_SUCCESS: {
      return {
        ...state,
        allIds: [
          ...state.allIds,
          action.payload.id,
        ],
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...action.payload,
          },

        },
      };
    }
    case types.UPDATE_DEPARTMENTS_SUCCESS: {
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
    case types.DELETE_DEPARTMENTS_SUCCESS: {
      delete state.byId[action.payload];

      return {
        ...state,
        allIds: state.allIds.filter(currentId => currentId !== action.payload),
      };
    }
    default: return state;
  }
};

export default departments;
