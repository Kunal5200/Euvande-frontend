import Button from "@/components/button";
import LoginForm from "@/components/loginForm";
import styles from "@/styles/Login.module.css";
import { TextField } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";
const RegisterLogin = () => {
  const [position, setPosition] = useState(0);

  const [springs, api] = useSpring(() => ({
    from: { x: position },
  }));

  const handleClick = () => {
    const targetPosition = position === 0 ? 380 : 0;

    api.start({
      from: { x: position },
      to: { x: targetPosition },
    });

    setPosition(targetPosition);
  };

  const [otpShow, setOtpShow] = useState(false);

  return (
    <div className="container my-5">
      <div className="row  ">
        <div className="col-sm-8 m-auto card">
          <animated.div
            style={{
              width: 380,
              height: "100%",
              background: "rgb(238,174,202)",
              background:
                "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
              borderRadius: 8,
              position: "absolute",
              zIndex: 999,
              color: "#ffffff",
              padding: "5px",
              display: "grid",
              placeItems: "center",
              left: 0,
              ...springs,
            }}
          ></animated.div>
          <div className="row p-3">
            <div className="col-sm-6  ">
              <form>
                <TextField variant="outlined" label="Name" fullWidth />
                <TextField variant="outlined" label="Name" fullWidth />
                <TextField variant="outlined" label="Name" fullWidth />
                <TextField variant="outlined" label="Name" fullWidth />
                <TextField variant="outlined" label="Name" fullWidth />
                <TextField variant="outlined" label="Name" fullWidth />
              </form>
              <Button className="custom_btn" onClick={handleClick}>
                <span>Change</span>
                <span>Change</span>
              </Button>
            </div>
            <div className="col-sm-6  ">
              <LoginForm otpShow={otpShow} setOtpShow={setOtpShow} />
              <p className="f-12 px-3">
                New User?{" "}
                <span className={styles.registerButton} onClick={handleClick}>
                  Register Yourself
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;
