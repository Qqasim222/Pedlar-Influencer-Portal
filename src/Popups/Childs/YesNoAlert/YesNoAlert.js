import * as Colors from "../../../assets/styles/Colors";
import { Heading3B } from "../../../assets/styles/Labels";
import { useNavigate } from "react-router-dom";
import { PrimaryLarge, CancelLarge } from "../../../assets/styles/Buttons";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { LogOut } from "../../../firebase";
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

const YesNoAlert = (props) => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await LogOut();
    navigate("/");
  };

  return (
    <div className="ph-container-box">
      <div
        className="ph-paper-box width380"
        style={{ backgroundColor: "#ffffff" }}
      >
        <Box>
          <Heading3B
            text={strings.areYouSureYouWantToLogout}
            color={Colors.black1c}
            padding={"0 0 12px 0"}
            letterSpacing={"-0.02em"}
            text-align={"center"}
          />
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          mt={"32px"}
        >
          <CancelLarge
            width={"100px"}
            text={strings.cancel}
            margin={"0 14px 14px 0"}
            onClick={() => props.closePopup()}
          />
          <PrimaryLarge
            width={"100px"}
            text={strings.logout}
            margin={"0 0 14px 0"}
            onClick={() => logoutHandler()}
          />
        </Box>
      </div>
    </div>
  );
};

export default YesNoAlert;
