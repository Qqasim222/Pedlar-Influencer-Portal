import { useState, useEffect } from "react";
import { useTour } from "@reactour/tour";
import { useNavigate } from "react-router-dom";
import * as Colors from "../../../assets/styles/Colors";
import { Heading3B, Heading4B } from "../../../assets/styles/Labels";
import { PrimaryLarge, CancelLarge } from "../../../assets/styles/Buttons";
import welcomeToIedlarImg from "../../../assets/images/product/welcome-to-pedlar.png";
import Box from "@mui/material/Box";
const strings = require("../../../localisation_en.json");

const TourStartPopup = (props) => {
  const navigate = useNavigate();
  const { setIsOpen } = useTour();
  const [skipTour, setSkipTour] = useState(false);
  useEffect(() => {
    function keyHandling(e) {
      if (e.keyCode === 75) {
        e.preventDefault();
        setIsOpen(true);
      }
    }
    window.addEventListener("keyup", keyHandling);
    return () => window.removeEventListener("keyup", keyHandling);
  }, [setIsOpen]);
  useEffect(() => {
    if (skipTour === true) {
      navigate("/storefront");
      localStorage.setItem("tourStart", "checked");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipTour]);
  const TourStartPopupOpen = () => {
    props.closePopup();
    setIsOpen(true);
  };

  return (
    <div className="ph-container-box">
      <div className="ph-paper-box width420" style={{ padding: "0" }}>
        <Box className="popupdefaultimgbox">
          <img alt="" src={welcomeToIedlarImg} className="popupdefaultimg" />
        </Box>
        <Box p={"8px 24px 0px 24px"}>
          <Heading3B
            text={strings.welcomeToPedlar}
            color={Colors.black1c}
            padding={"0 0 16px 0"}
            letterSpacing={"-0.02em"}
          />
          <Heading4B
            text={strings.heyThereCongratulationsOnJoiningPedlar}
            opacity={"0.64"}
            color={Colors.black1c}
            padding={"0 0 24px 0"}
            letterSpacing={"-0.02em"}
          />
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          p={"0px 24px 14px 24px"}
        >
          <CancelLarge
            width={"100px"}
            text={strings.skip}
            margin={"0 0 16px 0"}
            onClick={() => setSkipTour(true)}
          />
          <PrimaryLarge
            width={"120px"}
            text={strings.startTour}
            margin={"0 0 16px 0"}
            onClick={TourStartPopupOpen}
          />
        </Box>
      </div>
    </div>
  );
};

export default TourStartPopup;
