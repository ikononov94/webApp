import { combineReducers } from 'redux';
import departments from './deparments';
import employees from './employees';

export default combineReducers({
  departments,
  employees,
});
