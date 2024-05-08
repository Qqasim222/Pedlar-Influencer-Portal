import React, { useState } from "react";
import * as Colors from "../../../assets/styles/Colors";
import {
  Heading3B,
  Heading4B,
  Small,
  Heading5B,
} from "../../../assets/styles/Labels";
import { PrimaryLarge } from "../../../assets/styles/Buttons";
import copyIconBlack from "../../../assets/images/structure/copy-icon-black.svg";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import ConfittiAnimation from "./ConfittiAnimation";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import CentralLoader from "../../../GlobalModule/CentralLoader";
const strings = require("../../../localisation_en.json");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const ShareYourStore = (props) => {
  const [copymsg, setCopymsg] = React.useState("");
  const [user, loading] = useAuthState(auth);
  const [showMsg, setShowMsg] = useState("");
  const handleCopyText = () => {
    navigator.clipboard.writeText("pedlar.store/" + user.uid);
    setCopymsg(<ConfittiAnimation />);
    setTimeout(() => setCopymsg(""), 4000);
    setShowMsg("Link Copied to Clipboard");
    setTimeout(() => setShowMsg(""), 4000);
  };

  const handleClose = () => {
    props.closePopup();
    let data = {};
    data.popupType = "sharepopup";
    props.popupData(data);
  };

  if (loading) return <CentralLoader />;

  return (
    <div className="ph-container-box">
      <div
        className="ph-paper-box width380"
        style={{ backgroundColor: "#ffffff" }}
      >
        <Box>
          <Heading3B
            text={strings.shareYourStore}
            color={Colors.black1c}
            padding={"0 0 12px 0"}
            letterSpacing={"-0.02em"}
          />
          <Heading4B
            text={
              strings.shareYourStoreURLAcrossYourSocialsLinkInBioStoriesVideosAndPictures
            }
            color={Colors.black1c}
            padding={"0 0 24px 0"}
            letterSpacing={"-0.02em"}
            opacity={"0.60"}
          />
        </Box>
        <Box>
          <Box className="share-box-orange">
            <Box>
              <Small
                fontWeight={"400"}
                text={strings.shareLink}
                color={"#666666"}
                padding={"0 0 2px 0"}
                letterSpacing={"-0.01em"}
              />
              <Heading5B
                text={"pedlar.store/" + user.uid}
                color={"#262626"}
                padding={"0 0 0px 0"}
                letterSpacing={"-0.02em"}
              />
            </Box>
            <img
              src={copyIconBlack}
              alt=""
              style={{ cursor: "pointer" }}
              onClick={handleCopyText}
            />
          </Box>
          {showMsg ? (
            <span
              className="product-added"
              style={{
                marginBottom: "60px",
                position: "absolute",
                width: "220px",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {showMsg}
            </span>
          ) : null}
          <span> {copymsg} </span>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          mt={"80px"}
        >
          <PrimaryLarge
            width={"100px"}
            text={strings.cancel}
            margin={"0 0 0px 0"}
            className={"pl-sys-btn"}
            onClick={() => handleClose()}
          />
        </Box>
      </div>
    </div>
  );
};

export default ShareYourStore;
