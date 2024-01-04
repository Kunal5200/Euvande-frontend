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
import SignupForm from "@/components/signupForm";
const RegisterLogin = () => {
  const [position, setPosition] = useState(0);
  const [viaOTP, setViaOtp] = useState(false);
  const [springs, api] = useSpring(() => ({
    from: { x: position },
  }));

  const router = useRouter();
  const handleClick = () => {
    // const targetPosition = position === 0 ? 380 : 0;
    // api.start({
    //   from: { x: position },
    //   to: { x: targetPosition },
    // });
    // setPosition(targetPosition);
    router.push("/login");
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
                  <SignupForm />
                  <Grid container spacing={6}>
                    <Grid item xs={7}>
                      <Typography className="f-12 px-3" marginTop={1}>
                        Already have an Account?{" "}
                        <span
                          className={styles.registerButton}
                          onClick={handleClick}
                        >
                          Login{" "}
                        </span>
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={6} textAlign={"end"}>
                      <Typography
                        fontSize={"12px"}
                        paddingRight={2}
                        fontWeight={500}
                        className="pointer text-decoration-underline"
                      >
                        Forgot Password?
                      </Typography>
                    </Grid> */}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>

      {/* <Grid container alignItems={"center"} spacing={4} className="py-5">
        <Grid item xs={7}>
          <img src={signupImage.src} width="100%" />
        </Grid>
        <Grid item xs={5} padding={10} alignItems={"center"}>
          <Card className="p-2  pb-5">
            <LoginForm />
            <p className="f-12 px-3">
              New User?{" "}
              <span className={styles.registerButton} onClick={handleClick}>
                Register Yourself{" "}
              </span>
            </p>
          </Card>
        </Grid>
      </Grid> */}
    </div>
  );
};

export default RegisterLogin;
