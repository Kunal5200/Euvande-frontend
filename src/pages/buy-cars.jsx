import { getCars } from "@/api/apiCalling/listingApi";
import BoxCar from "@/components/cars-box";
import Filterbar from "@/components/filter-bar";
import FilterSection from "@/components/filterSection";
import { FILTERS } from "@/utils/enum";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  TablePagination,
  Tooltip,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const BuyCars = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(FILTERS.NEWESTAD);
  const [loading, setLoading] = useState(true);
  const [carData, setCarData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const pageChangeHandler = (e, newValue) => {
    setPage(newValue);
    getCars({ loading: setLoading, setCarData, page: newValue, pageSize });
  };

  const rowsChangeHandler = (event) => {
    setPageSize(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const filteredData = router.query.state;
      if (filteredData) {
        const data = JSON.parse(filteredData);
        const priceData = data.price.replace(/[^\d]/g, "");
        const body = {
          makeId: data.make,
          modelId: data.model,
          periodId: data.period,
          price: parseInt(priceData),
        };
        await getCars({
          loading: setLoading,
          setCarData,
          body,
          page,
          pageSize,
        });
      } else {
        getCars({
          loading: setLoading,
          setCarData: setCarData,
          page,
          pageSize,
        });
      }
    };
    fetchData();
  }, []);
  return (
    <Container maxWidth="1400px">
      <Head>
        <title>Buy Cars</title>
      </Head>
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
              {!loading && (
                <Box>
                  <TablePagination
                    rowsPerPage={pageSize}
                    page={page}
                    count={carData && carData.totalDocs}
                    onPageChange={pageChangeHandler}
                    onRowsPerPageChange={rowsChangeHandler}
                  />
                </Box>
              )}
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
