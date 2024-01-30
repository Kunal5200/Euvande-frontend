import { toast } from "react-toastify";
import { vehicleController } from "../addVehicle";
import { setCarDetails } from "@/redux/reducers/vehicleInformation";

export const addCar = ({ body, router, path, dispatch, setLoading }) => {
  vehicleController
    .addVehicle(body)
    .then((res) => {
      dispatch(setCarDetails({ ...res.data.data }));
      setLoading && setLoading(false);
      localStorage.setItem("carId", res.data.data.id);
      router && path && router.push(path);
    })
    .catch((err) => {
      let errMessage = err.response ? err.response.data.message : err.message;
      toast.error(errMessage);
      setLoading && setLoading(false);
    });
};
export const getCarInfo = ({ data, dispatch }) => {
  vehicleController
    .getCarInfo(data)
    .then((res) => {
      //   console.log("carInfo", res.data.data);
      dispatch(setCarDetails({ ...res.data.data }));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addSpecification = ({ data, router, path }) => {
  vehicleController
    .addSpecifications(data)
    .then((res) => {
      router.push(path);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSpecification = (setSpecification) => {
  vehicleController
    .getSpecifications()
    .then((res) => {
      setSpecification(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const addImageUpload = ({ data, router, setLoading }) => {
  vehicleController
    .uploadPhotos(data)
    .then((res) => {
      setLoading(false);
      router.push("/sell-cars/car-details");
    })
    .catch((err) => {
      let errMessage = err.response ? err.response.data.message : err.message;
      toast.error(errMessage);
      setLoading(false);
    });
};

export const getCarDetails = ({ carId, setCarData, setLoading }) => {
  vehicleController
    .getVehicleDetails(carId)
    .then((res) => {
      setCarData(res.data.data);
      setLoading && setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(true);
    });
};
