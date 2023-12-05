import { authControllers } from "../authentication";

export const verifyEmail = (data) => {
  authControllers
    .verifyEmail(data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
