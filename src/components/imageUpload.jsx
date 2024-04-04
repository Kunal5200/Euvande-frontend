import { Grid, LinearProgress, Paper, Typography } from "@mui/material";
import React, { useState } from "react";

const ImageUpload = ({
  data,
  handleImageUpload,
  imagePreviews,
  inputRefs,
  progress,
}) => {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  return (
    <div>
      <Grid container spacing={2}>
        {data.map((val, i) => (
          <Grid
            item
            xs={3}
            key={i}
            onMouseEnter={() => setHoveredItemId(val.id)}
            onMouseLeave={() => setHoveredItemId(null)}
          >
            <Paper elevation={2}>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={() => handleImageUpload(val.id)}
                id={val.id}
                ref={(el) => (inputRefs.current[val.id] = el)}
              />
              <div
                style={{
                  backgroundImage: `url(${imagePreviews[val.id] || val.image})`,
                  height: "150px",
                  width: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => inputRefs.current[val.id].click()}
              >
                {hoveredItemId === val.id && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "#fff",
                      color: "#000",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        cursor: "pointer",
                        fontSize: "24px",
                      }}
                    >
                      +
                    </span>
                  </div>
                )}
                <div>
                  <div
                    className="text-center "
                    style={{
                      opacity: 1,
                      backgroundColor: "#0000005E",
                      width: "100%",
                      position: "absolute",
                      bottom: 0,
                      padding: "2px",
                      left: 0,
                    }}
                  >
                    <p className="f-12 text-white mb-0">{val.label}</p>
                  </div>
                </div>
              </div>
            </Paper>
            {/* Conditionally render LinearProgress */}
            {progress[val.id] !== undefined && (
              <LinearProgress variant="determinate" value={progress[val.id]} />
              // <Typography>Loading</Typography>
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ImageUpload;
