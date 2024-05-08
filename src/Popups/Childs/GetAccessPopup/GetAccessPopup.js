import * as Colors from "../../../assets/styles/Colors";
import { Heading3B } from "../../../assets/styles/Labels";
import closeBg from "../../../assets/images/structure/closebg.svg";
import Box from "@mui/material/Box";
import GetAccessContent from "./GetAccessContent/GetAccessContent";
const strings = require("../../../localisation_en.json");

function GetAccessPopup(props) {
  return (
    // for dasktop-modal
    <div className="ph-container-box">
      <div className="ph-paper-box width380">
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {/* developer please functional the two headings its change with tabs */}
          <Heading3B
            text={strings.joinTheWaitlist}
            color={Colors.black1c}
            padding={"0 0 16px 0"}
            letterSpacing={"-0.02em"}
          />
          <img
            src={closeBg}
            height={24}
            style={{ cursor: "pointer" }}
            alt=""
            onClick={() => props.closePopup()}
          />
        </Box>
        <GetAccessContent />
      </div>
    </div>
  );
}

export default GetAccessPopup;
