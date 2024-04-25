import {
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

const PeriodFilter = ({ period, periodHandler, selectedPeriod }) => {
  return (
    <div>
      <List>
        {period.map((val, i) => (
          <ListItem disablePadding key={i}>
            <FormControl>
              <RadioGroup
                name="period"
                onChange={periodHandler}
                value={selectedPeriod}
              >
                <FormControlLabel
                  control={<Radio size="small" />}
                  value={val.id}
                  label={val.year}
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      textTransform: "capitalize",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PeriodFilter;
