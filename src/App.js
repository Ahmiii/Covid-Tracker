import React from "react";
import "./App.css";
import Header from "./components/Header/header";
import InforBox from "./components/InfoBox/InfoBox";
import Map from "./components/Map/Map";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  rootInfoBox: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const App = (props) => {
  const { classes } = props;
  return (
    <div className="app">
      <div className={classes.appleftSide}>
        <Header />
        <div className={classes.rootInfoBox}>
          <InforBox title="CoronaCases" cases={123} total={5000} />
          <InforBox title="CoronaCases" cases={123} total={5000} />
          <InforBox title="CoronaCases" cases={123} total={5000} />
        </div>
        <Map />
      </div>

      <div className={classes.apprightSide}></div>

      {/* Table */}

      {/* Graph */}
    </div>
  );
};

export default withStyles(styles)(App);
