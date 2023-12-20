import hatchback from "@/icons/bodyType/hatchback.svg";
import muv from "@/icons/bodyType/muv.svg";
import sedan from "@/icons/bodyType/sedan.svg";
import suv from "@/icons/bodyType/suv.svg";
import { bodyTypeTabButton } from "@/utils/styles";
import { Box, ButtonBase, Container, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TabPanel from "../tabPanel";
import Icons from "./icons";
import SmallCarCard from "./smallCardCar";
import data from "@/assests/data";
import Button from "../button";
const BodyType = () => {
  const [value, setValue] = useState(0);
  const tabs = [
    {
      label: "Suv",
      icon: suv,
    },
    {
      label: "Family Car",
      icon: hatchback,
    },
    {
      label: "Estate",
      icon: sedan,
    },

    {
      label: "City",
      icon: suv,
    },
    {
      label: "Luxury",
      icon: muv,
    },
    {
      label: "Nearly new",
      icon: muv,
    },
    {
      label: "Sport",
      icon: muv,
    },
  ];
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <Box className="my-4">
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Tabs
          scrollButtons={"auto"}
          allowScrollButtonsMobile
          variant="scrollable"
          value={value}
          onChange={handleChange}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "8px",
            border: "1px solid #000",
          }}
        >
          {tabs.map((val, i) => (
            <Tab
              label={val.label}
              icon={<Icons img={val.icon} />}
              sx={bodyTypeTabButton}
              key={i}
            />
          ))}
        </Tabs>
      </Box>
      <Box marginTop={{ xs: 2, lg: 4 }}>
        <TabPanel index={0} value={value}>
          <Container>
            <Grid container spacing={2}>
              {data.suv.map((val) => (
                <Grid item xs={6} lg={3}>
                  <SmallCarCard
                    img={val.img}
                    name={val.name}
                    driven={val.driven}
                    transmission={val.transmission}
                    variant={val.variant}
                    price={val.price}
                  />
                </Grid>
              ))}
            </Grid>
            <Box textAlign={"center"}>
              <Button className="custom_btn mt-3" width="250px" rounded={20}>
                <span>View SUV Cars</span>
                <span>View SUV Cars</span>
              </Button>
            </Box>
          </Container>
        </TabPanel>
        <TabPanel index={1} value={value}>
          <Container>
            <Grid container spacing={2}>
              {data.suv.map((val) => (
                <Grid item xs={6} lg={3}>
                  <SmallCarCard
                    img={val.img}
                    name={val.name}
                    driven={val.driven}
                    transmission={val.transmission}
                    variant={val.variant}
                    price={val.price}
                  />
                </Grid>
              ))}
            </Grid>
            <Box textAlign={"center"}>
              <Button className="custom_btn mt-3" width="250px" rounded={20}>
                <span>View Family Cars</span>
                <span>View Family Cars</span>
              </Button>
            </Box>
          </Container>
        </TabPanel>
        <TabPanel index={2} value={value}>
          <Container>
            <Grid container spacing={2}>
              {data.suv.map((val) => (
                <Grid item xs={6} lg={3}>
                  <SmallCarCard
                    img={val.img}
                    name={val.name}
                    driven={val.driven}
                    transmission={val.transmission}
                    variant={val.variant}
                    price={val.price}
                  />
                </Grid>
              ))}
            </Grid>
            <Box textAlign={"center"}>
              <Button className="custom_btn mt-3" width="250px" rounded={20}>
                <span>View Estate Cars</span>
                <span>View Estate Cars</span>
              </Button>
            </Box>
          </Container>
        </TabPanel>
        <TabPanel index={3} value={value}>
          <Container>
            <Grid container spacing={2}>
              {data.suv.map((val) => (
                <Grid item xs={6} lg={3}>
                  <SmallCarCard
                    img={val.img}
                    name={val.name}
                    driven={val.driven}
                    transmission={val.transmission}
                    variant={val.variant}
                    price={val.price}
                  />
                </Grid>
              ))}
            </Grid>
            <Box textAlign={"center"}>
              <Button className="custom_btn mt-3" width="250px" rounded={20}>
                <span>View City Cars</span>
                <span>View City Cars</span>
              </Button>
            </Box>
          </Container>
        </TabPanel>
        <TabPanel index={4} value={value}>
          <Container>
            <Grid container spacing={2}>
              {data.suv.map((val) => (
                <Grid item xs={6} lg={3}>
                  <SmallCarCard
                    img={val.img}
                    name={val.name}
                    driven={val.driven}
                    transmission={val.transmission}
                    variant={val.variant}
                    price={val.price}
                  />
                </Grid>
              ))}
            </Grid>
            <Box textAlign={"center"}>
              <Button className="custom_btn mt-3" width="250px" rounded={20}>
                <span>View Luxury Cars</span>
                <span>View Luxury Cars</span>
              </Button>
            </Box>
          </Container>
        </TabPanel>
        <TabPanel index={5} value={value}>
          <Container>
            <Grid container spacing={2}>
              {data.suv.map((val) => (
                <Grid item xs={6} lg={3}>
                  <SmallCarCard
                    img={val.img}
                    name={val.name}
                    driven={val.driven}
                    transmission={val.transmission}
                    variant={val.variant}
                    price={val.price}
                  />
                </Grid>
              ))}
            </Grid>
            <Box textAlign={"center"}>
              <Button className="custom_btn mt-3" width="250px" rounded={20}>
                <span>View New Cars</span>
                <span>View New Cars</span>
              </Button>
            </Box>
          </Container>
        </TabPanel>
        <TabPanel index={6} value={value}>
          <Container>
            <Grid container spacing={2}>
              {data.suv.map((val) => (
                <Grid item xs={6} lg={3}>
                  <SmallCarCard
                    img={val.img}
                    name={val.name}
                    driven={val.driven}
                    transmission={val.transmission}
                    variant={val.variant}
                    price={val.price}
                  />
                </Grid>
              ))}
            </Grid>
            <Box textAlign={"center"}>
              <Button className="custom_btn mt-3" width="250px" rounded={20}>
                <span>View Sport Cars</span>
                <span>View Sport Cars</span>
              </Button>
            </Box>
          </Container>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default BodyType;
