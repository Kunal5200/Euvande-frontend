import { getCars } from "@/api/apiCalling/listingApi";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";

const BodyType = ({
  specification,
  setFilters,
  filters,
  setCarData,
  setLoading,
  page,
  pageSize,
}) => {
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

  const user = useSelector((state) => state.userInfo);
  const vehicleTypeChangeHandler = (e, newValue) => {
    setLoading(true);
    setFilters({ ...filters, vehicleType: newValue });
    let body = user
      ? {
          vehicleType: newValue,
          userId: user.id,
        }
      : {
          vehicleType: newValue,
        };
    getCars({ loading: setLoading, setCarData, pageSize, page, body });
  };
  return (
    <div>
      {/* <ReactSelect
        options={specification.vehicleType.map((val) => {
          return {
            label: val,
            value: val,
          };
        })}
        styles={colorStyles}
        components={{
          IndicatorSeparator: () => null,
        }}
        placeholder="Select Body"
        onChange={vehicleTypeChangeHandler}
      /> */}
      <Autocomplete
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Body Type"
            sx={{
              "& label": {
                fontSize: 13,
                top: 5,
              },
            }}
          />
        )}
        options={specification.vehicleType}
        onChange={vehicleTypeChangeHandler}
        value={filters.vehicleType}
      />
    </div>
  );
};

export default BodyType;
