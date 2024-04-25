import { getCars } from "@/api/apiCalling/listingApi";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const InteriorMaterial = ({
  specification,
  setCarData,
  setFilters,
  filters,
  setLoading,
  page,
  pageSize,
}) => {
  const InteriorMaterialChangeHandler = (e, newValue) => {
    setLoading(true);
    setFilters({ ...filters, InteriorMaterial: newValue });
    let body = {
      interiorMaterial: newValue,
    };
    getCars({ loading: setLoading, setCarData, body, pageSize, page });
  };

  return (
    <div>
      <Autocomplete
        renderInput={(params) => (
          <TextField
            {...params}
            label="Interior Material"
            sx={{
              fontSize: 13,
              "& label": {
                fontSize: 13,
                top: 5,
              },
            }}
          />
        )}
        options={specification.interiorMaterial}
        onChange={InteriorMaterialChangeHandler}
      />
    </div>
  );
};

export default InteriorMaterial;
