import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  IconButton,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import whiteLogo from "@/logo/EUVandeLogoWhite.svg";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import ForgotPassword from "@/assests/modalcalling/forgot-password";
import MobileSignUp from "@/components/mobile-signup";
import MobileLogin from "@/components/mobile-login";

const loginWhiteTextField = {
  mb: 5,
  "& label.Mui-focused": {
    color: "#ffffff",
  },
  "& label": {
    fontSize: "15px",
    color: "#ffffff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #ffffff",
      color: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#ffffff",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #ffffff",
    },
  },
  "& .MuiInputBase-input": {
    color: "#ffffff",
  },
  "& .Mui-error": {
    "& fieldset": {
      border: "1px solid #d32f2f",
    },
    "&:hover fieldset": {
      border: "1px solid #d32f2f",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #d32f2f",
    },
    "& label.Mui-focused": {
      color: "#d32f2f",
    },
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "#d32f2f",
  },
};

const LoginAccount = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const forgotPassword = () => {
    dispatch(showModal(<ForgotPassword />));
  };
  return (
    <div>
      <Box sx={{ backgroundColor: "#000", height: "100vh" }}>
        <MobileLogin />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            height: 100,
            backgroundColor: "#403f3f",
            width: "100%",
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            display: "flex",
            alignItems: "center",
            p: 2,
            justifyContent: "space-around",
          }}
        >
          <Typography color={"#fff"}>Don't have an account</Typography>
          <Button
            sx={{
              border: "1px solid #fff",
              color: "#000",
              backgroundColor: "#fff",
              width: 100,
              borderRadius: 20,
            }}
            onClick={() => setOpen(true)}
          >
            Sign Up
          </Button>
        </Box>
        <Drawer
          open={open}
          anchor="bottom"
          onClose={() => setOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: "100%",
              backgroundColor: "#000",
              height: 1000,
            },
          }}
        >
          <Box sx={{ mt: 3 }}>
            <MobileSignUp onClick={() => setOpen(false)} />
          </Box>
        </Drawer>
      </Box>
    </div>
  );
};

export default LoginAccount;
