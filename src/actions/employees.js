import axios from 'axios';
import * as types from './types';

export const fetchEmployees = () => (
  async (dispatch) => {
    dispatch({
      type: types.GET_EMPLOYEES_START,
    });
    try {
      const response = await fetch('/api/getEmployees');
      const payload = await response.json();

      dispatch({
        type: types.GET_EMPLOYEES_SUCCESS,
        payload,
      });
    } catch (e) {
      dispatch({
        type: types.GET_EMPLOYEES_ERROR,
        payload: e.message,
      });
    }
  }
);

export const addEmployees = newEmployee => (
  async (dispatch) => {
    dispatch({
      type: types.ADD_EMPLOYEES_START,
    });

    try {
      const response = await axios.post('/api/putEmployees', newEmployee);
      const { data } = response.data;

      dispatch({
        type: types.ADD_EMPLOYEES_SUCCESS,
        payload: { ...data },
      });
    } catch (e) {
      dispatch({
        type: types.ADD_EMPLOYEES_ERROR,
        payload: e.message,
      });
    }
  }
);

export const updateEmployees = (id, update) => (
  async (dispatch) => {
    dispatch({
      type: types.UPDATE_DEPARTMENTS_START,
    });

    try {
      await axios.post('/api/updateEmployees', {
        id,
        update,
      });

      dispatch({
        type: types.UPDATE_EMPLOYEES_SUCCESS,
        payload: {
          id,
          update,
        },
      });
    } catch (e) {
      dispatch({
        type: types.UPDATE_EMPLOYEES_ERROR,
        payload: e.message,
      });
    }
  }
);

export const deleteEmployee = id => (
  async (dispatch) => {
    dispatch({
      type: types.DELETE_EMPLOYEES_START,
    });

    try {
      await axios.delete('/api/deleteEmployees', { data: { id } });

      dispatch({
        type: types.DELETE_EMPLOYEES_SUCCESS,
        payload: id,
      });
    } catch (e) {
      dispatch({
        type: types.DELETE_EMPLOYEES_ERROR,
        payload: e.message,
      });
    }
  }
);
