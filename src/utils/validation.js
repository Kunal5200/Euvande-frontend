export const loginValidation = ({ state, setError, error, viaOtp }) => {
  let { identity, countryCode, password } = state;

  if (
    viaOtp
      ? identity === "" || countryCode === ""
      : identity === "" || password === ""
  ) {
    setError(
      viaOtp
        ? {
            ...error,
            identity:
              identity === "" && "Please Enter Valid Phone Number or Email Id",
            countryCode: countryCode === "" && "Please Select Your Country",
          }
        : {
            ...error,
            identity:
              identity === "" && "Please Enter Valid Email Id or Phone Number",
            password: password === "" && "Please Enter Password",
          }
    );
    return false;
  } else {
    return true;
  }
};

export const registerValidation = ({ state, error, setError }) => {
  let { email, phone, password, name } = state;

  if (name === "" || phone === "" || password === "" || email === "") {
    setError({
      ...error,
      name: name === "" && "Name is Required",
      phone: phone === "" && "Phone Number is Required",
      password: password === "" && "Password is Required",
      email: email === "" && "Email Address is Required",
    });
    return false;
  } else {
    return true;
  }
};
