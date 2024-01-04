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
};
