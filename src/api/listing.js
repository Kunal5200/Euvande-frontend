import ngRokSecuredAPI from "./config";

export const listingController = {
  getUserDetails: async () => {
    try {
      let result = await ngRokSecuredAPI.ngRokSecuredAPI.post(
        "/api/user/getUserDetail",
        {}
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
