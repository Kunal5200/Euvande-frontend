import React from 'react';
import { Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VideoUpload = ({ handleVideoUpload }) => {
  return (
    <div className="upload-container">
      <input
        accept="video/*"
        style={{ display: 'none' }}
        id="video-upload-button"
        type="file"
        onChange={handleVideoUpload}
      />
      <label htmlFor="video-upload-button" className="upload-label">
      
        <Button variant="contained" component="span">
          Upload Video <CloudUploadIcon className="upload-icon ps-1" />
        </Button>
        <Typography variant="body2" color="textSecondary" className='mt-3 ' component="p">
          Accepted formats: MP4, AVI, MOV, etc.
        </Typography>
      </label>
    </div>
  );
};

export default VideoUpload;