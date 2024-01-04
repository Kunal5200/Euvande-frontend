import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { FaAngleRight, FaHeart } from "react-icons/fa";
const CarCard = (props) => {
  const [favourite, setFavourite] = useState(false);
  const favouriteHandler = () => {
    setFavourite(!favourite);
  };
  return (
    <Paper elevation={2}>
      <img src={props.img} width={"100%"} />
      <Box padding={2}>
        <Stack
          direction={{ xs: "row", lg: "row" }}
          justifyContent={"space-between"}
          alignItems={""}
        >
          <Typography fontSize={15} fontWeight={600} color={"#000"}>
            {props.carName.slice(0, 30)}...
          </Typography>
          {favourite ? (
            <FaHeart
              onClick={favouriteHandler}
              size={21}
              color="#ff0000"
              className="pointer"
            />
          ) : (
            <FavoriteBorderOutlined
              onClick={favouriteHandler}
              className="pointer"
            />
          )}
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Typography fontSize={12}>{props.driven} km</Typography>
          <div className="dot" style={{ width: "2px", height: "2px" }}></div>
          <Typography fontSize={12}>{props.variant}</Typography>
          <div className="dot" style={{ width: "2px", height: "2px" }}></div>
          <Typography fontSize={12}>{props.transmission}</Typography>
        </Stack>
        <Stack
          direction={"row"}
          className="my-2"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={25} fontWeight={600}>
            {" "}
            {props.amount} €
          </Typography>
          <Typography fontSize={12}>{props.emi} € / month</Typography>
        </Stack>
      </Box>
      <Divider style={{ backgroundColor: "#000" }} />
      <div className="text-center pointer">
        <Typography fontSize={12} padding={1}>
          View Details <FaAngleRight />
        </Typography>
      </div>
    </Paper>
  );
};

export default CarCard;
