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
import { colorStyles } from "@/utils/styles";
import { useEffect, useState } from "react";
import {
  getAllMakePublic,
  getModelByYear,
  getPeriod,
} from "@/api/apiCalling/listingApi";
const BannerForm = () => {
  const vatDeductionHandler = (e) => {
    console.log(e.target);
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
    vatDeduction: "",
  });

  const makeHandler = (e) => {
    setState({ ...state, make: e.value });
    let data = {
      makeId: e.value,
    };
    getPeriod({ setPeriod, data });
  };

  const periodHandler = (e) => {
    setState({ ...state, period: e.value });
    let body = {
      makeId: state.make,
      periodYear: e.label,
    };
    getModelByYear({ setModel, data: body });
  };

  useEffect(() => {
    getAllMakePublic({ setBrand });
  }, []);

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
