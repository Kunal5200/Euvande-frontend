import { toast } from "react-toastify";
import { authControllers } from "../authentication";
import { hideModal, showModal } from "@/redux/reducers/modal";
import OTPverifyPassword from "@/assests/modalcalling/forgotPasswordOTp";

export const userRegister = ({ setLoading, body, setEmailVerify }) => {
  authControllers
    .RegisterUser(body)
    .then((res) => {
      toast.success(res.data.message);
      localStorage.setItem("referenceId", res.data.data.referenceId);
      setLoading(false);
      setEmailVerify(true);
    })
    .catch((err) => {
      setLoading(false);
      toast.error(err.response.data.message);
    });
};

export const userVerify = ({ body, setLoading, router }) => {
  authControllers
    .verifyOtp(body)
    .then((res) => {
      toast.success(res.data.message);
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

export const loginUser = ({ body, router, setLoading }) => {
  authControllers
    .loginUser(body)
    .then((res) => {
      toast.success(res.data.message);
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("refreshToken", res.data.data.refreshToken);
      setLoading(false);
      router.push('/');
    })
    .catch((err) => {
      setLoading(false);
      toast.error(err.response.data.message);
    });
};

export const getUserProfile = ({ setState, setUser, state }) => {
  authControllers
    .getUserDetails()
    .then((res) => {
      setState({
        ...state,
        name: res.data.data.name,
        email: res.data.data.email,
        phoneNumber: res.data.data.phoneNo,
      });
      setUser(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateUserDetails = ({ body, setLoading, router }) => {
  authControllers
    .updateUserDetails(body)
    .then((res) => {
      toast.success(res.data.message);
      setLoading(false);

      router.push("/sell-cars/upload-picture");
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

