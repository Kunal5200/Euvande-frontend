import React, { useEffect, useState } from "react";
import Navbar from "./header";
import Footer from "./footer";
import Subheader from "./subHeader";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const [show, setShow] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const pathName = router.pathname;

    if (pathName === "/") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [router.pathname]);
  return (
    <div>
      {/* {show ? <Subheader /> : <></>} */}
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
