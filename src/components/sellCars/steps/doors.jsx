import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Doors = ({ data, setState, state }) => {
  const doorHandler = (val) => {
    setState({ ...state, doors: val });
  };
  const [selectedDoors, setSelectedDoors] = useState(null);
  const carInfo = useSelector((state) => state.CarInformation);
  const doorInputHandler = (e, newValue) => {
    setSelectedDoors(newValue);
    setState({ ...state, doors: newValue });
  };

  useEffect(() => {
    if (carInfo && carInfo.specification && carInfo.specification.doors) {
      setSelectedDoors(carInfo && carInfo.specification && carInfo.specification.doors);
    }
  }, []);

  return (
    <div>
      {/* <Autocomplete
        renderInput={(params) => <TextField {...params} label="Select Doors" />}
        onChange={doorInputHandler}
        options={data.doors}
        value={selectedDoors}
      /> */}
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        {data &&
          data.doors.map((val, i) => (
            <Button
              sx={{
                border: "1px solid #000",
                backgroundColor: state.doors === val ? "#000" : "#fff",
                color: state.doors === val ? "#fff" : "#000",
                ":hover": {
                  backgroundColor: state.doors === val ? "#000" : "inherit",
                  color: state.doors === val ? "#fff" : "inherit",
                },
              }}
              onClick={() => doorHandler(val)}
            >
              {val}
            </Button>
          ))}
      </Stack>
    </div>
  );
};

export default Doors;
