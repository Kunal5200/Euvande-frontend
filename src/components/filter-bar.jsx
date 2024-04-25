import { FILTERS } from "@/utils/enum";
import React from "react";
import Select from "react-select";

const Filterbar = (props) => {
  const filterItem = [
    {
      label: FILTERS.LOWESTPRICE,
      value: FILTERS.LOWESTPRICE,
    },
    {
      label: FILTERS.HIGHESTPRICE,
      value: FILTERS.HIGHESTPRICE,
    },
    {
      label: FILTERS.NEWESTAD,
      value: FILTERS.NEWESTAD,
    },
  ];

  const colorStyles = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
    }),
    option: (styles, state) => ({
      ...styles,
      fontSize: "12px",
    }),
    singleValue: (styles, state) => ({
      ...styles,
      fontSize: "12px",
    }),
    placeholder: (baseStyles, state) => {
      return {
        ...baseStyles,
        color: "#000",
        fontSize: 12,
      };
    },
  };

  return (
    <div>
      <Select
        options={filterItem}
        styles={colorStyles}
        // defaultValue={{ label: FILTERS.NEWESTAD, value: FILTERS.NEWESTAD }}
        components={{
          IndicatorSeparator: () => null,
        }}
        isSearchable={false}
        onChange={props.onChange}
        placeholder="SORT BY"
      />
    </div>
  );
};

export default Filterbar;
