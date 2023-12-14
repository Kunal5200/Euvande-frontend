import styles from "@/styles/profileSidebar.module.css";
import { tabsectionButton } from "@/utils/styles";
import { Card, Divider, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { FaBoxOpen, FaHeart } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import TabPanel from "../tabPanel";
import ProfileSettings from "./profile-settings";
const ProfileSidebar = () => {
  const tabsSection = [
    {
      label: "Orders",
      icon: <FaBoxOpen />,
    },
    {
      label: "Shortlisted Vehicle",
      icon: <FaHeart />,
    },
    {
      label: "Profile Settings",
      icon: <IoIosSettings />,
    },
  ];

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={styles.wrapper}>
      <div className="row">
        <div className="col-sm-4">
          <Card>
            <div className={styles.profile_wrapper}>
              <div className="p-3">
                <div className={styles.profile_image}>K</div>
                <p className="mt-2 mb-0 text-center">Kunal Sharma</p>
                <p>kunalsharma@yopmail.com</p>
              </div>
            </div>
            <Divider style={{ background: "#000", width: "100%" }} />
            <div className="p-3">
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
              >
                {tabsSection.map((val, i) => (
                  <Tab
                    icon={val.icon}
                    label={val.label}
                    key={i}
                    iconPosition="start"
                    sx={tabsectionButton}
                    className="mb-3 justify-content-start"
                  />
                ))}
              </Tabs>
              <div className="col-">
                <TabPanel value={value} index={0}></TabPanel>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-sm-8">
          <TabPanel value={value} index={0}>
            order
          </TabPanel>
          <TabPanel value={value} index={1}>
            Short listed vehicle
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ProfileSettings />
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
