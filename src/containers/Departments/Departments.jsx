import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Glyphicon, Table, FormControl,
} from 'react-bootstrap';
import {
  addDepartment, updateDepartment, deleteDepartment, fetchDepartments,
} from '../../actions/departments';
import { fetchEmployees } from '../../actions/employees';
import NewModal from '../../components/NewModal/NewModal';
import FieldGroup from '../../components/FieldGroup/FieldGroup';

class Departments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      departmentName: '',
      updateId: null,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkAndAddNewDepartment = this.checkAndAddNewDepartment.bind(this);
  }

  componentDidMount() {
    const { fetchDepartments, fetchEmployees } = this.props;

    fetchDepartments();
    fetchEmployees();
  }

  getDepartmentEmployees(departmentName) {
    const { employees } = this.props;

    return employees.allIds.filter(id => employees.byId[id].departments.includes(departmentName));
  }

  getMaxSalary(arrayOfEmployees) {
    const { employees } = this.props;
    let maxSalary = 0;

    arrayOfEmployees.forEach((id) => {
      const currentSalary = employees.byId[id].salary;
      if (currentSalary > maxSalary) maxSalary = currentSalary;
    });

    return maxSalary;
  }

  getRows(array) {
    if (!array || !array.allIds.length) return;

    return array.allIds.map((id) => {
      const { departmentName } = array.byId[id];
      const { updateId } = this.state;
      const { deleteDepartment } = this.props;

      const arrayOfEmployees = this.getDepartmentEmployees(departmentName);
      const maxSalary = this.getMaxSalary(arrayOfEmployees)
      return (
        <tr key={id}>
          <td>
            {
              updateId === id ? this.checkAndUpdateDepartment(id, departmentName)
                : departmentName
          }
          </td>
          <td>{arrayOfEmployees.length}</td>
          <td>{maxSalary}</td>
          <td>
            <Button
              bsSize="small"
              bsStyle="warning"
              onClick={() => this.setState({ updateId: id, departmentName })}
            >
              <Glyphicon glyph="pencil" />
            </Button>
            <Button
              bsSize="small"
              bsStyle="danger"
              disabled={!!arrayOfEmployees.length}
              onClick={() => deleteDepartment(id)}
            >
              <Glyphicon glyph="trash" />
            </Button>
          </td>
        </tr>
      );
    });
  }

  hideModal() {
    this.setState({ showModal: false, departmentName: '' });
  }

  showModal() {
    this.setState({ showModal: true });
  }

  handleChange(e) {
    this.setState({ departmentName: e.target.value });
  }

  checkAndAddNewDepartment() {
    const { departmentName } = this.state;
    const { addDepartment } = this.props;

    if (departmentName.trim() === '') return null;

    addDepartment(departmentName);
    this.hideModal();
  }

  submitUpdateDep(id, previousName, departmentName) {
    const { updateDepartment } = this.props;

    if (previousName !== departmentName) {
      updateDepartment(id, { departmentName });
    }

    this.setState({ updateId: null, departmentName: '' });
  }

  checkAndUpdateDepartment(id, value) {
    const { departmentName } = this.state;

    return (
      <form onSubmit={(event) => {
        event.preventDefault();
        this.submitUpdateDep(id, value, departmentName);
      }}
      >
        <FormControl
          type="text"
          value={departmentName}
          onChange={this.handleChange}
        />
        <Button
          bsSize="small"
          onClick={() => this.submitUpdateDep(id, value, departmentName)}
        >
        ОК
        </Button>
      </form>
    );
  }

  render() {
    const { departments } = this.props;
    const { showModal } = this.state;

    return (
      <div>
        <h2>Отделы</h2>
        <Table bordered condensed hover>
          <thead>
            <tr>
              <th>Название</th>
              <th>Количество сотрудников</th>
              <th>Максимальная з/п</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {this.getRows(departments)}
          </tbody>
        </Table>
        <Button onClick={this.showModal}><Glyphicon glyph="plus" /></Button>
        <NewModal
          show={showModal}
          onHide={this.hideModal}
          addFunction={this.checkAndAddNewDepartment}
          title="Новое отделение"
          disabled={this.state.departmentName === ''}
        >
          <FieldGroup
            type="text"
            label="Название отделения"
            placeholder="Введите название"
            onChange={this.handleChange}
          />
        </NewModal>
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
  addDepartment: departmentName => dispatch(addDepartment(departmentName)),
  updateDepartment: (id, update) => dispatch(updateDepartment(id, update)),
  deleteDepartment: id => dispatch(deleteDepartment(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Departments);
