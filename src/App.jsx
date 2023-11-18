import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import Page from './Page.jsx';
//import 'bootstrap/dist/css/bootstrap.min.css';
const element = (
  <Router>
  <Page />
  </Router>
 );

ReactDOM.render(element, document.getElementById('contents'));
