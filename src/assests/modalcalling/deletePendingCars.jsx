import { hideModal } from "@/redux/reducers/modal";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const DeletePendingCars = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideModal());
  };
  return (
    <div>
      <Typography fontSize={20} fontWeight={600}>
        Remove Car
      </Typography>
      <Divider sx={{ backgroundColor: "#000" }} />
      <Box my={2}>
        <Typography fontSize={18}>Do you want to remove the car ?</Typography>

        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
          my={2}
        >
          <Button variant="contained" color="success" sx={{ width: 100 }}>
            Yes
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ width: 100 }}
            onClick={handleClose}
          >
            No
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default DeletePendingCars;
