import Link from "next/link";
import React from "react";

const List = (props) => {
  return (
    <div>
      <h5 className="mb-4 fw-bold">{props.heading}</h5>
      <ul className="list">
        {props.data.map((val, i) => (
          <Link href={val.link} className="link">
            <li key={i} className="mb-2 pointer fw-normal f-12">
              {val.label}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default List;
