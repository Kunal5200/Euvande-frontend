import { Info } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DriveType = ({ data, state, setState }) => {
  const [selectedDriveType4WD, setSelectedDriveType4WD] = useState(null);
  const carInfo = useSelector((state) => state.CarInformation);
  const driveType4WDHandler = (e, newValue) => {
    setSelectedDriveType4WD(newValue);
    setState({ ...state, driveType4WD: newValue });
  };
  const handleDriveType4WD = (val) => {
    setState({ ...state, driveType4WD: val });
  };

  useEffect(() => {
    if (
      carInfo &&
      carInfo.specification &&
      carInfo.specification.driveType4WD
    ) {
      setSelectedDriveType4WD(carInfo.specification.driveType4WD);
    }
  }, [carInfo]);

  return (
    <div>
      {/* <Autocomplete
        renderInput={(params) => (
          <TextField {...params} label="Select Drive Type 4WD" />
        )}
        options={data.driveType4WD}
        onChange={driveType4WDHandler}
        value={selectedDriveType4WD}
      /> */}

      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        {data &&
          data.driveType4WD.map((val, i) => (
            <Button
              sx={{
                border: "1px solid #000",
                color: state.driveType4WD === val ? "#fff" : "#000",
                backgroundColor: state.driveType4WD === val ? "#000" : "#fff",
                ":hover": {
                  backgroundColor: state.driveType4WD === val ? "#000" : "#fff",
                },
                fontSize: 12,
              }}
              key={i}
              onClick={() => handleDriveType4WD(val)}
            >
              {val}
            </Button>
          ))}
      </Stack>
    </div>
  );
};

export default DriveType;
