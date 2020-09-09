import React from "react";
import BoxContent from "./BoxContent/BoxContent";
import { printStats } from "../../utils";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  rootInfoBox: {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "15px",
  },
});

const InfoBox = (props) => {
  const { classes, countryData, clickCategory, active } = props;

  return (
    <div className={classes.rootInfoBox}>
      <BoxContent
        red
        onClick={(e) => clickCategory("cases")}
        active={active === "cases"}
        title="Coronavirus Cases"
        cases={printStats(countryData.todayCases)}
        total={printStats(countryData.cases)}
      />
      <BoxContent
        onClick={(e) => clickCategory("recovered")}
        active={active === "recovered"}
        title="Recovered"
        cases={printStats(countryData.todayRecovered)}
        total={printStats(countryData.recovered)}
      />
      <BoxContent
        red
        onClick={(e) => clickCategory("deaths")}
        active={active === "deaths"}
        title="Deaths"
        cases={printStats(countryData.todayDeaths)}
        total={printStats(countryData.deaths)}
      />
    </div>
  );
};

export default withStyles(styles)(InfoBox);
