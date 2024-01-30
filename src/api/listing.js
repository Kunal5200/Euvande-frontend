import SecuredAPI from "./config";

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
};
