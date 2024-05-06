import { authControllers } from "@/api/authentication";

import { hideModal } from "@/redux/reducers/modal";
import { Button, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const DeleteAddress = ({ value, getUserAddress }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const deleteAddress = (id) => {
    setLoading(true);
    authControllers
      .removeAddress(id)
      .then((res) => {
        toast.success(res.data.message);
        setLoading(false);
        dispatch(hideModal());
        getUserAddress();
      })
      .catch((err) => {
        let errMessage =
          err.message || err.response.data.message || "Network Error";
        toast.error(errMessage);
        setLoading(false);
      });
  };
  return (
    <div>
      <Typography variant="h6">Delete Address ?</Typography>
      <Divider style={{ backgroundColor: "#000" }} />
      <p className="my-2">Are you sure want to delete this address?</p>
      <Typography>
        <Grid container spacing={6}>
          <Grid item lg={6}>
            <Button
              fullWidth
              disabled={loading}
              onClick={() => deleteAddress(value.id)}
              sx={{ border: "1px solid #000" }}
            >
              Delete
            </Button>
          </Grid>
          <Grid item lg={6}>
            <Button
              fullWidth
              onClick={() => dispatch(hideModal())}
              sx={{ border: "1px solid #000" }}
            >
              cancel
            </Button>
          </Grid>
        </Grid>
      </Typography>
    </div>
  );
};

export default DeleteAddress;
