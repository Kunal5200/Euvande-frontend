import { loginTextField } from "@/utils/styles";
import { Autocomplete, FormHelperText, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MakeStep = ({
  brand,
  onBrandChange,
  model,
  onModelChange,
  selectedBrand,
  setSelectedBrand,
  selectedModel,
  setSelectedModel,
  carData,
}) => {
  // const carInfo = useSelector((state) => state.CarInformation);

  useEffect(() => {
    if (carData) {
      setSelectedBrand({
        id: (carData && carData.make && carData.make.id) || "",
        makeName: (carData && carData.make && carData.make.makeName) || "",
      });
      setSelectedModel({
        id: (carData && carData.model && carData.model.id) || "",
        modelName: (carData && carData.model && carData.model.modelName) || "",
      });
    }
  }, [carData]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <Autocomplete
            renderInput={(params) => <TextField {...params} label="Make" />}
            options={brand}
            getOptionLabel={(options) => options.makeName}
            onChange={onBrandChange}
            value={selectedBrand}
            sx={loginTextField}
          />
          <FormHelperText sx={{ fontSize: 12 }}>
            Select the Brand of the Car
          </FormHelperText>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Autocomplete
            renderInput={(params) => <TextField {...params} label="Model" />}
            options={model}
            getOptionLabel={(option) => option.modelName}
            onChange={onModelChange}
            value={selectedModel}
            sx={loginTextField}
          />{" "}
          <FormHelperText sx={{ fontSize: 12 }}>
            Select the Model of the Car
          </FormHelperText>
        </Grid>
      </Grid>
    </div>
  );
};

export default MakeStep;
