import { Grid } from "@mui/material";
import React from "react";

const FourImageGrid = ({data}) => {
  return (
    <div>
      {data.map((val, i) => (
        <Grid container borderTop={"4px solid #fff"} key={i} spacing={0.5}>
          <Grid item lg={3}>
            <img src={val.img1} width={"100%"} />
          </Grid>
          <Grid item lg={3}>
            <img src={val.img2} width={"100%"} />
          </Grid>
          <Grid item lg={3}>
            <img src={val.img3} width={"100%"} />
          </Grid>
          <Grid item lg={3}>
            <img src={val.img4} width={"100%"} />
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default FourImageGrid;
