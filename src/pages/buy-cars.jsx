import { getCars } from "@/api/apiCalling/listingApi";
import data from "@/assests/data";
import BoxCar from "@/components/cars-box";
import Filterbar from "@/components/filter-bar";
import FilterDialog from "@/components/filter-dialog";
import { FILTERS } from "@/utils/enum";
import { ExpandMore } from "@mui/icons-material";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loading from "react-loading";

const BuyCars = () => {
  const [selectedValue, setSelectedValue] = useState(FILTERS.NEWESTAD);
  const [loading, setLoading] = useState(true);
  const [carData, setCarData] = useState([]);
  useEffect(() => {
    getCars({ loading: setLoading, setCarData: setCarData });
  }, []);
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
                  {carData.totalDocs}
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
                <Filterbar />
              </Stack>
            </Stack>
            <Box marginTop={3}>
              {loading ? (
                <Loading
                  type={"bars"}
                  color="#000"
                  width={30}
                  height={30}
                  className="m-auto"
                />
              ) : (
                <BoxCar data={carData.docs} />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default BuyCars;
