import data from "@/assests/data";
import LinkTab from "@/components/linktab";
import TabPanel from "@/components/tabPanel";
import { varianttabButton } from "@/utils/styles";
import { Card, Grid, Tab, Tabs, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/tabs.module.css";
import { vehicleController } from "@/api/addVehicle";
import { useDispatch, useSelector } from "react-redux";
import { addCar, getCarInfo } from "@/api/apiCalling/vehicle";
const Variant = () => {
  const [value, setValue] = useState(0);
  const [fuel, setFuel] = useState([]);
  const [variant, setVariant] = useState("");
  const [variantType, setVariantType] = useState("Petrol");
  const router = useRouter();
  const dispatch = useDispatch();
  const carInfo = useSelector((state) => state.CarInfo);
  console.log(carInfo);
  const handleClick = (variant) => {
    setVariant(variant);
    let body = {
      id: carInfo.id,
      variantId: variant,
    };
    addCar({ body, router, path: "/sell-cars/ownership", dispatch });
    // router.push("/sell-cars/ownership");
  };

  const handleChange = (e, newvalue) => {
    setValue(newvalue);
    setVariantType(e.target.id);
    let body = {
      modelId: carInfo.model,
      fuelType: e.target.id,
    };
    getModel(body);
  };
  // const tabs = [
  //   {
  //     name: "petrol variant",
  //     id: "Petrol",
  //   },
  //   {
  //     name: "diesel variant",
  //     id: "Diesel",
  //   },
  // ];
  const getModel = (body) => {
    vehicleController
      .getVariants(body)
      .then((res) => {
        setFuel(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        await getCarInfo({ data: carId, dispatch });
      } else {
        return () => {};
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchVariant = async () => {
      if (carInfo.id) {
        let body = {
          modelId: carInfo.model,
          fuelType: variantType,
        };
        await getModel(body);
      } else {
        return () => {};
      }
    };
    fetchVariant();
  }, [carInfo.id]);

  return (
    <>
      <Head>
        <title>Variant</title>
      </Head>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-9 ">
            <LinkTab />
            <Card className="p-3">
              <h5 className="mb-3">Select Variant</h5>
              <Tabs
                onChange={handleChange}
                value={value}
                sx={{
                  backgroundColor: "#000",
                  borderRadius: "40px",
                  padding: "8px",
                }}
              >
                {data.variantTypes.map((val, i) => (
                  <Tab
                    label={val.label}
                    id={val.id}
                    key={i}
                    sx={varianttabButton}
                  />
                ))}
              </Tabs>
              {data.variants.map((val, i) => (
                <TabPanel value={value} index={i} className="mt-3 p-2">
                  <h6>{val.label}</h6>
                  {fuel.length ? (
                    <Grid container spacing={3}>
                      {fuel.map((val, i) => (
                        <Grid item xs={3} key={i}>
                          <Card
                            className={`p-2 pointer  ${
                              val.variant === variant && styles.year_selector
                            }`}
                            onClick={() => handleClick(val.id)}
                            sx={{
                              mt: 1,
                              "&:hover": {
                                boxShadow: "0px 10px 15px -7px ",
                              },
                            }}
                          >
                            {val.variantName}
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography marginTop={2}>No Variants Found</Typography>
                  )}
                </TabPanel>
              ))}
            </Card>
          </div>
          <div className="col-sm-3">
            <Card>Hello</Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Variant;
