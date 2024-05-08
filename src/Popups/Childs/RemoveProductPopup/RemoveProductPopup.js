import * as Colors from "../../../assets/styles/Colors";
import { Heading3B, Heading4B, Body } from "../../../assets/styles/Labels";
import { PrimaryLarge, CancelLarge } from "../../../assets/styles/Buttons";

import Box from "@mui/material/Box";
const strings = require("../../../localisation_en.json");

function RemoveProductPopup(props) {
  // function to close popup and start api call

  const closeRemoveProductPopup = () => {
    props.removeResponse("yes");
    props.closePopup();
  };
  return (
    <div className="ph-container-box">
      <div
        className="ph-paper-box width380"
        style={{ backgroundColor: "#ffffff" }}
      >
        <Box>
          <Heading3B
            text={strings.RemoveThisProduct}
            color={Colors.black1c}
            padding={"0 0 16px 0"}
            letterSpacing={"-0.02em"}
          />
          <Heading4B
            text={strings.RemoveThisProductMeansItWillNoLonger}
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
          // mt={"32px"}
        >
          <CancelLarge
            width={"100px"}
            text={strings.cancel}
            margin={"0 14px 14px 0"}
            onClick={() => props.closePopup()}
          />
          <PrimaryLarge
            width={"100px"}
            text={strings.remove}
            margin={"0 0 14px 0"}
            onClick={closeRemoveProductPopup}
          />
        </Box>
        {/* <Box display={"flex"} alignItems={"center"} justifyContent={"flex-end"}>
          <Body
            text={strings.cancel}
            color={Colors.gray62}
            padding={"13px 24px"}
            letterSpacing={"0.1px"}
            fontWeight={"500"}
            cursor={"pointer"}
            onClick={() => props.closePopup()}
          />
          <Body
            text={strings.remove}
            color={Colors.redb3}
            padding={"13px 24px"}
            letterSpacing={"0.1px"}
            fontWeight={"500"}
            cursor={"pointer"}
            margin={"0 0 0 8px"}
            // onClick={() => props.removeResponse("yes")}
            onClick={closeRemoveProductPopup}
          />
        </Box> */}
      </div>
    </div>
  );
}

export default RemoveProductPopup;
