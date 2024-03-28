import { loginTextField } from "@/utils/styles";
import {
  Button,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import Loading from "react-loading";

const Vin = ({ state, decodeVinHandler, error, loading, decodeVin }) => {
  return (
    <div>
      {" "}
      <Stack
        direction="row"
        alignItems={"center"}
        spacing={5}
        justifyContent={"space-between"}
      >
        <FormControl fullWidth>
          <TextField
            sx={loginTextField}
            label="Vehicle VIN"
            fullWidth
            value={state.vin}
            id="vin"
            onChange={decodeVinHandler}
            error={Boolean(error.vin)}
            inputProps={{ maxLength: 17 }}
            focused={Boolean(state.vin)}
          />
        </FormControl>
        <Button
          sx={{
            border: "1px solid #000",
            backgroundColor: "#000",
            width: 150,
            p: 2,
            color: "#fff",
            ":hover": {
              color: "#fff",
              backgroundColor: "#000",
            },
          }}
          disabled={loading}
          onClick={decodeVin}
        >
          {loading ? (
            <Loading
              type="bars"
              width={20}
              height={20}
              className="m-auto"
              color="#fff"
            />
          ) : (
            "Load Vin"
          )}
        </Button>
      </Stack>
      <FormHelperText sx={{ fontSize: 12 }}>
        Enter a VIN (Vehicle Identification Number) in English alphanumeric
        format, typically 17 characters, including both letters and numbers.
      </FormHelperText>
    </div>
  );
};

export default Vin;
