import React,  { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Topbar from './Topbar';
import Menu from './Menu';
import UtilisateursUI from "./list/UtilisateursUI";
import withStyles from "@material-ui/core/styles/withStyles";


/*
REST API

http://users.webservices.montpellier.epsi.fr/api/users

 */


const styles = theme => ({
  divMain: {
    margin: 20,
  }
});

class Main extends Component {

  render() {
    const menu = Menu.find(m => m.pathname === this.props.location.pathname);
    const {classes} = this.props;

    return (
      <React.Fragment>
        <CssBaseline/>
        <Topbar menuIndex={menu.menuIndex} />
        <div className={classes.divMain}>
          <UtilisateursUI/>
        </div>
      </React.Fragment>
    );
  }
}

export default  withRouter(withStyles(styles) (Main));