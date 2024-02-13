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
  Box,
  Card,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Button from "./button";
import { Close } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state) => state.userInfo.isAuthenticated
  );

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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [popOver, setIsPopOver] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
    setAnchorEl(null);
    // setIsPopOver(false);
    dispatch(removeDetails());
  };
  const dispatch = useDispatch();
  const routePage = (event) => {
    !isAuthenticated
      ? router.push("/registerorlogin")
      : setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    localStorage.getItem("accessToken")
      ? getUserProfile({ dispatch })
      : () => {};
  }, []);

  const userProfile = () => {
    router.push("/user-profile");
    setAnchorEl(null);
  };

  const linksList = [
    {
      name: "User Profile",
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
      <div
        style={{ maxWidth: 1300 }}
        className={`container ${show ? styles.mainHeader : ""} p-2 `}
      >
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
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              sx={{ width: "100%" }}
            >
              {linksList.map((links, index) => (
                <React.Fragment key={index}>
                  <MenuItem sx={{p:1}} onClick={links.onClick}>
                    {links.icon} {links.name}
                  </MenuItem>
                  <Divider sx={{ backgroundColor: "#000" }} />
                </React.Fragment>
              ))}
            </Menu>
            {/* <Button
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
            </Button> */}
            <MenuIcon
              sx={{
                fill: show ? "#fff" : "#000",
                fontSize: 30,
                cursor: "pointer",
              }}
              onClick={() => setShowMenu(true)}
            />
          </Stack>

          <FaUser className={styles.mobileView} />
        </div>
        {/* <div className="text-end">
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
            </div> */}
        <div>
          {/* <Slide direction="down" in={popOver} style={{ zIndex: 999 }}>
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
                    <ListItemButton onClick={val.onClick}>
                      <ListItemAvatar>{val.icon}</ListItemAvatar>
                      <ListItemText primary={val.name} />
                    </ListItemButton>
                    {i === val.length - 1 ? (
                      <></>
                    ) : (
                      <Divider style={{ backgroundColor: "#000" }} />
                    )}
                  </div>
                ))}
              </List>
            </Paper>
          </Slide> */}

          <Drawer
            open={showMenu}
            onClose={() => setShowMenu(false)}
            anchor="right"
            sx={{
              zIndex: 10000,
              "& .MuiDrawer-paper": {
                width: "300px",
                boxSizing: "border-box",
              },
            }}
          >
            <Box textAlign={"end"} p={1}>
              <IconButton onClick={() => setShowMenu(false)}>
                <Close />
              </IconButton>
            </Box>
            <Divider sx={{ backgroundColor: "#000" }} />
            <Box>
              <List>
                {HeaderLinks.map((item, index) => (
                  <Link
                    href={item.url}
                    key={index}
                    className=" link"
                    onClick={() => setShowMenu(false)}
                  >
                    <ListItemButton disablePadding sx={{ fontSize: 40 }}>
                      <ListItemAvatar>{item.icon}</ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        style={{ fontSize: 40 }}
                      />
                    </ListItemButton>
                    <Divider sx={{ backgroundColor: "#000" }} />
                  </Link>
                ))}
              </List>
            </Box>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
