import {
  AllInbox,
  CarRental,
  Favorite,
  Gavel,
  Home,
  Info,
  Person,
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { FaAddressCard } from "react-icons/fa";

// const phoneMatches = useMediaQuery("(max-width:600px)");
export const HeaderLinks = [
  {
    title: "Home",
    url: "/",
    icon: <Home htmlColor="gray" />,
  },
  {
    title: "About",
    url: "/about-us",
    icon: <Info htmlColor="gray" />,
  },
  {
    title: "Auction",
    url: "/online-auction",
    icon: <Gavel htmlColor="gray" />,
  },
  {
    title: "Buy Cars",
    url: "/buy-cars",
    icon: <CarRental htmlColor="gray" />,
  },
  {
    title: "Sell Cars",
    url: "/sell-cars",
    icon: <CarRental htmlColor="gray" />,
  },

  // { title: "Login", url: "/login", icon: <Person /> },
];

export const profileLinks = [
  {
    title: "Favourite",
    icon: <Favorite htmlColor="gray" />,
    url: "/favourite",
  },
  {
    title: "Profile",
    icon: <Person htmlColor="gray" />,
    url: "/profile",
  },
  {
    title: "Orders",
    icon: <AllInbox htmlColor="gray" />,
    url: "/orders",
  },
  // {
  //   title: "Address",
  //   icon: <FaAddressCard size={20} style={{ marginLeft: 2 }} />,
  //   url: "/manage-address",
  // },
];
