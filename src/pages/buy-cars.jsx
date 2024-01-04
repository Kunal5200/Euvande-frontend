import BoxCar from "@/components/cars-box";
import { Box, Grid } from "@mui/material";
import React from "react";

const BuyCars = () => {
  return (
    <div>
      <Box>
        <Grid container>
          <Grid item lg={3}></Grid>
          <Grid item lg={9}>
            <BoxCar />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default BuyCars;
