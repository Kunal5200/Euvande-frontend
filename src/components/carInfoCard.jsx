import { CarStatus, OPTION_TYPE } from "@/utils/enum";
import { CalendarMonth, DirectionsCar } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BsFuelPump } from "react-icons/bs";
import { GiGearStickPattern, GiRoad } from "react-icons/gi";
import { PiEngine } from "react-icons/pi";
import CustomButton from "./button2";
import { sendForApprovalCar } from "@/api/apiCalling/vehicle";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "react-loading";

const CarInfoCard = ({
  carData,
  loading,
  onChange,
  onSubmit,
  priceLoading,
}) => {
  const carSpecifications = [
    {
      icon: <GiRoad />,
      data: carData && carData.odometer,
    },
    {
      icon: <CalendarMonth />,
      data: carData && carData.period && carData.period.year,
    },
    {
      icon: <PiEngine />,
      data:
        `${
          carData && carData.specification && carData.specification.power
        } kw` || "Not Disclosed",
    },
    {
      icon: <GiGearStickPattern />,
      data:
        (carData &&
          carData.specification &&
          carData.specification.transmission) ||
        "Not Disclosed",
    },
    {
      icon: <BsFuelPump style={{ marginLeft: "4px" }} />,
      data:
        (carData && carData.variant && carData.variant.fuelType) ||
        "Not Disclosed",
    },
    {
      icon: <DirectionsCar />,
      data:
        (carData &&
          carData.specification &&
          carData.specification.vehicleType) ||
        "Not Disclosed",
    },
  ];

  const [approvalLoading, setApprovalLoading] = useState(false);

  const approvalSending = () => {
    setApprovalLoading(true);
    if (carData && carData.price) {
      sendForApprovalCar({
        carId: carData.id,
        setLoading: setApprovalLoading,
      });
    } else {
      toast.error("Please Enter Price First");
      setApprovalLoading(false);
    }
  };
  return (
    <Card sx={{ position: "relative", bottom: 120 }}>
      <Grid container>
        <Grid item lg={5}>
          {loading ? (
            <Skeleton variant="rectangular" width={300} height={300} />
          ) : (
            <img
              src={carData.media.images.frontView}
              width={"100%"}
              height={"100%"}
            />
          )}
        </Grid>
        <Grid item lg={7} p={2}>
          {loading ? (
            <Skeleton variant="text" width={100} />
          ) : (
            <>
              <Typography
                fontSize={20}
                fontWeight={600}
                letterSpacing={0.2}
                color={"#495254"}
                textTransform={"capitalize"}
              >
                {carData.make.makeName} - {carData.model.modelName}{" "}
                {carData && carData.variant && carData.variant.variantName}
              </Typography>

              <Typography fontSize={12} color={"#495254"}>
                {carData.vin || "Not Disclosed"}
              </Typography>
            </>
          )}

          <Box my={2}>
            <Grid container>
              {carSpecifications.map((val, i) => (
                <Grid item lg={4} key={i} mb={1}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    {val.icon}
                    <Typography fontSize={13} textTransform={"capitalize"}>
                      {val.data}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>

          {carData && carData.price ? (
            <Box textAlign={"start"}>
              <Typography fontSize={30} fontWeight={600}>
                {carData.price} €
              </Typography>
              <Typography fontSize={12}>
                {carData &&
                carData.specification &&
                carData.specification.vatDeduction === OPTION_TYPE.No
                  ? "Without VAT Deduction"
                  : "Included With VAT Deduction"}
              </Typography>
            </Box>
          ) : (
            <Grid container alignItems={"center"} spacing={1}>
              <Grid item lg={6}>
                <TextField
                  label="Enter Desired Amount"
                  sx={{
                    "& label": {
                      fontSize: "13px",
                    },
                  }}
                  fullWidth
                  onChange={onChange}
                />
              </Grid>
              <Grid item lg={6}>
                <CustomButton
                  className="custom-btn"
                  padding="18px"
                  width="100%"
                  fs="13px"
                  border="1px solid #495254"
                  onClick={onSubmit}
                >
                  {priceLoading ? (
                    <Loading type="bars" width={20} height={20} color="red" />
                  ) : (
                    "Add Price"
                  )}
                </CustomButton>
              </Grid>
            </Grid>
          )}

          <Grid container mt={2}>
            <Grid lg={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={approvalSending}
                disabled={carData && carData.status === CarStatus.Pending}
                sx={{
                  "&.Mui-disabled": {
                    color: "#fff",
                  },
                }}
              >
                {approvalLoading ? (
                  <Loading type="bars" color="red" width={20} height={20} />
                ) : carData && carData.status === CarStatus.Pending ? (
                  "Waiting for EuVande Approval"
                ) : (
                  " Put car up for the Approval"
                )}
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
              <Checkbox id="terms" />
              <label htmlFor="terms" className="f-12">
                I agree{" "}
              </label>
              <a
                style={{
                  color: "blue",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
                href="#"
              >
                with the terms & conditions
              </a>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CarInfoCard;
