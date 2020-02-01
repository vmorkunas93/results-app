import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="spinner">
      <i className="fas fa-circle-notch fa-spin fa-2x"></i>
      <span className="loading">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
