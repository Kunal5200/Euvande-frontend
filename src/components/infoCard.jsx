import { Card, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const InfoCard = ({ data, heading }) => {
  return (
    <div>
      <Card sx={{ mt: 2 }}>
        {heading && (
          <>
            <Typography fontSize={18} fontWeight={550} sx={{ p: 1 }}>
              {heading}
            </Typography>
            <Divider sx={{ backgroundColor: "#000" }} />
          </>
        )}
        {data.map((val, i) => (
          <React.Fragment key={i}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mb={1}
              p={1}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                {val.icon}
                <Typography fontSize={12}>{val.label}</Typography>
              </Stack>
              <Typography fontSize={12}>{val.value}</Typography>
            </Stack>
            {i !== data.length - 1 && (
              <Divider sx={{ backgroundColor: "#000" }} />
            )}
          </React.Fragment>
        ))}
      </Card>
    </div>
  );
};

export default InfoCard;
