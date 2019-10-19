import React from "react";
import Grid from "@material-ui/core/Grid";
import "../styles.css";
import Timer from "./timer";

export default function Header() {
  return (
    <div className="header">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          Search @ Twitter
        </Grid>
        <Grid item xs={6}>
          Auto refresh in <Timer />
          seconds
        </Grid>
      </Grid>
    </div>
  );
}
