import graphQLFetch from './graphQLFetch.js';
import { Form, Button, Table } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

export default class EmployeeCreate extends React.Component {
  constructor() {
    super();
    this.state = { employees: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.employeeAdd;
    const employee = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      age: parseInt(form.age.value),
      dateOfJoining: form.dateOfJoining.value,
      title: form.title.value,
      department: form.department.value,
      employeeType: form.employeeType.value,
      currentStatus: form.currentStatus.checked,
    }
    
    this.createEmployee(employee);

    form.firstName.value = "",
      form.lastName.value = "",
      form.age.value = "",
      form.dateOfJoining.value = "",
      form.title.value = "",
      form.department.value = "",
      form.employeeType.value = "",
      form.currentStatus.checked
  }

  async createEmployee(employee) {

    const query = `mutation employeeAdd($employee: EmployeeInputs!) {
      employeeAdd(employee: $employee) {
        id
      }
    }`;
    const data = await graphQLFetch(query, { employee });
    if (data) {
      alert("Employee Details Successfully Added");
    }

  }
  render() {
    return (
      <Row>
      <Col md={{ span: 6, offset: 3 }}>
     
          <h3> Create New Employee Record</h3>

      <form name="employeeAdd" onSubmit={this.handleSubmit}>
        <Form.Label>First Name</Form.Label>
            <Form.Control
        type="text" name="firstName" placeholder="First Name" required />
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" name="lastName" placeholder="Last Name" required />
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" name="age" placeholder="Age" required />
        <Form.Label>Date Of Joining</Form.Label>
        <Form.Control type="date" name="dateOfJoining" required />
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" placeholder="Title" required />
        <Form.Label>Department</Form.Label>
        <Form.Control type="text" name="department" placeholder="Department" required />
        <Form.Label>Work Type</Form.Label>
        <Form.Control type="text" name="employeeType" placeholder="Employee Type" required />
        <Form.Label> Current Status:</Form.Label>

          <Form.Check type="checkbox" name="currentStatus" defaultChecked />
      
          <Button type="submit">Create Employee</Button>

      </form>
      </Col>
      </Row>
    );
  }
}
