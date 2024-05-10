import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import card1 from "@/banner_image/visa.svg";
import card2 from "@/banner_image/visa-electron.svg";
import card3 from "@/banner_image/mastercard.svg";
import card4 from "@/banner_image/maestro.svg";
import card5 from "@/banner_image/discover.svg";
import card6 from "@/banner_image/diners-club.svg";
const SubFooter = () => {
  const icons = [
    {
      icon: <FaFacebookF color="#fff" size={25} />,
    },
    {
      icon: <FaInstagram color="#fff" size={25} />,
    },
    {
      icon: <FaLinkedinIn color="#fff" size={25} />,
    },
    {
      icon: <FaYoutube color="#fff" size={25} />,
    },
  ];

  const cards = [
    {
      img: card1.src,
    },
    {
      img: card2.src,
    },
    {
      img: card3.src,
    },
    {
      img: card4.src,
    },
    {
      img: card5.src,
    },
    {
      img: card6.src,
    },
  ];

  return (
    <Container style={{ maxWidth: 1300 }} sx={{ p: 2 }}>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          ml: 3,
        }}
      >
        <Typography color={"#fff"} fontSize={12}>
          &#169; {new Date().getFullYear()} Euvande
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Typography color={"#fff"} fontSize={14}>
            Connect :{" "}
          </Typography>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            {icons.map((val, i) => (
              <Avatar
                sx={{
                  width: 25,
                  height: 25,
                  p: 1,
                  backgroundColor: "#000",
                  border: "1px solid #fff",
                  ":hover": {
                    transform: "scale(1.2)",
                  },
                  transition: "0.5s ease all",
                }}
              >
                {val.icon}
              </Avatar>
            ))}
          </Stack>
        </Stack>
      </Box> */}
      <Box
        sx={{
          display: { lg: "flex", xs: "block" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography color={"#fff"} fontSize={12}>
          We accept online card payments as well as wire transfers.
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {cards.map((image, i) => (
            <img src={image.img} key={i} />
          ))}
        </Stack>
      </Box>
      <Typography fontSize={12} color={"#fff"} textAlign={"justify"} mt={3}>
        Welcome to EuVande, the ultimate destination for discerning enthusiasts
        of premium and vintage automobiles. Our platform is dedicated to
        providing you with an unparalleled experience in buying and selling the
        finest vehicles on the market. With EuVande, indulge in the luxury of
        transparency and peace of mind through our meticulous 200-point
        evaluation process, ensuring that only the most exceptional cars grace
        our curated collection. Whether you're in pursuit of an iconic classic
        or a luxurious modern marvel, EuVande offers an extensive range of
        automotive masterpieces to suit your tastes and preferences. From sleek
        sports cars to timeless classics, each vehicle on our platform embodies
        a legacy of excellence and distinction. At EuVande, we understand the
        importance of a seamless transaction. That's why we offer hassle-free
        services, including paperwork and RC transfer assistance, as well as
        flexible financing options with rates starting at just 12.99%. With
        EuVande, your journey towards owning or selling a premium or vintage car
        is not just a transaction – it's an experience crafted with precision
        and passion. Elevate your automotive endeavors with EuVande, where every
        ride tells a story of sophistication, elegance, and unparalleled
        quality. Discover the epitome of automotive excellence and embark on a
        journey unlike any other, only with EuVande.
      </Typography>
    </Container>
  );
};

export default SubFooter;
