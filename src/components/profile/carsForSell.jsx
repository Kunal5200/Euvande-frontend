import { getSellerPendingCars } from "@/api/apiCalling/listingApi";
import React, { useEffect, useState } from "react";
import PendingCar from "./pendingCarCard";
import Loading from "react-loading";
import { useRouter } from "next/router";
import CarGridCard from "./carGridCard";
import { Box, Grid } from "@mui/material";
import { CarStatus } from "@/utils/enum";

const CarsForSell = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const handleRoute = (carId) => {
    router.push(`/cars/${carId}/car-details`);
  };
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    getSellerPendingCars({ status, page, pageSize, setData, setLoading });
  }, []);
  return (
    <div>
      {loading ? (
        <Loading
          type="bars"
          className="m-auto my-3"
          color="purple"
          width={30}
          height={30}
        />
      ) : (
        <Box>
          <PendingCar
            data={data && data.docs}
            loading={loading}
            handleRoute={handleRoute}
            setData={setData}
            setLoading={setLoading}
            page={page}
            pageSize={pageSize}
          />
        </Box>
      )}
    </div>
  );
};

export default CarsForSell;
