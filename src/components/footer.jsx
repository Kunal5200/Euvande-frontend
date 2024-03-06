import whitelogo from "@/logo/EUVandeLogoWhite.svg";
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
    <Box
      sx={{ borderTop: "1px solid #eee", mt: 4, backgroundColor: "#000" }}
      paddingY={10}
    >
      <div className="container" style={{ maxWidth: 1250, padding: 0 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <img src={whitelogo.src} width={150} />
            <Typography
              fontSize={12}
              marginY={3}
              textAlign={"justify"}
              color="#fff"
            >
              EuVande takes the thrill of luxury car ownership to new heights,
              offering an unparalleled platform where enthusiasts can seamlessly
              buy, sell, and even participate in exciting auctions for the most
              coveted vehicles.
            </Typography>

            {/* <Stack direction="row" className="mt-3" spacing={2}>
              <FaYoutube size={20} />
              <FaLinkedin size={20} />
              <FaFacebookSquare size={20} />
              <FaInstagramSquare size={20} />
            </Stack> */}
          </Grid>
          <Grid item xs={6} lg={2}>
            <List heading="EuVande" data={data.list1} />
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
