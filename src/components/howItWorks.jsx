import { Typography } from "@mui/material";
const HowWorks = (props) => {
  return (
    <div>
      <img src={props.img} width={"100%"} className="mb-4" />
      <Typography fontSize={20} variant="h5" fontWeight={700} >
        {props.heading}
      </Typography>
      <Typography fontSize={12} className="mt-3">
        {props.description}
      </Typography>
    </div>
  );
};

export default HowWorks;
