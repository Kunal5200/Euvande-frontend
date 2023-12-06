import { toast } from "react-toastify";
import { authControllers } from "../authentication";
import { hideModal, showModal } from "@/redux/reducers/modal";
import { VerifyOtp } from "@/assests/modalcalling/otpform";
import { VerifyPhoneOTP } from "@/assests/modalcalling/phoneOtpform";

export const verifyEmail = ({ data, dispatch }) => {
  let body = {
    email: data,
  };
  authControllers
    .verifyEmail(body)
    .then((res) => {
      toast.success(res.data.message);
      localStorage.setItem("referenceId", res.data.data.referenceId);
      dispatch(showModal(<VerifyOtp />));
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

export const addUser = ({ setLoading, body, router }) => {
  authControllers
    .registerUser(body)
    .then((res) => {
      console.log(res);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};

export const verifyEmailOTP = ({ data, dispatch }) => {
  authControllers
    .emailOTPVerify(data)
    .then((res) => {
      toast.success(res.data.message);
      dispatch(hideModal());
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};
export const phoneNumberVerification = ({ data, dispatch }) => {
  authControllers
    .phoneVerification(data)
    .then((res) => {
      toast.success(res.data.message);
      localStorage.setItem("phoneId", res.data.data.referenceId);
      dispatch(showModal(<VerifyPhoneOTP />));
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

export const phoneNumberOTPVerification = ({ data, dispatch }) => {
  authControllers
    .phoneOTPVerification(data)
    .then((res) => {
      toast.success(res.data.message);
      dispatch(hideModal());
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};
export const login = (data) => {
  authControllers
    .login(data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
