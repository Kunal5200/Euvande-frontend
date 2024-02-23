import React, { useEffect, useState } from "react";
import Navbar from "./header";
import Footer from "./footer";
import Subheader from "./subHeader";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const pathName = router.pathname;

    if (pathName === "/login") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [router.pathname]);
  return (
    <div>
      {/* {show ? <Subheader /> : <></>} */}
      {show ? <Navbar /> : <></>}
      {children}
      {show ? <Footer /> : <></>}
    </div>
  );
};

export default Layout;
