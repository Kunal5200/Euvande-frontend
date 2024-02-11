import { getSellerPendingCars } from "@/api/apiCalling/listingApi";
import React, { useEffect, useState } from "react";
import PendingCar from "./pendingCarCard";
import Loading from "react-loading";
import { useRouter } from "next/router";
import CarGridCard from "./carGridCard";
import { Grid } from "@mui/material";

const CarsForSell = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const handleRoute = (carId) => {
    router.push(`/cars/${carId}/car-details`);
  };
  useEffect(() => {
    getSellerPendingCars({ setData, setLoading });
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
        <PendingCar
          data={data}
          loading={loading}
          handleRoute={handleRoute}
          setData={setData}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default CarsForSell;
