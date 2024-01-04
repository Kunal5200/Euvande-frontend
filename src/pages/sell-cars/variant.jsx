import data from "@/assests/data";
import LinkTab from "@/components/linktab";
import TabPanel from "@/components/tabPanel";
import { varianttabButton } from "@/utils/styles";
import { Card, Grid, Tab, Tabs } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/tabs.module.css";
import { vehicleController } from "@/api/addVehicle";
const Variant = () => {
  const [value, setValue] = useState(0);
  const [fuel, setFuel] = useState([]);
  const [variant, setVariant] = useState("");
  const [variantType, setVariantType] = useState("Petrol");
  const router = useRouter();
  const handleClick = (variant) => {
    setVariant(variant);
    router.push("/sell-cars/ownership");
    localStorage.setItem("variant", variant);
    localStorage.setItem("variantType", variantType);
  };

  const handleChange = (e, newvalue) => {
    setValue(newvalue);
    setVariantType(e.target.id);
    let body = {
      modelId: parseInt(localStorage.getItem("model")),
      fuelType: e.target.id,
    };
    getModel(body);
  };
  const tabs = [
    {
      name: "petrol variant",
      id: "Petrol",
    },
    {
      name: "diesel variant",
      id: "Diesel",
    },
  ];
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
    const model = localStorage.getItem("model");

    if (model) {
      let body = {
        modelId: parseInt(model),
        fuelType: variantType,
      };
      getModel(body);
    } else {
    }
  }, []);
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
                {tabs.map((val, i) => (
                  <Tab
                    label={val.name}
                    id={val.id}
                    key={i}
                    sx={varianttabButton}
                  />
                ))}
              </Tabs>
              <TabPanel value={value} index={0} className="mt-3 p-2">
                <h6>Petrol Variants</h6>
                <Grid container spacing={3}>
                  {fuel.map((val, i) => (
                    <Grid item xs={3} key={i}>
                      <Card
                        className={`p-2 pointer ${
                          val.variant === variant && styles.year_selector
                        }`}
                        onClick={() => handleClick(val.id)}
                      >
                        {val.variantName}
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1} className="mt-3 p-2">
                <h6>Diesel Variants</h6>
                <Grid container spacing={3}>
                  {fuel.map((val, i) => (
                    <Grid item xs={3} key={i}>
                      <Card
                        className={`p-2 pointer ${
                          val.id === variant && styles.year_selector
                        }`}
                        onClick={() => handleClick(val.id)}
                      >
                        {val.variantName}
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
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
