import {
  Article,
  ContactMail,
  LiveHelp,
  Lock,
  Password,
  Person,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.userInfo);

  //   console.log("user", user);

  const profileLinks = [
    {
      title: "Profile Information",
      subTitle: "Change number, email Id",
      icon: <Person htmlColor="gray" />,
      url: "/profile-information",
    },
    {
      title: "Change Password",
      subTitle: "Reset old password",
      icon: <Password htmlColor="gray" />,
      url: "/change-password",
    },
    {
      title: "Manage Addresses",
      subTitle: "Add,edit and remove Address",
      icon: <ContactMail htmlColor="gray" />,
      url: "/manage-address",
    },
  ];
  const helpSupport = [
    {
      title: "Privacy Policy",
      subTitle: "Security Notifications",
      icon: <Lock htmlColor="gray" />,
      //   url:""
    },
    {
      title: "Terms & Conditions",
      subTitle: "Cancellation Policy",
      icon: <Article htmlColor="gray" />,
    },
    {
      title: "Faq & Help",
      subTitle: "Get in touch with us",
      icon: <LiveHelp htmlColor="gray" />,
    },
  ];
  const router = useRouter();
  const handleRoute = (path) => {
    router.push(path);
  };
  return (
    <Container maxWidth="lg">
      <Box mt={2}>
        <Typography fontSize={25} fontWeight={600}>
          {user && user.name}
        </Typography>
        <Typography fontSize={14}>{user && user.email}</Typography>
      </Box>
      <Divider sx={{ backgroundColor: "#000", mt: 2, mb: 2 }} />
      <Typography fontSize={14} fontWeight={600} color={"#403f3f"}>
        Account
      </Typography>
      <List
        sx={{
          "& .MuiListItemText-secondary": {
            fontSize: 11,
          },
          "& .MuiListItemText-primary": {
            fontSize: 17,
            fontWeight: 550,
          },
          "& .MuiListItemButton-root": {
            padding: 0.5,
          },
        }}
      >
        {profileLinks.map((val, i) => (
          <ListItemButton
            key={i}
            sx={{ mb: 3 }}
            onClick={() => handleRoute(val.url)}
          >
            <ListItemAvatar>{val.icon}</ListItemAvatar>
            <ListItemText primary={val.title} secondary={val.subTitle} />
          </ListItemButton>
        ))}
      </List>
      <Typography fontSize={14} fontWeight={600} color={"#403f3f"}>
        Help & Support
      </Typography>
      <List
        sx={{
          "& .MuiListItemText-secondary": {
            fontSize: 11,
          },
          "& .MuiListItemText-primary": {
            fontSize: 17,
            fontWeight: 550,
          },
          "& .MuiListItemButton-root": {
            padding: 0.5,
          },
        }}
      >
        {helpSupport.map((val, i) => (
          <ListItemButton key={i} sx={{ mb: 3 }}>
            <ListItemAvatar>{val.icon}</ListItemAvatar>
            <ListItemText primary={val.title} secondary={val.subTitle} />
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
};

export default Profile;
