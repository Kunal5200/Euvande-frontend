import data from "@/assests/data";
import AddressCard from "./addressCard";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import AddAddress from "@/assests/modalcalling/address/addAddress";

const Address = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (data.address.length) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [data.address]);
  const dispatch = useDispatch();
  const openAddAddressModal = () => {
    dispatch(showModal(<AddAddress />));
  };
  return (
    <div>
      {show ? (
        <AddressCard data={data.address} />
      ) : (
        <Typography
          color={"blue"}
          fontSize={12}
          className="pointer"
          onClick={openAddAddressModal}
        >
          + Add Address
        </Typography>
      )}
    </div>
  );
};

export default Address;
