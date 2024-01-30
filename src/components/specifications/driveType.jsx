import styles from "@/styles/specifications.module.css";
import { Stack } from "@mui/material";
import Button from "../button";
const DriveType = ({ setActiveStep, activeStep, setState, state, data }) => {
  const handleChangeDriveType = (driveType) => {
    setActiveStep(activeStep + 1);
    setState({ ...state, driveType4WD: driveType });
  };
  return (
    <div>
      <Stack direction="row" spacing={2}>
        {data.map((val, i) => (
          <Button
            key={i}
            className={
              state.driveType4WD === val
                ? styles.selected_btn
                : styles.unselected_btn
            }
            onClick={() => handleChangeDriveType(val)}
            width={100}
            type="button"
          >
            {val}
          </Button>
        ))}
      </Stack>
      <Button
        className="custom_btn_white mt-2"
        onClick={() => setActiveStep(activeStep - 1)}
        type="button"
        backgroundColor="#000"
        color="#fff"
        width="100px"
      >
        Back
      </Button>
    </div>
  );
};

export default DriveType;
