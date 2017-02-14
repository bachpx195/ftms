import ReactOnRails from 'react-on-rails';

import Header from '../components/dashboards/header';
import Sidebar from '../components/dashboards/sidebar';
import Footer from '../components/dashboards/footer';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Header,
  Sidebar,
  Footer,
});
