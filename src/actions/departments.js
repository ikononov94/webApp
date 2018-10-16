import axios from 'axios';
import * as types from './types';

export const fetchDepartments = () => (
  async (dispatch) => {
    dispatch({
      type: types.GET_DEPARTMENTS_START,
    });
    try {
      const response = await fetch('/api/getDepartments');
      const payload = await response.json();

      dispatch({
        type: types.GET_DEPARTMENTS_SUCCESS,
        payload,
      });
    } catch (e) {
      dispatch({
        type: types.GET_DEPARTMENTS_ERROR,
        payload: e.message,
      });
    }
  }
);

export const addDepartment = name => (
  async (dispatch) => {
    dispatch({
      type: types.ADD_DEPARTMENTS_START,
    });

    try {
      const response = await axios.post('/api/putDepartments', {
        departmentName: name,
      });

      const { _id } = response.data.data;
      const { departmentName } = response.data.data;

      dispatch({
        type: types.ADD_DEPARTMENTS_SUCCESS,
        payload: { departmentName, id: _id },
      });
    } catch (e) {
      dispatch({
        type: types.ADD_DEPARTMENTS_ERROR,
        payload: e.message,
      });
    }
  }
);

export const updateDepartment = (id, update) => (
  async (dispatch) => {
    dispatch({
      type: types.UPDATE_DEPARTMENTS_START,
    });

    try {
      await axios.post('/api/updateDepartments', {
        id,
        update,
      });

      dispatch({
        type: types.UPDATE_DEPARTMENTS_SUCCESS,
        payload: {
          id,
          update,
        },
      });
    } catch (e) {
      dispatch({
        type: types.UPDATE_DEPARTMENT_ERROR,
        payload: e.message,
      });
    }
  }
);

export const deleteDepartment = id => (
  async (dispatch) => {
    dispatch({
      type: types.DELETE_DEPARTMENTS_START,
    });

    try {
      await axios.delete('/api/deleteDepartments', { data: { id } });

      dispatch({
        type: types.DELETE_DEPARTMENTS_SUCCESS,
        payload: id,
      });
    } catch (e) {
      dispatch({
        type: types.DELETE_DEPARTMENTS_SUCCESS,
        payload: e.message,
      });
    }
  }
);
