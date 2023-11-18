
  import React from 'react';
  import URLSearchParams from 'url-search-params';
  import { withRouter } from 'react-router-dom';
  import { Table, Button } from 'react-bootstrap';
  import { Row,Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
  
  class EmployeeSearch extends React.Component {
    constructor({ location: { search } }) {
      super();
      const params = new URLSearchParams(search);
      this.state = {
        status: params.get('status') || '',
        retired: params.get('retired') || '',
        changed: false,
      };
  
      this.onChangeStatus = this.onChangeStatus.bind(this);
      this.onChangeretired = this.onChangeretired.bind(this);
      this.applyFilter = this.applyFilter.bind(this);
      this.showOriginalFilter = this.showOriginalFilter.bind(this);
    }
  
    componentDidUpdate(prevProps) {
      const { location: { search: prevSearch } } = prevProps;
      const { location: { search } } = this.props;
      if (prevSearch !== search) {
        this.showOriginalFilter();
      }
    }
  
    onChangeStatus(e) {
      this.setState({ status: e.target.value, changed: true });
    }
    onChangeretired(e) {
      this.setState({ retired: e.target.value, changed: true });
    }
    
  
    showOriginalFilter() {
      const { location: { search } } = this.props;
      const params = new URLSearchParams(search);
      this.setState({
        status: params.get('status') || '',
        retired: params.get('retired') || '',
      
        changed: false,
      });
    }
  
    applyFilter() {
      const { status, retired } = this.state;
      const { history } = this.props;
      const params = new URLSearchParams();
      if (status) params.set('employeeType', status);
      if (retired) params.set('retired', retired);
      const search = params.toString() ? `?${params.toString()}` : '';
      history.push({ pathname: '/employees', search });
    }
  
    render() {
      const { status, changed } = this.state;
      const { retired } = this.state;
      return (
        <div>
          <Row>
      <Col md={{ span: 7, offset: 3 }}>

      <Card>
        <Card.Body>
          Employee Type:
          {' '}
          <select  className="form-select" value={status} onChange={this.onChangeStatus}>
            <option value="">(All)</option>
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
          {' '}
          Employee Status:
          {' '}
          <select  className="form-select" value={retired} onChange={this.onChangeretired}>
            <option value="">(All)</option>
            <option value="Upcommming">Upcommming Retired</option>
          
          </select>
         
          {' '}
          <Button type="button" variant="info" onClick={this.applyFilter}>Apply</Button>
          {' '}
          <Button type="button" variant="danger"
            onClick={this.showOriginalFilter}
            disabled={!changed}
          >
            Reset
          </Button>
          </Card.Body>
          </Card>

</Col>
</Row>
        </div>
      );
    }
  }
  
  export default withRouter(EmployeeSearch);
  