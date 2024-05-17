import { getCars } from "@/api/apiCalling/listingApi";
import { useDebounced } from "@/hooks/debounced";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MakeFilter from "./filterSectionStep/make";
import PeriodFilter from "./filterSectionStep/periodFilter";
import ModelFilter from "./filterSectionStep/modelFilter";
import PriceRange from "./filterSectionStep/priceRange";
import TransmissionFilter from "./filterSectionStep/transmissionFilter";
import BodyType from "./filterSectionStep/bodyType";
import { listingController } from "@/api/listing";
import FuelType from "./filterSectionStep/fuelType";
import InteriorMaterial from "./filterSectionStep/interiorMaterialFilter";
import DriveType4WD from "./filterSectionStep/driveType4WD";
import SeatsFilter from "./filterSectionStep/seatsFilter";
function valuetext(value) {
  return `€ ${value}`;
}

const FilterSection = ({
  make,
  period,
  makeHandleChange,
  selectedMake,
  periodHandler,
  selectedPeriod,
  model,
  selectedModel,
  modelHandler,
  setCarData,
  carData,
  page,
  pageSize,
  setLoading,
  filters,
  setFilters,
  removeFilter,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordion = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // useEffect(() => {
  //   const maxPriceValue = parseInt(debouncedMaxPrice);
  //   const minPriceValue = parseInt(debouncedMinPrice);

  //   if (!isNaN(maxPriceValue) || !isNaN(minPriceValue)) {
  //     let body =
  //       maxPrice === null
  //         ? user
  //           ? {
  //               minPrice: minPriceValue,
  //               userId: user.id,
  //             }
  //           : {
  //               minPrice: minPriceValue,
  //             }
  //         : user
  //         ? {
  //             maxPrice: maxPriceValue,
  //             userId: user.id,
  //           }
  //         : {
  //             maxPrice: maxPriceValue,
  //           };
  //     getCars({ loading: setLoading, setCarData, page, pageSize, body });
  //   } else {
  //   }
  // }, [
  //   debouncedMaxPrice,
  //   debouncedMinPrice,
  //   setLoading,
  //   setCarData,
  //   page,
  //   pageSize,
  // ]);
  const [specification, setSpecification] = useState(null);
  useEffect(() => {
    listingController
      .getDefaultSpecificationPublic()
      .then((res) => {
        setSpecification(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log("specification", specification);

  return (
    <Box>
      <Accordion
        sx={{
          boxShadow: "none",
          width: "100%",
        }}
        onChange={handleAccordion("panel1")}
        // defaultExpanded={true}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{
            borderBottom:
              expanded === "panel1" ? "1px solid #eee" : "1px solid #eee",
          }}
        >
          <Typography variant="h4" fontSize={15}>
            Make
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ height: 200, overflowY: "auto" }}>
          <MakeFilter
            make={make}
            makeHandleChange={makeHandleChange}
            selectedMake={selectedMake}
            setLoading={setLoading}
            setCarData={setCarData}
            page={page}
            pageSize={pageSize}
            filters={filters}
            setFilter={setFilters}
          />
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Accordion
        sx={{
          boxShadow: "none",
          width: "100%",
        }}
        onChange={handleAccordion("panel2")}
        expanded={expanded === "panel2"}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ borderBottom: expanded === "panel2" ? "1px solid #eee" : "" }}
        >
          <Typography variant="h4" fontSize={15}>
            Year
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ height: period.length ? 200 : 50, overflowY: "auto" }}
        >
          <PeriodFilter
            period={period}
            selectedPeriod={selectedPeriod}
            periodHandler={periodHandler}
            filters={filters}
            setFilters={setFilters}
          />
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Accordion
        sx={{
          boxShadow: "none",
          width: "100%",
        }}
        onChange={handleAccordion("panel3")}
        expanded={expanded === "panel3"}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ borderBottom: expanded === "panel3" ? "1px solid #eee" : "" }}
        >
          <Typography variant="h4" fontSize={15}>
            Model
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ height: model.length ? 200 : 50, overflowY: "auto" }}
        >
          <ModelFilter
            model={model}
            selectedModel={selectedModel}
            modelHandler={modelHandler}
            filters={filters}
            setFilter={setFilters}
          />
        </AccordionDetails>
      </Accordion>
      <Divider />
      {/* <Accordion
        sx={{
          boxShadow: "none",
          width: "100%",
        }}
        onChange={handleAccordion("panel4")}
        expanded={expanded === "panel4"}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ borderBottom: expanded === "panel4" ? "1px solid #eee" : "" }}
        >
          <Typography variant="h4" fontSize={15}>
            Price Range
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PriceRange
            filters={filters}
            setFilters={setFilters}
            setLoading={setLoading}
            setCarData={setCarData}
            page={page}
            pageSize={pageSize}
          />
        </AccordionDetails>
      </Accordion> */}
      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontSize: 15 }} variant="h4">
          Price Range
        </Typography>
        <PriceRange
          filters={filters}
          setFilters={setFilters}
          setLoading={setLoading}
          setCarData={setCarData}
          page={page}
          pageSize={pageSize}
        />
      </Box>

      <Divider />
      {/* <Accordion
        sx={{
          boxShadow: "none",
          width: "100%",
        }}
        onChange={handleAccordion("panel5")}
        expanded={expanded === "panel5"}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ borderBottom: expanded === "panel5" ? "1px solid #eee" : "" }}
        >
          <Typography variant="h4" fontSize={15}>
            Transmission
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {specification && specification.transmission && (
            <TransmissionFilter
              specification={specification.transmission}
              filters={filters}
              setFilters={setFilters}
              setLoading={setLoading}
              setCarData={setCarData}
              page={page}
              pageSize={pageSize}
            />
          )}
        </AccordionDetails>
      </Accordion> */}
      <Box sx={{ p: 2 }}>
        <Typography fontSize={15} variant="h4">
          Transmission
        </Typography>
        <Box sx={{ mt: 2 }}>
          {specification && specification.transmission && (
            <TransmissionFilter
              specification={specification.transmission}
              filters={filters}
              setFilters={setFilters}
              setLoading={setLoading}
              setCarData={setCarData}
              page={page}
              pageSize={pageSize}
            />
          )}
        </Box>
      </Box>
      <Divider />
      {/* <Accordion
        sx={{
          boxShadow: "none",
          width: "100%",
        }}
        onChange={handleAccordion("panel6")}
        expanded={expanded === "panel6"}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ borderBottom: expanded === "panel6" ? "1px solid #eee" : "" }}
        >
          <Typography variant="h4" fontSize={15}>
            Fuel Type
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {specification && specification.fuel && (
            <FuelType
              setCarData={setCarData}
              setFilters={setFilters}
              filters={filters}
              setLoading={setLoading}
              page={page}
              pageSize={pageSize}
              specification={specification}
            />
          )}
        </AccordionDetails>
      </Accordion> */}
      <Box sx={{ p: 2 }}>
        <Typography fontSize={15} variant="h4">
          Fuel Type
        </Typography>
        <Box sx={{ mt: 2 }}>
          {specification && specification.fuel && (
            <FuelType
              setCarData={setCarData}
              setFilters={setFilters}
              filters={filters}
              setLoading={setLoading}
              page={page}
              pageSize={pageSize}
              specification={specification}
            />
          )}
        </Box>
      </Box>
      <Divider />
      {/* <Accordion
        sx={{
          boxShadow: "none",
          width: "100%",
        }}
        onChange={handleAccordion("panel7")}
        expanded={expanded === "panel7"}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ borderBottom: expanded === "panel7" ? "1px solid #eee" : "" }}
        >
          <Typography variant="h4" fontSize={15}>
            Interior Material
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {specification && specification.interiorMaterial && (
            <InteriorMaterial
              specification={specification}
              setCarData={setCarData}
              setLoading={setLoading}
              setFilters={setFilters}
              filters={filters}
              page={page}
              pageSize={pageSize}
            />
          )}
        </AccordionDetails>
      </Accordion> */}
      <Box sx={{ p: 2 }}>
        <Typography fontSize={15} variant="h4">
          Interior Material
        </Typography>
        <Box mt={2}>
          {specification && specification.interiorMaterial && (
            <InteriorMaterial
              specification={specification}
              setCarData={setCarData}
              setLoading={setLoading}
              setFilters={setFilters}
              filters={filters}
              page={page}
              pageSize={pageSize}
            />
          )}
        </Box>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography fontSize={15} variant="h4">
          Body Type
        </Typography>
        <Box mt={2}>
          {specification && specification.vehicleType && (
            <BodyType
              specification={specification}
              filters={filters}
              setFilters={setFilters}
              setLoading={setLoading}
              setCarData={setCarData}
              page={page}
              pageSize={pageSize}
            />
          )}
        </Box>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography fontSize={15} variant="h4">
          Drive Type 4x4
        </Typography>
        <Box mt={2}>
          {specification && specification.driveType4WD && (
            <DriveType4WD
              specification={specification}
              page={page}
              pageSize={pageSize}
              setCarData={setCarData}
              setFilters={setFilters}
              filters={filters}
              setLoading={setLoading}
            />
          )}
        </Box>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography fontSize={15} variant="h4">
          Seats
        </Typography>
        <Box mt={2}>
          {specification && specification.seats && (
            <SeatsFilter
              specification={specification}
              setCarData={setCarData}
              setLoading={setLoading}
              setFilters={setFilters}
              filters={filters}
              page={page}
              pageSize={pageSize}
            />
          )}
        </Box>
      </Box>
    </Box>
    // <Box>
    //   <Divider sx={{ backgroundColor: "#000" }} />
    //   <Box sx={{ p: 2 }}>
    //     <Grid container alignItems={"center"} mb={3}>
    //       <Grid item lg={7}>
    //         <Typography fontSize={14}>Make</Typography>
    //       </Grid>
    //       <Grid item lg={5}>
    //         <MakeFilter
    //           make={make}
    //           page={page}
    //           pageSize={pageSize}
    //           setCarData={setCarData}
    //           setLoading={setLoading}
    //           filters={filters}
    //           setFilter={setFilters}
    //         />
    //       </Grid>
    //     </Grid>
    //     <Grid container alignItems={"center"} mb={3}>
    //       <Grid item lg={7}>
    //         <Typography fontSize={14}>Model</Typography>
    //       </Grid>
    //       <Grid item lg={5}>
    //         <ModelFilter
    //           model={model}
    //           page={page}
    //           pageSize={pageSize}
    //           setCarData={setCarData}
    //           setLoading={setLoading}
    //           filters={filters}
    //           setFilter={setFilters}
    //         />
    //       </Grid>
    //     </Grid>
    //     <Grid container alignItems={"center"} mb={3}>
    //       <Grid item lg={7}>
    //         <Typography fontSize={14}>Vehicle Type</Typography>
    //       </Grid>
    //       <Grid item lg={5}>
    //         {specification && specification.vehicleType && (
    //           <BodyType
    //             specification={specification}
    //             filters={filters}
    //             setFilters={setFilters}
    //             setLoading={setLoading}
    //             setCarData={setCarData}
    //             page={page}
    //             pageSize={pageSize}
    //           />
    //         )}
    //       </Grid>
    //     </Grid>
    //   </Box>
    // </Box>
  );
};

export default FilterSection;
