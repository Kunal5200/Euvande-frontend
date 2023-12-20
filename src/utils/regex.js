export const isPhonenumber = (value) => {
  const phonenumber = /^(\+\d{1,3}[- ]?)?\d{10}$/.test(value);
  return phonenumber;
};
export const isNumber = (value) => {
  if (typeof value === "string") {
    return !isNaN(value);
  }
};
export const isEmail = (value) => {
  const checkvalue = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    value
  );
  return checkvalue;
};

export const isPasswordValid = (value) => {
  const password =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/.test(
      value
    );
  return password;
};
