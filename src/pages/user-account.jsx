import { getUserProfile } from "@/api/apiCalling/authenticationApi";
import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const UserAccount = () => {
  const [userData, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getUserProfile({ setUser, setLoading, dispatch });
  }, []);
  return (
    <div>
      <Container maxWidth="lg">
        <Grid container mt={2} mb={2}>
          <Grid item xs={12}>
            <Card sx={{ p: 2 }}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Stack direction={"row"} spacing={2}>
                  {loading ? (
                    <Skeleton variant="circle" />
                  ) : (
                    <Avatar>{userData && userData.name.slice(0, 1)}</Avatar>
                  )}
                  <Box>
                    <Typography
                      sx={{ textTransform: "capitalize", fontWeight: 600 }}
                    >
                      {userData && userData.name}
                    </Typography>
                    <Typography fontSize={12}>
                      {userData && userData.email}
                    </Typography>
                  </Box>
                </Stack>
                <IconButton>
                  <Edit fontSize="small" />
                </IconButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UserAccount;
