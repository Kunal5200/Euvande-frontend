import Button from "@/components/button";
import { Divider, Stack, Typography } from "@mui/material";
import React from "react";

const DeleteAddress = () => {
  return (
    <div>
      <Typography variant="h6">Delete Address ?</Typography>
      <Divider style={{ backgroundColor: "#000" }} />
      <p className="my-2">
        Are you sure want to delete this address?
      </p>
      <Stack
        direction={"row"}
        spacing={2}
        justifyContent={"space-between"}
        className="mt-3"
      >
        <Button className="custom_btn" width={150}>
          <span>Delete</span>
          <span>Delete</span>
        </Button>
        <Button
          className="custom_btn_white"
          backgroundColor="#000"
          color="#ffffff"
          width={150}
        >
          <span>Cancel</span>
          <span>Cancel</span>
        </Button>
      </Stack>
    </div>
  );
};

export default DeleteAddress;
