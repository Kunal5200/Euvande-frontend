import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import React from "react";

const Transmission = ({ data, state }) => {
  console.log("specification", data);
  return (
    <div>
      <Autocomplete
        renderInput={(params) => (
          <TextField {...params} label="Select Transmission" />
        )}
        options={data.transmission}
      />

      {/* <Stack direction={"row"} alignItems={"center"} spacing={2}>
        {data &&
          data.transmission &&
          data.transmission.map((val, i) => (
            <Box
              sx={{ border: "1px solid #eee", width: 150, fontSize: 12, p: 1 }}
            >
              {val}
            </Box>
          ))}
      </Stack> */}
    </div>
  );
};

export default Transmission;
