import { loginTextField } from "@/utils/styles";
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
  });

  return (
    <div>
      <Head>
        <title>Change Password</title>
      </Head>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
          Change Password
        </Typography>
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
              sx={loginTextField}
              fullWidth
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
            />
          </Grid>
        </Grid>
        <Grid container mb={4}>
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
            />
          </Grid>
        </Grid>
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
        >
          Save Changes
        </Button>
      </Container>
    </div>
  );
};

export default ChangePassword;
