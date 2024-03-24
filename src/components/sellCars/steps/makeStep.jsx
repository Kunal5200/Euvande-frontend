import { Autocomplete, FormHelperText, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MakeStep = ({ brand, onBrandChange, model, onModelChange }) => {
  const carInfo = useSelector((state) => state.CarInformation);
  const [localSelectedBrand, setLocalSelectedBrand] = useState({
    id: (carInfo && carInfo.make && carInfo.make.id) || "",
    makeName: (carInfo && carInfo.make && carInfo.make.makeName) || "",
  });
  const [localSelectedModel, setLocalSelectedModel] = useState({
    id: (carInfo && carInfo.model && carInfo.model.id) || "",
    modelName: (carInfo && carInfo.model && carInfo.model.modelName) || "",
  });

  useEffect(() => {
    if (carInfo) {
      setLocalSelectedBrand({
        id: (carInfo && carInfo.make && carInfo.make.id) || "",
        makeName: (carInfo && carInfo.make && carInfo.make.makeName) || "",
      });
      setLocalSelectedModel({
        id: (carInfo && carInfo.model && carInfo.model.id) || "",
        modelName: (carInfo && carInfo.model && carInfo.model.modelName) || "",
      });
    }
  }, [carInfo]);

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
            sx={{ fontSize: 12 }}
          />
          <FormHelperText sx={{ fontSize: 12 }}>
            Select the Brand of the Car
          </FormHelperText>
        </Grid>
        <Grid item lg={6}>
          <Autocomplete
            renderInput={(params) => <TextField {...params} label="Model" />}
            options={model}
            getOptionLabel={(option) => option.modelName}
            onChange={onModelChange}
            value={localSelectedModel}
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
