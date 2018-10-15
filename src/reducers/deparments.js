import * as types from '../actions/types';

const departments = (state = { byId: {}, allIds: [] }, action) => {
  switch (action.type) {
    case types.GET_DEPARTMENTS_ERROR: {
      return state;
    }
    case types.GET_DEPARTMENTS_SUCCESS: {
      const byId = {};
      const allIds = [];

      state.payload.forEach((department) => {
        allIds.push(department._id);
        byId[department._id] = {
          ...department,
        };
      });

      return {
        ...state,
        allIds,
        byId: {
          ...state.byId,
          ...byId,
        },
      };
    }

    case types.ADD_DEPARTMENTS_SUCCESS: {
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
    case types.UPDATE_DEPARTMENTS_SUCCESS: {
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload._id]: {
            ...state.byId[action.payload._id],
            ...action.payload.update,
          },
        },
      };
    }
    case types.DELETE_DEPARTMENTS_SUCCESS: {
      delete state.byId[action.payload._id];

      return {
        ...state,
        allIds: state.allIds.filter(currentId => currentId !== action.payload._id),
      };
    }
    default: return state;
  }
};

export default departments;
