import React from "react";
import { Link } from "react-router-dom";
import graphQLFetch from "./graphQLFetch.js";
import { Form, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
export default class EmployeeEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      employee: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { id: prevId },
      },
    } = prevProps;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }
  onChange(event) {
    const { name, value, type, checked } = event.target;
    const newvalue = type === "checkbox" ? checked : value;
    this.setState((prevState) => ({
      employee: { ...prevState.employee, [name]: newvalue },
    }));
  }
  async handleSubmit(e) {
    const { employee } = this.state;
    e.preventDefault();
    const query = `mutation employeeUpdate(
            $id: Int!
            $changes: EmployeeUpdateInputs!
          ) {
            employeeUpdate(
              id: $id
              changes: $changes
            ) {
                id firstName lastName age
                dateOfJoining title department
                employeeType currentStatus
            }
          }`;

    const { id, created, ...changes } = employee;
    const data = await graphQLFetch(query, { changes, id });
    if (data) {
      this.setState({ employee: data.employeeUpdate });
      alert("Updated employee successfully");
    }
  }
  async loadData() {
    const query = `query employee($id: Int!) {
 employee(id: $id) {
    id firstName lastName age
    dateOfJoining title department
    employeeType currentStatus
 }
 }`;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const data = await graphQLFetch(query, { id });
    if (data) {
      const { employee } = data;
      employee.title = employee.title != null ? employee.title : "";
      employee.department =
        employee.department != null ? employee.department : "";
      employee.currentStatus = employee.currentStatus
        ? employee.currentStatus
        : false;
      this.setState({ employee });
    } else {
      this.setState({ employee: {} });
    }
  }
  render() {
    const {
      employee: { id },
    } = this.state;
    const {
      match: {
        params: { id: propsId },
      },
    } = this.props;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`employee with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }

    const {
      employee: { currentStatus, age },
    } = this.state;
    const {
      employee: { firstName, lastName, title, department, employeeType },
    } = this.state;
    const {
      employee: { dateOfJoining },
    } = this.state;
    return (
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <form onSubmit={this.handleSubmit}>
            <h3>{`Editing employee: ${id}`}</h3>

            <Form.Label>Title</Form.Label>
            <Form.Control name="title" value={title} onChange={this.onChange} />
            <Form.Label>Department</Form.Label>
            <Form.Control
              name="department"
              value={department}
              onChange={this.onChange}
            />
            <Form.Label>Current Status</Form.Label>
            <Form.Check
              type="checkbox"
              name="currentStatus"
              defaultChecked={currentStatus}
              onChange={this.onChange}
            />

            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Button type="submit">Update</Button>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Button
                  as={Link}
                  to={`/edit/${parseInt(id) - 1}`}
                  variant="primary"
                >
                  Prev
                </Button>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Button
                  as={Link}
                  to={`/edit/${parseInt(id) + 1}`}
                  variant="primary"
                >
                  Next
                </Button>
              </Form.Group>
            </Row>
          </form>
        </Col>
      </Row>
    );
  }
}
