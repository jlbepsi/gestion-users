import React,  { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Topbar from './Topbar';
import Menu from "./Menu";

class Dashboard extends Component {

  render() {
    const menu = Menu.find(m => m.pathname === this.props.location.pathname);

    return (
      <React.Fragment>
        <CssBaseline/>
        <Topbar menuIndex={menu.menuIndex} />
        <div>
          <h1>Dashboard</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Dashboard);