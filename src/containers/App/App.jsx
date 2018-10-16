import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Departments from '../Departments/Departments';
import Employees from '../Employees/Employees';

const App = () => (
  <Switch>
    <Route path="/employees" component={Employees} />
    <Route path="/departments" component={Departments} />
  </Switch>
);

export default withRouter(App);
