import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const EmployeeRow = withRouter(({ employee, location: { search }, deleteemployee, index }) => {
  const selectLocation = { pathname: `/employees/${employee.id}`, search };
  return (
    <tr>

      <td>{employee.firstName} </td>
      <td> {employee.lastName}</td>
      <td>{employee.age}</td>
      <td>{employee.dateOfJoining.toDateString()}</td>
      <td>{employee.title}</td>
      <td>{employee.department}</td>
      <td>{employee.employeeType}</td>
      <td>{employee.currentStatus ? '1' : '0'}</td>

      <td>
      <Button as={Link} to={`/edit/${employee.id}`} variant="primary">
                  Edit
                </Button>
                /
                <Button as={Link} to={selectLocation} variant="info">
                  Select
                </Button>

       
      /
        <Button type="button" variant="danger" onClick={() => { deleteemployee(index); }}>
          Delete
        </Button>
      </td>

    </tr>
  );
});



export default function EmployeeTable({ employees ,deleteemployee }) {


  const employeeRows = employees.map((employee, index) => (
    <EmployeeRow
      key={employee.id}
      employee={employee}
      deleteemployee={deleteemployee}
      index={index}
    />
  ));

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Age</th>
          <th>Date of Joining</th>
          <th>Title</th>
          <th>Department</th>
          <th>Employee Type</th>
          <th>Current Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employeeRows}
      </tbody>
    </Table>
  );
}


