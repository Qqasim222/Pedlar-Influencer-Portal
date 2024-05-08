import { useState } from "react";
import "./Header.scss";
import AllPopups from "../../../Popups/AllPopups";
import pedlarLogo from "../../../assets/images/logo/pedlar-logo.svg";
import Box from "@mui/material/Box";

const Header = (props) => {
  const [popupOpen, setPopupOpen] = useState(false);
  /* eslint-disable no-unused-vars */
  const [popupType, setPopupType] = useState("");
  /* eslint-enable no-unused-vars */
  return (
    <Box
      className="login-header dashbin"
      display={"flex"}
      justifyContent={"space-between"}
    >
      <img src={pedlarLogo} className="logo-img" alt="" />
      <AllPopups
        popupIsOpen={popupOpen}
        style={popupType}
        closePopup={() => setPopupOpen(false)}
      />
    </Box>
  );
};

export default Header;
