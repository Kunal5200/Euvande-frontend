import { getCars } from "@/api/apiCalling/listingApi";
import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const TransmissionFilter = ({
  specification,
  filters,
  setFilters,
  setCarData,
  setLoading,
  page,
  pageSize,
}) => {
  const user = useSelector((state) => state.userInfo);
  const transmissionHandler = (value) => {
    setLoading(true);
    setFilters({ ...filters, transmission: value });
    let body = user
      ? {
          transmission: value,
          userId: user.id,
        }
      : {
          transmission: value,
        };
    getCars({ loading: setLoading, setCarData, body, page, pageSize });
  };

  return (
    <div>
      {specification.map((val, i) => (
        <Button
          key={i}
          sx={{
            color: filters.transmission === val ? "#fff" : "#000",
            backgroundColor: filters.transmission === val ? "#000" : "#fff",
            border: "1px solid #000",
            mx: 1,
            mb: 2,
            ":hover": {
              color: filters.transmission === val ? "#fff" : "#000",
              backgroundColor: filters.transmission === val ? "#000" : "#fff",
            },
            fontSize: 13,
          }}
          onClick={() => transmissionHandler(val)}
        >
          {val}
        </Button>
      ))}
    </div>
  );
};

export default TransmissionFilter;
