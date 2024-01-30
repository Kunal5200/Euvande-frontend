import { Delete, Done } from "@mui/icons-material";
import { Box, Button, Chip, Grid } from "@mui/material";
import React, { useState } from "react";

const Equipment = ({ setActiveStep, activeStep, setState, state, data }) => {
  const [equipment, setEquipment] = useState([]);
  const handleSelectEquipment = (data) => {
    const previousEquipment = equipment.includes(data);
    if (previousEquipment) {
      const findIndex = equipment.findIndex((item) => item === data);
      const updatedEquipment = [...equipment];
      updatedEquipment.splice(findIndex, 1);
      setEquipment(updatedEquipment);
      setState({ ...state, equipments: updatedEquipment });
    } else {
      setEquipment((prevEquiment) => [...prevEquiment, data]);
      setState({ ...state, equipments: [...state.equipments, data] });
    }
  };
  const getChipBgColor = (data) => {
    return equipment.includes(data) ? "#1976d2" : "";
  };
  const getChiptextColor = (data) => {
    return equipment.includes(data) ? "#ffffff" : "";
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {data.map((val, i) => (
          <Grid item lg={4} key={i}>
            <Chip
              label={val}
              sx={{
                textTransform: "capitalize",
                bgcolor: getChipBgColor(val),
                color: getChiptextColor(val),
                "&:hover": {
                  bgcolor: getChipBgColor(val),
                },
              }}
              onClick={() => handleSelectEquipment(val)}
              deleteIcon={equipment ? <Done /> : <Delete />}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginLeft: 2, marginTop: 3 }}
      >
        back
      </Button>
    </Box>
  );
};

export default Equipment;
