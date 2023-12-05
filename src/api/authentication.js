import securedAPI from "./config";
import publicAPI from "./config";
export const authControllers = {
  loginRegister: async () => {
    try {
      let result = await publicAPI.publicAPI.post(
        "authentication/api/user/loginOrRegister"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  verifyEmail: async (data) => {
    try {
      let result = await publicAPI.publicAPI.post(
        "authentication/api/updateEmail/emailVerification",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
