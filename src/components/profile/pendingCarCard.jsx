import DeletePendingCars from "@/assests/modalcalling/deletePendingCars";
import dummyCar from "@/icons/cars.jpg";
import { showModal } from "@/redux/reducers/modal";
import { CarStatus } from "@/utils/enum";
import {
  ArrowRight,
  ArrowRightOutlined,
  CalendarMonth,
  Delete,
  DirectionsCar,
  Done,
  Edit,
  MoreVert,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsFuelPump } from "react-icons/bs";
import { GiGearStickPattern, GiRoad } from "react-icons/gi";
import { PiEngine } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
const PendingCar = ({
  data,
  loading,
  handleRoute,
  setData,
  setLoading,
  page,
  pageSize,
  totalDocs,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [id, setId] = useState("");
  const handlePopoverOpen = (event, value) => {
    setId(value.id);
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteModalOpen = () => {
    dispatch(
      showModal(
        <DeletePendingCars
          id={id}
          setData={setData}
          setLoading={setLoading}
          page={page}
          pageSize={pageSize}
        />
      )
    );
    setAnchorEl(null);
  };
  const handleEditCar = () => {
    if (id) {
      localStorage.setItem("carId", id);
      router.push("/create-demand");
    }
  };

  const listRoutes = [
    {
      name: "Edit",
      icon: <Edit sx={{ fill: "green" }} />,
      onClick: handleEditCar,
    },

    {
      name: "Delete",
      icon: <Delete sx={{ fill: "red" }} />,
      onClick: handleDeleteModalOpen,
    },
  ];
  if (data.length === 0) {
    return (
      <Typography p={3} textAlign={"center"}>
        No Car Found
      </Typography>
    );
  }
  const phones = useMediaQuery("(max-width:600px)");

  return (
    <Box>
      {data.map((val, i) => (
        <Card key={i} sx={{ my: 3, height: phones ? "100%" : 250 }}>
          <Grid container spacing={{ lg: 2, xs: 0 }}>
            <Grid item lg={5} xs={12}>
              {loading ? (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={200}
                  height={200}
                />
              ) : (
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  showIndicators={false}
                  showArrows={false}
                >
                  {val && val.carImages && val.carImages.length ? (
                    val.carImages.map((value, index) => (
                      <img
                        src={value}
                        key={index}
                        width={"100%"}
                        height={250}
                      />
                    ))
                  ) : (
                    <img src={dummyCar.src} height={250} />
                  )}
                </Carousel>
              )}
            </Grid>
            <Grid item lg={7} xs={12}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                mt={{ lg: 2, xs: 2 }}
              >
                <Typography
                  fontSize={{ lg: 20, xs: 18 }}
                  fontWeight={600}
                  color={"#000"}
                  letterSpacing={1}
                  sx={{
                    textTransform: "capitalize",
                    mx: { xs: 1 },
                  }}
                >
                  {val && val.make && val.make.makeName}{" "}
                  {val && val.model && val.model.modelName}
                </Typography>
                {val.status === CarStatus["In-Progress"] && (
                  <IconButton
                    onClick={(event) => handlePopoverOpen(event, val)}
                  >
                    <MoreVert sx={{ cursor: "pointer" }} />
                  </IconButton>
                )}
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  sx={{
                    boxShadow: "none",

                    backgroundColor: "transparent",
                    color: "#ffffff",
                    "& .MuiPopover-paper": {
                      boxShadow: "none",
                    },
                  }}
                >
                  <Card sx={{ border: "1px solid #eee" }}>
                    <List>
                      {listRoutes.map((val, i) => (
                        <>
                          <ListItem key={i} disablePadding>
                            <ListItemButton onClick={val.onClick}>
                              <ListItemIcon>{val.icon}</ListItemIcon>
                              <ListItemText primary={val.name} />
                            </ListItemButton>
                          </ListItem>
                          {i !== listRoutes.length - 1 && (
                            <Divider sx={{ backgroundColor: "#000" }} />
                          )}
                        </>
                      ))}
                    </List>
                  </Card>
                </Popover>
              </Stack>
              <Typography fontSize={12} mx={{ xs: 1 }}>
                {(val && val.vin) || "VIN not Disclosed"}
              </Typography>
              {/* <Stack direction={"row"} spacing={1} my={1}>
                {val.specification &&
                  val.specification.equipments &&
                  val.specification.equipments.slice(0, 2).map((value) => (
                    <Chip
                      avatar={
                        <Avatar sx={{ padding: 1, backgroundColor: "#fff" }}>
                          <Done sx={{ fontSize: 10, fill: "#000" }} />
                        </Avatar>
                      }
                      label={value}
                      sx={{
                        fontSize: 10,
                        backgroundColor: "#000",
                        color: "#fff",
                        textTransform: "capitalize",
                      }}
                    />
                  ))}
                {val.specification &&
                  val.specification.equipments &&
                  val.specification.equipments.length > 2 && (
                    <Chip
                      label={`+ ${
                        val.specification.equipments.length - 2
                      } more`}
                      sx={{
                        transition: "0.5s ease all",
                        cursor: "pointer",
                        // "&:hover": {
                        //   backgroundColor: "#000",
                        //   color: "#fff",
                        // },
                        fontSize: 10,
                        width: 100,
                      }}
                      onClick={() => handleRoute(val.id)}
                    />
                  )}
              </Stack> */}

              <Grid container mt={2} mx={{ xs: 1 }}>
                <Grid item lg={4} mb={1} xs={4}>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <GiRoad />
                    <Typography fontSize={12}>
                      {/* {`${val && val.odometer} km` || "Not Disclosed"} */}
                      {val && val.odometer
                        ? `${val.odometer} km`
                        : "Not Disclosed"}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item lg={4} xs={4} mb={1}>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <CalendarMonth />
                    <Typography fontSize={12}>
                      {(val && val.period && val.period.year) ||
                        "Not Disclosed"}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item lg={4} xs={4} mb={1}>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <PiEngine />
                    <Typography fontSize={12}>
                      {val && val.specification && val.specification.power
                        ? `${val.specification.power} kw`
                        : "Not Disclosed"}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item lg={4} xs={4} mb={1}>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <GiGearStickPattern />
                    <Typography fontSize={12}>
                      {(val &&
                        val.specification &&
                        val.specification.transmission) ||
                        "Not Disclosed"}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item lg={4} xs={4} mb={1}>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <BsFuelPump style={{ marginLeft: 2 }} />
                    <Typography fontSize={12}>
                      {(val && val.variant && val.variant.fuelType) ||
                        "Not Disclosed"}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item lg={4} mb={1}>
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <DirectionsCar />
                    <Typography fontSize={12} textTransform={"capitalize"}>
                      {(val &&
                        val.specification &&
                        val.specification.vehicleType) ||
                        "Not Disclosed"}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              {/* <Stack direction={"row"} alignItems={"center"} spacing={0.3}>
                <Typography fontSize={12} fontWeight={600}>
                  {" "}
                  Status :{" "}
                </Typography>
                <Typography
                  fontSize={12}
                  color={val.status === CarStatus.Pending ? "red" : "green"}
                >
                  {" "}
                  {val && val.status}
                </Typography>
              </Stack> */}
              {phones && <Divider />}
              <Stack
                direction={{ lg: "row", xs: "column" }}
                alignItems={{ lg: "center", xs: "start" }}
                justifyContent={{ lg: "space-between", xs: "center" }}
                mt={2}
                mx={{ xs: 1 }}
              >
                {val.price && (
                  <Typography fontSize={25} fontWeight={600}>
                    {val.price} €
                  </Typography>
                )}
                {phones ? (
                  <Button sx={{ color: "#000" }} fullWidth>
                    View More Details <ArrowRight />
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleRoute(val.id)}
                    sx={{
                      fontSize: 12,
                      backgroundColor: "#000",
                      color: "#fff",
                      mx: 2,
                      ":hover": {
                        color: "#000",
                        border: "1px solid #000",
                      },
                    }}
                  >
                    View Car Details <ArrowRightOutlined />
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Card>
      ))}
    </Box>
  );
};

export default PendingCar;
