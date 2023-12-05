import data from "@/assests/data";
import LinkTab from "@/components/linktab";
import { Card, Grid } from "@mui/material";
import Head from "next/head";
const Period = () => {
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

              <Grid container>
                {data.Year.map((val, i) => (
                  <Grid item xs={3}></Grid>
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
