import { Box, Card, Skeleton, Stack, Typography } from "@mui/material";
import Dot from "./dot";

const CarInfo = ({ carData, loading }) => {
 
  return (
    <div>
      {/* <Stack direction={"row"} spacing={1} className="text-white">
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

            {loading ? (
              <Skeleton variant="reactngular" width={200} />
            ) : (
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
                  <GiGearStickPattern
                    style={{ marginRight: "3px" }}
                    size={12}
                  />
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
            )}
          </Box>
        </Stack> */}
      <Stack direction={"row"} alignItems={"center"} spacing={3}>
        {loading ? (
          <Skeleton variant="rectangular" width={100} height={100} />
        ) : (
          <Card sx={{ p: 2 }}>
            <img src={carData.make.logo} width={100} />
          </Card>
        )}
        {loading ? (
          <Skeleton variant="rectangular" width={200} />
        ) : (
          <Box>
            <Typography
              textAlign={"start"}
              fontSize={40}
              fontWeight={600}
              letterSpacing={2}
              textTransform={"capitalize"}
            >
              {carData.make.makeName} - {carData.model.modelName}
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Typography fontSize={12}>
                {carData.vin || "Not Disclosed"}
              </Typography>
              <Dot height={5} width={5} bgColor={"#fff"} />
              <Typography fontSize={12}>
                {(carData.period && carData.period.year) || "Not Disclosed"}
              </Typography>
              <Dot height={5} width={5} bgColor={"#fff"} />
              <Typography fontSize={12}>
                {(carData.variant && carData.variant.fuelType) ||
                  "Not Disclosed"}
              </Typography>
              <Dot height={5} width={5} bgColor={"#fff"} />
              <Typography fontSize={12}>
                {(carData.specification &&
                  carData.specification.transmission) ||
                  "Not Disclosed"}
              </Typography>
              <Dot height={5} width={5} bgColor={"#fff"} />
              <Typography fontSize={12}>
                {carData.odometer || "Not Disclosed"}
              </Typography>
              <Dot height={5} width={5} bgColor={"#fff"} />
              <Typography fontSize={12} textTransform={"capitalize"}>
                {(carData.specification && carData.specification.vehicleType) ||
                  "Not Disclosed"}
              </Typography>
              <Dot height={5} width={5} bgColor={"#fff"} />
              <Typography fontSize={12}>
                {(carData.variant && carData.variant.variantName) ||
                  "Not Disclosed"}
              </Typography>
            </Stack>
          </Box>
        )}
      </Stack>
    </div>
  );
};

export default CarInfo;
