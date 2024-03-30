import OTPverifyPassword from "@/assests/modalcalling/forgotPasswordOTp";
import { hideModal, showModal } from "@/redux/reducers/modal";
import { setDetails } from "@/redux/reducers/userdetails";
import { toast } from "react-toastify";
import { authControllers } from "../authentication";
import { loggedIn } from "@/redux/reducers/user";
import { TroubleshootOutlined } from "@mui/icons-material";

export const userRegister = ({
  setLoading,
  body,
  setEmailVerify,
  dispatch,
}) => {
  authControllers
    .RegisterUser(body)
    .then((res) => {
      toast.success(res.data.message);
      localStorage.setItem("referenceId", res.data.data.referenceId);
      dispatch(setDetails({ ...res.data.data }));
      setLoading(false);
      setEmailVerify(true);
    })
    .catch((err) => {
      setLoading(false);
      let errMessage = err.response ? err.response.data.message : err.message;
      toast.error(errMessage);
    });
};

export const userVerify = ({ body, setLoading, router, dispatch }) => {
  authControllers
    .verifyOtp(body)
    .then((res) => {
      toast.success(res.data.message);
      dispatch(setDetails({ ...res.data.data, isAuthenticated: true }));
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
      setLoading(false);
      router.push("/");
    })
    .catch((err) => {
      setLoading(false);
      toast.error(err.response.data.message);
    });
};

export const loginUser = ({ body, router, setLoading, dispatch }) => {
  authControllers
    .loginUser(body)
    .then((res) => {
      const response = res.data.data;
      dispatch(setDetails({ ...response, isAuthenticated: true }));
      toast.success(res.data.message);
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
      setLoading(false);
      router.push("/");
    })
    .catch((err) => {
      setLoading(false);
      let errMessage = err.response ? err.response.data.message : err.message;
      toast.error(errMessage);
      console.log(err);
    });
};

export const getUserProfile = ({ setUser, dispatch, setLoading }) => {
  authControllers
    .getUserDetails()
    .then((res) => {
      const response = res.data.data;
      localStorage.setItem("group", res.data.data.group);
      dispatch(setDetails({ ...response, isAuthenticated: true }));
      setLoading && setLoading(false);
      setUser && setUser(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProfile = ({ setUser, dispatch }) => {
  authControllers
    .getUserDetails()
    .then((res) => {
      setUser(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateUserDetails = ({
  body,
  setLoading,
  router,
  dispatch,
  setUser,
}) => {
  authControllers
    .updateUserDetails(body)
    .then((res) => {
      toast.success(res.data.message);
      setLoading(false);
      router ? router.push("/sell-cars/upload-picture") : dispatch(hideModal());
      getUserProfile({ setUser, dispatch });
    })
    .catch((err) => {
      setLoading(false);
      toast.error(err.response.data.message);
    });
};

export const forgotPassword = ({ body, setLoading, dispatch }) => {
  authControllers
    .forgotPassword(body)
    .then((res) => {
      toast.success(res.data.message);
      localStorage.setItem("referenceId", res.data.data.referenceId);
      setLoading(false);
      dispatch(hideModal());

      dispatch(showModal(<OTPverifyPassword />));
    })
    .catch((err) => {
      toast.error(err.response.data.message);

      setLoading(false);
    });
};

export const verifyForgotPasswordOTP = ({ body, setLoading, dispatch }) => {
  authControllers
    .verifyForgotPasswordOTP(body)
    .then((res) => {
      toast.success(res.data.message);

      setLoading(false);
      dispatch(hideModal());
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

export const changePassword = ({ body, setLoading, setState }) => {
  authControllers
    .changePassword(body)
    .then((res) => {
      toast.success(res.data.message);
      window.location.reload();
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
      setLoading(false);
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      setLoading(false);
    });
};

export const guestLogin = () => {
  authControllers
    .guestLogin()
    .then((res) => {
      localStorage.setItem("accessToken", res.data.data.accessToken);
    })
    .catch((error) => {
      throw error;
    });
};

export const customLoginAndRegister = ({
  body,
  showOTPButton,
  showOTPfield,
  loading,
  handleNext,
}) => {
  authControllers
    .customLogin(body)
    .then((res) => {
      toast.success(res.data.message);
      if (res.data.data.referenceId) {
        localStorage.setItem("referenceId", res.data.data.referenceId);
      }
      showOTPButton && showOTPButton(false);
      showOTPfield && showOTPfield(true);
      handleNext && handleNext();
      loading(false);
    })
    .catch((err) => {
      let errMessage =
        (err.response && err.response.data.message) || err.message;
      toast.error(errMessage);
      loading(false);
      // console.log(err);
    });
};

export const verifyOTP = ({
  body,
  loading,
  showOTPfield,

  dispatch,
}) => {
  authControllers
    .verifyOtp(body)
    .then((res) => {
      localStorage.setItem("accessToken", res.data.data.accessToken);
      dispatch(setDetails({ ...res.data.data }));
      showOTPfield(false);
      loading(false);
      // verified(true);
    })
    .catch((err) => {
      loading(false);
      let errMessage =
        (err.response && err.response.data.message) || err.message;
      toast.error(errMessage);
    });
};
