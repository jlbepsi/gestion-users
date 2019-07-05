import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/index";
import Switch from "@material-ui/core/Switch/index";
import FormControlLabel from "@material-ui/core/FormControlLabel/index";

import ClasseSelect from "../share/ClasseSelect"
import Grid from "@material-ui/core/Grid/index";
import Typography from "@material-ui/core/Typography/index";
import BtsRules from "../share/BtsRules";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});


class UtilisateursFilterBar extends Component {

  handleChangeClasse = value => {
    this.props.onChange('classe', value)
  };

    handleChange = name => event => {
        this.props.onChange(name, event.target.value)
    };
    handleChangeChecked = name => event => {
        this.props.onChange(name, event.target.checked)
    };

    render() {
        const { classes, classeSelected } = this.props;
        const btsOptionDisabled =  ! BtsRules.isBtsClasse (classeSelected);

        return (


            <Grid container alignItems={"center"} spacing={2}>


              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Liste des utilisateurs
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={2}>

                <ClasseSelect
                  classeSelected = {classeSelected}
                  classes = {classes}
                  onChange={this.handleChangeClasse}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={2}>
                <TextField
                  className = {classes.container}
                  id="nomUser"
                  label="Nom: "
                  value={this.props.nomUser}
                  onChange={this.handleChange('nomUser')}
                />

              </Grid>

              <Grid item xs={12} sm={12} md={2}>
                <FormControlLabel
                  control={
                    <Switch
                      color="default"
                      checked={this.props.bts}
                      disabled={btsOptionDisabled}
                      onChange={this.handleChangeChecked('bts')}
                      value="bts"
                    />
                  }
                  label="BTS uniquement"
                />

              </Grid>
            </Grid>
        );
    }
}

UtilisateursFilterBar.propTypes = {
  classes: PropTypes.object.isRequired,
  classeSelected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(UtilisateursFilterBar);
