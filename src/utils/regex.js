export const isPhonenumber = (value) => {
  const phonenumber = /^(\+\d{1,3}[- ]?)?\d{10}$/.test(value);
  return phonenumber;
};
