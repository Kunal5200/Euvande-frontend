import { orderTabButton } from "@/utils/styles";
import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import TabPanel from "../tabPanel";
import CarsForSell from "./carsForSell";

const Order = () => {
  const tabs = ["Cars to Buy", "Cars for Sell"];
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        {tabs.map((val, i) => (
          <Tab label={val} key={i} sx={orderTabButton} />
        ))}
      </Tabs>
      <TabPanel index={0} value={value}>
        Cars list for buy
      </TabPanel>
      <TabPanel index={1} value={value}>
        <CarsForSell />
      </TabPanel>
    </div>
  );
};

export default Order;
