import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";

const MakeStep = ({
  brand,
  onBrandChange,
  model,
  onModelChange,
  vinData,
  selectedBrand,
  selectedModel,
}) => {
  const [localSelectedBrand, setLocalSelectedBrand] = useState(selectedBrand);
  const [localSelectedModel, setLocalSelectedModel] = useState(selectedModel);

  useEffect(() => {
    setLocalSelectedBrand(selectedBrand);
    setLocalSelectedModel(selectedModel);
  }, [selectedBrand, selectedModel]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={6}>
          <Autocomplete
            renderInput={(params) => <TextField {...params} label="Make" />}
            options={brand}
            getOptionLabel={(options) => options.makeName}
            onChange={onBrandChange}
            value={localSelectedBrand}
          />
        </Grid>
        <Grid item lg={6}>
          <Autocomplete
            renderInput={(params) => <TextField {...params} label="Model" />}
            options={model}
            getOptionLabel={(option) => option.modelName}
            onChange={onModelChange}
            value={localSelectedModel}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default MakeStep;
