import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Grid from '../../containers/Grid/Grid';
import Departments from '../../containers/Departments/Departments';
import Employees from '../../containers/Employees/Employees';

const App = () => (
  <Switch>
    <Route exact path="/" component={Grid} />
    <Route path="/employees" component={Employees} />
    <Route path="/departments" component={Departments} />
  </Switch>
);

export default withRouter(App);
