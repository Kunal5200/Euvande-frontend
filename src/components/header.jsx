import { HeaderLinks } from "@/assests/routes";
import { getUserProfile } from "@/api/apiCalling/authenticationApi";
import styles from "@/styles/Header.module.css";
import CloseIcon from "@mui/icons-material/Close";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCar, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import logo from "@/logo/EuVandeLogoWhite.svg";
import Button from "./button";
import Image from "next/image";
import { removeDetails, setDetails } from "@/redux/reducers/userdetails";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (
      router.pathname === "/" ||
      router.pathname === "/sell-cars/car-details"
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [router.pathname, show]);
  const [popOver, setIsPopOver] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
    setIsPopOver(false);
    dispatch(removeDetails());
  };
  const dispatch = useDispatch();
  const routePage = () => {
    !isLogin ? router.push("/login") : setIsPopOver(!popOver);
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });
  useEffect(() => {
    localStorage.getItem("accessToken")
      ? getUserProfile({ dispatch })
      : () => {};
  }, []);

  const userProfile = () => {
    router.push("/user-profile");
    setIsPopOver(false);
  };

  const linksList = [
    {
      name: "Profile",
      icon: <PersonIcon />,
      onClick: userProfile,
    },

    {
      name: "Logout",
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
  ];

  const selector = useSelector((state) => state.userInfo);
  const name = selector.name;
  return (
    <div className={`container-fluid ${show ? "" : styles.header}`}>
      <div className={`${show ? styles.mainHeader : ""} container p-2`}>
        <div className="d-flex align-items-center justify-content-between p-2">
          <Link href={"/"}>
            <Image src={logo} width={150} />
          </Link>

          <Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            className={styles.desktopView}
          >
            <Stack direction="row" alignItems={"center"} spacing={1}>
              <LocalPhoneOutlinedIcon
                style={{
                  fill: "#fff",
                  border: "1px solid #fff",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  padding: "5px",
                }}
              />
              <p className="text-white f-12">+1 9845751252</p>
            </Stack>

            <Divider
              flexItem
              orientation="vertical"
              variant="middle"
              style={{ backgroundColor: "#fff", opacity: 1 }}
            />
            <Typography color="#ffffff">Buy Car</Typography>
            <Divider
              flexItem
              orientation="vertical"
              variant="middle"
              style={{ backgroundColor: "#fff", opacity: 1 }}
            />
            <Link href={isLogin ? "/sell-cars" : "/login"} className="link">
              <Typography color="#ffffff">Sell Car</Typography>
            </Link>
            <Divider
              flexItem
              orientation="vertical"
              variant="middle"
              style={{ backgroundColor: "#fff", opacity: 1 }}
            />

            <Stack
              spacing={1}
              alignItems={"center"}
              direction={"row"}
              onClick={routePage}
              className="pointer"
            >
              <FaUser color="#fff" />
              {isLogin ? (
                <Typography color={"#ffffff"} className="text-capitalize">
                  Hello ,{name}{" "}
                </Typography>
              ) : (
                <p className="text-white">Login/Register</p>
              )}
            </Stack>

            <Divider
              flexItem
              orientation="vertical"
              variant="middle"
              style={{ backgroundColor: "#fff", opacity: 1 }}
            />
            <Button
              border="1px solid #eee"
              rounded="20px"
              backgroundColor="#eee"
              padding="8px"
              width="100px"
              fs="15px"
              onClick={handleShowMenu}
            >
              {!showMenu ? (
                <div className={styles.menu_btn}>
                  <MoreVertIcon fontSize="13px" className="me-1" />
                  Menu
                </div>
              ) : (
                <div className={styles.menu_btn}>
                  <CloseIcon fontSize="13px" className="me-1" />
                  Close
                </div>
              )}
            </Button>
            {/* <RiMenu4Fill color="#fff" size={25}/> */}
          </Stack>

          <FaUser className={styles.mobileView} />
        </div>
        <div className="text-end">
          <Slide direction="down" in={showMenu}>
            <Card className={styles.menuSlider}>
              {HeaderLinks.map((val, i) => (
                <Link
                  key={i}
                  className={`${styles.headerlinks} w-100 text-start mt-2`}
                  href={val.url}
                >
                  {val.title}
                </Link>
              ))}
              {/* <div style={{ width: "100%" }}>
                <Link
                  href={isLogin ? "/sell-cars" : "/login"}
                  onClick={() => setShowMenu(false)}
                >
                  <Button className="custom_btn mt-3" width="100%" fw="600">
                    <span>Sell With Us</span>
                    <span>Sell With Us</span>
                  </Button>
                </Link>
              </div> */}
            </Card>
          </Slide>
        </div>
        <div>
          <Slide direction="down" in={popOver} style={{ zIndex: 999 }}>
            <Paper
              style={{
                right: router.pathname === "/" ? "100px" : "180px",
                width: "150px",
                position: "absolute",
              }}
            >
              <List>
                {linksList.map((val, i) => (
                  <>
                    <ListItem button key={i} onClick={val.onClick}>
                      <ListItemAvatar>{val.icon}</ListItemAvatar>
                      <ListItemText primary={val.name} />
                    </ListItem>
                    {i === val.length - 1 ? (
                      <></>
                    ) : (
                      <Divider style={{ backgroundColor: "#000" }} />
                    )}
                  </>
                ))}
              </List>
            </Paper>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
