import React from 'react';
import Contents from './Contents.jsx';
import { Container } from 'react-bootstrap';
import { Nav,Navbar } from 'react-bootstrap';

function NavBar() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="#home">Employee Management</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/#/employees">Employee List</Nav.Link>
        <Nav.Link href="/#/addemployee">Create Employee</Nav.Link>
      </Nav>
    </Container>
  </Navbar>

  );
}


export default function Page() {
 return (
 <div>
 <NavBar />
 <Contents />
 </div>
 );
}