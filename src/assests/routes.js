import { CarRental, Gavel, Home, Info, Person } from "@mui/icons-material";

export const HeaderLinks = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "About",
    url: "/about-us",
    icon: <Info />,
  },
  {
    title: "Auction",
    url: "/online-auction",
    icon: <Gavel />,
  },
  {
    title: "Vehicles",
    url: "/buy-cars",
    icon: <CarRental />,
  },
  // { title: "Login", url: "/login", icon: <Person /> },
];
