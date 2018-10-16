import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Glyphicon } from 'react-bootstrap';
import { fetchDepartments } from '../../actions/departments';
import { fetchEmployees } from '../../actions/employees';
import Links from '../../components/Links/Links';

class Grid extends Component {
  componentDidMount() {
    const { fetchDepartments, fetchEmployees } = this.props;

    fetchDepartments();
    fetchEmployees();
  }

  renderFirstRow() {
    const { departments } = this.props;

    return departments.allIds.map(id => (
      <td key={id}>{departments.byId[id].departmentName}</td>
    ));
  }

  renderEmployees() {
    const { departments, employees } = this.props;

    const res = [];

    for (let i = 0; i < employees.allIds.length; i += 1) {
      const employee = employees.byId[employees.allIds[i]];
      const employeeDeps = employee.departments;
      const { name } = employee;
      const { lastName } = employee;
      const row = [];

      row.push(
        <td key={employees.allIds[i]}>{`${name} ${lastName}`}</td>,
      );

      for (let j = 0; j < departments.allIds.length; j += 1) {
        const dep = departments.byId[departments.allIds[j]].departmentName;

        if (employeeDeps.includes(dep)) {
          row.push(
            <td key={departments.allIds[j]}><Glyphicon glyph="ok" /></td>,
          );
        } else {
          row.push(
            <td key={departments.allIds[j]} />,
          );
        }
      }

      res.push(
        <tr>
          {row}
        </tr>,
      );
    }
    return res;
  }

  render() {
    const { departments, employees } = this.props;

    return (
      <div>
        <Links />
        <h2>Сетка</h2>
        <Table bordered condensed hover>
          <tbody>
            <tr>
              <td />
              {departments.allIds.length ? this.renderFirstRow() : <td>Пока пусто!</td>}
            </tr>
            {employees.allIds.length ? this.renderEmployees() : <tr><td>Пока пусто!</td></tr>}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  departments: state.departments,
  employees: state.employees,
});

const mapDispatchToProps = dispatch => ({
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchEmployees: () => dispatch(fetchEmployees()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
