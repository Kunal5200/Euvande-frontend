import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  FormControlLabel,
  Radio,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import AddAddress from "@/assests/modalcalling/address/addAddress";
import EditAddress from "@/assests/modalcalling/address/editAddress";
import DeleteAddress from "@/assests/modalcalling/address/deleteAddress";

const AddressCard = (props) => {
  const [selectedAddress, setSelectedAddress] = useState(
    props.data.length > 0 ? props.data[0].addressType : null
  );

  const handleRadioChange = (addressType) => {
    setSelectedAddress(addressType);
  };
  const dispatch = useDispatch();
  const openAddressModal = () => {
    dispatch(showModal(<AddAddress getAddress={props.getAddress} />));
  };

  const editAddressModalOpen = (val) => {
    dispatch(showModal(<EditAddress value={val} />));
  };

  return (
    <div>
      {props.data.map((val, i) => (
        <Card className="p-3 mb-2" key={i}>
          <FormControlLabel
            control={
              <Radio
                checked={val.addressType === selectedAddress}
                onChange={() => handleRadioChange(val.addressType)}
              />
            }
            value={val.addressType}
            label="Make Default"
            style={{ fontSize: "12px" }}
          />
          <Box paddingLeft={4}>
            <Typography
              variant="body1"
              fontSize={15}
              textTransform={"capitalize"}
            >
              {val.addressType}
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Typography fontSize={13} marginTop={1}>
                {val.street},
              </Typography>
              <Typography fontSize={13} marginTop={1}>
                {val.houseNo},
              </Typography>
              <Typography fontSize={13} marginTop={1}>
                {val.city},
              </Typography>
              <Typography fontSize={13} marginTop={1}>
                {val.country},
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={2} marginTop={2}>
              <Typography
                fontSize={12}
                marginTop={1}
                borderBottom="1px dashed #000"
                width="fit-content"
                className="pointer"
                onClick={() => editAddressModalOpen(val)}
              >
                Edit Address
              </Typography>
              {val.addressType === selectedAddress ? (
                <></>
              ) : (
                <Typography
                  fontSize={12}
                  marginTop={1}
                  borderBottom="1px dashed #000"
                  width="fit-content"
                  className="pointer"
                  onClick={() => props.onDelete(val)}
                >
                  Delete Address
                </Typography>
              )}
            </Stack>
          </Box>
        </Card>
      ))}
      <Typography
        color={"blue"}
        fontSize={12}
        className="pointer"
        onClick={openAddressModal}
      >
        + Add New Address
      </Typography>
    </div>
  );
};

export default AddressCard;
