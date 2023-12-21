import React from "react";

const List = (props) => {
  return (
    <div>
      <h5 className="mb-4 fw-bold">{props.heading}</h5>
      <ul className="list">
        {props.data.map((val, i) => (
          <li key={i} className="mb-2 pointer fw-normal">{val.label}</li>
        ))}
      </ul>
    </div>
  );
};

export default List;
