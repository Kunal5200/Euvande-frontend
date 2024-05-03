import {
  getAllMakePublic,
  getCars,
  getModelByYear,
  getPeriod,
} from "@/api/apiCalling/listingApi";
import CarGrid from "@/components/carGrid";
import BoxCar from "@/components/cars-box";
import Filterbar from "@/components/filter-bar";
import FilterSection from "@/components/filterSection";
import { FILTERS } from "@/utils/enum";
import { scrollToTop } from "@/utils/styles";
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
import React, { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";

const BuyCars = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(FILTERS.NEWESTAD);
  const [loading, setLoading] = useState(true);
  const [carData, setCarData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(9);
  const user = useSelector((state) => state.userInfo);

  // const pageChangeHandler = (e,newValue) => {
  //   setLoading(true);
  //   // console.log("::::newValue", newValue);
  //   setPage(newValue);
  //   let body = {
  //     userId: user.id,
  //   };
  //   getCars({
  //     loading: setLoading,
  //     setCarData,
  //     page: newValue + 1,
  //     pageSize,
  //     body,
  //   });
  // };

  const pageChangeHandler = (e, newPage) => {
    setLoading(true);
    setPage(newPage);
    let body = user.isAuthenticated
      ? {
          userId: user.id,
        }
      : {};
    getCars({
      loading: setLoading,
      setCarData,
      page: newPage + 1,
      pageSize,
      body,
    });
    console.log("pageChange");
  };
  const rowsChangeHandler = (event) => {
    setLoading(true);
    setPageSize(event.target.value);
    let body = {
      userId: user.id,
    };
    getCars({
      loading: setLoading,
      setCarData,
      page: page + 1,
      pageSize: event.target.value,
      body,
    });
  };

  const [make, setMake] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");

  const [selectedMake, setSelectedMake] = useState("");
  const [period, setPeriod] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [model, setModel] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      getAllMakePublic({ setBrand: setMake });
    };
    fetchData();
  }, []);

  const handleMakeSelector = async (e) => {
    setFilters({ ...filters, period: e.target.value });
    setLoading(true);
    let body = {
      makeId: parseInt(e.target.value),
    };

    try {
      await getCars({ body, setCarData, page, pageSize, loading: setLoading });
      await getPeriod({ data: body, setPeriod });
      await getModelByYear({ setModel, data: body });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  const handlePeriodSelector = (e) => {
    setFilters({ ...filters, period: e.target.value });
    setLoading(true);
    let body =
      filters.make != null
        ? {
            makeId: parseInt(filters.make),
            periodId: parseInt(e.target.value),
          }
        : {
            periodId: parseInt(e.target.value),
          };
    getCars({ body, loading: setLoading, setCarData, page, pageSize });
  };
  const handleModelSelector = (e) => {
    setFilters({ ...filters, model: e.target.value });
    setLoading(true);
    let body = {
      makeId: parseInt(filters.make),
      modelId: parseInt(e.target.value),
      periodId: parseInt(filters.period),
    };
    let data = {
      makeId: parseInt(filters.make),
      periodId: parseInt(filters.period),
    };
    getCars({ body, setCarData, page, pageSize, loading: setLoading });
    getModelByYear({ setModel, data });
  };
  const [filters, setFilters] = useState({
    make: null,
    model: null,
    period: null,
    minPrice: null,
    maxPrice: null,
    transmission: null,
    fuelType: null,
    vehicleType: null,
    interiorMaterial: null,
    driveType4WD: null,
    color: null,
    seats: null,
    doors: null,
    ownership: null,
  });

  const removeFilter = () => {
    setLoading(true);
    setFilters({
      ...filters,
      make: null,
      model: null,
      period: null,
      minPrice: null,
      maxPrice: null,
      transmission: null,
      fuelType: null,
      vehicleType: null,
      interiorMaterial: null,
      driveType4WD: null,
      color: null,
      seats: null,
      doors: null,
      ownership: null,
    });
    let body = {
      userId: user.id,
    };
    getCars({ loading: setLoading, setCarData, pageSize, page, body });
  };
  const [sortingValue, setSortingValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const filteredData = router.query.state;
      console.log("filtered Data", filteredData);
      if (filteredData) {
        const data = JSON.parse(filteredData);
        const priceData =
          data && data.price && data.price.replace(/[^\d]/g, "");
        const body = {
          makeId: data.make,
          ...(data.modelId && { modelId: data.model }),
          ...(data.periodId && { periodId: data.period }),
          ...(priceData && { price: parseInt(priceData) }),
          userId: user.id,
        };
        await getCars({
          loading: setLoading,
          setCarData,
          body,
          page,
          pageSize,
        });
        // Set selected make and other filters
        if (data.make) {
          // setSelectedMake(data.make);
          setFilters({ ...filters, make: data.make });
          getPeriod({ data: { makeId: data.make }, setPeriod });
          getModelByYear({ data: { makeId: data.make }, setModel });
        }
        if (data.period) {
          // setSelectedPeriod(data.period);
          setFilters({ ...filters, period: data.period });
          getModelByYear({
            data: { makeId: data.make, periodId: data.period },
            setModel,
          });
        }
        if (data.model) {
          setFilters({ ...filters, model: data.model });
        }
      } else {
        const body = {
          ...(user.isAuthenticated && { userId: user.id }),
        };
        console.log("ye wali chali hai ")
        await getCars({
          loading: setLoading,
          setCarData,
          body,
          page,
          pageSize,
        });
      }
    };
    fetchData();
  }, []);
  // sorting
  const sortingHandler = (e) => {
    setLoading(true);
    if (e) {
      setSortingValue(sortingValue);
      if (e.value === FILTERS.NEWESTAD) {
        if (user.isAuthenticated) {
          getCars({
            body: { sortBy: { createdAT: "ASC" }, userId: user.id },
            loading: setLoading,
            setCarData,
            page,
            pageSize,
          });
        } else {
          getCars({
            body: { sortBy: { createdAT: "ASC" } },
            loading: setLoading,
            setCarData,
            page,
            pageSize,
          });
        }
      } else {
        if (user.isAuthenticated) {
          getCars({
            body: {
              sortBy: {
                price: e.value === FILTERS.HIGHESTPRICE ? "DESC" : "ASC",
              },
              userId: user.id,
            },
            loading: setLoading,
            setCarData,
            page,
            pageSize,
          });
        } else {
          getCars({
            body: {
              sortBy: {
                price: e.value === FILTERS.HIGHESTPRICE ? "DESC" : "ASC",
              },
            },
            loading: setLoading,
            setCarData,
            page,
            pageSize,
          });
        }
      }
    }
  };
  useEffect(() => {
    scrollToTop();
    getPeriod({ setPeriod });
    getModelByYear({ setModel });
  }, []);
  return (
    <Container style={{ maxWidth: 1325 }}>
      <Head>
        <title>Buy Cars</title>
      </Head>
      <Box>
        <Grid container spacing={6}>
          <Grid item lg={3} sx={{ mt: 5 }}>
            <Card sx={{ zIndex: -1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                <Typography variant="h6" fontWeight={550}>
                  Filter
                </Typography>
                <Tooltip title="Clear Filters" placement="top" arrow>
                  <Delete onClick={removeFilter} sx={{ cursor: "pointer" }} />
                </Tooltip>
              </Box>
              <Divider sx={{ backgroundColor: "#000" }} />
              <FilterSection
                make={make}
                selectedMake={selectedMake}
                makeHandleChange={handleMakeSelector}
                period={period}
                periodHandler={handlePeriodSelector}
                selectedPeriod={selectedPeriod}
                model={model}
                selectedModel={selectedModel}
                modelHandler={handleModelSelector}
                setCarData={setCarData}
                carData={carData}
                setLoading={setLoading}
                page={page}
                pageSize={pageSize}
                filters={filters}
                setFilters={setFilters}
                removeFilter={removeFilter}
              />
            </Card>
          </Grid>
          <Grid item lg={9} xs={12} mt={5} p={{ lg: 4, xs: 0 }}>
            <Typography fontSize={30} letterSpacing={1} fontWeight={600}>
              Verified Cars
            </Typography>

            <Box marginTop={3}>
              {loading ? (
                <Loading
                  type={"bars"}
                  color="#000"
                  width={20}
                  height={20}
                  className="m-auto"
                />
              ) : carData.docs.length ? (
                <React.Fragment>
                  <Stack
                    direction={{ lg: "row", xs: "column" }}
                    alignItems={{ lg: "center", xs: "start" }}
                    justifyContent={"space-between"}
                    spacing={1}
                  >
                    <Stack direction={"row"} alignItems={"center"}>
                      <Typography fontSize={13} fontWeight={600}>
                        {carData.totalDocs}
                      </Typography>
                      <Typography fontSize={13} ml={0.5}>
                        Cars Found
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
                      <Filterbar onChange={sortingHandler} />
                    </Stack>
                    <Box>
                      <TablePagination
                        rowsPerPage={pageSize}
                        rowsPerPageOptions={[9, 12, 15, 18]}
                        page={page}
                        count={carData && carData.totalDocs}
                        onPageChange={pageChangeHandler}
                        onRowsPerPageChange={rowsChangeHandler}
                        sx={{
                          "& .MuiTablePagination-selectLabel": {
                            fontSize: { lg: 15, xs: 12 },
                          },
                          "& .MuiTablePagination-toolbar": {
                            paddingLeft: { lg: 16, xs: 0 },
                            "& .MuiTablePagination-actions": {
                              marginLeft: { lg: 20, xs: 0 },
                            },
                          },
                          "& .MuiSelect-select-MuiInputBase-input": {
                            paddingRight: { lg: 24, xs: 13 },
                          },
                        }}
                        labelRowsPerPage="Results Displayed : "
                      />
                    </Box>
                  </Stack>
                  <CarGrid
                    data={carData.docs}
                    setCarData={setCarData}
                    setLoading={setLoading}
                    page={page}
                    pageSize={pageSize}
                  />
                  {/* <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <TablePagination
                      rowsPerPage={pageSize}
                      rowsPerPageOptions={[9, 12, 15, 18]}
                      page={page}
                      count={carData && carData.totalDocs}
                      onPageChange={pageChangeHandler}
                      onRowsPerPageChange={rowsChangeHandler}
                      labelRowsPerPage="Results Displayed : "
                    />
                  </Box> */}
                </React.Fragment>
              ) : (
                <Typography fontSize={15} textAlign={"center"}>
                  No Car Found
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BuyCars;
