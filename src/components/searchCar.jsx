import data from "@/assests/data";

import {
  getAllMakePublic,
  getModelByYear,
  getPeriod,
} from "@/api/apiCalling/listingApi";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { loginTextField } from "@/utils/styles";
import Loading from "react-loading";
// import { Lato } from "next/font";
const SearchForm = () => {
  const router = useRouter();
  // const lato = Lato({subsets});
  const dispatch = useDispatch();
  const vatDeductionHandler = (e) => {
    let { id, checked } = e.target;
    setState({ ...state, [id]: checked });
  };

  const [brand, setBrand] = useState([]);
  const [period, setPeriod] = useState([]);
  const [model, setModel] = useState([]);
  const [state, setState] = useState({
    make: "",
    period: "",
    model: "",
    price: "",
    mileage: "",
    vatDeduction: false,
  });

  //   const makeHandler = (e) => {
  //     setState({ ...state, make: e.value });
  //     let data = {
  //       makeId: e.value,
  //     };
  //     getPeriod({ setPeriod, data });
  //     let body = state.period
  //       ? {
  //           makeId: e.value,
  //           period: state.period,
  //         }
  //       : {
  //           makeId: e.value,
  //         };
  //     getModelByYear({ setModel, data: body });
  //   };
  const [make, setMake] = useState(null);
  const makeHandler = (e, newValue) => {
    setMake(newValue);
    if (newValue) {
      setState({ ...state, make: newValue.id });
      let body = {
        makeId: newValue.id,
      };
      getModelByYear({ data: body, setModel });
      getPeriod({ data: body, setPeriod });
    }
  };

  const [brandModel, setBrandModel] = useState(null);
  const modelHandler = (e, newValue) => {
    setBrandModel(newValue);
    if (newValue) {
      setState({ ...state, model: newValue.id });
    }
  };

  const periodHandler = (e) => {
    setState({ ...state, period: e.value });

    let body = {
      makeId: state.make,
      periodYear: e.label,
    };
    getModelByYear({ setModel, data: body });
  };
  //  s
  const priceHandler = (e) => {
    setState({ ...state, price: e.value });
  };
  const mileageHandler = (e) => {
    setState({ ...state, mileage: e.value });
  };
  const [loading, setLoading] = useState(false);

  const searchHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      state.make === "" ||
      state.mileage === "" ||
      state.model === "" ||
      state.period === "" ||
      state.price === ""
    ) {
      toast.error("Please Enter Details for Search");
      return false;
    } else {
      let data = {
        make: state.make,
        model: state.model,
        mileage: state.mileage,
        period: state.period,
        vatDeduction: state.vatDeduction,
        price: state.price,
      };
      const body = encodeURIComponent(JSON.stringify(data));
      router.push(`/buy-cars?state=${body}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMakePublic({ setBrand });
  }, []);

  const colorStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "transparent",
      borderColor: "#fff",
      boxShadow: "none",
      fontSize: "12px",
      width: "100%",
      fontWeight: "400",
      color: "#fff",
      borderWidth: 0.2,
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        textTransform: "upperCase",
        backgroundColor: isSelected ? "#000" : "#ffffff",
        zIndex: 999,
        color: isSelected ? "#fff" : "#000",
      };
    },
    placeholder: (baseStyles, state) => {
      return {
        ...baseStyles,
        color: "#fff",
      };
    },
    singleValue: (provided, state) => ({
      ...provided,
      color: "#fff",
      textTransform: "capitalize",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "#fff",
    }),
  };

  // const searchHandler = (e) => {
  //   e.preventDefault();
  //   if (
  //     state.make === "" ||
  //     state.mileage === "" ||
  //     state.model === "" ||
  //     state.period === "" ||
  //     state.price === ""
  //   ) {
  //     toast.error("Please Enter Details for Search");
  //     return false;
  //   } else {
  //     let data = {
  //       make: state.make,
  //       model: state.model,
  //       mileage: state.mileage,
  //       period: state.period,
  //       vatDeduction: state.vatDeduction,
  //       price: state.price,
  //     };
  //     const body = encodeURIComponent(JSON.stringify(data));
  //     // dispatch(setSearchData({ ...searchData }));
  //     router.push(`/buy-cars?state=${body}`);
  //   }
  // };
  return (
    <Box sx={{ position: "relative", mb: { lg: 23, xs: 2 }, mt: { xs: 2 } }}>
      {/* <Grid item xs={12} sm={9} marginLeft={{ lg: "2rem" }}>
        <Paper elevation={3} sx={{ backgroundColor: "#ffffff17", p: 4 }}>
          <Grid container>
            <Grid lg={7}>
              <Typography
                variant="h1"
                fontSize={{ xs: 18, lg: 26 }}
                lineHeight={{ xs: 1.7, lg: 1.2 }}
                color={"#fff"}
                fontWeight={600}
                textAlign={"justify"}
                textTransform={"capitalize"}
              >
                Customize, click, & get ready to drive.
              </Typography>
            </Grid>
            <Grid lg={1}></Grid>
            <Grid lg={4}>
              <Typography
                color={"#fff"}
                sx={{ fontSize: { xs: 18, lg: 13 }, fontWeight: "normal" }}
              >
                We deliver <br /> your dream car, <br />
                stress-free.
              </Typography>
            </Grid>
          </Grid>
          <form className="mt-4" onSubmit={searchHandler}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ReactSelect
                  options={brand.map((val, i) => {
                    return {
                      label: val.makeName,
                      value: val.id,
                    };
                  })}
                  placeholder="Make"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={colorStyles}
                  onChange={makeHandler}
                />
              </Grid>
              <Grid item xs={6}>
                <ReactSelect
                  options={data.mileage.map((val) => {
                    return {
                      label: val.number,
                      value: val.number,
                    };
                  })}
                  placeholder="Mileage"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  onChange={mileageHandler}
                  styles={colorStyles}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="my-2">
              <Grid item xs={6}>
                <ReactSelect
                  placeholder="Year"
                  options={period.map((val) => {
                    return {
                      label: val.year,
                      value: val.id,
                    };
                  })}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  onChange={periodHandler}
                  styles={colorStyles}
                />
              </Grid>
              <Grid item xs={6}>
                {" "}
                <ReactSelect
                  placeholder="Price"
                  options={data.price.map((val) => {
                    return {
                      label: val.price,
                      value: val.price,
                    };
                  })}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={colorStyles}
                  onChange={priceHandler}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="my-2">
              <Grid item xs={6}>
                <ReactSelect
                  options={model.map((val) => {
                    return {
                      label: val.modelName,
                      value: val.id,
                    };
                  })}
                  placeholder="Choose Model"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={colorStyles}
                  onChange={modelHandler}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={vatDeductionHandler}
                      id="vatDeduction"
                      sx={{
                        color: "#fff",
                        "& .MuiSvgIcon-root": {
                          color: "#fff",
                        },
                      }}
                    />
                  }
                  label="VAT Deduction"
                  sx={{
                    fontSize: 12,
                    color: "#fff",
                  }}
                />
              </Grid>
            </Grid>

            <Grid container alignItems={"center"} spacing={1} className="my-2">
              <Grid item xs={6}></Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  sx={{
                    color: "#000",
                    backgroundColor: "#fff",
                    ":hover": {
                      color: "#fff",
                      backgroundColor: "#000",
                    },
                    border: "1px solid #fff",
                    fontSize: 12,
                    fontWeight: 550,
                  }}
                  type="submit"
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid> */}
      <Card
        sx={{
          p: 4,
          position: { lg: "absolute", xs: "relative" },
          width: "100%",
          bottom: { lg: -140, xs: 0 },
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        }}
      >
        <Typography
          sx={{ fontSize: { lg: 30, xs: 20 }, fontWeight: 400 }}
          variant="h3"
          className="customFont"
        >
          I am in pursuit of
        </Typography>
        <form onSubmit={searchHandler}>
          <Grid container mt={1} spacing={2}>
            <Grid item lg={4} xs={12}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField {...params} label="Select Make" />
                )}
                getOptionLabel={(option) => option.makeName}
                options={brand}
                onChange={makeHandler}
              />
            </Grid>
            <Grid item lg={4} xs={12}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField {...params} label="Select Model" />
                )}
                getOptionLabel={(option) => option.modelName}
                options={model}
                onChange={modelHandler}
              />
            </Grid>
            <Grid item lg={4} xs={12}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField {...params} label="Select Period" />
                )}
                getOptionLabel={(option) => option.year}
                options={period}
                onChange={periodHandler}
              />
            </Grid>
          </Grid>
          <Grid container mt={2} spacing={2}>
            <Grid item lg={4} xs={12}>
              <TextField
                label="Enter Mileage"
                fullWidth
                onChange={mileageHandler}
              />
            </Grid>
            <Grid item lg={4} xs={12}>
              <TextField
                label="Enter Price (in Euro)"
                fullWidth
                onChange={priceHandler}
              />
            </Grid>
            <Grid item lg={4} xs={12}>
              <Button
                sx={{
                  border: "1px solid #2b2b2b",
                  p: 1.8,
                  backgroundColor: "#2b2b2b",
                  color: "#fff",
                  ":hover": {
                    color: "#fff",
                    backgroundColor: "#2b2b2b",
                  },
                  fontWeight: 600,
                }}
                fullWidth
                type="submit"
              >
                {loading ? (
                  <Loading
                    type="bars"
                    width={20}
                    height={20}
                    className="m-auto"
                    color="#fff"
                  />
                ) : (
                  "Search"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default SearchForm;
