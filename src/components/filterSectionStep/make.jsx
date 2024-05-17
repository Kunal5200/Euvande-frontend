import { getCars } from "@/api/apiCalling/listingApi";
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";

const MakeFilter = ({
  make,
  makeHandleChange,
  selectedMake,
  filters,
  setFilter,
  setCarData,
  setLoading,
  page,
  pageSize,
}) => {
  const user = useSelector((state) => state.userInfo);

  const makeHandler = (e) => {
    setLoading(true);
    setFilter({ ...filters, make: e.value });
    let body = {
      makeId: e.value,
    };
    getCars({ loading: setLoading, setCarData, pageSize, page, body });
  };

  const handleMakeChange = (e) => {
    setLoading(true);
    setFilter({ ...filters, make: e.target.value });
    let body = {
      makeId: parseInt(e.target.value),
    };
    getCars({ body, loading: setLoading, setCarData, pageSize, page });
  };
  const colorStyles = {
    control: (baseStyles, { isFocused }) => ({
      ...baseStyles,
      backgroundColor: "transparent",
      borderColor: "transparent",
      boxShadow: "none",
      fontSize: "12px",
      width: "100%",
      fontWeight: "400",
      color: "#000",
      borderWidth: 0.2,
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        textTransform: "upperCase",
        backgroundColor: isSelected ? "#000" : "#ffffff",
        zIndex: 9999,
        color: isSelected ? "#fff" : "#000",
        fontSize: 12,
      };
    },
    placeholder: (baseStyles, state) => {
      return {
        ...baseStyles,
        color: "#000",
      };
    },
    singleValue: (provided, state) => ({
      ...provided,
      color: "#000",
      textTransform: "capitalize",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "#000",
    }),
  };
  return (
    <div>
      <List>
        {make.map((val, i) => (
          <ListItem disablePadding key={i}>
            <FormControl>
              <RadioGroup
                name="make"
                onChange={handleMakeChange}
                value={filters.make}
              >
                <FormControlLabel
                  control={<Radio size="small" />}
                  value={val.id}
                  label={val.makeName}
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: 13,
                      textTransform: "uppercase",
                    },
                  }}
                />
              </RadioGroup>
            </FormControl>
          </ListItem>
        ))}
      </List>

      {/* <ReactSelect
        options={make.map((val) => {
          return {
            label: val.makeName,
            value: val.id,
          };
        })}
        styles={colorStyles}
        components={{
          IndicatorSeparator: () => null,
        }}
        placeholder="Select Make"
        onChange={makeHandler}
      /> */}
    </div>
  );
};

export default MakeFilter;
