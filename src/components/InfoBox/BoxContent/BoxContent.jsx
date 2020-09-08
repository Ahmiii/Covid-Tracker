import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {},
});

const BoxContent = (props) => {
  const { title, cases, total, classes } = props;
  return (
    <div className={classes.root}>
      <Card style={{ borderRadius: "15px", boxShadow: " 5px 10px #888888" }}>
        <CardContent>
          <Typography color="textSecondary">{title}</Typography>
          <h2>{cases}</h2>
          <Typography color="textSecondary">{total} total</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(BoxContent);
