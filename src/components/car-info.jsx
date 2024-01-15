import { CalendarMonth, LocalGasStation } from "@mui/icons-material";
import { Box, Card, Skeleton, Stack, Typography } from "@mui/material";
import { GiGearStickPattern, GiRoad } from "react-icons/gi";

const CarInfo = ({ carData, loading }) => {
  console.log("first", carData);
  return (
    <div>
      <Card>
        <Stack direction={"row"} spacing={1} className="text-white">
          {loading ? (
            <Skeleton
              variant="rectangular"
              width={200}
              height={200}
              animation="wave"
            />
          ) : (
            <img src={carData.media.images.frontView} width={200} />
          )}
          <Box p={2}>
            {loading ? (
              <Skeleton variant="text" width={200} />
            ) : (
              <Typography
                variant="h1"
                fontSize={20}
                letterSpacing={1}
                fontWeight={600}
                color={"#000"}
                textAlign={"start"}
              >
                {carData.make.makeName} - {carData.model.modelName}
              </Typography>
            )}
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              spacing={2}
              marginTop={1}
            >
              <Box display={"flex"} color={"#000"} alignItems={"center"}>
                <CalendarMonth sx={{ marginRight: 1, fontSize: 12 }} />
                <Typography fontSize={12}>{carData.period.year}</Typography>
              </Box>
              <Box display={"flex"} color={"#000"} alignItems={"center"}>
                <GiRoad style={{ marginRight: "3px" }} size={12} />
                <Typography fontSize={12}>{carData.odometer}</Typography>
              </Box>
              <Box display={"flex"} color={"#000"} alignItems={"center"}>
                <GiGearStickPattern style={{ marginRight: "3px" }} size={12} />
                <Typography fontSize={12}>
                  {carData.specification.transmission}
                </Typography>
              </Box>
              <Box display={"flex"} color={"#000"} alignItems={"center"}>
                <LocalGasStation sx={{ marginRight: 1, fontSize: 12 }} />
                <Typography fontSize={12}>
                  {carData.variant.fuelType}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Card>
    </div>
  );
};

export default CarInfo;
