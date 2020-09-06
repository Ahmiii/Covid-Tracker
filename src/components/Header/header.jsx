import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  Header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const Header = (props) => {
  const { classes } = props;

  const [countries, setCountries] = useState([]);
  const [selectCountry, setselectCountry] = useState("WorldWide");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((responce) => {
        return responce.json();
      })
      .then((responceData) => {
        const countriesData = [];

        responceData.map((country) => {
          countriesData.push({
            id: country.countryInfo._id,
            name: country.country,
            value: country.countryInfo.iso2,
          });
        });

        setCountries(countriesData);
      });
  }, []);

  const onCountryChange = (e) => {
    setselectCountry(e.target.value);
  };

  return (
    <div className={classes.Header}>
      <h1>Covid19-Tracker React App</h1>
      <FormControl>
        <Select
          variant="outlined"
          onChange={onCountryChange}
          value={selectCountry}
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
