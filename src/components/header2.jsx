import { getUserProfile } from "@/api/apiCalling/authenticationApi";
import { HeaderLinks, profileLinks } from "@/assests/routes";
import logoBlack from "@/logo/EUVandeLogoBlack.svg";
import logo from "@/logo/EUVandeLogoWhite.svg";
import { removeDetails } from "@/redux/reducers/userdetails";
import styles from "@/styles/Header.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import Button from "./button";
import { Close, Logout, Menu, Person } from "@mui/icons-material";
const Header = () => {
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
  const [openDrawer, setOpenDrawer] = useState(false);
  const drawerOpen = (newOpen) => {
    setOpenDrawer(newOpen);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(null);
  };
  const [popOver, setIsPopOver] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
    setAnchorEl(null);
    setShowMenu(false);
    dispatch(removeDetails());
    setOpenDrawer(false);
  };
  const dispatch = useDispatch();
  const routePage = (event) => {
    !isAuthenticated ? router.push("/login") : setAnchorEl(event.currentTarget);
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

  const handleRoute = (path) => {
    router.push(path);
    setOpenDrawer(null);
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

  const user = useSelector((state) => state.userInfo);
  const name = user.name;
  const email = user.email;
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => setFixed(window.pageYOffset > 0));
    }
  }, []);
  return (
    <div
      className={`container-fluid ${
        fixed ? styles.white_header : show ? "" : styles.header
      } `}
    >
      <div
        style={{ maxWidth: fixed ? "100%" : 1300 }}
        className={`container ${
          fixed ? styles.main_header : show ? styles.mainHeader : ""
        } p-1 `}
      >
        {fixed ? (
          <Container style={{ maxWidth: 1350 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pt: "10px",
                pb: "10px",
              }}
            >
              <Link href={"/"}>
                <Image
                  src={fixed ? logoBlack : show ? logo : logoBlack}
                  width={150}
                  alt="logo"
                  className={styles.logo}
                />
              </Link>

              <Stack
                direction={"row"}
                spacing={{ lg: 2, xs: 1 }}
                alignItems={"center"}
                className={styles.desktopView}
              >
                {HeaderLinks.map((val, i) => (
                  <Link href={val.url} className="link" key={i}>
                    <Typography fontSize={14} color={"#000"} letterSpacing={1}>
                      {val.title}
                    </Typography>
                  </Link>
                ))}
                <Divider
                  flexItem
                  orientation="vertical"
                  variant="middle"
                  sx={{
                    backgroundColor: "#000",
                    opacity: 1,
                    height: 20,
                    alignSelf: "center",
                  }}
                />
                <Chip
                  avatar={
                    <Person
                      sx={{
                        fill: "#000",
                        fontSize: 12,
                        letterSpacing: 1,
                      }}
                    />
                  }
                  sx={{
                    color: "#000",
                    fontSize: 14,
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    "& .MuiChip-label": {
                      textTransform: "capitalize",
                    },
                  }}
                  label={`Hello, ${isAuthenticated ? name : "Sign In"} `}
                  onClick={routePage}
                />
              </Stack>
              <IconButton onClick={drawerOpen} className={styles.mobileView}>
                {user.isAuthenticated ? (
                  <Person sx={{ fill: show ? "#000" : "#000" }} />
                ) : (
                  <Menu sx={{ fill: show ? "#000" : "#000" }} />
                )}
              </IconButton>
              {/* <FaUser className={styles.mobileView} /> */}
            </Box>
          </Container>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pt: "10px",
              pb: "10px",
              // px: { xs: 1 },
            }}
          >
            <Link href={"/"}>
              <Image
                src={fixed ? logoBlack : show ? logo : logoBlack}
                width={150}
                alt="logo"
                className={styles.logo}
              />
            </Link>

            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              className={styles.desktopView}
            >
              {HeaderLinks.map((val, i) => (
                <Link href={val.url} className="link" key={i}>
                  <Typography
                    fontSize={14}
                    color={show ? "#fff" : "#000"}
                    letterSpacing={1}
                  >
                    {val.title}
                  </Typography>
                </Link>
              ))}
              <Divider
                flexItem
                orientation="vertical"
                variant="middle"
                sx={{
                  backgroundColor: "#fff",
                  opacity: 1,
                  height: 20,
                  alignSelf: "center",
                }}
              />
              <Chip
                avatar={
                  <Person
                    sx={{
                      fill: show ? "#fff" : "#000",
                      fontSize: 12,
                      letterSpacing: 1,
                    }}
                  />
                }
                label={`Hello, ${isAuthenticated ? name : "Sign In"} `}
                sx={{
                  color: show ? "#fff" : "#000",
                  fontSize: 14,
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  "& .MuiChip-label": {
                    textTransform: "capitalize",
                  },
                }}
                onClick={routePage}
              />
            </Stack>
            <IconButton onClick={drawerOpen} className={styles.mobileView}>
              {user.isAuthenticated ? (
                <Person sx={{ fill: show ? "#fff" : "#000" }} />
              ) : (
                <Menu sx={{ fill: show ? "#fff" : "#000" }} />
              )}
            </IconButton>
            {/* <FaUser className={styles.mobileView} /> */}
          </Box>
        )}

        {/* <div>
          <Drawer
            open={showMenu}
            onClose={() => setShowMenu(false)}
            anchor="right"
            sx={{
              zIndex: 10000,
              "& .MuiDrawer-paper": {
                width: "300px",
                boxSizing: "border-box",
                height: "100%",
              },
            }}
          >
            <Box textAlign={"end"}>
              <IconButton onClick={() => setShowMenu(false)}>
                <Close />
              </IconButton>
            </Box>
            {isAuthenticated && (
              <Stack direction={"row"} p={1} spacing={2}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: "#000",
                    color: "#fff",
                  }}
                >
                  {name.slice(0, 1)}
                </Avatar>
                <Box>
                  <Typography
                    fontSize={20}
                    textTransform={"capitalize"}
                    fontWeight={600}
                  >
                    {" "}
                    {name}
                  </Typography>
                  <Button
                    sx={{
                      fontSize: 10,
                      p: 0.3,
                      color: "#000",
                      borderRadius: 20,
                      textAlign: "center",
                      ":hover": {
                        textDecoration: "underline",
                      },
                      transition: "0.5s ease all",
                    }}
                    onClick={userProfile}
                  >
                    View Profile
                  </Button>
                </Box>
              </Stack>
            )}

            <Divider sx={{ backgroundColor: "#000" }} />
            <Box>
              <List
                sx={{
                  "& .MuiButtonBase-root-MuiMenuItem-root": {
                    fontSize: 12,
                  },
                  position: "relative",
                }}
              >
                {HeaderLinks.map((item, index) => (
                  <Link
                    href={item.url}
                    key={index}
                    className=" link"
                    onClick={() => setShowMenu(false)}
                  >
                    <ListItemButton
                      disablePadding
                      sx={{
                        ":hover": {
                          color: "#fff",
                          backgroundColor: "#000",
                        },
                        transition: "0.5s ease all",
                      }}
                    >
                      <ListItemAvatar>{item.icon}</ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        style={{ fontSize: 30 }}
                      />
                    </ListItemButton>
                  </Link>
                ))}
                {isAuthenticated ? (
                  <ListItemButton
                    disablePadding
                    sx={{
                      top: "40vh",
                      ":hover": {
                        color: "#fff",
                        backgroundColor: "#000",
                      },
                      transition: "0.5s ease all",
                    }}
                    onClick={handleLogout}
                  >
                    <ListItemAvatar>
                      <Logout />
                    </ListItemAvatar>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                ) : (
                  <Link
                    href={"/login"}
                    className="link"
                    onClick={() => setShowMenu(false)}
                  >
                    <ListItemButton
                      sx={{
                        ":hover": {
                          color: "#fff",
                          backgroundColor: "#000",
                        },
                        transition: "0.5s ease all",
                      }}
                      disablePadding
                    >
                      <ListItemAvatar>
                        <Person />
                      </ListItemAvatar>
                      <ListItemText primary="Login" />
                    </ListItemButton>
                  </Link>
                )}
              </List>
            </Box>
          </Drawer>
        </div> */}
        <Popover
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{
            "& .MuiPopover-paper": {
              width: 200,
              p: 1,
              zIndex: 9999,
            },
          }}
        >
          <Stack>
            <Typography fontSize={12}>Hello, {name}</Typography>
            <Typography fontSize={10}>{email}</Typography>
          </Stack>
          <Divider sx={{ backgroundColor: "#000" }} />
          <List disablePadding>
            <ListItemButton
              onClick={userProfile}
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 14,
                  //   fontWeight: 550,
                },
              }}
            >
              <ListItemText primary="Profile" />
            </ListItemButton>
            <Divider sx={{ backgroundColor: "#000" }} />
            <ListItemButton
              onClick={handleLogout}
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 14,
                },
              }}
            >
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Popover>
      </div>
      <Drawer
        open={openDrawer}
        anchor={"left"}
        onClose={() => setOpenDrawer(null)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "80%",
            zIndex: 10000,
          },
        }}
      >
        {/* <Box textAlign={"end"} p={1}>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ border: "1px solid #000" }}
          >
            <Close onClick={handleDrawerClose} />
          </IconButton>
        </Box>
        <Divider sx={{ backgroundColor: "#000" }} />
        <Box sx={{ height: "100%", mt: 10 }}>
          {HeaderLinks.map((val, i) => (
            <Typography
              textAlign={"center"}
              fontSize={40}
              key={i}
              onClick={() => handleRoute(val.url)}
              mt={3}
              borderBottom="1px solid transparent"
              sx={{
                cursor: "pointer",
                ":hover": {
                  borderBottom: "1px solid #000",
                },
              }}
            >
              {val.title}
            </Typography>
          ))}
          {user.isAuthenticated ? (
            <>
              <Typography
                textAlign={"center"}
                fontSize={40}
                onClick={() => handleRoute("/user-account")}
                mt={3}
                borderBottom="1px solid transparent"
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    borderBottom: "1px solid #000",
                  },
                }}
              >
                Profile
              </Typography>
              <Typography
                textAlign={"center"}
                fontSize={40}
                onClick={handleLogout}
                mt={3}
                borderBottom="1px solid transparent"
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    borderBottom: "1px solid #000",
                  },
                }}
              >
                Logout
              </Typography>
            </>
          ) : (
            <Typography
              textAlign={"center"}
              fontSize={40}
              onClick={() => handleRoute("/login-account")}
              mt={3}
              borderBottom="1px solid transparent"
              sx={{
                cursor: "pointer",
                ":hover": {
                  borderBottom: "1px solid #000",
                },
              }}
            >
              Login
            </Typography>
          )}
        </Box> */}
        <Box
          textAlign={"end"}
          p={1}
          sx={{ backgroundColor: user.isAuthenticated ? "#000" : "#fff" }}
        >
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              border: user.isAuthenticated
                ? "1px solid #fff"
                : "1px solid #000",
            }}
          >
            <Close
              onClick={handleDrawerClose}
              fontSize="small"
              htmlColor={user.isAuthenticated ? "#fff" : "#000"}
            />
          </IconButton>
        </Box>
        {user.isAuthenticated && (
          <Box
            sx={{
              height: 150,
              backgroundColor: "#000",
              display: "grid",
              placeItems: "start",
              mb: 2,
            }}
          >
            <Box>
              <Avatar sx={{ width: 70, height: 70, ml: 2 }}>
                <Typography fontSize={20}>
                  {user && user.name.slice(0, 1)}
                </Typography>
              </Avatar>
              <Typography fontSize={18} color="#fff" my={1} ml={2}>
                {user && user.name}
              </Typography>
              <Typography fontSize={12} color="#fff" ml={2}>
                {user && user.email}
              </Typography>
            </Box>
          </Box>
        )}
        {user.isAuthenticated && (
          <>
            <List
              xs={{
                "& .MuiTypography-root": {
                  fontSize: 12,
                },
              }}
            >
              {profileLinks.map((val, i) => (
                <ListItemButton key={i} onClick={() => handleRoute(val.url)}>
                  <ListItemAvatar>{val.icon}</ListItemAvatar>
                  <ListItemText primary={val.title} />
                </ListItemButton>
              ))}
            </List>
            <Divider sx={{ backgroundColor: "#000" }} />
          </>
        )}
        <List>
          {HeaderLinks.map((val, i) => (
            <ListItemButton onClick={() => handleRoute(val.url)} key={i}>
              <ListItemAvatar>{val.icon}</ListItemAvatar>
              <ListItemText primary={val.title} />
            </ListItemButton>
          ))}
          {!user.isAuthenticated && (
            <ListItemButton onClick={() => handleRoute("/login-account")}>
              <ListItemAvatar>
                <Person htmlColor="gray" />
              </ListItemAvatar>
              <ListItemText primary="Login" />
            </ListItemButton>
          )}
        </List>
        {user.isAuthenticated && (
          <List>
            <ListItemButton onClick={handleLogout}>
              <ListItemAvatar>
                <Logout htmlColor="gray" />
              </ListItemAvatar>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        )}
      </Drawer>
    </div>
  );
};

export default Header;
