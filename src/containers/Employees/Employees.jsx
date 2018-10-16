import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Glyphicon, Table,
} from 'react-bootstrap';
import {
  addEmployees, updateEmployees, deleteEmployee, fetchEmployees,
} from '../../actions/employees';
import { fetchDepartments } from '../../actions/departments';
import NewModal from '../../components/NewModal/NewModal';
import FieldGroup from '../../components/FieldGroup/FieldGroup';
import employeeData from '../../helpers/employeeData';

class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      updateId: false,
      name: '',
      lastName: '',
      patronymic: '',
      sex: '',
      salary: null,
      departments: [],
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNewEmployee = this.addNewEmployee.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
  }

  componentDidMount() {
    const { fetchDepartments, fetchEmployees } = this.props;

    fetchEmployees();
    fetchDepartments();
  }

  getRows(array) {
    if (!array || !array.allIds.length) return;

    return array.allIds.map((id) => {
      const {
        name, lastName, patronymic, sex, salary, departments,
      } = array.byId[id];
      const { deleteEmployee } = this.props;

      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{lastName}</td>
          <td>{patronymic || '-'}</td>
          <td>{sex || '-'}</td>
          <td>{salary || '-'}</td>
          <td>{departments.join(', ')}</td>
          <td>
            <Button
              bsSize="small"
              bsStyle="warning"
              onClick={() => this.setState({
                updateId: id,
                name,
                lastName,
                patronymic,
                sex,
                salary,
                departments,
              })}
            >
              <Glyphicon glyph="pencil" />
            </Button>
            <Button
              bsSize="small"
              bsStyle="danger"
              onClick={() => deleteEmployee(id)}
            >
              <Glyphicon glyph="trash" />
            </Button>
          </td>
        </tr>
      );
    });
  }

  getDepartmentsSelect(data) {
    if (!data || !data.allIds.length) return;
    const { departments } = this.state;
    return data.allIds.map((id) => {
      const { departmentName } = data.byId[id];

      return (
        <option
          value={departmentName}
          selected={departments.includes(departmentName)}
          key={id}
        >
          {departmentName}

        </option>
      );
    });
  }

  hideModal() {
    this.setState({
      updateId: false,
      showModal: false,
      name: '',
      lastName: '',
      patronymic: '',
      sex: '',
      salary: null,
      departments: [],
    });
  }

  showModal() {
    this.setState({ showModal: true });
  }

  handleChange(e, state) {
    if (e.target.options) {
      const { options } = e.target;
      const value = [];
      for (let i = 0; i < options.length; i += 1) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }

      this.setState({ [state]: value });
    } else {
      this.setState({ [state]: e.target.value });
    }
  }

  addNewEmployee() {
    const {
      name, lastName, patronymic, sex, salary, departments,
    } = this.state;
    const { addEmployees } = this.props;

    const newEmployee = {
      name,
      lastName,
      patronymic,
      sex,
      salary,
      departments,
    };
    addEmployees(newEmployee);
    this.hideModal();
  }

  updateEmployee() {
    const {
      updateId, name, lastName, patronymic, sex, salary, departments,
    } = this.state;
    const update = {
      name, lastName, patronymic, sex, salary, departments,
    };
    const { updateEmployees } = this.props;

    updateEmployees(updateId, update);
    this.hideModal();
  }

  isEmptyRequiredField() {
    const { name, lastName, departments } = this.state;

    return name === '' || lastName === '' || !departments.length;
  }

  render() {
    const { employees } = this.props;
    const { showModal, updateId } = this.state;

    return (
      <div>
        <h2>Сотрудники</h2>
        <Table bordered condensed hover>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Отчество</th>
              <th>Пол</th>
              <th>З/п</th>
              <th>Отделы</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {this.getRows(employees)}
          </tbody>
        </Table>
        <Button onClick={this.showModal}><Glyphicon glyph="plus" /></Button>
        <NewModal
          show={!!updateId || showModal}
          onHide={this.hideModal}
          addFunction={updateId ? this.updateEmployee
            : this.addNewEmployee}
          title={updateId ? 'Редактирование сотрудника' : 'Новый сотрудник'}
          disabled={this.isEmptyRequiredField()}
        >
          {employeeData.map(data => (
            <FieldGroup
              placeholder={data.label}
              onChange={event => this.handleChange(event, data.state)}
              key={data.id}
              value={this.state[data.state] || ''}
              {...data}
            >
              {data.multiple && this.getDepartmentsSelect(this.props.departments)}
            </FieldGroup>
          ))}
        </NewModal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  employees: state.employees,
  departments: state.departments,
});

const mapDispatchToProps = dispatch => ({
  fetchEmployees: () => dispatch(fetchEmployees()),
  fetchDepartments: () => dispatch(fetchDepartments()),
  addEmployees: newEmployee => dispatch(addEmployees(newEmployee)),
  updateEmployees: (id, update) => dispatch(updateEmployees(id, update)),
  deleteEmployee: id => dispatch(deleteEmployee(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
