import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

import TableRow from "@material-ui/core/TableRow/index";
import TableCell from "@material-ui/core/TableCell/index";
import Checkbox from "@material-ui/core/Checkbox/index";
import IconButton from "@material-ui/core/IconButton/index";
import ActivateIcon from '@material-ui/icons/LockOpenOutlined';
import DeactivateIcon from '@material-ui/icons/LockOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import Tooltip from "@material-ui/core/Tooltip/index";

class UtilisateurRow extends Component {

  constructor(props) {
    super(props);

    /*this.state = {
      mouseInRow: true
    };*/

    this.modifyUser = this.modifyUser.bind(this);
    //this.mouseStatus = this.mouseStatus.bind(this);
    this.handleDeactivate = this.handleDeactivate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  modifyUser(event, login) {
    event.preventDefault();

    this.props.history.push("/ldap/" + login);
  };


  handleDeactivate(event, login) {
    event.stopPropagation();

    this.props.onDeactivate(login);
  };
  handleActivate(event, login) {
    event.stopPropagation();

    this.props.onActivate(login);
  };

  handleDelete(event, login) {
    event.stopPropagation();

    this.props.onDelete(login);
  };

  handleChangePassword(event, login) {
    event.stopPropagation();

    this.props.handleOpenDialogPwd(login);
  };




  /*mouseStatus(event, enter) {
    event.preventDefault();

    this.setState ( { mouseInRow:  enter});
  }*/

  render() {
    const {user, isSelected} = this.props;

    const actions = [];
    //if (this.state.mouseInRow) {

      actions.push(
        <Tooltip key={"pwd" + user.login} title={"Modifier le mot de passe"}>
          <IconButton onClick={(event) => this.handleChangePassword(event, user.login)}>
            <AccountIcon />
          </IconButton>
        </Tooltip>
      );
      if (user.active) {
        actions.push(
          <Tooltip key={"deactivate" + user.login} title={"Désactiver"}>
            <IconButton onClick={(event) => this.handleDeactivate(event, user.login)}>
              <DeactivateIcon />
            </IconButton>
          </Tooltip>
        );
      } else {
        actions.push(
          <Tooltip key={"activate" + user.login} title={"Activer"}>
            <IconButton onClick={(event) => this.handleActivate(event, user.login)}>
              <ActivateIcon />
            </IconButton>
          </Tooltip>
        );
      }

      if (user.classe === 'NA') {
        actions.push(
          <Tooltip key={"delete" + user.login} title={"Supprimer définitivement"}>
            <IconButton color={"secondary"} onClick={(event) => this.handleDelete(event, user.login)}>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        );
      } else {
      }
    /*} else {
      actions.push(<div key={"none" + user.login} >&nbsp;</div>);
    }*/

    let btsInfos = "";
    if (user.bts) {
      if (user.btsParcours === "IND") {
        btsInfos = <div>
          <Checkbox checked disabled={true} color="default" />
          Indifférencié
        </div>
      } else {
        btsInfos = <div>
          <Checkbox checked disabled={true} color="default" />
          {user.btsParcours}
        </div>
      }
    }

    const activeUser = (user.active ?
        <ActivateIcon color={"primary"} />
      :
        <DeactivateIcon color={"error"}/>
    );

    return (
      <TableRow
        style={{height: 57}}
        hover
        role="checkbox"
        aria-checked={isSelected}
        tabIndex={-1}
        key={user.login}
        selected={isSelected}
        onClick={event => this.modifyUser(event, user.login)}
        /*onMouseOver={event => this.mouseStatus(event, true)}
        onMouseLeave={event => this.mouseStatus(event, false)}*/
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={isSelected}
            onClick={event => this.props.handleClick(event, user.login)}
          />
        </TableCell>
        <TableCell>
          {activeUser}
        </TableCell>
        <TableCell>{user.nom}</TableCell>
        <TableCell>{user.prenom}</TableCell>
        <TableCell>{user.mail}</TableCell>
        <TableCell>{btsInfos}
        </TableCell>
        <TableCell>{actions}</TableCell>
      </TableRow>
    );
  }
}

export default withRouter(UtilisateurRow);