import React, { useEffect, useState } from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import { TiSocialFacebook } from "react-icons/ti";
import twitter from "@/icons/xicon_white.svg";
import twitterblack from "@/icons/xicon_black.svg";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";
const Subheader = () => {
  const router = useRouter();
  const [show, setShow] = useState (false);
  useEffect(() => {
    if (router.pathname === "/") {
      setShow(true);
    } else {
      setShow(false);
    }
  },[router.pathname,show]);
  return (
    <div
      className={`container-fluid border-bottom p-2 ${show?"absolute__header text-white":"text-dark" }  `}

    >
      <div className="container">
        <div className="d-flex align-items-center justify-content-between ">
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center me-3">
              <LocalPhoneIcon className="me-2" />
              <span>+1 8977396272</span>
            </div>
            <div className="d-flex align-items-center">
              <EmailIcon className="me-2" />
              <span>Euvande@euvande.com</span>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <TiSocialFacebook size={20} />
            <Image
              src={show? twitter:twitterblack}
              alt=""
              width={15}
              height={15}
              className="mx-2"
            />
            <InstagramIcon />
            <FaLinkedinIn className="mx-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subheader;
