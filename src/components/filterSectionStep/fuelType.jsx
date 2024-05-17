import { getCars } from "@/api/apiCalling/listingApi";
import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";

const FuelType = ({
  setCarData,
  setLoading,
  page,
  pageSize,
  specification,
  filters,
  setFilters,
}) => {
  const vehicleTypeHandler = (e, newValue) => {
    setLoading(true);
    setFilters({ ...filters, vehicleType: newValue });
    let body = {
      fuelType: newValue,
    };
    getCars({ body, loading: setLoading, setCarData, page, pageSize });
  };

  return (
    <div>
      <Autocomplete
        options={specification.fuel}
        onChange={vehicleTypeHandler}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Fuel Type"
            sx={{
              fontSize: 13,
              "& label": {
                fontSize: 13,
                top:5
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default FuelType;
