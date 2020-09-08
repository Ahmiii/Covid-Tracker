import React from "react";
import BoxContent from "./BoxContent/BoxContent";

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
        cases={countryData.todayCases}
        total={countryData.cases}
      />
      <BoxContent
        title="Recovered"
        cases={countryData.todayRecovered}
        total={countryData.recovered}
      />
      <BoxContent
        title="Deaths"
        cases={countryData.todayDeaths}
        total={countryData.deaths}
      />
    </div>
  );
};

export default withStyles(styles)(InfoBox);
