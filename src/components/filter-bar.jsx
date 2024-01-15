import { FILTERS } from "@/utils/enum";
import React from "react";
import Select from "react-select";

const Filterbar = () => {
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
    {
      label: FILTERS.RECOMMENDED,
      value: FILTERS.RECOMMENDED,
    },
    {
      label: FILTERS.LOWESTMILEAGE,
      value: FILTERS.LOWESTMILEAGE,
    },
    {
      label: FILTERS.HIGHESTDISCOUNT,
      value: FILTERS.HIGHESTDISCOUNT,
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
  };
  return (
    <div>
      <Select
        options={filterItem}
        styles={colorStyles}
        defaultValue={{ label: FILTERS.NEWESTAD, value: FILTERS.NEWESTAD }}
        components={{
          IndicatorSeparator: () => null,
        }}
        isSearchable={false}
      />
    </div>
  );
};

export default Filterbar;
