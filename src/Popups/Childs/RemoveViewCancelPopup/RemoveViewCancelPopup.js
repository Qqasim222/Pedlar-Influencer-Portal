import { useState } from "react";
import * as Colors from "../../../assets/styles/Colors";
import { POPUP_TYPE } from "../../../Helpers/Enums";
import AllPopups from "../../../Popups/AllPopups";
import { Body } from "../../../assets/styles/Labels";
const strings = require("../../../localisation_en.json");
function RemoveViewCancelPopup(props) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState("");
  function RemoveProductPopupOpen() {
    setPopupType(POPUP_TYPE.REMOVE_PRODUCT_POPUP);
    setPopupOpen(true);
  }

  return (
    <>
      <div className="ph-container-box">
        <div className="ph-paper-box width280">
          <Body
            text={strings.RemoveProduct}
            color={Colors.redb3}
            padding={"18px 24px"}
            textAlign={"center"}
            letterSpacing={"0.1px"}
            fontWeight={"500"}
            cursor={"pointer"}
            onClick={() => RemoveProductPopupOpen()}
          />
          <Body
            text={strings.ViewDetails}
            color={Colors.gray62}
            padding={"18px 24px"}
            textAlign={"center"}
            letterSpacing={"0.1px"}
            fontWeight={"500"}
            cursor={"pointer"}
            className={"top-bottom-border"}
          />
          <Body
            text={strings.cancel}
            color={Colors.gray62}
            padding={"18px 24px"}
            textAlign={"center"}
            letterSpacing={"0.1px"}
            fontWeight={"500"}
            cursor={"pointer"}
            onClick={() => props.closePopup()}
          />
        </div>
      </div>
      <AllPopups
        popupIsOpen={popupOpen}
        style={popupType}
        closePopup={() => setPopupOpen(false)}
      />
    </>
  );
}

export default RemoveViewCancelPopup;
