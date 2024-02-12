import { getCars } from "@/api/apiCalling/listingApi";
import data from "@/assests/data";
import BoxCar from "@/components/cars-box";
import Filterbar from "@/components/filter-bar";
import FilterDialog from "@/components/filter-dialog";
import FilterSection from "@/components/filterSection";
import { setSearchData } from "@/redux/reducers/searchData";
import { FILTERS } from "@/utils/enum";
import { Delete, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";

const BuyCars = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(FILTERS.NEWESTAD);
  const [loading, setLoading] = useState(true);
  const [carData, setCarData] = useState([]);
  // const selector = useSelector((state) => state);
  // console.log(selector);
  useEffect(() => {
    
    const fetchData = async () => {
      const filteredData = router.query.state;
      console.log(filteredData)
      if (filteredData) {
        const data = JSON.parse(filteredData);
        const priceData = data.price.replace(/[^\d]/g, "");
        const body = {
          makeId: data.make,
          modelId: data.model,
          periodId: data.period,
          price: parseInt(priceData),
        };
        await getCars({ loading: setLoading, setCarData, body });
      } else {
        getCars({ loading: setLoading, setCarData: setCarData });
      }
    };
    fetchData();
  }, []);
  return (
    <Container maxWidth="1400px">
      <Box>
        <Grid container spacing={6}>
          <Grid item lg={3} sx={{ mt: 5 }}>
            <Card>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 3,
                }}
              >
                <Typography variant="h6" fontWeight={550}>
                  Filter
                </Typography>
                <Tooltip title="Clear Filters" placement="top" arrow>
                  <Delete />
                </Tooltip>
              </Box>
              <Divider sx={{ backgroundColor: "#000" }} />
              <FilterSection />
            </Card>
          </Grid>
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
    </Container>
  );
};

export default BuyCars;
