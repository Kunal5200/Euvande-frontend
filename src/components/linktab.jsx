import Ownership from "@/pages/sell-cars/ownership";
import { tabButton } from "@/utils/styles";
import { Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

const LinkTab = (props) => {
  const router = useRouter();
  const [value, setvalue] = useState(0);
  const [disablePeriod, setDisablePeriod] = useState(true);
  const [disableModel, setDisableModel] = useState(true);
  const [disableVariant, setDisableVariant] = useState(true);
  const [disableOwnership, setDisableOwnerShip] = useState(true);
  const [disableOdometer, setDisableOdometer] = useState(true);
  const [disableLocation, setDisableLocation] = useState(true);
  const [disableSpecifications, setDisableSpecifiations] = useState(true);
  const [disablecontact, setDisableContact] = useState(true);
  const tabData = [
    { label: "Make", route: "/sell-cars/make" },
    { label: "Period", route: "/sell-cars/period", disable: disablePeriod },
    { label: "Model", route: "/sell-cars/model", disable: disableModel },
    { label: "Variant", route: "/sell-cars/variant", disable: disableVariant },
    {
      label: "Ownership",
      route: "/sell-cars/ownership",
      disable: disableOwnership,
    },
    {
      label: "Odometer",
      route: "/sell-cars/odometer",
      disable: disableOdometer,
    },
    {
      label: "Location",
      route: "/sell-cars/location",
      disable: disableLocation,
    },
    {
      label: "Specifications",
      route: "/sell-cars/specifications",
      disable: disableSpecifications,
    },
    {
      label: "Contact Information",
      route: "/sell-cars/contact-information",
      disable: disablecontact,
    },
    { label: "Photos", route: "/sell-cars/upload-picture" },
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

  useEffect(() => {
    const make = localStorage.getItem("brand");
    const period = localStorage.getItem("year");
    const model = localStorage.getItem("model");
    const variant = localStorage.getItem("variant");
    const ownerShip = localStorage.getItem("ownership");
    const odometer = localStorage.getItem("driven");
    const location = localStorage.getItem("location");
    const specifications = localStorage.getItem("specifications");

    if (make) {
      setDisablePeriod(false);
    }
    if (period) {
      setDisableModel(false);
    }
    if (model) {
      setDisableVariant(false);
    }
    if (variant) {
      setDisableOwnerShip(false);
    }
    if (ownerShip) {
      setDisableOdometer(false);
    }
    if (odometer) {
      setDisableLocation(false);
    }
    if (location) {
      setDisableSpecifiations(false);
    }
    if (specifications) {
      setDisableContact(false);
    }
  }, []);

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        scrollButtons="auto"
        sx={{
          border: "1px solid #ccc",
          borderRadius: "40px",
          padding: "8px",
          marginBottom: "20px",
        }}
      >
        {tabData.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            sx={tabButton}
            disabled={tab.disable}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default LinkTab;
