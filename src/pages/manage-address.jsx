import { listingController } from "@/api/listing";
import AddressCard from "@/components/profile/addressCard";
import MobileAddressCard from "@/components/profile/mobileAddressCard";
import { Container } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Loading from "react-loading";
import { toast } from "react-toastify";

const ManageAddress = () => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserAddress = () => {
    listingController
      .getuserAddress()
      .then((res) => {
        setAddress(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        let errMessage =
          (err.response && err.response.data.message) || err.message;
        toast.error(errMessage);
      });
  };

  useEffect(() => {
    getUserAddress();
  }, []);
  return (
    <div>
      <Head>
        <title>Manage Address</title>
      </Head>
      <Container>
        {/* <AddressCard /> */}
        {loading ? (
          <Loading
            type="bars"
            color="#000"
            className="m-auto"
            width={20}
            height={20}
          />
        ) : (
          <MobileAddressCard data={address} getAddress={getUserAddress} />
        )}
      </Container>
    </div>
  );
};

export default ManageAddress;
