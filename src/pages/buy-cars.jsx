import data from "@/assests/data";
import BoxCar from "@/components/cars-box";
import Filterbar from "@/components/filter-bar";
import FilterDialog from "@/components/filter-dialog";
import { FILTERS } from "@/utils/enum";
import { ExpandMore } from "@mui/icons-material";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const BuyCars = () => {
  const [selectedValue, setSelectedValue] = useState(FILTERS.NEWESTAD);
  const [open, setOpen] = useState(false);

  const openFilterDialog = () => {
    setOpen(true);
  };
  const closeFIlterDialog = (value) => {
    setSelectedValue(value);
    setOpen(false);
  };
  return (
    <div>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={3}></Grid>
          <Grid item lg={9} mt={5} p={10}>
            <Typography fontSize={30} letterSpacing={1} fontWeight={600}>
              Verified Cars
            </Typography>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              spacing={1}
            >
              <Stack direction={"row"} alignItems={"center"}>
                <Typography fontSize={13} fontWeight={600}>
                  3{" "}
                </Typography>
                <Typography fontSize={13} ml={0.5}>
                  Results
                </Typography>

                <Divider
                  flexItem
                  orientation="vertical"
                  variant="middle"
                  sx={{
                    backgroundColor: "#000",
                    opacity: 1,
                    height: 15,
                    alignSelf: "center",
                    ml: 1,
                  }}
                />
                {/* <Stack
                  direction={"row"}
                  alignItems={"center"}
                  ml={1}
                  className="pointer"
                  onClick={openFilterDialog}
                >
                  <Typography fontSize={12}>{selectedValue}</Typography>
                  <ExpandMore />
                </Stack> */}
                <Filterbar />
              </Stack>
            </Stack>
            {/* <FilterDialog onSelect={closeFIlterDialog} open={open} /> */}
            <Box marginTop={3}>
              {data.carData.map((val, i) => (
                <BoxCar
                  carImages={val.carImages}
                  carName={val.carName}
                  specifications={val.specifications}
                  carAmount={val.carAmount}
                  amountWithoutVAT={val.amountWithoutAmount}
                  features={val.features}
                  deliveryAmount={val.deliveryAmount}
                  key={i}
                  countryName={val.countryName}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default BuyCars;
