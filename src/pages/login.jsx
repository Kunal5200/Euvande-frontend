import { useState } from "react";
import styles from "../styles/Login.module.css";
import { Box } from "@mui/material";
import LoginForm from "@/components/loginForm";
import SignupForm from "@/components/signupForm";

export default function SignInUpForm() {
  const [signup, setsignup] = useState(false);

  const handlesignup = () => {
    setsignup(true);
  };

  const handlesignin = () => {
    setsignup(false);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <video width={"100%"} autoPlay={true} muted loop>
          <source src="https://euvande-dev.s3.eu-central-1.amazonaws.com/videos/04.mp4" />
        </video>
      </Box>
      <Box
        sx={{
          height: "100vh",
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          className={` ${styles.container_wrapper} ${
            signup ? styles.right_panel_active : ""
          }`}
        >
          <div
            className={`${styles.form_container} ${styles.sign_up_container}`}
          >
            <SignupForm />
          </div>
          <div
            className={`${styles.form_container} ${styles.sign_in_container}`}
          >
            <LoginForm />
          </div>
          <div className={styles.overlay_container}>
            <div className={styles.overlay}>
              <div className={`${styles.overlay_panel} ${styles.overlay_left}`}>
                <h1>Welcome Back!</h1>
                <p className={styles.loginText}>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className={styles.login_btn}
                  onClick={handlesignin}
                  width={200}
                >
                  Sign In
                </button>
              </div>
              <div
                className={`${styles.overlay_panel} ${styles.overlay_right}`}
              >
                <h1>Hello, User!</h1>
                <p className={styles.loginText}>
                  Enter your personal details and start a journey with us
                </p>
                <button className={styles.login_btn} onClick={handlesignup}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
