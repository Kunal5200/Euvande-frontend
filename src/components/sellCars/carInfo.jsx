import {
  Box,
  Card,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Dot from "../dot";

const CarInfo = ({ data, loading }) => {
  console.log(data);
  const specification = [
    {
      value: data && data.vin,
    },
    {
      value: data && data.period && data.period.year,
    },
    data &&
      data.odometer && {
        value: `${data && data.odometer} km`,
      },
    {
      value: data && data.variant && data.variant.fuelType,
    },
    {
      value: data && data.specification && data.specification.transmission,
    },
  ];
  return (
    <div>
      <Stack direction={"row"} alignItems={"center"} my={3} spacing={4}>
        {loading ? (
          <Skeleton variant="rectangular" width={100} height={100} />
        ) : (
          <Card
            sx={{
              width: 100,
              height: 100,
              p: 0.2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={data && data.make && data.make.logo}
              width={"100%"}
              style={{ padding: 2 }}
            />
          </Card>
        )}
        {loading ? (
          <Skeleton variant="text" />
        ) : (
          <Box>
            <Typography
              fontSize={30}
              letterSpacing={2}
              textTransform={"uppercase"}
              fontWeight={550}
            >
              {data && data.period && data.period.year}{" "}
              {data && data.make && data.make.makeName}{" "}
              {data && data.model && data.model.modelName}
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              {specification.map((val, i) => (
                <>
                  <Typography fontSize={12}>{val && val.value}</Typography>
                  {i !== specification.length - 1 && (
                    <Dot bgColor={"#000"} width={3} height={3} />
                  )}
                </>
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </div>
  );
};

export default CarInfo;
