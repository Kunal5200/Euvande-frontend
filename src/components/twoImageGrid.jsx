import { Grid } from "@mui/material";
import React from "react";

const TwoImageGrid = ({ data }) => {
  return (
    <div>
      {data.map((val, i) => (
        <Grid container borderTop={"4px solid #fff"} key={i} spacing={0.5}>
          <Grid item lg={6}>
            <img src={val.img1} width={"100%"} />
          </Grid>
          <Grid item lg={6}>
            <img src={val.img2} width={"100%"} />
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default TwoImageGrid;
