import { Box, Card, Divider, Skeleton, Typography } from "@mui/material";
import React from "react";

const AddCarDetails = ({ data, loading }) => {
  console.log("first", data);

  const details = [
    {
      label: "Make",
      value: (data && data.make && data.make.makeName) || "Not Disclosed",
    },
    {
      label: "Period",
      value: (data && data.period && data.period.year) || "Not Disclosed",
    },
    {
      label: "Model",
      value: (data && data.model && data.model.modelName) || "Not Disclosed",
    },
    {
      label: "Variant",
      value:
        (data && data.variant && data.variant.variantName) || "Not Disclosed",
    },
    {
      label: "Fuel Type",
      value: (data && data.variant && data.variant.fuelType) || "Not Disclosed",
    },
    {
      label: "Ownership",
      value: (data && data.ownership) || "Not Disclosed",
    },

    {
      label: "Odometer",
      value: (data && data.odometer) || "Not Disclosed",
    },
    {
      label: "Location",
      value: (data && data.location && data.location.city) || "Not Disclosed",
    },
  ];
  return (
    <Box>
      {loading ? (
        <Skeleton variant="rectangular" />
      ) : (
        <Card sx={{ p: 2 }}>
          <Divider sx={{ fontSize: 13, fontWeight: 600 }}>Car Details</Divider>
          {details.map((val, i) => (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1,
                }}
                key={i}
              >
                <Typography fontSize={12}>{val.label}</Typography>
                <Typography fontSize={12}>{val.value}</Typography>
              </Box>
              <Divider sx={{ backgroundColor: "#000" }} />
            </>
          ))}
        </Card>
      )}
    </Box>
  );
};

export default AddCarDetails;
