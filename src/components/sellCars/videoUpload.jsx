import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";

const MyDropzone = ({
  uploadedFile,
  setUploadedFile,
  onDrop,
  uploadCompleted,
  setUploadCompleted,
  progress,
  setProgress,
}) => {
  const removeFile = () => {
    setUploadedFile(null);
    setProgress(0);
    setUploadCompleted(false);
  };

  console.log("file", uploadedFile);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "video/*",
    multiple: false,
    disabled: uploadCompleted,
  });

  return (
    <div>
      {!uploadCompleted && (
        <div {...getRootProps()} style={dropzoneStyle}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the video here ...</p>
          ) : (
            <p>Drag 'n' drop a video here, or click to select a video</p>
          )}
          {progress > 0 && <p>Upload Progress: {progress}%</p>}
        </div>
      )}
      {uploadedFile && (
        <div style={{ position: "relative" }}>
          <ReactPlayer
            url={
              uploadedFile.file
                ? URL.createObjectURL(uploadedFile.file)
                : uploadedFile.video
            }
            controls
          />
          <Box
            sx={{
              // border: "1px solid #000",
              height: 20,
              width: 20,
              position: "absolute",
              top: 0,
              right: 0,
              // borderBottom: "1px solid #000",
            }}
          >
            <button onClick={removeFile} style={closeButtonStyle}>
              &times;
            </button>
          </Box>
          <p>{uploadedFile.name}</p>
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const closeButtonStyle = {
  position: "absolute",
  top: "0",
  right: "0",
  background: "#ffffff",
  border: "none",
  color: "#000000",
  fontSize: "30px",
  cursor: "pointer",
  width: "30px",
  height: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default MyDropzone;
