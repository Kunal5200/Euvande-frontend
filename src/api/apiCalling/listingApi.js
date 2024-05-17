import { loggedIn } from "@/redux/reducers/user";
import { listingController } from "../listing";

export const getUserInfo = ({ dispatch, setUser }) => {
  listingController
    .getUserDetails()
    .then((res) => {
      const response = res.data.data;
      setUser(response);
      dispatch(loggedIn({ ...response }));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSellerPendingCars = ({
  status,
  page,
  pageSize,
  setData,
  setLoading,
}) => {
  status
    ? listingController
        .getSellerPendingCars({ status, page, pageSize })
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(true);
        })
    : listingController
        .getSellerPendingCars({ page, pageSize })
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(true);
        });
};

export const getAllMakePublic = ({ setBrand }) => {
  listingController
    .getPublicMake()
    .then((res) => {
      setBrand(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPeriod = ({ setPeriod, data }) => {
  listingController
    .getPublicPeriod(data)
    .then((res) => {
      setPeriod(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getModelByYear = ({ setModel, data }) => {
  listingController
    .getPublicModel(data)
    .then((res) => {
      setModel(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCars = ({ loading, setCarData, body, pageSize, page }) => {
  // console.log("first", page);
  const data = {
    page,
    pageSize,
  };
  if (body) {
    data.body = body;
  }
  listingController
    .getCars(data)
    .then((res) => {
      // const response = res.data;
      setCarData(res.data.data);
      loading(false);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCarDetailsById = async ({
  carId,
  setLoading,
  setCarData,
  userId,
  status,
}) => {
  userId
    ? listingController
        .getCarDetailsByCarId({ carId, userId, status })
        .then((res) => {
          setCarData(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        })
    : listingController
        .getCarDetailsByCarId({ carId, status })
        .then((res) => {
          setCarData(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
};
