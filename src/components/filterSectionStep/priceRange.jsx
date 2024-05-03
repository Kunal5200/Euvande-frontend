import { getCars } from "@/api/apiCalling/listingApi";
import { useDebounced } from "@/hooks/debounced";
import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PriceRange = ({
  setFilters,
  filters,
  setLoading,
  setCarData,
  page,
  pageSize,
}) => {
  const debouncedMaxPrice = useDebounced(filters.maxPrice || null);
  const debouncedMinPrice = useDebounced(filters.minPrice || null);
  const maxPriceHandler = (e) => {
    setLoading(true);
    setFilters({ ...filters, maxPrice: e.target.value });
  };

  const minPriceHandler = (e) => {
    setLoading(true);
    setFilters({ ...filters, minPrice: e.target.value });
  };
  const user = useSelector((state) => state.userInfo);

  useEffect(() => {
    const maxPriceValue = parseInt(debouncedMaxPrice);
    const minPriceValue = parseInt(debouncedMinPrice);
    // if (maxPriceValue && minPriceValue === null) {
    //  console.log("no value")
    // }
    // Check if either maxPrice or minPrice is provided
    if (!isNaN(maxPriceValue) || !isNaN(minPriceValue)) {
      console.log("tetsetet");
      let body =
        filters.maxPrice === null
          ? user
            ? {
                minPrice: minPriceValue,
                userId: user.id,
              }
            : {
                minPrice: minPriceValue,
              }
          : user
          ? {
              maxPrice: maxPriceValue,
              userId: user.id,
            }
          : {
              maxPrice: maxPriceValue,
            };

      getCars({ loading: setLoading, setCarData, page, pageSize, body });
      console.log("chl rha hai");
    } else {
      // let body = {
      //   userId: user.id,
      // };
      // getCars({ loading: setLoading, setCarData, page, pageSize, body });
      // console.log("ttttttttsstststst");
    }
  }, [debouncedMaxPrice, debouncedMinPrice]);
  return (
    <div>
      <Grid container spacing={2} mt={0}>
        <Grid item lg={6}>
          <TextField
            sx={{
              p: 0,
              "& .MuiOutlinedInput-input": {
                padding: "12px",
              },
              "& .MuiInputLabel-root": {
                top: "0px",
              },
              "& label": {
                fontSize: 12,
              },
            }}
            label="Price(min) in Euro"
            fullWidth
            onChange={minPriceHandler}
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            label="Price(max) in Euro"
            sx={{
              "& .MuiOutlinedInput-input": {
                padding: "12px",
              },
              "& .MuiInputLabel-root": {
                top: "0px",
              },
              "& label": {
                fontSize: 12,
              },
            }}
            fullWidth
            onChange={maxPriceHandler}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PriceRange;
