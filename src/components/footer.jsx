import whitelogo from "@/logo/EuVandeLogoBlack.svg";
import styles from "@/styles/footer.module.css";
import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import List from "./list";
import data from "@/assests/data";
const Footer = () => {
  return (
    <Box className={`${styles.footer_bg}`} paddingY={10}>
      <div className="container ">
        <Grid container spacing={6}>
          <Grid item xs={12} lg={4}>
            <img src={whitelogo.src} width={150} />
            <Typography fontSize={12} marginY={3} textAlign={"justify"}>
              EUVande takes the thrill of luxury car ownership to new heights,
              offering an unparalleled platform where enthusiasts can seamlessly
              buy, sell, and even participate in exciting auctions for the most
              coveted vehicles.
            </Typography>
            {/* <p className="mb-0 mt-3">Euvande 2023. All Rights Reserved</p> */}

            <Stack direction="row" className="mt-3" spacing={2}>
              <FaYoutube size={20} />
              <FaLinkedin size={20} />
              <FaFacebookSquare size={20} />
              <FaInstagramSquare size={20} />
            </Stack>
          </Grid>
          <Grid item xs={6} lg={2}>
            <List heading="Euvande" data={data.list1} />
          </Grid>
          <Grid item xs={6} lg={2}>
            <List heading="Services" data={data.list2} />
          </Grid>
          <Grid item xs={6} lg={2}>
            <List heading="For Dealers" data={data.list3} />
          </Grid>
          <Grid item xs={6} lg={2}>
            <List heading="Company" data={data.list4} />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Footer;
