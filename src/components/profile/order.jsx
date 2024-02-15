import { orderTabButton } from "@/utils/styles";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import TabPanel from "../tabPanel";
import CarsForSell from "./carsForSell";
import { useRouter } from "next/router";

const Order = () => {
  const tabs = ["Cars to Buy", "Cars for Sell"];
  const [value, setValue] = useState(0);
  const router = useRouter();
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          "& .MuiPaper-root-MuiCard-root": {
            height: 500,
          },
        }}
      >
        {tabs.map((val, i) => (
          <Tab label={val} key={i} sx={orderTabButton} />
        ))}
      </Tabs>
      <TabPanel index={0} value={value}>
        <Box sx={{ display: "grid", placeItems: "center", height: "60vh" }}>
          <Box textAlign={"center"}>
            <Typography sx={{ fontSize: 30, fontWeight: 550 }}>
              No Cars Found
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => router.push("/buy-cars")}
            >
              Browse Cars
            </Button>
          </Box>
        </Box>
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CarsForSell />
      </TabPanel>
    </div>
  );
};

export default Order;
