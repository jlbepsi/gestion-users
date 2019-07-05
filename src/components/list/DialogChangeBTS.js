import React from "react";
import PropTypes from "prop-types";
import ButtonStyled from "../share/ButtonStyled";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";



function DialogChangeBTS(props) {


  const [bts, setBts] = React.useState(false);
  const [btsParcours, setBtsParcours] = React.useState('');


  function handleAction () {
    props.onActionValidate(bts, btsParcours);
  }
  function handleClose () {
    props.onClose();
  }

  const { classes, classeSelected, ...other } = props;


  return (
    <Dialog
      onClose={handleClose}
      fullWidth={true}
      {...other}
    >
      <DialogTitle id="form-dialog-title">Modification de l'option BTS</DialogTitle>

      <DialogContent>
        <Grid container spacing={1}>

          <Grid item xs={12} sm={12} md={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={bts}
                  onChange={event => setBts(event.target.checked)}
                  color="default"
                  value="bts"
                />
              }
              label="BTS"
            />

          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormControl  className={classes.container}>
              <InputLabel shrink htmlFor="btsParcours">Parcours</InputLabel>
              <Select
                className={classes.container}
                disabled={! bts}
                value={btsParcours}
                onChange={event => setBtsParcours(event.target.value)}
              >
                <MenuItem value={'IND'}>Indifferencié</MenuItem>
                <MenuItem value={'SLAM'}>SLAM</MenuItem>
                <MenuItem value={'SISR'}>SISR</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="default" autoFocus>
          Annuler
        </Button>


        <ButtonStyled
          text='Modifier'
          variant={"success"}
          onClick={handleAction}
        />

      </DialogActions>
    </Dialog>
  );
}

DialogChangeBTS.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  classeSelected: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onActionValidate: PropTypes.func.isRequired,
};

export default DialogChangeBTS;
