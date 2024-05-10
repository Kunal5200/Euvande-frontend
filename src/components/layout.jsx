import React, { useEffect, useState } from "react";
import Navbar from "./header";
import Footer from "./footer";
import Subheader from "./subHeader";
import { useRouter } from "next/router";
import Header from "./header2";
import { Box, Divider, IconButton } from "@mui/material";
import SubFooter from "./subFooter";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ArrowUpward } from "@mui/icons-material";

const Layout = ({ children }) => {
  const [show, setShow] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const pathName = router.pathname;

    if (
      pathName === "/login" ||
      pathName === "/thankyou" ||
      pathName === "/login-account"
    ) {
      setShow(false);
    } else {
      setShow(true);
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router.pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {show ? <Subheader /> : <></>}
      {/* {show ? <Navbar /> : <></>} */}
      {show && <Header />}
      {children}
      <Box sx={{ backgroundColor: "#000" }}>
        {show && <Footer />}
        {show && <Divider sx={{ backgroundColor: "#fff" }} />}
        {show && <SubFooter />}
      </Box>
      {showScroll && (
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "#222",
            color: "#fff",
            ":hover": {
              backgroundColor: "#222",
            },
          }}
        >
          <ArrowUpward />
        </IconButton>
      )}
    </div>
  );
};

export default Layout;
