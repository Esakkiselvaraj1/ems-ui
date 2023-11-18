import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import EmployeeDirectory from './EmployeeDirectory.jsx';
import EmployeeEdit from './EmployeeEdit.jsx';
import EmployeeCreate from './EmployeeCreate.jsx';

const NotFound = () => <h1>Page Not Found</h1>;
export default function Contents() {
 return (
 <Switch>
 <Redirect exact from="/" to="/employees" />
 <Route path="/employees" component={EmployeeDirectory} />
 <Route path="/edit/:id" component={EmployeeEdit} />
 <Route path="/addemployee" component={EmployeeCreate} />

 <Route component={NotFound} />
 </Switch>
 );
}