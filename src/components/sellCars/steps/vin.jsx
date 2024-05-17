import { loginTextField } from "@/utils/styles";
import {
  Button,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import Loading from "react-loading";

const Vin = ({ state, decodeVinHandler, error, loading, decodeVin }) => {
  const mobilePhone = useMediaQuery("(max-width:600px)");
  return (
    <div>
      {" "}
      <Stack
        direction={{ lg: "row", xs: "column" }}
        alignItems={"center"}
        spacing={{ lg: 5, xs: 2 }}
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
            width: { lg: 150, xs: "100%" },
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
