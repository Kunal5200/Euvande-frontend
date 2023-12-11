import { loggedIn } from "@/redux/reducers/user";
import { listingController } from "../listing";

export const getUserInfo = ({ dispatch, setUser }) => {
  listingController
    .getUserDetails()
    .then((res) => {
      const response = res.data.data;
      setUser(response);
      dispatch(loggedIn({ ...response }));
    })
    .catch((err) => {
      console.log(err);
    });
};
