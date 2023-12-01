export const searchTextField = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",

  "& .MuiOutlinedInput-input": {
    padding: "12px",
    borderRadius: "8px",
    "&:focus": {
      outline: "none",
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
    },
  },
  "& label.Mui-focused": {
    background:
      "linear-gradient( rgba(255, 255, 255, 1) 50%,rgba(36, 35, 35, 1) 50% )",
    color: "transparent",
    backgroundClip: "text",
    fontWeight: "600",
    top: "0",
  },
  "& label": {
    top: "-4px",
  },

  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ffffff",
      borderRadius: "8px",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffffff",
    },
  },
};

export const loginTextField = {
  "& label.Mui-focused": {
    color: "#000000",
  },
  "& label": {
    fontSize: "15px",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #000000",
    },
    "&:hover fieldset": {
      borderColor: "#000000",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #000000",
    },
  },

  "& .Mui-error": {
    "& fieldset": {
      border: "1px solid #d32f2f",
    },
    "&:hover fieldset": {
      border: "1px solid #d32f2f",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #d32f2f",
    },
    "& label.Mui-focused": {
      color: "#d32f2f",
    },
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "#d32f2f",
  },
};

export const cardStyles = {
  position: "relative",
  bottom: "50px",
};

export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
