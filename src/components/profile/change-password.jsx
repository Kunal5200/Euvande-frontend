import { loginTextField } from "@/utils/styles";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import Button from "../button";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ChangePassword = () => {
  const [toggleOldPassword, setToggleOldPassword] = useState(false);
  const [toggleNewPassword, setToggleNewPassword] = useState(false);
  const inputChangeHandler = (e) => {};
  return (
    <div>
      <form>
        <Grid container spacing={2} marginBottom={2} marginTop={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              sx={loginTextField}
              label="Current Password*"
              type={toggleOldPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      onClick={() => setToggleOldPassword(!toggleOldPassword)}
                    >
                      {toggleOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type={toggleNewPassword ? "text" : "password"}
              sx={loginTextField}
              label="New Password*"
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      onClick={() => setToggleNewPassword(!toggleNewPassword)}
                    >
                      {toggleNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <div className="text-end">
          <Button
            className="custom_btn_white"
            backgroundColor="#000"
            color="#fff"
            width="150px"
          >
            <span>Submit</span>
            <span>Submit</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
