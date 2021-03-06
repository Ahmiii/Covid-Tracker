import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const showDataOnMap = (data, caseType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[caseType].hex}
      fillColor={casesTypeColors[caseType].hex}
      radius={
        Math.sqrt(country[caseType]) * casesTypeColors[caseType].multiplier
      }
    >
      <Popup>
        <div className="infoContainer">
          <div
            className="infoFlag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="countryName">{country.country}</div>
          <div className="Cases">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="Recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="Deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

export const printStats = (stats) =>
  stats ? `+${numeral(stats).format("0.0a")}` : "+0";
