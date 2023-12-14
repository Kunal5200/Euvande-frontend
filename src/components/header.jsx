import { HeaderLinks } from "@/assests/routes";
import user from "@/icons/user.png";
import user_black from "@/icons/user_black.png";
import styles from "@/styles/Header.module.css";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  Paper,
  Slide,
  Stack,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "next/image";
import Link from "next/link";
import { FaCar, FaUser } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "./button";
import logoblack from "@/logo/logoblackeuvande.png";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import logoWhite from "@/logo/logowhiteeuvande.png";
import { RiMenu4Fill } from "react-icons/ri";
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
  };
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
  return (
    <div className={`container-fluid ${show ? "" : styles.header}`}>
      <div className={`${show ? styles.mainHeader : ""} container p-2`}>
        <div className="d-flex align-items-center justify-content-between p-2">
          <Link href={"/"}>
            {show ? (
              <FaCar size={30} color="#fff" />
            ) : (
              // <img src={logoWhite.src} width={50} height={50} />
              <FaCar size={30} color="#fff" />
            )}
          </Link>
          {/* <div className="d-flex align-items-center">
            <Button backgroundColor="transparent" border="none">
              <Image
                src={show ? user : user_black}
                width={30}
                height={30}
                alt="login account"
                className="me-3"
                onClick={routePage}
              />
            </Button>

            <Button
              border="1px solid #eee"
              rounded="20px"
              backgroundColor="#eee"
              padding="10px"
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
          </div> */}
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
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
            <Stack
              spacing={1}
              alignItems={"center"}
              direction={"row"}
              onClick={routePage}
              className="pointer"
            >
              <FaUser color="#fff" />
              <p className="text-white">Login/Register</p>
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
              padding="10px"
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
              <div style={{ width: "100%" }}>
                <Link
                  href={isLogin ? "/sell-cars" : "/registerorlogin"}
                  onClick={() => setShowMenu(false)}
                >
                  <Button className="custom_btn mt-3" width="100%" fw="600">
                    <span>Sell With Us</span>
                    <span>Sell With Us</span>
                  </Button>
                </Link>
              </div>
            </Card>
          </Slide>
        </div>
        <div>
          <Slide direction="down" in={popOver} style={{ zIndex: 999 }}>
            <Paper
              style={{
                right: "100px",
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
