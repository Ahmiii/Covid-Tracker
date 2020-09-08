import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/Header/header";
import InforBox from "./components/InfoBox/InfoBox";
import Map from "./components/Map/Map";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import Table from "./components/Table/Table";
import { sortData } from "./utils";
import LineChart from "./components/LineChart/lineChart";

const styles = (theme) => ({
  rootInfoBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  appleftSide: {
    flex: 0.9,
    borderRadius: "25px",
  },
});

const App = (props) => {
  const { classes } = props;
  const [countiesList, setcountriesList] = useState([]);
  const [selectCountry, setselectCountry] = useState("WorldWide");
  const [CountryInfo, setCountryInfo] = useState({});
  const [tableData, settableData] = useState([]);

  const filterCountry = useCallback((country) => {
    setselectCountry(country);
  }, []);

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
        const sortedCountryData = sortData(responceData);
        setcountriesList(countriesData);
        settableData(sortedCountryData);
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
          <Table countriesData={tableData} />
          <h3>World Wide cases</h3>
          <LineChart />
        </CardContent>
      </Card>

      {/* Graph */}
    </div>
  );
};

export default withStyles(styles)(App);
