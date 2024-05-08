import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const ButtonLoader = () => {
  return (
    <>
      <CircularProgress size={15} sx={{ color: "#FFFFFF" }} /> Loading
    </>
  );
};

export default ButtonLoader;
