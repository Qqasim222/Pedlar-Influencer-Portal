// import BounceLoader from "react-spinners/BounceLoader";
// import { css } from "@emotion/react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: black;
// `;
const Loaders = () => {
  return (
    // <div className={"sweet-loading"}>
    //   <BounceLoader
    //     css={override}
    //     size={60}
    //     color={"#1C1B1F"}
    //     loading={true}
    //     speedMultiplier={1}
    //   />
    // </div>
    <Backdrop
      invisible={true}
      sx={{
        // color: "#7C7B79",
        zIndex: 999,
        "& .MuiBackdrop-invisible": {
          color: "#7C7B79",
        },
      }}
      open={true}
    >
      <CircularProgress size={50} sx={{ color: "#000000" }} />
    </Backdrop>
  );
};

export default Loaders;
