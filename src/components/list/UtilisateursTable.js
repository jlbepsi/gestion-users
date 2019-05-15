import React from 'react';

import PropTypes from "prop-types";

import {withStyles} from "@material-ui/core";
import Table from '@material-ui/core/Table/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableSortLabel from '@material-ui/core/TableSortLabel/index';
import Tooltip from '@material-ui/core/Tooltip/index';
import Paper from '@material-ui/core/Paper/index';
import Checkbox from '@material-ui/core/Checkbox/index';

import UtilisateurRow from "./UtilisateurRow";
import UtilisateursTableToolbar from "./UtilisateursTableToolbar";
import DialogResetPassword from "../share/ResetPasswordDialog";
import AlertDialog from "../share/AlertDialog";


/*
login: "test.v2",
nom: "Test",
prenom: "V2",
motDePasse: null,
classe: "B2",
mail: "test.v2@epsi.fr",
role: "ROLE_USER",
bts: true,
btsParcours: "SISR",
btsNumero: "987654",
nomComplet: "Test V2"
 */

const headerRows = [
  { id: 'actif', label: 'Actif', sorted: false },
  { id: 'login', label: 'Identifiant', sorted: true },
  { id: 'nomComplet', label: 'Nom complet', sorted: false },
  { id: 'nom', label: 'Nom', sorted: true },
  { id: 'prenom', label: 'Prénom', sorted: false },
  { id: 'mail', label: 'Mail', sorted: false },
  { id: 'bts', label: 'BTS', sorted: true },
  { id: 'btsParcours', label: 'Parcours', sorted: true },
  { id: 'btsNumero', label: 'Numéro', sorted: false },
];

class UtilisateursTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    const chkDisabled = rowCount <= 0;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              disabled={chkDisabled}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {headerRows.map(
            row => (
              row.sorted ? (
              <TableCell
                key={row.id}
                sortDirection={orderBy === row.id ? order : false}
              >
                  <Tooltip
                    title="Trie"
                    placement='bottom-start'
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
              </TableCell>
              ) : (
                <TableCell key={row.id} >{row.label}</TableCell>
              )
            ),
            this,
          )}
          <TableCell width={'200px'}>&nbsp;</TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

UtilisateursTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class UtilisateursTable extends React.Component {

  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    openDialogPwd: false,
    selectedUserLogin : '',
    openDeleteDialog: false,
    openDeleteMessage: '',
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.users.map(n => n.login) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, login) => {
    event.stopPropagation();

    const { selected } = this.state;
    const selectedIndex = selected.indexOf(login);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, login);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleOpenDialogPwd = (login) => {
    this.setState({ selectedUserLogin: login });
    this.setState({ openDialogPwd: true });
  };
  handleCloseDialogPwd = () => {
    this.setState({ openDialogPwd: false });
  };

  handleDelete = (login) => {
    this.setState({ selectedUserLogin: login });
    this.setState({ openDeleteMessage: "Confirmer la suppression de l'utilisateur '"+ login +"' ?" });
    this.setState({ openDeleteDialog: true });
  };
  handleDeleteConfirm = () => {
    this.setState({ openDeleteDialog: false });

    this.props.onDelete(this.state.selectedUserLogin);
  };
  handleCloseDeleteDialog = () => {
    this.setState({ openDeleteDialog: false });
  };

  handleDeleteMany = () => {
    this.props.onDeleteMany(this.state.selected);
  };

  handleActivateMany = () => {
    this.props.onActivateMany(this.state.selected);
  };
  handleDeactivateMany = () => {
    this.props.onDeactivateMany(this.state.selected);
  };

  render() {
    const { classes, users, nomUser, bts } = this.props;
    const { order, orderBy, selected } = this.state;
    const rows = [];

    users.forEach( (user) => {
      if (! user.nom.toUpperCase().startsWith(nomUser.toUpperCase())) {
        return;
      }
      if (bts && ! user.bts) {
        return;
      }

      rows.push(
        <UtilisateurRow
          user={user}
          key={user.login}
          isSelected = {this.state.selected.indexOf(user.login) !== -1}
          handleClick={this.handleClick}
          handleOpenDialogPwd={this.handleOpenDialogPwd}
          onActivate={this.props.onActivate}
          onDeactivate={this.props.onDeactivate}
          onDelete={this.handleDelete}
        />
      );
    });

    return (
      <Paper className={classes.root}>
        <UtilisateursTableToolbar
          className={classes.root}
          numTotal={rows.length}
          numSelected={selected.length}
          onDeleteMany={this.handleDeleteMany}
          onActivateMany={this.handleActivateMany}
          onDeactivateMany={this.handleDeactivateMany}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">

            <UtilisateursTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={rows===null ? 0 : rows.length}
            />
            <TableBody>
              {rows}
            </TableBody>
          </Table>

          <DialogResetPassword
            isDialogPasswordOpened={this.state.openDialogPwd}
            userLogin={this.state.selectedUserLogin}
            onChangePassword={this.props.onChangePassword}
            onClose={this.handleCloseDialogPwd}
          />

          <AlertDialog
            isDialogOpened={this.state.openDeleteDialog}
            variant="error"
            titleText="Suppression"
            contentText={this.state.openDeleteMessage}
            actionButtonLabel="Supprimer"

            onClose={this.handleCloseDeleteDialog}
            onActionValidate={this.handleDeleteConfirm}
          />
        </div>
      </Paper>
      );


    /*<TablePagination
      rowsPerPageOptions={[15, 20, 30]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      backIconButtonProps={{
        'aria-label': 'Previous Page',
      }}
      nextIconButtonProps={{
        'aria-label': 'Next Page',
      }}
      onChangePage={this.handleChangePage}
      onChangeRowsPerPage={this.handleChangeRowsPerPage}
    />*/
  }
}

export default withStyles(styles)(UtilisateursTable);