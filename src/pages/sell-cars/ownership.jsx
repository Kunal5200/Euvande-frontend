import data from "@/assests/data";
import LinkTab from "@/components/linktab";
import { Card, Stack } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/tabs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addCar, getCarInfo } from "@/api/apiCalling/vehicle";
const Ownership = () => {
  const [ownership, setOwnership] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const carInfo = useSelector((state) => state.CarInfo);
  const handleClick = (ownerShip) => {
    setOwnership(ownerShip);
    let body = {
      id: carInfo.id,
      ownership: ownerShip,
    };
    addCar({ body, router, path: "/sell-cars/odometer", dispatch });
  };

  useEffect(() => {
    const fetchData = async () => {
      const carId = parseInt(localStorage.getItem("carId"));
      if (carId) {
        await getCarInfo({ data: carId, dispatch });
      } else {
        return () => {};
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Head>
        <title>Ownership</title>
      </Head>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-9 ">
            <LinkTab />
            <Card className="p-3">
              <h5>Select Car Ownership</h5>
              <Stack spacing={3}>
                {data.carOwnerShip.map((val, i) => (
                  <Card
                    key={i}
                    className={`p-2 pointer `}
                    onClick={() => handleClick(val.ownership)}
                    sx={{
                      "&:hover": {
                        boxShadow: "0px 10px 15px -7px ",
                      },
                      mt: 1,
                    }}
                  >
                    {val.ownership}
                  </Card>
                ))}
              </Stack>
            </Card>
          </div>
          <div className="col-sm-3">
            <Card sx={{ height: 500 }}>Bar Show</Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ownership;
