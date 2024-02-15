import SecuredAPI from "./config";
import publicAPI from "./config";
import vehicleSecuredAPI from "./config";
import vehiclePublicAPI from "./config";
export const listingController = {
  getuserAddress: async () => {
    try {
      let result = await SecuredAPI.securedAPI.get("/api/address/getAddresses");
      return result;
    } catch (error) {
      throw error;
    }
  },
  getSellerPendingCars: async () => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.get(
        "/api/cars/getPendingCars"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getPublicMake: async () => {
    try {
      let result = await vehiclePublicAPI.vehcilePublicAPI.get(
        "/api/make/public/getAllMake"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getPublicPeriod: async (data) => {
    try {
      let result = await vehiclePublicAPI.vehcilePublicAPI.post(
        "/api/period/public/getPeriodByMake",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getPublicModel: async (data) => {
    try {
      let result = await vehiclePublicAPI.vehcilePublicAPI.post(
        "/api/model/public/getModelByYear",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCars: async (body) => {
    try {
      let result = await vehicleSecuredAPI.vehicleSecuredAPI.post(
        "/api/newCars/getCarList?page=1&&pageSize=50",
        body
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCarDetailsByCarId: async (carId) => {
    try {
      let result = await vehiclePublicAPI.vehcilePublicAPI.get(
        `/api/newCars/getCarDetailById/${carId}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getDefaultSpecificationPublic: async (data) => {
    try {
      let result = await vehiclePublicAPI.vehcilePublicAPI.get(
        "/api/carSpecification/public/getDefaultSpecification"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
