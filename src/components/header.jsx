import { getUserProfile } from "@/api/apiCalling/authenticationApi";
import { HeaderLinks } from "@/assests/routes";
import logoBlack from "@/logo/EUVandeLogoBlack.svg";
import logo from "@/logo/EUVandeLogoWhite.svg";
import { removeDetails } from "@/redux/reducers/userdetails";
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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Button from "./button";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state) => state.userInfo.isAuthenticated
  );

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

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
    !isAuthenticated ? router.push("/registerorlogin") : setIsPopOver(!popOver);
  };

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
            <Image src={show ? logo : logoBlack} width={150} alt="logo" />
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
                  fill: show ? "#fff" : "#000",
                  border: show ? "1px solid #fff" : "1px solid #000",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  padding: "5px",
                }}
              />
              <Typography color={show ? "#ffffff" : "#000000"}>
                +1 9845751252
              </Typography>
            </Stack>

            <Divider
              flexItem
              orientation="vertical"
              variant="middle"
              sx={{
                backgroundColor: "#fff",
                opacity: 1,
                height: 25,
                alignSelf: "center",
              }}
            />
            <Link href={"/buy-cars"} className="link">
              <Typography color={show ? "#ffffff" : "#000000"}>
                Buy Car
              </Typography>
            </Link>
            <Divider
              flexItem
              orientation="vertical"
              variant="middle"
              sx={{
                backgroundColor: "#fff",
                opacity: 1,
                height: 25,
                alignSelf: "center",
              }}
            />
            <Link
              href={isAuthenticated ? "/sell-cars" : "/registerorlogin"}
              className="link"
            >
              <Typography color={show ? "#ffffff" : "#000000"}>
                Sell Car
              </Typography>
            </Link>
            <Divider
              flexItem
              orientation="vertical"
              variant="middle"
              sx={{
                backgroundColor: "#fff",
                opacity: 1,
                height: 25,
                alignSelf: "center",
              }}
            />

            <Stack
              spacing={1}
              alignItems={"center"}
              direction={"row"}
              onClick={routePage}
              className="pointer"
            >
              <FaUser color={show ? "#fff" : "#000"} />
              {isAuthenticated ? (
                <Typography
                  color={show ? "#ffffff" : "#000000"}
                  className="text-capitalize"
                >
                  Hello, {name}{" "}
                </Typography>
              ) : (
                <Typography color={show ? "#ffffff" : "#000000"}>
                  Login/Register
                </Typography>
              )}
            </Stack>

            <Divider
              flexItem
              orientation="vertical"
              variant="middle"
              sx={{
                backgroundColor: "#fff",
                opacity: 1,
                height: 25,
                alignSelf: "center",
              }}
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
                  <Typography>Menu</Typography>
                </div>
              ) : (
                <div className={styles.menu_btn}>
                  <CloseIcon fontSize="13px" className="me-1" />
                  <Typography>Close</Typography>
                </div>
              )}
            </Button>
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
                  <div key={i}>
                    <ListItem button onClick={val.onClick}>
                      <ListItemAvatar>{val.icon}</ListItemAvatar>
                      <ListItemText primary={val.name} />
                    </ListItem>
                    {i === val.length - 1 ? (
                      <></>
                    ) : (
                      <Divider style={{ backgroundColor: "#000" }} />
                    )}
                  </div>
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
