export const loginValidation = ({ state, setError, error }) => {
  let { identity, countryCode } = state;

  if (identity === "" || countryCode === "") {
    setError({
      ...error,
      identity: identity === "" && "Please Enter Valid Phone Number",
      countryCode: countryCode === "" && "Please Select Your Country",
    });
    return false;
  } else {
    return true;
  }
};
