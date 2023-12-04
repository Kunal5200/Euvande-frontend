import { HeaderLinks } from "@/assests/routes";
import user from "@/icons/user.png";
import user_black from "@/icons/user_black.png";
import styles from "@/styles/Header.module.css";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Card, Slide } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "./button";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (router.pathname === "/") {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [router.pathname, show]);
  return (
    <div className={`${show ? styles.mainHeader : ""} container p-2`}>
      <div className="d-flex align-items-center justify-content-between">
        <div className={show ? "text-white" : "text-dark"}>Logo</div>
        <div className="d-flex align-items-center">
          {/* <FaRegUserCircle color="#ffffff" size={35} className="mx-3" fontWeight={300} /> */}
          <Link href={"/registerorlogin"}>
            <Button backgroundColor="transparent" border="none">
              <Image
                src={show ? user : user_black}
                width={30}
                height={30}
                alt="login account"
                className="me-3"
              />
            </Button>
          </Link>
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
              <Link href={"/sell-cars"} onClick={() => setShowMenu(false)}>
                <Button className="custom_btn mt-3" width="100%" fw="600">
                  <span>Sell With Us</span>
                  <span>Sell With Us</span>
                </Button>
              </Link>
            </div>
          </Card>
        </Slide>
      </div>
    </div>
  );
};

export default Navbar;
