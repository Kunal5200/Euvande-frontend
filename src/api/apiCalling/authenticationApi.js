import { toast } from "react-toastify";
import { authControllers } from "../authentication";
import { hideModal, showModal } from "@/redux/reducers/modal";
import { VerifyOtp } from "@/assests/modalcalling/otpform";
import { VerifyPhoneOTP } from "@/assests/modalcalling/phoneOtpform";
import { loggedIn } from "@/redux/reducers/user";

// export const verifyEmail = ({ data, dispatch, setEmailVerify }) => {
//   let body = {
//     email: data,
//   };
//   authControllers
//     .verifyEmail(body)
//     .then((res) => {
//       toast.success(res.data.message);
//       localStorage.setItem("referenceId", res.data.data.referenceId);
//       dispatch(showModal(<VerifyOtp setEmailVerify={setEmailVerify} />));
//     })
//     .catch((err) => {
//       toast.error(err.response.data.message);
//     });
// };

export const sendOtpEmail = ({ data, dispatch, setEmailVerify }) => {
  let body = {
    email: data,
  };
  authControllers
    .sendOtponEmail(body)
    .then((res) => {
      toast.success(res.data.message);
      localStorage.setItem("referenceId", res.data.data.referenceId);
      dispatch(showModal(<VerifyOtp setEmailVerify={setEmailVerify} />));
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

export const addUser = ({ setLoading, body, router }) => {
  authControllers
    .registerUser(body)
    .then((res) => {
      toast.success(res.data.message);
      setLoading(false);
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
      toast.error(err.response.data.message);
    });
};

// export const verifyEmailOTP = ({ data, dispatch, setEmailVerify }) => {
//   authControllers
//     .emailOTPVerify(data)
//     .then((res) => {
//       toast.success(res.data.message);
//       dispatch(hideModal());
//       setEmailVerify(true);
//     })
//     .catch((err) => {
//       toast.error(err.response.data.message);
//     });
// };
export const otpEmailVerify = ({ data, dispatch, setEmailVerify }) => {
  authControllers
    .emailOtpVerification(data)
    .then((res) => {
      toast.success(res.data.message);
      dispatch(hideModal());
      setEmailVerify(true);
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};
// export const phoneNumberVerification = ({ data, dispatch, setPhoneVerify }) => {
//   authControllers
//     .phoneVerification(data)
//     .then((res) => {
//       toast.success(res.data.message);
//       setPhoneVerify(true);
//       localStorage.setItem("phoneId", res.data.data.referenceId);
//       dispatch(showModal(<VerifyPhoneOTP />));
//     })
//     .catch((err) => {
//       toast.error(err.response.data.message);
//     });
// };
export const sendOtpPhone = ({ data, dispatch, setPhoneVerify }) => {
  authControllers
    .sendOTPonPhone(data)
    .then((res) => {
      toast.success(res.data.message);
      setPhoneVerify(true);
      localStorage.setItem("phoneId", res.data.data.referenceId);
      dispatch(showModal(<VerifyPhoneOTP />));
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};


export const OtpphoneVerification = ({ data, dispatch }) => {
  authControllers
    .otpPhoneVerification(data)
    .then((res) => {
      toast.success(res.data.message);
      dispatch(hideModal());
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};
export const login = ({ body, router, dispatch }) => {
  authControllers
    .login(body)
    .then((res) => {
      const response = res.data.data;
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
      localStorage.setItem("isLogin", true);
      dispatch(loggedIn({ ...response, isAuthenticated: true }));
      toast.success(res.data.message);
      router.push("/");
    })
    .catch((err) => {
      toast.error(err.response.data.messsage);
    });
};
