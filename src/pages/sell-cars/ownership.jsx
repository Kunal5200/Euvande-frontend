import data from "@/assests/data";
import LinkTab from "@/components/linktab";
import { Card, Stack } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/tabs.module.css";
const Ownership = () => {
  const [ownership, setOwnership] = useState("");
  const router = useRouter();
  const handleClick = (ownerShip) => {
    setOwnership(ownerShip);
    router.push("/sell-cars/odometer");
    localStorage.setItem("ownership", ownerShip);
  };
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
                    className={`p-2 pointer ${
                      val.ownership === ownership ? styles.year_Selector : ""
                    }`}
                    onClick={() => handleClick(val.ownership)}
                  >
                    {val.ownership}
                  </Card>
                ))}
              </Stack>
            </Card>
          </div>
          <div className="col-sm-3">
            <Card>hello</Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ownership;
