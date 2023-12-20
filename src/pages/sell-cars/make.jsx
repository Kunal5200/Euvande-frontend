import data from "@/assests/data";
import Brands from "@/components/brands";
import LinkTab from "@/components/linktab";
import { loginTextField } from "@/utils/styles";
import { Search } from "@mui/icons-material";
import { Card, IconButton, InputAdornment, TextField } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/tabs.module.css";
import { useRouter } from "next/router";
import { vehicleController } from "@/api/addVehicle";
const Make = () => {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [selected, setSelected] = useState(false);
  const brandSelectHandler = (brandName) => {
    setBrand(brandName);
    setSelected(true);
    localStorage.setItem("brand", brandName);
    router.push("/sell-cars/period");
  };
  const [brandSelector, setBrandSelector] = useState([]);

  const getMake = () => {
    vehicleController
      .getMake()
      .then((res) => {
        setBrandSelector(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [disbaledtab, setDisabledTab] = useState(true);
  useEffect(() => {
    if (selected === "") {
      setDisabledTab(true);
    } else {
      setDisabledTab(false);
    }
    getMake();
  }, [selected]);
  return (
    <>
      <Head>
        <title>Select bar brand to estimate car selling price</title>
      </Head>
      <div className="container my-5">
        <div className="row">
          <div className="col-sm-9 ">
            <LinkTab disabled={disbaledtab} brandSelected={!brand} />
            <Card className="p-5">
              <h4 className="mb-3">Select Your Car Brand</h4>

              <TextField
                fullWidth
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={loginTextField}
                label="Search Your Brand"
                className="mb-3"
              />
              <div className={styles.overflow_wrapper}>
                <div className="row ">
                  {brandSelector.map((val, i) => (
                    <div className="col-sm-2 mb-3 text-center" key={i}>
                      <Brands
                        img={val.logo}
                        key={i}
                        brands={val.makeName}
                        onClick={() => brandSelectHandler(val.id)}
                        className={
                          val.name === brand && selected
                            ? styles.brandsSelected
                            : ""
                        }
                        width={100}
                        height={100}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
          <div className="col-sm-3">
            <Card>Helloo</Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Make;
