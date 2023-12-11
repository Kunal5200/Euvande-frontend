import data from "@/assests/data";
import { Divider, Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import rollsRyce from "@/brandImage/rollsroyce.webp";

const CarInfo = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [variantType, setVariantType] = useState("");
  const [driven, setDriven] = useState("");
  const [specifications, setSpecifications] = useState({});
  useEffect(() => {
    setBrand(localStorage.getItem("brand"));
    setModel(localStorage.getItem("model"));
    setYear(localStorage.getItem("year"));
    setVariantType(localStorage.getItem("variantType"));
    setDriven(localStorage.getItem("driven"));
    const quality = localStorage.getItem("specifications");
    setSpecifications(JSON.parse(quality));
  }, []);

  return (
    <div>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={3}
        className="text-white"
      >
        <Paper>
          <img src={rollsRyce.src} width={150} />
        </Paper>
        <div>
          <Stack direction={"row"}>
            <h1 className="text-capitalize">{brand && brand} - </h1>
            <h1> {model ? model : ""}</h1>
          </Stack>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <p className="f-12 mb-0">{variantType}</p>
            <div
              className="dot"
              style={{
                backgroundColor: "#ffffff",
                width: "5px",
                height: "5px",
              }}
            ></div>
            <p className="f-12 mb-0">{year}</p>
            <div
              className="dot"
              style={{
                backgroundColor: "#ffffff",
                width: "5px",
                height: "5px",
              }}
            ></div>
            <p className="mb-0 f-12">{driven}</p>
            <div
              className="dot"
              style={{
                backgroundColor: "#ffffff",
                width: "5px",
                height: "5px",
              }}
            ></div>
            <p className="mb-0 f-12">{specifications.transmission}</p>
          </Stack>
        </div>
      </Stack>
    </div>
  );
};

export default CarInfo;
