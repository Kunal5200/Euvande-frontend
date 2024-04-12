import { Card, Grid, Typography } from "@mui/material";
const Recommended = ({ data }) => {
  return (
    <div>
      <Card sx={{ p: 5 }}>
        <Typography variant="h1" color="initial" fontSize={20} fontWeight={600}>
          Recommended by 1 Lakh+ sellers across Europe
        </Typography>
        <Grid container mt={2} spacing={2}>
          {data.map((val, i) => (
            <Grid item lg={4}>
              <Card sx={{ backgroundColor: "#008190", p: 2 }}>
                <img src={val.img} width={20} />
                <Typography
                  fontSize={25}
                  fontWeight={700}
                  mt={2}
                  mb={2}
                  color={"#fff"}
                >
                  {val.title}{" "}
                  <Typography variant="span" fontSize={15} fontWeight={500}>
                    {val.spanTitle}
                  </Typography>{" "}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>
    </div>
  );
};

export default Recommended;
