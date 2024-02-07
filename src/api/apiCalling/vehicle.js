import { toast } from "react-toastify";
import { vehicleController } from "../addVehicle";
import { setCarDetails } from "@/redux/reducers/vehicleInformation";

export const addCar = ({
  body,
  router,
  path,
  dispatch,
  setLoading,
  setCarData,
}) => {
  vehicleController
    .addVehicle(body)
    .then((res) => {
      dispatch(setCarDetails({ ...res.data.data }));
      setLoading && setLoading(false);
      getCarDetails({ setCarData, setLoading, carId: res.data.data.id });
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

export const addSpecification = ({ data, router, path, setLoading }) => {
  vehicleController
    .addSpecifications(data)
    .then((res) => {
      router.push(path);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
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
      setLoading && setLoading(true);
    });
};

export const sendForApprovalCar = ({ carId, setLoading, router }) => {
  vehicleController
    .sendForApprovals(carId)
    .then((res) => {
      toast.success(res.data.message);
      localStorage.removeItem("carId");
      setLoading(false);
      router.push("/user-profile");
    })
    .catch((err) => {
      let errMessage =
        (err.response && err.response.data.message) ||
        err.message ||
        "Network Error";
      toast.error(errMessage);
      setLoading(false);
    });
};
