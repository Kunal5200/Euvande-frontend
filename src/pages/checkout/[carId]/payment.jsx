import { getCarDetailsById } from "@/api/apiCalling/listingApi";
import { countries } from "@/assests/country";
import data from "@/assests/data";
import { OPTION_TYPE } from "@/utils/enum";
import { ChevronLeft, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Divider,
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
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleInputCardNumber = (event) => {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/\D/g, "");

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
  return (
    <Container style={{ maxWidth: 1325 }}>
      <Box sx={{ pt: 2 }}>
        <Button
          sx={{ color: "#000", fontSize: 12 }}
          onClick={() => router.back()}
        >
          <ChevronLeft /> back{" "}
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item lg={6}>
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
              helperText="Enter Card Holder Name"
            />

            <TextField
              id="number"
              value={state.number}
              type="text"
              label="Card Number"
              onChange={handleInputCardNumber}
              onFocus={handleInputFocus}
              sx={{ mb: 2 }}
              helperText="Enter Card Number"
            />
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <TextField
                id="expiry"
                label="Expiry"
                variant="outlined"
                value={state.expiry}
                onChange={handleExpiryChange}
                inputProps={{
                  maxLength: 5,
                  pattern: "^\\d{2}/\\d{2}$",
                }}
                onFocus={handleInputFocus}
                fullWidth
                helperText="Enter Expiry Date of Card"
              />
              <TextField
                label="Enter CVC"
                id="cvc"
                value={state.cvc}
                fullWidth
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                helperText="Enter CVC of Card"
              />
            </Stack>
            <Box sx={{ mb: 2 }}>
              <Grid container spacing={2} mt={1}>
                <Grid item lg={6}>
                  <TextField
                    label="Enter Email Address*"
                    onChange={handleInputChange}
                    id="email"
                    fullWidth
                    helperText="Enter Valid Email Address"
                  />
                </Grid>
                <Grid item lg={6}>
                  <MuiTelInput
                    defaultCountry="DE"
                    continents={["EU"]}
                    onChange={handlePhoneNumber}
                    value={phone}
                    fullWidth
                    label="Enter Phone Number"
                    helperText="Enter Valid Phone Number"
                  />
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ fontSize: 12, fontWeight: 550, mb: 2 }}>
              Shipping Information
            </Divider>
            <Grid container spacing={2} mb={2}>
              <Grid item lg={6}>
                <TextField
                  label="Address Line 1"
                  fullWidth
                  helperText="Enter Street Address"
                />
              </Grid>
              <Grid item lg={6}>
                <TextField
                  label="Address Line 2"
                  fullWidth
                  helperText="Enter Street Address (Zipcode , Area code)"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} mb={2}>
              <Grid item lg={6}>
                <Autocomplete
                  id="country-select-demo"
                  sx={{ width: 300 }}
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
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
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a country"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                      }}
                      helperText="Select Country "
                    />
                  )}
                />
              </Grid>
              <Grid item lg={6}>
                <TextField
                  label="Enter City"
                  fullWidth
                  helperText="Enter Residential City"
                />
              </Grid>
            </Grid>

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
        </Grid>
        <Grid item lg={6}>
          <Card>
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 2000,
              }}
            >
              {carData &&
                carData.carImages &&
                carData.carImages.map((val, i) => (
                  <SwiperSlide key={i}>
                    <img src={val} width={"100%"} />
                  </SwiperSlide>
                ))}
            </Swiper>
            <Typography
              sx={{
                fontSize: 20,
                p: 1,
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
              p={1}
            >
              <Box>
                <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                  Price of the Car
                </Typography>
              </Box>
              {carData && carData.price ? (
                <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                  {carData && carData.price} €
                </Typography>
              ) : (
                <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                  N/A
                </Typography>
              )}
            </Stack>
            <Divider />

            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              p={1}
            >
              <Typography sx={{ fontSize: 12 }}>Home Delivery</Typography>
              <Typography sx={{ fontSize: 12 }}>N/A</Typography>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              p={1}
            >
              <Typography sx={{ fontSize: 12 }}>Extended Warranty</Typography>
              <Box
                sx={{
                  border: "1px solid green",
                  width: 50,
                  p: 0.4,
                  fontSize: 12,
                  backgroundColor: "green",
                  borderRadius: 1,
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                FREE
              </Box>
            </Stack>
          </Card>
          {/* <Card sx={{ p: 1, mt: 2 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
              Why Us for Payment?
            </Typography>
            <Typography sx={{ fontSize: 12 }}>
              At Euvande, we prioritize the security of your transactions. With
              state-of-the-art encryption protocols and stringent compliance
              measures, we ensure that your personal and financial information
              is always protected. Trust in Euvande for safe and secure online
              payments every time.
            </Typography>
          </Card> */}
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>FAQs</Typography>
      </Divider>
      {data.paymentFaq.map((val, i) => (
        <Accordion key={i} sx={{ mb: 2 }}>
          <AccordionSummary
            sx={{
              fontWeight: 550,
              fontSize: 15,
              borderBottom: "1px solid #eee",
            }}
            expandIcon={<ExpandMore />}
          >
            {val.label}
          </AccordionSummary>
          <AccordionDetails sx={{ fontSize: 12 }}>{val.value}</AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default Checkout;
