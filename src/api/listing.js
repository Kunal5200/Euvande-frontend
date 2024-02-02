import SecuredAPI from "./config";
import publicAPI from "./config";
export const listingController = {
  getuserAddress: async () => {
    try {
      let result = await SecuredAPI.securedAPI.get(
        "authentication/api/address/getAddresses"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getSellerPendingCars: async () => {
    try {
      let result = await SecuredAPI.securedAPI.get(
        "/vehicle/api/cars/getPendingCars"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getPublicMake: async () => {
    try {
      let result = await publicAPI.publicAPI.get(
        "/vehicle/api/make/public/getAllMake"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getPublicPeriod: async (data) => {
    try {
      let result = await publicAPI.publicAPI.post(
        "/vehicle/api/period/public/getPeriodByMake",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getPublicModel: async (data) => {
    try {
      let result = await publicAPI.publicAPI.post(
        "/vehicle/api/model/public/getModelByYear",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCars: async () => {
    try {
      let result = await SecuredAPI.securedAPI.post(
        "/vehicle/api/newCars/getCarList?page=1&&pageSize=50"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCarDetailsByCarId: async (carId) => {
    try {
      let result = await publicAPI.publicAPI.get(
        `/vehicle/api/newCars/getCarDetailById/${carId}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
