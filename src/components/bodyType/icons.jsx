import React from "react";

const Icons = (props) => {
  return (
    <div>
      <img src={props.img.src} width={30} style={{ fill: "#fff" }} />
    </div>
  );
};

export default Icons;
