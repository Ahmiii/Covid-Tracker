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
import "leaflet/dist/leaflet.css";

const styles = (theme) => ({
  rootInfoBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  appleftSide: {
    flex: 0.9,
    borderRadius: "25px",
  },
  apprightSide: {
    display: "flex",
    flexDirection: "column",
  },
  graphTile: {
    marginTop: "20px",
    marginBottom: "20px",
  },
});

const App = (props) => {
  const { classes } = props;
  const [countiesList, setcountriesList] = useState([]);
  const [selectCountry, setselectCountry] = useState("WorldWide");
  const [CountryInfo, setCountryInfo] = useState({});
  const [tableData, settableData] = useState([]);
  const [mapCenter, setmapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setmapZoom] = useState(3);
  const [mapCountries, setmapCountries] = useState([]);
  const [casesType, setcasesType] = useState("cases");

  const filterCountry = useCallback((country) => {
    setselectCountry(country);
  }, []);

  const filterCaseType = useCallback((cases) => {
    setcasesType(cases);
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((responce) => {
        return responce.json();
      })
      .then((responceData) => {
        const countriesData = [];

        responceData.map((country) => {
          return countriesData.push({
            id: country.countryInfo._id,
            name: country.country,
            value: country.countryInfo.iso2,
          });
        });
        const sortedCountryData = sortData(responceData);
        setcountriesList(countriesData);
        settableData(sortedCountryData);
        setmapCountries(responceData);
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
        console.log({ responceData });
        setmapCenter([
          responceData.countryInfo.lat,
          responceData.countryInfo.long,
        ]);
        setmapZoom(4);
      });
  }, [selectCountry]);
  console.log({ mapCenter });

  return (
    <div className="app">
      <div className={classes.appleftSide}>
        <Header countries={countiesList} countryName={filterCountry} />
        <InforBox
          countryData={CountryInfo}
          clickCategory={filterCaseType}
          active={casesType}
        />

        <Map
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
          caseType={casesType}
        />
      </div>

      <div>
        <Card className={classes.apprightSide}>
          <CardContent>
            <h3>Live cases by country</h3>
            <Table countriesData={tableData} />
            <h3 className={classes.graphTile}>World Wide cases</h3>
            <LineChart className="app__graph" caseType={casesType} />
          </CardContent>
        </Card>

        {/* Graph */}
      </div>
    </div>
  );
};

export default withStyles(styles)(App);
