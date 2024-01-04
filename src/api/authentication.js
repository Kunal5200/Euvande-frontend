import securedAPI from "./config";
import publicAPI from "./config";
import ngRokpublicAPI from "./config";
export const authControllers = {
  RegisterUser: async (body) => {
    try {
      let result = await publicAPI.publicAPI.post(
        "authentication/api/user/register",
        body
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  verifyOtp: async (body) => {
    try {
      let result = await publicAPI.publicAPI.post(
        "authentication/api/user/verify",
        body
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  loginUser: async (body) => {
    try {
      let result = await publicAPI.publicAPI.post(
        "authentication/api/user/login",
        body
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  getUserDetails: async () => {
    try {
      let result = await securedAPI.securedAPI.get(
        "/authentication/api/user/getUserDetail"
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  updateUserDetails: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "authentication/api/user/updateUserDetail",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  changePassword: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "authentication/api/user/changePassword",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  forgotPassword: async (data) => {
    try {
      let result = await publicAPI.publicAPI.post(
        "authentication/api/forgotPassword",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  verifyForgotPasswordOTP: async (data) => {
    try {
      let result = await publicAPI.publicAPI.post(
        "authentication/api/forgotPassword/verify",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  addAddress: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "authentication/api/address/addAddress",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  updatePhoneNumber: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "authentication/api/updatePhone/addOrUpdatePhone",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  removeAddress: async (data) => {
    try {
      let result = await securedAPI.securedAPI.get(
        `/authentication/api/address/removeAddress/${data}`
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  verifyPhoneOTP: async (data) => {
    try {
      let result = await securedAPI.securedAPI.post(
        "/authentication/api/updatePhone/phoneNoVerification",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
