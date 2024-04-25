import { getCars } from "@/api/apiCalling/listingApi";
import { Button, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const DriveType4WD = ({
  specification,
  setCarData,
  setLoading,
  setFilters,
  filters,
  page,
  pageSize,
}) => {
  const user = useSelector((state) => state.userInfo);
  const driveTypeChangeHandler = (val) => {
    setLoading(true);
    setFilters({ ...filters, driveType4WD: val });
    let body = user
      ? {
          userId: user.id,
          driveType4Wd: val,
        }
      : {
          driveType4WD: val,
        };
    getCars({ loading: setLoading, setCarData, body, page, pageSize });
  };

  return (
    <div>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        {specification &&
          specification.driveType4WD.map((val) => (
            <Button
              sx={{
                border: "1px solid #000",
                backgroundColor: filters.driveType4WD === val ? "#000" : "#fff",
                color: filters.driveType4WD === val ? "#fff" : "#000",
                ":hover": {
                  backgroundColor:
                    filters.driveType4WD === val ? "#000" : "#fff",
                  color: filters.driveType4WD === val ? "#fff" : "#000",
                },
                fontSize: 13,
              }}
              onClick={() => driveTypeChangeHandler(val)}
            >
              {val}
            </Button>
          ))}
      </Stack>
    </div>
  );
};

export default DriveType4WD;
