import LoginForm from "@/components/loginForm";
import Signup from "@/components/signupForm";
import styles from "@/styles/Login.module.css";
import { animated, useSpring } from "@react-spring/web";
import signupImage from "@/banner_image/carsignup.jpg";
import Head from "next/head";
import { useState } from "react";
import { Card, Grid, Typography } from "@mui/material";
import { Login } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import ForgotPassword from "@/assests/modalcalling/forgot-password";
const RegisterLogin = () => {
  const [position, setPosition] = useState(0);
  const [viaOTP, setViaOtp] = useState(false);
  const [springs, api] = useSpring(() => ({
    from: { x: position },
  }));
  const dispatch = useDispatch();

  const forgotPassword = () => {
    dispatch(showModal(<ForgotPassword />));
  };

  const router = useRouter();
  const handleClick = () => {
    // const targetPosition = position === 0 ? 380 : 0;
    // api.start({
    //   from: { x: position },
    //   to: { x: targetPosition },
    // });
    // setPosition(targetPosition);
    router.push("/signup");
  };

  const [otpShow, setOtpShow] = useState(false);

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.bg_image}>
        <Grid container alignItems={"center"}>
          <Grid item xs={5}></Grid>
          <Grid item xs={7}>
            <Grid container>
              <Grid item xs="7" className="m-auto">
                <Card className={`p-2  pb-5 ${styles.loginForm}`}>
                  <LoginForm />
                  <Grid container spacing={6}>
                    <Grid item xs={6}>
                      <p className="f-12 px-3">
                        New User?{" "}
                        <span
                          className={styles.registerButton}
                          onClick={handleClick}
                        >
                          Register Yourself{" "}
                        </span>
                      </p>
                    </Grid>
                    <Grid item xs={6} textAlign={"end"}>
                      <Typography
                        fontSize={"12px"}
                        paddingRight={2}
                        fontWeight={500}
                        className="pointer text-decoration-underline"
                        onClick={forgotPassword}
                      >
                        Forgot Password?
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default RegisterLogin;
