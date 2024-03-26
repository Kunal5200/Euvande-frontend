import { Autocomplete, FormHelperText, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const VehicleTypeStep = ({ data, state, setState }) => {
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);

  const carInfo = useSelector((state) => state.CarInformation);

  useEffect(() => {
    if (
      (carInfo && carInfo.specification && carInfo.specification.vehicleType) ||
      (carInfo &&
        carInfo.specification &&
        carInfo.specification.specificationDetails &&
        carInfo.specification.specificationDetails.bodyStyle)
    ) {
      setSelectedVehicleType(
        carInfo.specification.vehicleType ||
          carInfo.specification.specificationDetails.bodyStyle
      );
    }
  }, [carInfo]);
  const handleVehicleType = (e, newValue) => {
    setSelectedVehicleType(newValue);
    setState({ ...state, vehicleType: newValue });
  };

  return (
    <div>
      <Autocomplete
        renderInput={(params) => (
          <TextField {...params} label="Select Vehicle Type" />
        )}
        options={data.vehicleType}
        value={selectedVehicleType}
        onChange={handleVehicleType}
      />
      <FormHelperText sx={{ fontSize: 12 }}>Select Body Type</FormHelperText>
    </div>
  );
};

export default VehicleTypeStep;
