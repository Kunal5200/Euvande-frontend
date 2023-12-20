import securedAPI from "./config";

export const vehicleController = {
  getMake: async () => {
    try {
      let result = await securedAPI.securedAPI.get(
        "vehicle/api/make/getAllMake"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getPeriodByMake: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "/vehicle/api/period/getPeriodByMake",data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getModels: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "vehicle/api/model/getModel",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getVariants: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "/vehicle/api/variant/getVariantByModel",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getOdometer: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "/vehicle/api/odometer/getOdometerByVariants",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getSpecifications: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "vehicle/api/specification/getSpecification",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
