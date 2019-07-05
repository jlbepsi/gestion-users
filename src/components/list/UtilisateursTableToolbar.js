import React from 'react';

import PropTypes from "prop-types";
import classNames from 'classnames';

import {withStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar/index";
import {lighten} from "@material-ui/core/styles/colorManipulator";
import Tooltip from "@material-ui/core/Tooltip/index";
import IconButton from "@material-ui/core/IconButton/index";
import Typography from "@material-ui/core/Typography/index";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ChangeBTSIcon from '@material-ui/icons/SchoolOutlined';
import ActivateIcon from '@material-ui/icons/LockOpenOutlined';
import DeactivateIcon from '@material-ui/icons/LockOutlined';
import BtsRules from "../share/BtsRules";


const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  title: {
    flex: '0 0 auto',
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

let UtilisateursTableToolbar = props => {
  const { numTotal, numSelected, classeSelected, classes } = props;
  const btsOptionEnabled = BtsRules.isBtsClasse (classeSelected);

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} utilisateurs sélectionné(s)
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Utilisateurs ({numTotal})
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
        {numSelected > 0 &&
        <div className={classes.actions}>
          <Tooltip title={"Activer"}>
            <IconButton onClick={() => props.onActivateMany()}>
              <ActivateIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={"Désactiver"}>
            <IconButton onClick={() => props.onDeactivateMany()}>
              <DeactivateIcon />
            </IconButton>
          </Tooltip>
          {btsOptionEnabled &&
          <Tooltip title={"Changer l'option BTS"}>
            <IconButton onClick={() => props.onChangeBTSMany()}>
              <ChangeBTSIcon/>
            </IconButton>
          </Tooltip>
          }
          <Tooltip title={"Supprimer définitivement"}>
            <IconButton color={"secondary"} onClick={() => props.onDeleteMany()}>
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
          </div>
        }
    </Toolbar>
  );
};

UtilisateursTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numTotal: PropTypes.number.isRequired,
  numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyles)(UtilisateursTableToolbar);