import { getCars } from "@/api/apiCalling/listingApi";
import {
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import ReactSelect from "react-select";

const ModelFilter = ({
  model,
  modelHandler,
  selectedModel,
  setCarData,
  setLoading,
  page,
  pageSize,
  setFilter,
  filters,
}) => {
  const handleModelSelector = (e) => {
    setLoading(true);
    let body = {
      modelId: e.value,
    };
    setFilter({ ...filters, model: e.value });
    getCars({ loading: setLoading, pageSize, page, setCarData, body });
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
        zIndex: 999,
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
        {model.map((val, i) => (
          <ListItem disablePadding key={i}>
            <FormControl>
              <RadioGroup
                name="model"
                onChange={modelHandler}
                value={filters.model}
              >
                <FormControlLabel
                  control={<Radio size="small" />}
                  value={val.id}
                  label={val.modelName}
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
      {/* <ReactSelect
        options={model.map((val) => {
          return {
            label: val.modelName,
            value: val.id,
          };
        })}
        onChange={handleModelSelector}
        styles={colorStyles}
        placeholder="Select Model"
        components={{
          IndicatorSeparator: () => null,
        }}
      /> */}
    </div>
  );
};

export default ModelFilter;
