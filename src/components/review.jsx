import { Card, Stack } from "@mui/material";
import React from "react";
import styles from "@/styles/review.module.css";
const Review = (props) => {
  return (
    <div>
      <Card className="p-2 my-3" sx={{ width: "90%" }}>
        <Stack spacing={2} direction={"row"}>
          <img className={styles.reviewer_image} src={props.img} />
          <div>
            <p>{props.name}</p>
            <p className="f-12 fw-normal px-1">
              {props.review.slice(0, 100)}...
              <span onClick={props.onClick} className={styles.readMore}>
                Read More
              </span>
            </p>
          </div>
        </Stack>
      </Card>
    </div>
  );
};

export default Review;
