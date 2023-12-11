import securedAPI from "./config";
import publicAPI from "./config";
import ngRokpublicAPI from "./config";
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

  login: async (data) => {
    try {
      let result = await ngRokpublicAPI.ngROKpublicAPI.post(
        "/api/user/login",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  verifyEmail: async (data) => {
    try {
      let result = await ngRokpublicAPI.ngROKpublicAPI.post(
        "/api/updateEmail/addOrUpdateEmail",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  registerUser: async (data) => {
    try {
      let result = await ngRokpublicAPI.ngROKpublicAPI.post(
        "/api/user/UserRegistration",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  emailOTPVerify: async (data) => {
    try {
      let result = await ngRokpublicAPI.ngROKpublicAPI.post(
        "/api/updateEmail/emailVerification",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  emailOtpVerification: async (data) => {
    try {
      let result = await ngRokpublicAPI.ngROKpublicAPI.post(
        "/api/updateEmail/EmailOtpVerification",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  phoneVerification: async (data) => {
    try {
      let result = await ngRokpublicAPI.ngROKpublicAPI.post(
        "api/updatePhone/addOrUpdatePhone",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  sendOTPonPhone: async (data) => {
    try {
      let result = await ngRokpublicAPI.ngROKpublicAPI.post(
        "api/updatePhone/SendOtpOnPhone",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  phoneOTPVerification: async (data) => {
    try {
      let result = await ngRokpublicAPI.ngROKpublicAPI.post(
        "api/updatePhone/phoneNoVerification",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  otpPhoneVerification: async (data) => {
    try {
      let result = await ngRokpublicAPI.ngROKpublicAPI.post(
        "api/updatePhone/phoneNoVerification",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },

  sendOtponEmail: async (data) => {
    try {
      let result = await ngRokpublicAPI.ngROKpublicAPI.post(
        "api/updateEmail/SendOtpOnEmail",
        data
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
};
