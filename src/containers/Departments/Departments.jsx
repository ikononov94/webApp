import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  addDepartment, updateDepartment, deleteDepartment, fetchDepartments,
} from '../../actions/departments';

class Departments extends Component {
  componentDidMount() {
    this.onClick();
  }

  render() {
    console.log(this.props);
    return (
      <div>Departments</div>
    );
  }
}

const mapStateToProps = state => ({
  departments: state.departments,
});

const mapDispatchToProps = dispatch => ({
  fetchDepartments: () => dispatch(fetchDepartments()),
  addDepartment: departmentName => dispatch(addDepartment(departmentName)),
  updateDepartment: (id, update) => dispatch(updateDepartment(id, update)),
  deleteDepartment: id => dispatch(deleteDepartment(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Departments);
