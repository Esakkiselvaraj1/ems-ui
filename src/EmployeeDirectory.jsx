import URLSearchParams from 'url-search-params';
import { Route } from 'react-router-dom';
import EmployeeSearch from './EmployeeSearch.jsx';
import EmployeeTable from './EmployeeTable.jsx';
import EmployeeDetail from './EmployeeDetail.jsx';

import graphQLFetch from './graphQLFetch.js';

export default class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.state = { employees: [] };
    
    this.deleteemployee = this.deleteemployee.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }
  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.loadData();
    }
  }

  async loadData() {
    
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    const vars = {};
  
    if (params.get('employeeType')) vars.employeeType = params.get('employeeType');
    let query = `query employeeList($employeeType: EmployeeType) {
      employeeList (employeeType: $employeeType) {
        id firstName lastName age
        dateOfJoining title department
        employeeType currentStatus
      }
    }`;
    if (params.get('retired')) {
      
       query = `query upcomingRetirees($employeeType: EmployeeType) {
        upcomingRetirees (employeeType: $employeeType) {
          id firstName lastName age
          dateOfJoining title department
          employeeType currentStatus
        }
      }`;
      
    } 
  
    const data = await graphQLFetch(query,vars);
    if (data) {
      if (params.get('retired')) {
        this.setState({ employees: data.upcomingRetirees });
      }

      else{ 
        this.setState({ employees: data.employeeList });
      }
      
      console.log()
    }
    
  }



  async deleteemployee(index) {
    const query = `mutation employeeDelete($id: Int!) {
      employeeDelete(id: $id)
    }`;
    const { employees } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = employees[index];
    const data = await graphQLFetch(query, { id });
  
    if (data && data.employeeDelete) {
      alert("Sucessfully Deleted");
      this.setState((prevState) => {
        const newList = [...prevState.employees];
        if (pathname === `/employees/${id}`) {
          history.push({ pathname: '/employees', search });
        }
        newList.splice(index, 1);
        return { employees: newList };
      });
    } else {
      
      this.loadData();
      alert("CAN’T DELETE EMPLOYEE – STATUS ACTIVE");
    }
  }

  render() {
    const { employees } = this.state;
    const { match } = this.props;
  
    return (
      <React.Fragment>
        <h1 className="text-center">Employee Managment System </h1>
        <EmployeeSearch />
      
        <EmployeeTable employees={employees} deleteemployee={this.deleteemployee} />
       
        <Route path={`${match.path}/:id`} component={EmployeeDetail} />
      </React.Fragment>
    );
  }
}
  