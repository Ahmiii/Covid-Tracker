import React from "react";
import { withStyles } from "@material-ui/core/styles";
import "./Table.css";
import numeral from "numeral";
const styles = () => ({
  rootTabe: {
    marginTop: "20px",
    overflow: "scroll",
    height: "400px",
    color: "#6a5d5d",
    "&:nth-of-type(odd)": {
      color: "#f3f2f8",
    },
  },
});

const Table = (props) => {
  const { countriesData } = props;
  return (
    <div className="table">
      {countriesData.map(({ country, cases }) => {
        return (
          <tr>
            <td>{country}</td>
            <td>
              <strong>{numeral(cases).format("0,0")}</strong>
            </td>
          </tr>
        );
      })}
    </div>
  );
};

export default withStyles(styles)(Table);
