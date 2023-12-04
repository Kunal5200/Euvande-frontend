import { tabButton } from "@/utils/styles";
import { Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const LinkTab = () => {
  const router = useRouter();
  const [value, setvalue] = useState(0);

  const tabData = [
    { label: "Make", route: "/sell-cars/make" },
    { label: "Period", route: "/sell-cars/period" },
    { label: "Model", route: "/sell-cars/model" },
    { label: "Variant", route: "/sell-cars/variant" },
    { label: "Ownership", route: "/sell-cars/ownership" },
    { label: "Odometer", route: "/sell-cars/odometer" },
    { label: "Location", route: "/sell-cars/location" },
  ];

  useEffect(() => {
    const path = router.pathname;
    const index = tabData.findIndex((tab) => tab.route === path);
    if (index !== -1) {
      setvalue(index);
    }
  }, [router.pathname, tabData]);

  const handleRoute = (route) => {
    router.push(route);
  };

  const handleChange = (event, newValue) => {
    setvalue(newValue);
    handleRoute(tabData[newValue].route);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange} scrollButtons="auto">
        {tabData.map((tab, index) => (
          <Tab key={index} label={tab.label} sx={tabButton} />
        ))}
      </Tabs>
    </div>
  );
};

export default LinkTab;
