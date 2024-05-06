import { changePassword } from "@/api/apiCalling/authenticationApi";
import { loginTextField } from "@/utils/styles";
import { changePasswordValidation } from "@/utils/validation";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import React, { useState } from "react";
import Loading from "react-loading";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const handleTogglePasswordVisibility = (state, setState) => {
    setState(!state);
  };
  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
    // confirmPassword: "",
  });
  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
    // confirmPassword: "",
  });

  const passwordChamgeHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    // setError({
    //   ...error,
    //   [id]:
    //     id === "newPassword"
    //       ? isPasswordValid(value)
    //         ? ""
    //         : "Password must be 8 characters long, include at least one alphabet, one number, and one special character from !@#$%^&*."
    //       : "",
    // });
    setError({ ...error, [id]: "" });
  };
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    let body = {
      oldPassword: state.oldPassword,
      newPassword: state.newPassword,
    };
    if (changePasswordValidation({ state, setError, error })) {
      setLoading(true);
      changePassword({ body, setLoading });
    } else {
      toast.error("Please Enter Valid Password");
    }
  };

  return (
    <div>
      <Head>
        <title>Change Password</title>
      </Head>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
          Change Password
        </Typography>
        <form onSubmit={submitHandler}>
          <Grid container mb={4} mt={3}>
            <Grid item xs={12}>
              <TextField
                type={showPassword ? "text" : "password"}
                label="Current Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleTogglePasswordVisibility(
                            showPassword,
                            setShowPassword
                          )
                        }
                      >
                        {!showPassword ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOffOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(error.oldPassword)}
                helperText={error.oldPassword}
                sx={loginTextField}
                fullWidth
                id="oldPassword"
                onChange={passwordChamgeHandler}
              />
            </Grid>
          </Grid>
          <Grid container mb={4}>
            <Grid item xs={12}>
              <TextField
                type={showNewPassword ? "text" : "password"}
                label="New Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleTogglePasswordVisibility(
                            showNewPassword,
                            setShowNewPassword
                          )
                        }
                      >
                        {!showNewPassword ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOffOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={loginTextField}
                fullWidth
                onChange={passwordChamgeHandler}
                id="newPassword"
                error={Boolean(error.newPassword)}
                helperText={error.newPassword}
              />
            </Grid>
          </Grid>
          {/* <Grid container mb={4}>
            <Grid item xs={12}>
              <TextField
                type={confirmNewPassword ? "text" : "password"}
                label="Confirm New Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleTogglePasswordVisibility(
                            confirmNewPassword,
                            setShowConfirmNewPassword
                          )
                        }
                      >
                        {!confirmNewPassword ? (
                          <VisibilityOutlined />
                        ) : (
                          <VisibilityOffOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={loginTextField}
                fullWidth
                id="confirmPassword"
                onChange={passwordChamgeHandler}
                error={Boolean(error.confirmPassword)}
                helperText={error.confirmPassword}
              />
            </Grid>
          </Grid> */}
          <Button
            sx={{
              border: "1px solid #000",
              color: "#fff",
              backgroundColor: "#000",
              ":hover": {
                color: "#fff",
                backgroundColor: "#000",
              },
              p: 1.2,
            }}
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Loading
                type="bars"
                width={20}
                height={20}
                className="m-auto"
                color="#fff"
              />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default ChangePassword;
