import React, {Component} from "react";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";





function ClasseSelect(props) {


  const optionClassesEPSI = [
    { value: 'B1', label: 'B1' },
    { value: 'B2', label: 'B2' },
    { value: 'B3', label: 'B3' },
    { value: 'I4', label: 'I4' },
    { value: 'I5', label: 'I5' },
    { value: '-', label: 'D1' },
    { value: 'W1', label: 'WIS1' },
    { value: 'W2', label: 'WIS2' },
    { value: 'W3', label: 'WIS3' },
    { value: 'W4', label: 'WIS4' },
    { value: 'W5', label: 'WIS5' },
    { value: '-', label: 'D2' },
    { value: 'POS', label: 'POE' },
    { value: '-', label: 'D3' },
    { value: 'NA', label: 'NA' },
    { value: '-', label: 'D4' },
    { value: 'INT_PROF', label: 'Professeur' },
    { value: 'INT_ADMIN', label: 'Administratif' },
  ];

  function handleChange(event) {
    props.onChange(event.target.value)
  }


  const { classeSelected, classes, disabled } = props;
  const rows = [];

  optionClassesEPSI.forEach( (option) => {
    if (option.value === '-') {
      rows.push(
        <Divider key={option.label} />
      );
    } else {
      rows.push(
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    }
  });

  return (
    <FormControl className={classes.container}>
      <InputLabel shrink htmlFor="classeEPSI">
        Classe
      </InputLabel>
      <Select
        id="classeEPSI"
        disabled={disabled}
        className={classes.container}
        value={classeSelected}
        onChange={handleChange}
      >
        {rows}
      </Select>
    </FormControl>
   )
}

ClasseSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  classeSelected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ClasseSelect;