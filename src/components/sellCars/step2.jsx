import { countries } from "@/assests/country";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import React from "react";

const Step2 = ({ handleNext, handlePrev }) => {
  return (
    <Container style={{ maxWidth: 1350 }}>
      <Card sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 550, fontSize: 25 }}>
          Contact Information
        </Typography>
        <Grid container my={2} spacing={2}>
          <Grid item lg={6}>
            <TextField label="Name*" id="name" fullWidth />
          </Grid>
          <Grid item lg={6}>
            <MuiTelInput
              label="Phone Number*"
              continents={["EU"]}
              defaultCountry="DE"
              id="phoneNumber"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <TextField label="Email*" id="email" fullWidth />
          </Grid>
          <Grid item lg={6}>
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <Autocomplete
                  options={countries}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Country*" fullWidth />
                  )}
                />
              </Grid>
              <Grid item lg={6}>
                <TextField label="Postal Code*" fullWidth />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Stack
          sx={{ textAlign: "end", mt: 2 }}
          direction={"row"}
          alignItems={"center"}
          spacing={2}
          justifyContent={"end"}
        >
          <Button
            sx={{
              border: "1px solid #000",
              backgroundColor: "transparent",
              width: 200,
              color: "#000",
              borderRadius: 2,
              p: 2,
            }}
            onClick={handlePrev}
          >
            Back
          </Button>
          <Button
            sx={{
              border: "1px solid #000",
              backgroundColor: "transparent",
              width: 200,
              color: "#000",
              borderRadius: 2,
              p: 2,
            }}
            onClick={handleNext}
          >
            Continue
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default Step2;
