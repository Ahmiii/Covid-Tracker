import React, { useState, useEffect, useRef } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  Header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  dropDown: {
    backgroundColor: "white",
  },
});

const Header = (props) => {
  console.log("render header.js");
  const { classes, countries, countryName } = props;
  const [selectedCountry, setselectedCountry] = useState("WorldWide");
  const refVal = useRef();

  useEffect(() => {
    countryName(selectedCountry);
  }, [countryName, selectedCountry]);

  const onCountryChange = (e) => {
    setselectedCountry(e.target.value);
  };

  return (
    <div className={classes.Header}>
      <h1>Covid19-Tracker React App</h1>
      <FormControl>
        <Select
          className={classes.dropDown}
          variant="outlined"
          onChange={onCountryChange}
          value={selectedCountry}
          ref={refVal}
        >
          <MenuItem value="WorldWide">WorldWide</MenuItem>
          {countries.map((country) => {
            return (
              <MenuItem key={country.id} value={country.value}>
                {country.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};
export default withStyles(styles)(Header);
