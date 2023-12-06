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



  const [disbaledtab, setDisabledTab] = useState(true);
useEffect(()=>{
    if(selected === ""){
        setDisabledTab(true)
    }
    else{
        setDisabledTab(false)
    }
},[selected])
  return (
    <>
      <Head>
        <title>Select bar brand to estimate car selling price</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-sm-8 m-auto">
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

              <div
                className="row "
                style={{ height: "500px", overflowY: "scroll" }}
              >
                {data.brandsSelector.map((val, i) => (
                  <div className="col-sm-2 mb-3" key={i}>
                    <Brands
                      img={val.logo}
                      key={i}
                      brands={val.name}
                      onClick={() => brandSelectHandler(val.name)}
                      className={
                        val.name === brand && selected
                          ? styles.brandsSelected
                          : ""
                      }
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Make;
