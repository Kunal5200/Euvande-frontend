import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";

const MyDropzone = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadCompleted, setUploadCompleted] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const simulateUpload = () => {
      return new Promise((resolve, reject) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 500);
      });
    };

    simulateUpload().then(() => {
      setUploadedFile({ name: file.name, file });
      setUploadCompleted(true);
    });
  }, []);

  const removeFile = () => {
    setUploadedFile(null);
    setProgress(0);
    setUploadCompleted(false);
  };

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
          <ReactPlayer url={URL.createObjectURL(uploadedFile.file)} controls />
          <button onClick={removeFile} style={closeButtonStyle}>
            &times;
          </button>
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
