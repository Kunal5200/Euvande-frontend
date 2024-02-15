import {
  ChevronRightTwoTone,
  Favorite,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FaAngleRight, FaHeart } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import dummyCars from "@/icons/cars.jpg";
import Dot from "./dot";
import { CarStatus } from "@/utils/enum";
import { useRouter } from "next/router";
const CarCard = ({ data }) => {
  const [favourite, setFavourite] = useState(false);
  const favouriteHandler = () => {
    setFavourite(!favourite);
  };
  const router = useRouter();
  // console.log("data", data);
  const details = (carId) => {
    router.push(`vehicles/${carId}/car-details`);
  };
  return (
    <Card>
      <Carousel
        showThumbs={false}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        swipeable={false}
      >
        {data && data.carImages ? (
          data.carImages.map((val, i) => <img src={val} key={i} height={200} />)
        ) : (
          <img src={dummyCars.src} />
        )}
      </Carousel>
      <Box sx={{ p: 1.2 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography
            textTransform={"capitalize"}
            fontSize={17}
            fontWeight={550}
          >
            {data && data.make && data.make.makeName}{" "}
            {data && data.model && data.model.modelName}
          </Typography>
          <Favorite
            sx={{ fill: favourite ? "#ff0000" : "", cursor: "pointer" }}
            onClick={favouriteHandler}
          />
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          {data && data.variant && data.variant.fuelType && (
            <Typography fontSize={12}>
              {data && data.variant && data.variant.fuelType}
            </Typography>
          )}
          {data && data.period && <Dot width={3} height={3} bgColor={"#000"} />}
          {data && data.period && (
            <Typography fontSize={12}>
              {data && data.period && data.period.year}
            </Typography>
          )}
          {data && data.specification && data.specification.transmission && (
            <Dot width={3} height={3} bgColor="#000" />
          )}
          {data && data.specification && data.specification.transmission && (
            <Typography fontSize={12}>
              {data && data.specification && data.specification.transmission}
            </Typography>
          )}
          {data && data.ownership && (
            <Dot width={3} height={3} bgColor="#000" />
          )}
          {data && data.ownership && (
            <Typography fontSize={12}>{data && data.ownership}</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {data && data.status && (
            <Typography
              fontSize={12}
              color={
                data && data.status === CarStatus.Available ? "green" : "red"
              }
              alignSelf={"end"}
            >
              {data && data.status}
            </Typography>
          )}
          {data && data.price && (
            <Typography textAlign={"end"} mt={2} fontSize={20} fontWeight={550}>
              {data && data.price} €
            </Typography>
          )}
        </Stack>
      </Box>
      <Divider sx={{ backgroundColor: "#000" }} />
      <Button
        fullWidth
        sx={{ color: "#000", fontSize: 13 }}
        onClick={() => details(data.id)}
      >
        View Details <ChevronRightTwoTone />{" "}
      </Button>
    </Card>
  );
};

export default CarCard;
