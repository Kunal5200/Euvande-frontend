import { getCarDetailsById } from "@/api/apiCalling/listingApi";
import { OPTION_TYPE } from "@/utils/enum";
import { ChevronLeft } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactCreditCards from "react-credit-cards-2";
import { Carousel } from "react-responsive-carousel";

const Checkout = () => {
  const [state, setState] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
    focus: "",
    phoneNumber: "",
    countryCode: "",
  });
  const handleInputChange = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
  };

  const handleInputCardNumber = (event) => {
    let inputValue = event.target.value;

    // Remove non-numeric characters
    inputValue = inputValue.replace(/\D/g, "");

    // Format the input with spaces after every 4 digits
    inputValue = inputValue.replace(/(\d{4})/g, "$1 ").trim();

    setState({ ...state, number: inputValue });
  };
  const handleInputFocus = (e) => {
    setState({ ...state, focus: e.target.id });
  };
  const [phone, setPhone] = useState("");
  const handlePhoneNumber = (newValue, countryData) => {
    setPhone(newValue);
    const validTel = matchIsValidTel(newValue);
    if (validTel) {
      setState({
        ...state,
        phoneNumber: countryData.nationalNumber,
        countryCode: countryData.countryCallingCode,
      });
    }
  };
  const handleExpiryChange = (event) => {
    let formattedExpiry = event.target.value;

    formattedExpiry = formattedExpiry.replace(/\D/g, "");

    formattedExpiry = formattedExpiry.slice(0, 4);

    if (formattedExpiry.length >= 2 && formattedExpiry.indexOf("/") === -1) {
      formattedExpiry =
        formattedExpiry.slice(0, 2) + "/" + formattedExpiry.slice(2);
    }

    if (formattedExpiry.length === 3 && formattedExpiry.charAt(2) === "/") {
      formattedExpiry = formattedExpiry.slice(0, 2);
    }

    setState({ ...state, expiry: formattedExpiry });
  };
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (router.query.carId) {
      getCarDetailsById({ carId: router.query.carId, setLoading, setCarData });
    }
  }, [router.query.carId]);
  console.log("carData", carData);
  return (
    <Container style={{ maxWidth: 1325 }}>
      <Box sx={{ p: 2 }}>
        <Button
          sx={{ color: "#000", fontSize: 12 }}
          onClick={() => router.back()}
        >
          <ChevronLeft /> back{" "}
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item lg={6}>
          {/* <Card sx={{p:1}}> */}
          <ReactCreditCards
            number={state.number}
            name={state.name}
            expiry={state.expiry}
            cvc={state.cvc}
            focused={state.focus}
          />
          <FormControl fullWidth sx={{ mt: 3 }}>
            <TextField
              label="Full Name*"
              onChange={handleInputChange}
              id="name"
              fullWidth
              sx={{ mb: 2 }}
              onFocus={handleInputFocus}
            />
            <TextField
              label="Enter Email Address*"
              onChange={handleInputChange}
              id="email"
              fullWidth
              sx={{ mb: 2 }}
            />
            <MuiTelInput
              sx={{ mb: 2 }}
              defaultCountry="DE"
              continents={["EU"]}
              onChange={handlePhoneNumber}
              value={phone}
            />

            <TextField
              id="number"
              value={state.number}
              type="text"
              label="Card Number"
              onChange={handleInputCardNumber}
              onFocus={handleInputFocus}
              sx={{ mb: 2 }}
            />
            <Stack direction={"row"} alignItems={"center"} spacing={4}>
              <TextField
                id="expiry"
                label="Expiry"
                variant="outlined"
                value={state.expiry}
                onChange={handleExpiryChange}
                inputProps={{
                  maxLength: 5, // Expiry format: MM/YY, hence 5 characters
                  pattern: "^\\d{2}/\\d{2}$", // Validate MM/YY format
                }}
                onFocus={handleInputFocus}
                fullWidth
              />
              <TextField
                label="Enter CVC"
                id="cvc"
                value={state.cvc}
                fullWidth
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </Stack>
            <Button
              sx={{
                border: "1px solid #000",
                mt: 2,
                p: 2,
                backgroundColor: "#000",
                color: "#fff",
                ":hover": {
                  backgroundColor: "#000",
                  color: "#fff",
                },
              }}
              fullWidth
            >
              Reserve Car For : 200 €
            </Button>
          </FormControl>
          {/* </Card> */}
        </Grid>
        <Grid item lg={6}>
          <Card>
            <Carousel showThumbs={false} showIndicators={false}>
              {carData &&
                carData.carImages &&
                carData.carImages.map((val, i) => (
                  <img src={val} key={i} height={450} />
                ))}
            </Carousel>
            <Typography
              sx={{
                fontSize: 20,
                p: 2,
                fontWeight: 550,
              }}
              textTransform={"capitalize"}
            >
              {carData && carData.period && carData.period.year}{" "}
              {carData && carData.make && carData.make.makeName}{" "}
              {carData && carData.model && carData.model.modelName}
            </Typography>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              p={2}
            >
              <Box>
                <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
                  Total Price of the Car
                </Typography>
                {/* <Typography sx={{ fontSize: 12 }}>
                  {carData &&
                  carData.specification &&
                  carData.specification.vatDeduction === OPTION_TYPE.Yes
                    ? "Included VAT Deduction"
                    : "Excluded VAT Deduction"}
                </Typography> */}
              </Box>
              <Typography sx={{ fontSize: 18, fontWeight: 500 }}>
                {carData && carData.price} €
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
