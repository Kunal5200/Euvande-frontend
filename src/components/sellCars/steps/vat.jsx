import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Vat = ({ data, setState, state }) => {
  const [selectedVat, setSelectedVat] = useState(null);
  const vatChangeHandler = (e, newValue) => {
    setSelectedVat(newValue);
    setState({ ...state, vatDeduction: newValue });
  };
  const handleVat = (val) => {
    setState({ ...state, vatDeduction: val });
  };
  const carInfo = useSelector((state) => state.carInformation);
  useEffect(() => {
    if (
      carInfo &&
      carInfo.specification &&
      carInfo.specification.vatDeduction
    ) {
      setSelectedVat(carInfo.specification.vatDeduction);
    }
  }, []);
  return (
    <div>
      {/* <Autocomplete
        renderInput={(params) => (
          <TextField {...params} label="Select Vat Deduction" />
        )}
        onChange={vatChangeHandler}
        options={data.vatDeduction}
        value={selectedVat}
      /> */}
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        {data &&
          data.vatDeduction.map((val, i) => (
            <Button
              key={i}
              sx={{
                border: "1px solid #000",
                backgroundColor: state.vatDeduction === val ? "#000" : "#fff",
                color: state.vatDeduction === val ? "#fff" : "#000",
                ":hover": {
                  backgroundColor: state.vatDeduction === val ? "#000" : "#fff",
                },
                fontSize: 12,
              }}
              onClick={() => handleVat(val)}
            >
              {val}
            </Button>
          ))}
      </Stack>
    </div>
  );
};

export default Vat;
