import data from "@/assests/data";
import LinkTab from "@/components/linktab";
import TabPanel from "@/components/tabPanel";
import { varianttabButton } from "@/utils/styles";
import { Card, Grid, Tab, Tabs } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/tabs.module.css";
const Variant = () => {
  const [value, setValue] = useState(0);
  const handleChange = (e, newvalue) => {
    setValue(newvalue);
  };
  const [variant, setVariant] = useState("");
  const router = useRouter();
  const handleClick = (variant) => {
    setVariant(variant);
    router.push("/sell-cars/ownership");
  };

  const tabs = [
    {
      name: "petrol variant",
    },
    {
      name: "diesel variant",
    },
  ];
  return (
    <>
      <Head>
        <title>Variant</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-sm-8 m-auto">
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
                  <Tab label={val.name} key={i} sx={varianttabButton} />
                ))}
              </Tabs>
              <TabPanel value={value} index={0} className="mt-3 p-2">
                <h6>Petrol Variants</h6>
                <Grid container spacing={3}>
                  {data.carVariant.map((val, i) => (
                    <Grid item xs={3} key={i}>
                      <Card
                        className={`p-2 pointer ${
                          val.variant === variant && styles.year_selector
                        }`}
                        onClick={() => handleClick(val.variant)}
                      >
                        {val.variant}
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1} className="mt-3 p-2">
                <h6>Diesel Variants</h6>
                <Grid container spacing={3}>
                  {data.carVariant.map((val, i) => (
                    <Grid item xs={3} key={i}>
                      <Card
                        className={`p-2 pointer ${
                          val.variant === variant && styles.year_selector
                        }`}
                        onClick={() => handleClick(val.variant)}
                      >
                        {val.variant}
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Variant;
