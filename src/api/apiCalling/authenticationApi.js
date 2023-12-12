import { toast } from "react-toastify";
import { authControllers } from "../authentication";

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
      toast.error(err.response.data.message);
      setLoading(false);
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
      toast.error(err.response.data.message);
      setLoading(false);
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
      router.back();
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      setLoading(false);
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
      });
      setUser(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateUserDetails = ({ body, setLoading, router }) => {
  const stateStringfy = JSON.stringify(body);
  authControllers
    .updateUserDetails(body)
    .then((res) => {
      toast.success(res.data.message);
      setLoading(false);

      router.push("/sell-cars/upload-picture");
    })
    .catch((err) => {
      toast.error(err.response.data.message);
      setLoading(false);
    });
};
