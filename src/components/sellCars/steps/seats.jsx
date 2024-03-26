import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Seats = ({ data, setState, state }) => {
  const [selectedSeats, setSelectedSeats] = useState(null);
  const seatHandler = (e, newValue) => {
    setState({ ...state, seats: newValue });
  };
  const handleSeat = (val) => {
    setState({ ...state, seats: val });
  };
  const carInfo = useSelector((state) => state.CarInformation);
  useEffect(() => {
    if (carInfo && carInfo.specification && carInfo.specification.seats) {
      setSelectedSeats(carInfo.specification.seats);
    }
  }, [carInfo]);
  //   console.log("seats", state.seats);

  return (
    <div>
      {/* <Autocomplete
        renderInput={(params) => <TextField {...params} label="Select Seats" />}
        onChange={seatHandler}
        options={data.seats}
        value={selectedSeats}
      /> */}
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        {data &&
          data.seats.map((val, i) => (
            <Button
              key={i}
              sx={{
                border: "1px solid #000",
                backgroundColor: state.seats === val ? "#000" : "#fff",
                color: state.seats === val ? "#fff" : "#000",
                ":hover": {
                  backgroundColor: state.seats === val ? "#000" : "#fff",
                },
                fontSize: 12,
              }}
              onClick={() => handleSeat(val)}
            >
              {val}
            </Button>
          ))}
      </Stack>
    </div>
  );
};

export default Seats;
