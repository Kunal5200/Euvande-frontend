import { FacebookOutlined, Mail } from "@mui/icons-material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Avatar, Chip, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
const Subheader = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
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
  return (
    <div
      className={`container-fluid  border-bottom p-2 ${
        show ? "absolute__header text-white" : "text-dark"
      }  `}
    >
      <div className="container" style={{ maxWidth: "1300px" }}>
        <div className="d-flex align-items-center justify-content-between ">
          <div className="d-flex align-items-center">
            <Chip
              sx={{
                border: "none",
                backgroundColor: "transparent",
                color: show ? "#fff" : "#000",
                fontSize: 11,
                letterSpacing: 2,
              }}
              avatar={
                <Avatar
                  sx={{
                    backgroundColor: "transparent",
                    border: show ? "1px solid #fff" : "1px solid #000",
                    marginLeft: "0px !important",
                  }}
                >
                  <LocalPhoneIcon
                    sx={{ fill: show ? "#fff" : "#000", fontSize: 10 }}
                  />
                </Avatar>
              }
              label="+45 65736291"
            />
            <Chip
              sx={{
                border: "none",
                backgroundColor: "transparent",
                color: show ? "#fff" : "#000",
                fontSize: 11,
                letterSpacing: 2,
              }}
              avatar={
                <Avatar
                  sx={{
                    backgroundColor: "transparent",
                    border: show ? "1px solid #fff" : "1px solid #000",
                  }}
                >
                  <Mail sx={{ fill: show ? "#fff" : "#000", fontSize: 12 }} />
                </Avatar>
              }
              label="info@euvande.com"
            />
          </div>

          <Stack direction="row" alignItems={"center"} spacing={2}>
            <FacebookOutlined sx={{ fill: show ? "#fff" : "#000" }} />
            <FaInstagram color={show ? "#fff" : "#000"} size={20} />
            <FaLinkedinIn color={show ? "#fff" : "#000"} size={20} />
            <FaYoutube color={show ? "#fff" : "#000"} size={20} />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Subheader;
