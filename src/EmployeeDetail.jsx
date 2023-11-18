import React from "react";
import graphQLFetch from "./graphQLFetch.js";
import { Row,Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

export default class EmployeeDetail extends React.Component {
  constructor() {
    super();
    this.state = { employee: {} };
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(pvProps) {
    const {
      match: {
        params: { id: pvId },
      },
    } = pvProps;
    const {
      match: {
        params: { id },
      },
    } = this.props;
    if (pvId !== id) {
      this.loadData();
    }
  }

  async loadData() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    console.log(id);

    const query = `query employee($id: Int!) {
        employee (id: $id) {
        id firstName lastName age
        dateOfJoining title department
        employeeType currentStatus years months days
      }
    }`;

    const data = await graphQLFetch(query, { id });

    if (data) {
      console.log(data);
      this.setState({ employee: data.employee });
    } else {
      this.setState({ employee: {} });
    }
  }

  render() {
    const {
      employee: {
        firstName,
        lastName,
        age,
        dateOfJoining,
        title,
        department,
        employeeType,
        currentStatus,
        years,
        months,
        days,
      },
    } = this.state;

    const joinDate = dateOfJoining
      ? new Date(dateOfJoining).toDateString()
      : "Invalid Date";
    return (
      <Row>
      <Col md={{ span: 6, offset: 3 }}>

      <Card>
        <Card.Body>
          <Card.Title>{firstName} {lastName}</Card.Title>
          <Card.Text>Age: {age}</Card.Text>
          <Card.Text>Date of Joining: {joinDate}</Card.Text>
          <Card.Text>Title: {title}</Card.Text>
          <Card.Text>Department: {department}</Card.Text>
          <Card.Text>Employee Type: {employeeType}</Card.Text>
          <Card.Text>Current Status: {currentStatus ? 'Active' : 'Inactive'}</Card.Text>
          <Card.Text>Remaining Time until Retirement:  {days} days   {months} Month  {years} year </Card.Text>
        </Card.Body>
       
      </Card>

      </Col>
    </Row>
      
    );
  }
}
