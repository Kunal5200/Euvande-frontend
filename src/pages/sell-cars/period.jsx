import data from "@/assests/data";
import LinkTab from "@/components/linktab";
import { loginTextField } from "@/utils/styles";
import { Search } from "@mui/icons-material";
import {
  Card,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import styles from "@/styles/tabs.module.css";
import { useRouter } from "next/router";
const Period = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(false);
  const [year, setYear] = useState("");
  const handleSelect = (year) => {
    setSelected(true);
    setYear(year);
    localStorage.setItem("year", year);
    router.push("/sell-cars/model");
  };
  return (
    <>
      <Head>
        <title>Select period Of time</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-sm-8 m-auto">
            <LinkTab />

            <Card className="p-3">
              <h5 className="mb-3">Select the registration year</h5>
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
                label="Search Year"
                className="mb-3"
              />
              <Grid container spacing={2}>
                {data.Year.map((val, i) => (
                  <Grid item xs={4} key={i}>
                    <Card
                      className={`p-2 pointer ${
                        val.year === year && selected
                          ? styles.year_Selector
                          : ""
                      }`}
                      onClick={() => handleSelect(val.year)}
                    >
                      {val.year}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Period;
