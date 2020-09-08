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
  const { classes, countryData } = props;
  return (
    <div className={classes.rootInfoBox}>
      <BoxContent
        title="Coronavirus Cases"
        cases={printStats(countryData.todayCases)}
        total={printStats(countryData.cases)}
      />
      <BoxContent
        title="Recovered"
        cases={printStats(countryData.todayRecovered)}
        total={printStats(countryData.recovered)}
      />
      <BoxContent
        title="Deaths"
        cases={printStats(countryData.todayDeaths)}
        total={printStats(countryData.deaths)}
      />
    </div>
  );
};

export default withStyles(styles)(InfoBox);
