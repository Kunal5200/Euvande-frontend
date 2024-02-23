import data from "@/assests/data";
import LinkTab from "@/components/linktab";
import TabPanel from "@/components/tabPanel";
import { varianttabButton } from "@/utils/styles";
import { Card, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/tabs.module.css";
import { vehicleController } from "@/api/addVehicle";
import { useDispatch, useSelector } from "react-redux";
import { addCar, getCarDetails, getCarInfo } from "@/api/apiCalling/vehicle";
import AddCarDetails from "@/components/carDetails";
const Variant = () => {
  const [value, setValue] = useState(0);
  const [fuel, setFuel] = useState([]);
  const [variant, setVariant] = useState("");
  const [variantType, setVariantType] = useState("Petrol");
  const router = useRouter();
  const dispatch = useDispatch();
  const carInfo = useSelector((state) => state.CarInfo);
  const handleClick = (variant) => {
    setVariant(variant);
    let body = {
      id: carInfo.id,
      variantId: variant,
    };
    addCar({ body, router, path: "/sell-cars/ownership", dispatch });
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
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const carId = localStorage.getItem("carId");
      if (carId) {
        await getCarInfo({ data: carId, dispatch });
        getCarDetails({ carId, setCarData, setLoading });
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
      <Container sx={{ my: 5 }}>
        <Grid container spacing={4}>
          <Grid item lg={8}>
            <LinkTab />
            <Card className="p-3">
              <h5 className="mb-3">Select Variant</h5>
              <Tabs
                onChange={handleChange}
                value={value}
                sx={{
                  border: "1px solid #000",
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  padding: 1,
                }}
              >
                {data.variantTypes.map((val, i) => (
                  <Tab
                    label={val.label}
                    id={val.id}
                    key={i}
                    sx={{
                      color: "#000",
                      width: 100,
                      "&.Mui-selected": {
                        color: "#fff",
                        // border: "#000",
                        backgroundColor: "#000",
                        borderRadius: 8,
                        width: 100,
                      },
                      "&:hover": {
                        color: "#fff",
                        backgroundColor: "#000",
                        borderRadius: 8,
                        width: 100,
                      },
                    }}
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
                            onClick={() => handleClick(val.id)}
                            sx={{
                              p: 1,
                              border:
                                carInfo.variant === val.id
                                  ? "1px solid #000"
                                  : "1px solid #eee",
                              color:
                                carInfo.variant === val.id ? "#fff" : "#000",
                              cursor: "pointer",
                              "&:hover": {
                                color: "#fff",
                                backgroundColor: "#000",
                                border: "1px solid #000",
                              },
                              mt: 1,
                              backgroundColor:
                                carInfo.variant === val.id ? "#000" : "#fff",
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
          </Grid>
          <Grid item lg={4}>
            {carData && <AddCarDetails data={carData} loading={loading} />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Variant;
