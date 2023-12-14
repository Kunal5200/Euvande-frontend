import { Info, Person, Lock } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { FaAddressCard, FaPhoneAlt } from "react-icons/fa";
import ChangePassword from "./change-password";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import EditUserProfile from "@/assests/modalcalling/editUserProfile";
const ProfileSettings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const editProfileModal = () => {
    dispatch(showModal(<EditUserProfile />));
  };
  return (
    <div>
      <div>
        <h4 className="fw-semibold mb-2">Profile Settings</h4>

        <div className="container ">
          <div className="row">
            <div className="col-sm-12">
              <Accordion defaultExpanded={true} className="mb-2">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack direction={"row"} spacing={1}>
                    <Person />
                    <h5>Contact Information</h5>
                  </Stack>
                </AccordionSummary>
                <Divider style={{ backgroundColor: "#000" }} />
                <AccordionDetails>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fw-semibold mb-2 f-25">Kunal sharma</p>
                    <p
                      className="f-12 text-primary pointer"
                      onClick={editProfileModal}
                    >
                      Edit Details
                    </p>
                  </div>
                  <p className="f-12 fw-semibold mb-1">
                    <EmailIcon className="me-2" fontSize="12px" />
                    kunalsharma@yopmail.com
                  </p>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="f-12 fw-semibold text-danger">
                      <FaPhoneAlt className="me-2" fontSize="12px" />
                      9891452700
                    </p>
                    <Tooltip title="Verify Phone Number" placement="top">
                      <IconButton>
                        <Info
                          fontSize="12px"
                          className="pointer"
                          style={{ color: "red" }}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion className="mb-2">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack direction={"row"} spacing={1}>
                    <Lock />
                    <h5>Change Password</h5>
                  </Stack>
                </AccordionSummary>
                <Divider style={{ backgroundColor: "#000" }} />
                <AccordionDetails>
                  <ChangePassword />
                </AccordionDetails>
              </Accordion>
              <Accordion className="mb-2">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <FaAddressCard />
                    <h5>Address</h5>
                  </Stack>
                </AccordionSummary>
                <Divider style={{ backgroundColor: "#000" }} />
                <AccordionDetails>
                  <ChangePassword />
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
