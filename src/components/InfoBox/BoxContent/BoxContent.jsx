import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./BoxContent.css";

const BoxContent = (props) => {
  const { title, cases, total, onClick, active, red } = props;
  console.log({ active });

  return (
    <Card
      className={`infoBox ${active && "infoBox--selected"} ${
        red && "infoBox--red"
      }`}
      onClick={onClick}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!red && "infoBox__cases--green"}`}>
          {cases}
        </h2>
        <Typography className="infoBox__total" color="textSecondary">
          {total} total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BoxContent;
