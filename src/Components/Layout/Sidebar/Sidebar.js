import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Colors from "../../../assets/styles/Colors";
import { Heading6S, Heading3B, Heading5B } from "../../../assets/styles/Labels";
import { ShareLarge } from "../../../assets/styles/Buttons";
import { POPUP_TYPE } from "../../../Helpers/Enums";
import "./Sidebar.scss";
import AllPopups from "../../../Popups/AllPopups";
import Header from "../../../Components/Layout/Header/Header";
import pedlarLogo from "../../../assets/images/logo/pedlar-logo.svg";
import shareIcon from "../../../assets/images/structure/shareIcon.svg";

import menuIcon from "../../../assets/images/structure/menu_24px.svg";
import ModalClose from "../../../assets/images/structure/closeblack.svg";
import sidebarIcon1 from "../../../assets/images/structure/sidebar-icon1.svg";
import SidebarIcon1 from "../../../assets/images/structure/sideBarIcon1";
import SidebarIcon2 from "../../../assets/images/structure/SidebarIcon2";

import sidebarIcon2 from "../../../assets/images/structure/sidebar-icon2.svg";
import logoutIcon from "../../../assets/images/structure/logout-icon.svg";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
const strings = require("../../../localisation_en.json");
const drawerWidth = 331;

const Sidebar = (props) => {
  let currentUrl = new URL(window.location.href);
  const pathname = currentUrl.pathname;
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  function ShareYourStorePopupOpen() {
    setPopupType(POPUP_TYPE.SHARE_YOUR_STORE_POPUP);
    setPopupOpen(true);
  }
  function YesNoAlertPopupOpen() {
    setPopupType(POPUP_TYPE.YES_NO_ALERT_POPUP);
    setPopupOpen(true);
  }

  return (
    <>
      {/* desktop view  */}
      <div className="sidebar-holder sidebar-desktop-view-marge">
        <Header />
        <div>
          <div
            className={
              pathname === "/storefront"
                ? "sidebar-list active"
                : "sidebar-list"
            }
            data-tut="reactour__ftab"
            onClick={() => navigate("/storefront")}
          >
            {/* <img alt="" src={sidebarIcon1} /> */}
            <SidebarIcon1
              color={pathname === "/storefront" ? "#000000" : "none"}
            />
            <Heading6S
              text={strings.StoreFront}
              color={Colors.black1c}
              padding={"0 0 0px 16px"}
              fontWeight={"400"}
              letterSpacing={"-0.02em"}
            />
          </div>
          <div
            className={
              pathname === "/product-list"
                ? "sidebar-list active"
                : "sidebar-list"
            }
            data-tut="reactour__ttab"
            onClick={() => navigate("/product-list")}
          >
            {/* <img alt="" src={sidebarIcon2} /> */}
            <SidebarIcon2
              color={pathname === "/product-list" ? "#000000" : "none"}
            />
            <Heading6S
              text={strings.Inventory}
              color={Colors.black1c}
              padding={"0 0 0px 16px"}
              fontWeight={"400"}
              letterSpacing={"-0.02em"}
            />
          </div>
        </div>

        <Box className="share-store-position">
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              onClick={() => YesNoAlertPopupOpen()}
            >
              <img
                src={logoutIcon}
                alt=""
                style={{
                  cursor: "pointer",
                }}
              />
              <Heading5B
                text={"Logout"}
                color={Colors.black1c}
                padding={"0 0 0px 16px"}
                letterSpacing={"-0.02em"}
                cursor={"pointer"}
                fontWeight={"400"}
              />
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              data-tut="reactour__frttab"
              ml={4}
              onClick={() => ShareYourStorePopupOpen()}
            >
              <img
                src={shareIcon}
                alt=""
                style={{
                  position: "absolute",
                  marginLeft: "10px",
                  marginTop: "2px",
                  cursor: "pointer",
                }}
              ></img>
              <ShareLarge
                // width={"auto"}
                width={"184px"}
                text={strings.shareMyStore}
                margin={"0 0 0px 0"}
                onClick={() => ShareYourStorePopupOpen()}
              />
            </Box>
          </Box>
        </Box>
      </div>
      {/* mobile view  */}
      <div className="sidebar-holder sidebar-mobile-view-marge">
        <Box className="" pt={"0px"}>
          <div className="top-header-heading">
            <Box
              className="back-heading"
              display={"flex"}
              alignItems={"center"}
            >
              <img
                alt=""
                src={menuIcon}
                className="icon24"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              />
              <Heading3B
                text={
                  pathname === "/storefront"
                    ? strings.StoreFront
                    : strings.Inventory
                }
                color={Colors.black1c}
                fontWeight={"400"}
                padding={"0 0px 0px 16px"}
                letterSpacing={"-0.02em"}
              />
            </Box>
          </div>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { sx: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: "100%",
                  maxWidth: "331px",
                  position: "relative",
                },
              }}
            >
              <img
                alt=""
                src={ModalClose}
                className="close-drawe-icon"
                aria-label="close drawer"
                edge="end"
                onClick={handleDrawerToggle}
              />
              <div className="side-drawer">
                <img src={pedlarLogo} className="logo-img" alt="" />
                <div style={{ margin: "30px 0px 0px 0px", display: "block" }}>
                  <div
                    className={
                      pathname === "/storefront"
                        ? "sidebar-list active"
                        : "sidebar-list"
                    }
                    onClick={() => navigate("/storefront")}
                  >
                    {/* <img alt="" src={sidebarIcon1} /> */}
                    <SidebarIcon1
                      color={pathname === "/storefront" ? "#000000" : "none"}
                    />
                    <Heading6S
                      text={strings.StoreFront}
                      color={Colors.black1c}
                      padding={"0 0 0px 16px"}
                      fontWeight={"400"}
                      letterSpacing={"-0.02em"}
                    />
                  </div>
                  <div
                    className={
                      pathname === "/product-list"
                        ? "sidebar-list active"
                        : "sidebar-list"
                    }
                    onClick={() => navigate("/product-list")}
                  >
                    {/* <img alt="" src={sidebarIcon2} /> */}
                    <SidebarIcon2
                      color={pathname === "/product-list" ? "#000000" : "none"}
                    />
                    <Heading6S
                      text={strings.Inventory}
                      color={Colors.black1c}
                      padding={"0 0 0px 16px"}
                      fontWeight={"400"}
                      letterSpacing={"-0.02em"}
                    />
                  </div>
                </div>
                <Box className="logout-position">
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    onClick={() => YesNoAlertPopupOpen()}
                  >
                    <Box display={"flex"} alignItems={"center"}>
                      <img
                        src={logoutIcon}
                        alt=""
                        style={{
                          cursor: "pointer",
                        }}
                      />
                      <Heading5B
                        text={"Logout"}
                        color={Colors.black1c}
                        padding={"0 0 0px 16px"}
                        letterSpacing={"-0.02em"}
                        cursor={"pointer"}
                        fontWeight={"400"}
                      />
                    </Box>
                  </Box>
                </Box>
              </div>
            </Drawer>
          </Box>
        </Box>
        <AllPopups
          popupIsOpen={popupOpen}
          style={popupType}
          closePopup={() => setPopupOpen(false)}
        />
      </div>
      <AllPopups
        popupIsOpen={popupOpen}
        style={popupType}
        closePopup={() => setPopupOpen(false)}
      />
    </>
  );
};

export default Sidebar;
