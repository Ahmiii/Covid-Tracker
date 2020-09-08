import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/Header/header";
import InforBox from "./components/InfoBox/InfoBox";
import Map from "./components/Map/Map";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";

const styles = (theme) => ({
  rootInfoBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  appleftSide: {
    flex: 0.9,
  },
});

const App = (props) => {
  console.log("app.js");
  const { classes } = props;

  const [countiesList, setcountriesList] = useState([]);
  const [selectCountry, setselectCountry] = useState("WorldWide");
  const [CountryInfo, setCountryInfo] = useState({});
  const [tableData, settableData] = useState([]);

  const filterCountry = useCallback((country) => {
    setselectCountry(country);
  });

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((responce) => {
        return responce.json();
      })
      .then((responceData) => {
        const countriesData = [];
        console.log({ responceData });
        responceData.map((country) => {
          countriesData.push({
            id: country.countryInfo._id,
            name: country.country,
            value: country.countryInfo.iso2,
          });
        });
        setcountriesList(countriesData);
        settableData(responceData);
        console.log("runs");
      });
  }, []);
  useEffect(() => {
    console.log({ selectCountry });
    const url =
      selectCountry === "WorldWide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${selectCountry}`;
    fetch(url)
      .then((responce) => {
        return responce.json();
      })
      .then((responceData) => {
        setCountryInfo(responceData);
        console.log(CountryInfo);
      });
  }, [selectCountry]);
  return (
    <div className="app">
      <div className={classes.appleftSide}>
        <Header countries={countiesList} countryName={filterCountry} />
        <InforBox countryData={CountryInfo} />

        <Map />
      </div>

      <div className={classes.apprightSide}></div>
      <Card>
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <h3>World Wide cases</h3>
        </CardContent>
      </Card>
      {/* Table */}

      {/* Graph */}
    </div>
  );
};

export default withStyles(styles)(App);
