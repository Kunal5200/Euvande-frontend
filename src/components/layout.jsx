import React from "react";
import Navbar from "./header";
import Footer from "./footer";
import Subheader from "./subHeader";

const Layout = ({ children }) => {
  return (
    <div>
      <Subheader />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
