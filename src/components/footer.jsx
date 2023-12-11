import whitelogo from "@/logo/logowhiteeuvande.png";
import styles from "@/styles/footer.module.css";
import { Grid, Stack } from "@mui/material";
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
    <div className={`${styles.footer_bg} p-5`}>
      <div className="container ">
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <img src={whitelogo.src} width={80} />

            <p className="mb-0 mt-3">Euvande 2023. All Rights Reserved</p>

            <Stack direction="row" className="mt-3" spacing={2}>
              <FaYoutube size={20} />
              <FaLinkedin size={20} />
              <FaFacebookSquare size={20} />
              <FaInstagramSquare size={20} />
            </Stack>
          </Grid>
          <Grid item xs={2}>
            {/* <h5>EuVande</h5> */}

            <List heading="Euvande" data={data.list1} />
          </Grid>
          <Grid item xs={2}>
            <List heading="Services" data={data.list2} />
          </Grid>
          <Grid item xs={2}>
            <List heading="For Dealers" data={data.list3} />
          </Grid>
          <Grid item xs={2}>
            <List heading="Company" data={data.list4} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
