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
        "/vehicle/api/period/getPeriodByMake",
        data
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

  getSpecifications: async () => {
    try {
      let result = await securedAPI.securedAPI.get(
        "/vehicle/api/carSpecification/getDefaultSpecification"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addVehicle: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "vehicle/api/cars/addCar",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getCarInfo: async (data) => {
    try {
      let result = await securedAPI.securedAPI.get(
        `/vehicle/api/cars/getCarById/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addSpecifications: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "/vehicle/api/cars/addSpecification",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  uploadPhotos: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "/vehicle/api/cars/addMedia",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getVehicleDetails: async (data) => {
    try {
      let result = await securedAPI.securedAPI.get(
        `/vehicle/api/cars/getCarDetailById/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  sendForApprovals: async (data) => {
    try {
      let result = await securedAPI.securedAPI.get(
        `/vehicle/api/cars/sendForApproval/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
