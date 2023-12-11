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
            identity: identity === "" && "Please Enter Valid  Email Id",
            countryCode: countryCode === "" && "Please Select Your Country",
          }
        : {
            ...error,
            identity: identity === "" && "Please Enter Valid Email Id ",
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

export const contactValidation = ({ state, error, setError }) => {
  let { name, email, phoneNumber, country, zipCode } = state;

  if (
    name === "" ||
    email === "" ||
    phoneNumber === "" ||
    country === "" ||
    zipCode === ""
  ) {
    setError({
      ...error,
      name: name === "" && "Please Enter Name ",
      email: email === "" && "Please Enter Email",
      phoneNumber: phoneNumber === "" && "Please Enter Phone Number",
      country: country === "" && "Please Select Country",
      zipCode: zipCode === "" && "Please Enter Zip Code",
    });
    return false;
  } else {
    return true;
  }
};

export const specificationValidation=({state,error,setError})=>{
  
}
