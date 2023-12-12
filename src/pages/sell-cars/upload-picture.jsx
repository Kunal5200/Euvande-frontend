import data from "@/assests/data";
import Button from "@/components/button";
import ImageUpload from "@/components/imageUpload";
import LinkTab from "@/components/linktab";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Divider,
} from "@mui/material";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
const UploadPicture = () => {
  let carRef = useRef();
  const router = useRouter();
  const [carPicture, setCarPicture] = useState([]);
  const [pictures, setPictures] = useState([]);
  const carPictureHandler = () => {
    const files = carRef.current.files;

    const pictureUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPictures((prevPictures) => ({ ...prevPictures, files }));
    setCarPicture(pictureUrls);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (pictures) {
      localStorage.setItem("pictures", JSON.stringify(carPicture));
      router.push("/sell-cars/car-details");
    } else {
      toast.error("Please Select Pictures");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row mb-3">
          <div className="col-sm-8 m-auto">
            <LinkTab />
            <form onSubmit={submitHandler}>
              <Card className=" py-3">
                <div className="p-2">
                  <h5>Vehicle Photo Documentation</h5>
                </div>
                <Divider style={{ backgroundColor: "#000" }} />
                <div className="p-2">
                  <p className="f-12 fw-semibold mt-2">
                    Take photos of the car from all four sides as well as the
                    dashboard and interior equipment, including any damage or
                    wear to the interior and exterior (paint damage, curbed
                    rims, cracks, etc.).
                  </p>
                  <div>
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <h4 className="mb-2">Exterior</h4>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ImageUpload data={data.photoUpload} />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <h4 className="mb-2">Interior</h4>
                      </AccordionSummary>
                      <AccordionDetails>
                        <ImageUpload data={data.interiorPhotoUpload} />
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  <div className="text-end">
                    <Button className="custom_btn" type="submit" width={150}>
                      <span>Continue</span>
                      <span>Continue</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPicture;
