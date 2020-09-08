import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    borderRadius: "15px",
    boxShadow: "0px 5px 20px rgb(71, 71,71)",
  },
});

const BoxContent = (props) => {
  const { title, cases, total, classes } = props;
  return (
    <div>
      <Card className={classes.root}>
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
