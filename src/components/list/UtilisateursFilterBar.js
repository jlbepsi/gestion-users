import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/index";
import MenuItem from "@material-ui/core/MenuItem/index";
import Switch from "@material-ui/core/Switch/index";
import FormControlLabel from "@material-ui/core/FormControlLabel/index";

import ClasseSelect from "../share/ClasseSelect"
import Grid from "@material-ui/core/Grid/index";
import Typography from "@material-ui/core/Typography/index";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});


class UtilisateursFilterBar extends Component {

    handleChange = name => event => {
        this.props.onChange(name, event.target.value)
    };
    handleChangeChecked = name => event => {
        this.props.onChange(name, event.target.checked)
    };

    render() {
        const { classes } = this.props;

        return (


            <Grid container alignItems={"center"} spacing={16}>


              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  Liste des utilisateurs
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={2}>

                <ClasseSelect
                  classeSelected = {this.props.classe}
                  classes = {classes}
                  onChange={this.handleChange}
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
};

export default withStyles(styles)(UtilisateursFilterBar);
