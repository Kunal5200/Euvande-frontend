import ShortListedVehicle from "@/components/profile/shortListedVehicle";
import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Favourite = () => {
  return (
    <Container>
      <Box sx={{ p: 2 }}>
        <ShortListedVehicle />
      </Box>
    </Container>
  );
};

export default Favourite;
