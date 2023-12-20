import data from "@/assests/data";

import {
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { FaAngleRight } from "react-icons/fa";
import ReactSelect from "react-select";
import Button from "./button";
const BannerForm = () => {
  const vatDeductionHandler = (e) => {
    console.log(e.target);
  };
  const colorStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "transparent",
      border: "1px solid #fff",
      boxShadow: "none",
      fontSize: "12px",
      width: "100%",
      fontWeight: "400",
      color: "#ffffff",
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        textTransform: "capitalize",
        backgroundColor: isSelected ? "#ff0000" : "#ffffff",
        zIndex: 999,
      };
    },
    placeholder: (baseStyles, state) => {
      return {
        ...baseStyles,
        color: "white",
      };
    },
    singleValue: (provided, state) => ({
      ...provided,
      color: "white",
      textTransform: "capitalize",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "#ffffff",
    }),
  };
  return (
    <Grid container>
      <Grid item xs={12} sm={9} marginLeft={{ lg: "3rem" }}>
        <Paper
          elevation={3}
          className="p-4"
          style={{ backgroundColor: "rgb(0 0 0 / 45%)" }}
        >
          <Typography
            variant="h1"
            fontSize={{ xs: 18, lg: 25 }}
            lineHeight={{ xs: 1.7, lg: 1.2 }}
            color={"#ffffff"}
            fontWeight={600}
            textAlign={"justify"}
            textTransform={"capitalize"}
            className="my-3"
          >
            Customize, click, and get ready to drive. We deliver your dream car,
            stress-free.
          </Typography>
          <form className="mt-4">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ReactSelect
                  options={data.brandsSelector.map((val, i) => {
                    return {
                      label: val.name,
                      value: val.name,
                    };
                  })}
                  placeholder="Make"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={colorStyles}
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
                  styles={colorStyles}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="my-2">
              <Grid item xs={6}>
                <ReactSelect
                  placeholder="Year"
                  options={data.Year.map((val) => {
                    return {
                      label: val.year,
                      value: val.year,
                    };
                  })}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
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
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="my-2">
              <Grid item xs={6}>
                <ReactSelect
                  options={data.carModel.map((val) => {
                    return {
                      label: val.name,
                      value: val.name,
                    };
                  })}
                  placeholder="Choose Model"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={colorStyles}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={vatDeductionHandler}
                      id="test"
                      style={{ color: "#ffffff", borderColor: "#ffffff" }}
                    />
                  }
                  label="VAT Deduction"
                  style={{ color: "#ffffff" }}
                />
              </Grid>
            </Grid>
            {/* <Grid container spacing={2}>
              <Grid item xs={4}>
                <ReactSelect
                  options={data.brandsSelector.map((val, i) => {
                    return {
                      label: val.name,
                      value: val.name,
                    };
                  })}
                  placeholder="Make"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={colorStyles}
                />
              </Grid>
              <Grid item xs={4}>
                <ReactSelect
                  options={data.carModel.map((val) => {
                    return {
                      label: val.name,
                      value: val.name,
                    };
                  })}
                  placeholder="Choose Model"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={colorStyles}
                />
              </Grid>
              <Grid item xs={4}>
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
                  styles={colorStyles}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="my-1" alignItems={"center"}>
              <Grid item xs={4}>
                <ReactSelect
                  placeholder="Year"
                  options={data.Year.map((val) => {
                    return {
                      label: val.year,
                      value: val.year,
                    };
                  })}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={colorStyles}
                />
              </Grid>
              <Grid item xs={4}>
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
                />
              </Grid>
              <Grid item xs={4} textAlign={"center"}>
                <FormControlLabel
                  control={
                    <Checkbox onChange={vatDeductionHandler} id="test" />
                  }
                  label="VAT Deduction"
                />
              </Grid>
            </Grid> */}
            <Grid container alignItems={"center"} spacing={1} className="my-2">
              <Grid item xs={6}>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography color={"#ffffff"} fontSize={12}>
                    Advanced Search
                  </Typography>
                  <FaAngleRight color="#ffffff" size={15} />
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Button
                  className="custom_btn_white"
                  backgroundColor="#000"
                  color="#ffffff"
                  width={"100%"}
                >
                  <span>Search</span>
                  <span>Search</span>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BannerForm;
