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
  Paper,
  Slide,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "./button";
import logoblack from "@/logo/logoblackeuvande.png";
import logoWhite from "@/logo/logowhiteeuvande.png";
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
    !isLogin ? router.push("/registerorlogin") : setIsPopOver(!popOver);
  };
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  const linksList = [
    {
      name: "Profile",
      icon: <PersonIcon />,
      onClick: () => {},
    },

    {
      name: "Logout",
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
  ];
  return (
    <div className={`${show ? styles.mainHeader : ""} container p-2`}>
      <div className="d-flex align-items-center justify-content-between">
        <Link href={"/"}>
          {show ? (
            <img src={logoWhite.src} width={80} height={80} />
          ) : (
            <img src={logoblack.src} width={80} height={80} />
          )}
        </Link>
        <div className="d-flex align-items-center">
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
        </div>
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
        <Slide direction="down" in={popOver}>
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
  );
};

export default Navbar;
