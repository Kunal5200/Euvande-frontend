import LoginForm from "@/components/loginForm";
import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import styles from "@/styles/Login.module.css";
import SignupForm from "@/components/signupForm";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import ForgotPassword from "@/assests/modalcalling/forgot-password";
import Button from "@/components/button";
const RegisterorLogin = () => {
  const dispatch = useDispatch();

  const forgotPassword = () => {
    dispatch(showModal(<ForgotPassword />));
  };
  const [flip, setFlip] = useState(false);

  const handleClick = () => {
    setFlip(!flip);
  };
  return (
    <div>
      <div className={styles.bg_image}>
        <Grid container spacing={2}>
          <Grid item xs={8} margin={"auto"}>
            {/* <Card className={`p-2  pb-5 ${styles.loginForm}`}>
              <Grid container>
                <Grid item lg={6} padding={2}>
                  <ReactCardFlip isFlipped={flip}>
                    <Box>
                      <Typography variant="h6" font textAlign={"center"}>
                        Ready to make car dreams a reality? Whether selling or
                        buying, our platform is where it happens. Let's get
                        started quickly!
                      </Typography>
                      <Button onClick={handleClick} border="1px solid ">
                        Sign up
                      </Button>
                    </Box>
                    <Typography variant="h4" onClick={handleClick}>
                      Hello
                    </Typography>
                  </ReactCardFlip>
                </Grid>
                <Grid item lg={6}>
                  <ReactCardFlip isFlipped={flip}>
                    <LoginForm />
                    <SignupForm />
                  </ReactCardFlip>
                </Grid>
              </Grid>
            </Card> */}
            <Grid container>
              <Grid item lg={6}>
                <ReactCardFlip isFlipped={flip}>
                  <Box
                    sx={{
                      backgroundColor: "#000",
                      height: "500px",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Box textAlign={"center"}>
                      <Typography
                        paddingX={2}
                        variant="h6"
                        fontSize={20}
                        textAlign={"center"}
                      >
                        Ready to make car dreams a reality? Whether selling or
                        buying, our platform is where it happens. Let's get
                        started quickly!
                      </Typography>
                      <Button
                        onClick={handleClick}
                        border="1px solid white "
                        color="#fff"
                        backgroundColor="transparent"
                        padding="10px"
                        width="120px"
                        rounded="20px"
                        className="mt-4"
                      >
                        Sign Up
                      </Button>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "#000",
                      height: "500px",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Box textAlign={"center"}>
                      <Typography
                        paddingX={2}
                        variant="h6"
                        fontSize={20}
                        textAlign={"center"}
                      >
                        Ready to embark on your car journey? Whether selling or
                        buying, our platform is your gateway. Let's get you
                        logged in quickly!
                      </Typography>
                      <Button
                        onClick={handleClick}
                        border="1px solid white "
                        color="#fff"
                        backgroundColor="transparent"
                        padding="10px"
                        width="120px"
                        rounded="20px"
                        className="mt-4"
                      >
                        Sign In
                      </Button>
                    </Box>
                  </Box>
                </ReactCardFlip>
              </Grid>
              <Grid item lg={6}>
                <ReactCardFlip isFlipped={flip}>
                  <Card className={styles.loginForm} sx={{ padding: 2 }}>
                    <LoginForm />
                    <Typography
                      fontSize={"12px"}
                      paddingRight={2}
                      fontWeight={500}
                      className="pointer text-decoration-underline"
                      onClick={forgotPassword}
                    >
                      Forgot Password?
                    </Typography>
                  </Card>
                  <Card className={styles.loginForm} sx={{ padding: 2 }}>
                    <SignupForm />
                  </Card>
                </ReactCardFlip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default RegisterorLogin;
