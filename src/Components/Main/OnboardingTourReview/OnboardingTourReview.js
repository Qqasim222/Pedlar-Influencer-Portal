import React, { useEffect, useState } from "react";
import { useTour } from "@reactour/tour";
import * as Colors from "../../../assets/styles/Colors";
import {
  BackLarge,
  PrimaryLarge,
  CancelLarge,
  ShareLarge,
} from "../../../assets/styles/Buttons";
import {
  Heading3B,
  Heading4B,
  Heading6S,
  Heading5B,
  Body,
  Small,
} from "../../../assets/styles/Labels";
import { POPUP_TYPE } from "../../../Helpers/Enums";
import "./OnboardingTourReview.scss";
import AllPopups from "../../../Popups/AllPopups";
import Header from "../../../Components/Layout/Header/Header";
import pedlarLogo from "../../../assets/images/logo/pedlar-logo.svg";
import cartBlack from "../../../assets/images/structure/cart-black.svg";
import tiktokIcon from "../../../assets/images/structure/tiktok-icon.svg";
import instaIcon from "../../../assets/images/structure/insta-icon.svg";
import forwordGray from "../../../assets/images/structure/forword-gray.svg";
import productList5 from "../../../assets/images/product/product-list5.png";
import productList6 from "../../../assets/images/product/product-list6.png";
import productList7 from "../../../assets/images/product/product-list7.png";
import Bannerplaceholder from "../../../assets/images/product/Bannerplaceholder.png";
import shareIcon from "../../../assets/images/structure/shareIcon.svg";

import addPlusBlackImg from "../../../assets/images/structure/add-plus-black.svg";
import addBGBlackIcon from "../../../assets/images/structure/add-bg-black.svg";

import curatedBrandslogo1 from "../../../assets/images/product/curated-brands1.png";
import curatedBrandslogo2 from "../../../assets/images/product/curated-brands2.png";
import curatedBrandslogo3 from "../../../assets/images/product/curated-brands3.png";
import curatedBrandslogo4 from "../../../assets/images/product/curated-brands4.png";
import curatedBrandslogo5 from "../../../assets/images/product/curated-brands5.png";
import fAmex from "../../../assets/images/structure/f-amex.svg";
import fApplepay from "../../../assets/images/structure/f-applepay.svg";
import fMastercard from "../../../assets/images/structure/f-mastercard.svg";
import fPaypal from "../../../assets/images/structure/f-paypal.svg";
import fShoppay from "../../../assets/images/structure/f-shoppay.svg";
import fVisa from "../../../assets/images/structure/f-visa.svg";
import menuIcon from "../../../assets/images/structure/menu_24px.svg";
import ModalClose from "../../../assets/images/structure/closeblack.svg";
import instaWhite from "../../../assets/images/structure/insta-white.svg";
import welcomeToIedlarImg from "../../../assets/images/product/welcome-to-pedlar.png";
import copyIconBlack from "../../../assets/images/structure/copy-icon-black.svg";
import sidebarIcon1 from "../../../assets/images/structure/sidebar-icon1.svg";
import sidebarIcon2 from "../../../assets/images/structure/sidebar-icon2.svg";
import logoutIcon from "../../../assets/images/structure/logout-icon.svg";
import noproduct from "../../../assets/images/product/noproduct.png";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import PropTypes from "prop-types";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InstagramIcon from "@mui/icons-material/Instagram";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import services from "../../../services/index";
import Loaders from "../../../GlobalModule/Loaders";
import Sidebar from "../../Layout/Sidebar/Sidebar";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { makeStyles } from "@mui/styles";
import { borderRadius } from "@mui/system";
import { CardMedia } from "@mui/material";

const strings = require("../../../localisation_en.json");
const drawerWidth = 331;
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: "40px 40px 0px 0px",
  },
}));

const OnboardingTourReview = (props) => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [userData, setUserData] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [startProductTour, setStartProductTour] = useState(false);

  const classes = useStyles();

  const TourStartPopupOpenM = () => {
    setOpenTour(false);
    setIsOpen(true);
    setStartProductTour(true);
  };

  const { setIsOpen } = useTour();
  function TourStartPopupOpen() {
    setPopupType(POPUP_TYPE.TOUR_START_POPUP);
    setPopupOpen(true);
  }
  useEffect(() => {
    //if (!localStorage.getItem("tourStart"))
    if (isMobile) {
      setOpenTour(true);
    } else {
      TourStartPopupOpen();
    }
  }, []);
  useEffect(() => {
    if (isMobile) {
      if (props.customeState === 3)
        setTimeout(() => {
          setMobileOpen(true);
        }, 250);
      else setMobileOpen(false);
      //if (props.customeState === -1) TourStartPopupOpenM();
    }
  }, [props.customeState]);
  useEffect(() => {
    if (isMobile) {
      if (props.setCustomeMState === 1) setMobileOpen(true);
      else setMobileOpen(false);
    }
  }, [props.setCustomeMState]);

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
  //const [mobileOpenCategory, setMobileOpenCategory] = React.useState(false);
  // const handleDrawerToggleCategory = () => {
  //   setMobileOpenCategory(!mobileOpenCategory);
  // };
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [openSocial, setOpenSocial] = React.useState(false);
  const toggleDrawerSocial = (newOpenSocial) => () => {
    setOpenSocial(newOpenSocial);
  };
  const [openTour, setOpenTour] = React.useState(false);
  const toggleDrawerTour = (newOpenTour) => () => {
    setOpenTour(newOpenTour);
  };
  const [openShareStore, setOpenShareStore] = React.useState(false);
  const toggleDrawerShareStore = (newOpenShareStore) => () => {
    setOpenShareStore(newOpenShareStore);
  };

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  function YesNoAlertPopupOpen() {
    setPopupType(POPUP_TYPE.YES_NO_ALERT_POPUP);
    setPopupOpen(true);
  }
  const getUserData = async () => {
    const response = await services.addbanner.GET_USER(
      user.accessToken,
      user.uid
    );

    setUserData(response.data.data);
  };
  useEffect(() => {
    //TourStartPopupOpen();

    getUserData();
    getallproduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getallproduct = async () => {
    const response = await services.product.GET_PRODUCTS_ADD_BANNER_PAGE(
      user.accessToken,
      {
        selected: true,
        limit: 5,
      }
    );
    setProductsList(response.data.data.products.nodes);
  };

  return (
    <>
      {/* desktop view */}

      {Object.keys(userData).length > 0 && productsList.length > 0 ? (
        <div className="main-mid-holder desktop-view-marge stop-scrolling ">
          <div className="sidebar-holder sidebar-desktop-view-marge">
            <Header />
            <div>
              <div className={"sidebar-list"} data-tut="reactour__ftab">
                <img alt="" src={sidebarIcon1} />
                <Heading6S
                  text={strings.StoreFront}
                  color={Colors.black1c}
                  padding={"0 0 0px 16px"}
                  fontWeight={"400"}
                  letterSpacing={"-0.02em"}
                />
              </div>
              <div className={"sidebar-list"} data-tut="reactour__ttab">
                <img alt="" src={sidebarIcon2} />
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
                <Box display={"flex"} alignItems={"center"}>
                  <img src={logoutIcon} alt="" />
                  <Heading5B
                    text={"Logout"}
                    color={Colors.black1c}
                    padding={"0 0 0px 16px"}
                    letterSpacing={"-0.02em"}
                    cursor={"pointer"}
                    fontWeight={"400"}
                    onClick={() => YesNoAlertPopupOpen()}
                  />
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  data-tut="reactour__frttab"
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
                    width={"184px"}
                    text={strings.shareMyStore}
                    margin={"0 0 0px 0"}
                  />
                </Box>
              </Box>
            </Box>
            <AllPopups
              popupIsOpen={popupOpen}
              style={popupType}
              closePopup={() => setPopupOpen(false)}
            />
          </div>

          <div className="mid-content-holder ">
            <div className="add-banner-holder ">
              <div data-tut="reactour__stab">
                <div className="abh-header">
                  <Box className="" display={"flex"} alignItems={"center"}>
                    <img src={pedlarLogo} className="logo-img" alt="" />
                    <Heading3B
                      text={userData ? userData.storefrontName : ""}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      cursor={"pointer"}
                      padding={"0 0 0 8px"}
                    />
                  </Box>
                  <Box display={"flex"} alignItems={"center"}>
                    <Heading6S
                      text={strings.brands}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      padding={"0 10px"}
                      opacity={"0.80"}
                    />
                    <Heading6S
                      text={strings.shop}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      padding={"0 10px"}
                      opacity={"0.80"}
                    />
                    <Box p={"0 0px 0 20px"}>
                      <img alt="" src={cartBlack} className="h-cart-icon" />
                    </Box>
                  </Box>
                </div>
                <div className="abh-mid-holder">
                  <div className="abh-mh-sec1">
                    <div className="abh-mh-s1-left">
                      <Box
                        className="abh-ms1l-banner-holder"
                        sx={{
                          height: "564px !important",
                        }}
                      >
                        {userData?.storefrontImageUrl !== "" ? (
                          <div
                            className="abh-ms1l-bh-upload-image"
                            style={{
                              height: "100%",
                              width: "100%",
                            }}
                          >
                            {/* <img
                              alt=""
                              src={userData?.storefrontImageUrl}
                              className="preview-banner-image"
                            /> */}
                            <CardMedia
                              component="img"
                              image={
                                userData?.storefrontImageUrl
                                  ? userData?.storefrontImageUrl
                                  : Bannerplaceholder
                              }
                              objectFit="contain"
                              style={{
                                minHeight: "100%",
                                objectFit: "cover !important",
                                minWidth: "100%",
                                maxWidth: "100%",
                              }}
                            ></CardMedia>
                            <Box
                              sx={{
                                position: "absolute",
                                paddingTop: "27rem",
                                paddingLeft: "24rem",
                                cursor: "pointer",
                                zIndex: "1",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                              >
                                <rect
                                  width="40"
                                  height="40"
                                  rx="20"
                                  fill="#8652FF"
                                  // fill-opacity="0.8"
                                  fillOpacity={"0.8"}
                                />
                                <path
                                  d="M33.3332 21.666H21.6665V33.3327H18.3332V21.666H6.6665V18.3327H18.3332V6.66602H21.6665V18.3327H33.3332V21.666Z"
                                  fill="white"
                                />
                              </svg>
                            </Box>
                          </div>
                        ) : (
                          <div
                            className="abh-ms1l-bh-upload-image"
                            style={{
                              height: "100%",
                              width: "100%",
                            }}
                          >
                            <img
                              alt=""
                              src={Bannerplaceholder}
                              // className="addbg-icon"
                              style={{
                                minHeight: "100%",
                                minWidth: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        )}
                      </Box>
                    </div>
                    <div className="abh-mh-s1-right">
                      <div className="abh-ms1l-content-holder">
                        <Box
                          sx={{
                            border: "1px solid #D3D3D3",
                            padding: "1rem",
                            width: "100% !important",
                            borderRadius: "10px",
                            cursor: "pointer",
                            overflowY: "auto",
                            height: "200px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              cursor: "pointer",
                              color: "rgba(134, 82, 255, 0.8)",
                            }}
                          >
                            <Box>
                              <ModeEditOutlineOutlinedIcon
                                sx={{
                                  width: "17px",
                                  marginRight: "3px",
                                }}
                              />
                            </Box>
                            <Box sx={{ fontWeight: "600" }}>EDIT</Box>
                          </Box>
                          <Box
                            className=""
                            display={"flex"}
                            alignItems={"center"}
                            pb={"8px"}
                          >
                            <Heading6S
                              text={
                                userData?.storefrontDescription?.length > 0
                                  ? userData?.storefrontDescription
                                  : "Welcome to my Pedlar Store! Here is a collection of my favourite products from my favourite brands. Have a browse and enjoy."
                              }
                              color={Colors.black1c}
                              letterSpacing={"-0.02em"}
                              padding={"0 0px 0 0px"}
                            />
                          </Box>
                        </Box>
                        {/* <Box width={"100%"} pb={"24px"}>
                          <Heading6S
                            text={
                              userData?.storefrontDescription
                                ? userData?.storefrontDescription
                                : "Hi honeys! I’ve worked closely with some of my fave brands to curate my own store! All items are shipped out directly from each brand. I hope you love what I've put together. "
                            }
                            color={Colors.black1c}
                            letterSpacing={"-0.02em"}
                            cursor={"pointer"}
                            padding={"0 0px 0 0px"}
                          />
                        </Box> */}
                        <Box
                          className=""
                          display={"flex"}
                          alignItems={"center"}
                          pb={"8px"}
                          sx={{ marginTop: "1rem" }}
                        >
                          <img alt="" src={instaIcon} width="16" height="16" />
                          <Box
                            sx={{
                              border: "1px solid #D3D3D3",
                              borderRadius: "10px",
                              marginLeft: "10px",
                              padding: "1rem",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "40rem",
                              cursor: "pointer",
                            }}
                          >
                            <Box>
                              <Heading6S
                                text={
                                  userData?.instagramLink === ""
                                    ? "@"
                                    : userData?.instagramLink
                                }
                                color={Colors.black1c}
                                letterSpacing={"-0.02em"}
                                padding={"0 0px 0 8px"}
                                className="text-width-limit-on-sociallinks"
                              />
                            </Box>
                            <Box
                              sx={{
                                cursor: "pointer",
                                color: "rgba(134, 82, 255, 0.8)",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Box>
                                <ModeEditOutlineOutlinedIcon
                                  sx={{ width: "17px", marginRight: "3px" }}
                                />
                              </Box>
                              <Box sx={{ fontWeight: "600" }}>EDIT</Box>
                            </Box>
                          </Box>
                        </Box>
                        {/* <Box
                          className=""
                          display={"flex"}
                          alignItems={"center"}
                          pb={"8px"}
                        >
                          <img alt="" src={instaIcon} width="16" height="16" />
                          <Heading6S
                            // text={"@sam.smith"}
                            text={
                              userData?.instagramLink
                                ? userData?.instagramLink
                                : ""
                            }
                            color={Colors.black1c}
                            letterSpacing={"-0.02em"}
                            cursor={"pointer"}
                            padding={"0 0px 0 8px"}
                          />
                        </Box> */}
                        <Box
                          className=""
                          display={"flex"}
                          alignItems={"center"}
                          pb={"8px"}
                        >
                          <img alt="" src={tiktokIcon} width="16" height="16" />
                          <Box
                            sx={{
                              border: "1px solid #D3D3D3",
                              borderRadius: "10px",
                              marginLeft: "10px",
                              padding: "1rem",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "40rem",
                              cursor: "pointer",
                            }}
                          >
                            <Box>
                              <Heading6S
                                text={
                                  userData?.tiktokLink === ""
                                    ? "@"
                                    : userData?.tiktokLink
                                }
                                color={Colors.black1c}
                                letterSpacing={"-0.02em"}
                                padding={"0 0px 0 8px"}
                                className="text-width-limit-on-sociallinks"
                              />
                            </Box>
                            <Box
                              sx={{
                                cursor: "pointer",
                                color: "rgba(134, 82, 255, 0.8)",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Box>
                                <ModeEditOutlineOutlinedIcon
                                  sx={{ width: "17px", marginRight: "3px" }}
                                />
                              </Box>
                              <Box sx={{ fontWeight: "600" }}>EDIT</Box>
                            </Box>
                          </Box>
                        </Box>
                        {/* <Box
                          className=""
                          display={"flex"}
                          alignItems={"center"}
                          pb={"8px"}
                        >
                          <img alt="" src={tiktokIcon} width="16" height="16" />
                          <Heading6S
                            // text={"sam.smith"}
                            text={
                              userData?.tiktokLink ? userData?.tiktokLink : ""
                            }
                            color={Colors.black1c}
                            letterSpacing={"-0.02em"}
                            cursor={"pointer"}
                            padding={"0 0px 0 8px"}
                          />
                        </Box> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="abh-mid-holder">
                <div className="abh-mh-sec2">
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    pb={"20px"}
                  >
                    <Box display={"flex"} alignItems={"center"}>
                      <Heading3B
                        text={strings.NewAdditions}
                        color={Colors.black1c}
                        letterSpacing={"-0.02px"}
                        fontWeight={"500"}
                        padding={"0 0 0 0"}
                      />

                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        marginLeft={"20px"}
                      >
                        <ErrorOutlinedIcon
                          style={{ width: "13px", color: "rgb(134, 82, 255)" }}
                        />
                        <Box sx={{ color: "#A0A0A0", marginLeft: "3px" }}>
                          This section will only display your 5 most recent
                          products
                        </Box>
                      </Box>
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                      <Small
                        text={strings.SHOPALL}
                        color={Colors.black1c}
                        fontWeight={"600"}
                        padding={"0 2px 0 0"}
                      />
                      <img alt="" src={forwordGray} />
                    </Box>
                  </Box>
                  <Grid container columnSpacing={2}>
                    {productsList.length > 0
                      ? productsList.map((item) => {
                          return (
                            <Grid item xs={6} sm={3} lg={3} key={item.id}>
                              <div className="abh-mh-s2-add-product-uploaded-box">
                                <img
                                  alt=""
                                  src={
                                    item.featuredImage.url
                                      ? item.featuredImage.url
                                      : noproduct
                                  }
                                  className="abh-mh-s2-apub-img"
                                />
                                <Small
                                  text={item.vendor}
                                  color={Colors.black1c}
                                  fontWeight={"600"}
                                  textTransform={"uppercase"}
                                />
                                <Heading6S
                                  text={item.title}
                                  color={Colors.black1c}
                                  padding={"0 0px 0px 0"}
                                  letterSpacing={"-0.02em"}
                                  className="abh-mh-s2-pr-dtl-truncate"
                                />
                                <Heading6S
                                  text={
                                    "$" +
                                    item.priceRangeV2.maxVariantPrice.amount
                                  }
                                  color={Colors.black1c}
                                  padding={"0 0px 0px 0"}
                                  letterSpacing={"-0.02em"}
                                />
                              </div>
                            </Grid>
                          );
                        })
                      : null}
                    <Grid item xs={6} sm={3} lg={3}>
                      <div className="abh-mh-s2-add-product-uploader">
                        <label className="abh-mh-s2-add-product-upload">
                          <img alt="" src={addPlusBlackImg} />
                        </label>
                        <Heading6S
                          text={strings.addProduct}
                          padding={"8px 0 0px 0"}
                          letterSpacing={"-0.02em"}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  {/* <Grid container columnSpacing={2}>
                  <Grid item xs={3}>
                    <div className="abh-mh-s2-add-product-uploaded-box">
                      <img
                        alt=""
                        src={productList5}
                        className="abh-mh-s2-apub-img"
                      />
                      <Small
                        text={"Sisley Paris"}
                        color={Colors.black1c}
                        fontWeight={"600"}
                        textTransform={"uppercase"}
                      />
                      <Heading6S
                        text={"Eye Contour Mask"}
                        color={Colors.black1c}
                        padding={"0 0px 0px 0"}
                        letterSpacing={"-0.02em"}
                        className="abh-mh-s2-pr-dtl-truncate"
                      />
                      <Heading6S
                        text={"$42"}
                        color={Colors.black1c}
                        padding={"0 0px 0px 0"}
                        letterSpacing={"-0.02em"}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className="abh-mh-s2-add-product-uploaded-box">
                      <img
                        alt=""
                        src={productList6}
                        className="abh-mh-s2-apub-img"
                      />
                      <Small
                        text={"Matteau"}
                        color={Colors.black1c}
                        fontWeight={"600"}
                        textTransform={"uppercase"}
                      />
                      <Heading6S
                        text={"Drop Earring Collection"}
                        color={Colors.black1c}
                        fontWeight={"600"}
                        padding={"0 0px 0px 0"}
                        letterSpacing={"-0.02em"}
                        className="abh-mh-s2-pr-dtl-truncate"
                      />
                      <Heading6S
                        text={"$450"}
                        color={Colors.black1c}
                        fontWeight={"600"}
                        padding={"0 0px 0px 0"}
                        letterSpacing={"-0.02em"}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className="abh-mh-s2-add-product-uploaded-box">
                      <img
                        alt=""
                        src={productList7}
                        className="abh-mh-s2-apub-img"
                      />
                      <Small
                        text={"Matteau"}
                        color={Colors.black1c}
                        fontWeight={"600"}
                        textTransform={"uppercase"}
                      />
                      <Heading6S
                        text={"Drop Earring Collection"}
                        color={Colors.black1c}
                        fontWeight={"600"}
                        padding={"0 0px 0px 0"}
                        letterSpacing={"-0.02em"}
                        className="abh-mh-s2-pr-dtl-truncate"
                      />
                      <Heading6S
                        text={"$450"}
                        color={Colors.black1c}
                        fontWeight={"600"}
                        padding={"0 0px 0px 0"}
                        letterSpacing={"-0.02em"}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className="abh-mh-s2-add-product-uploader">
                      <label className="abh-mh-s2-add-product-upload">
                        <img alt="" src={addPlusBlackImg} />
                      </label>
                      <Heading6S
                        text={strings.addProduct}
                        padding={"8px 0 0px 0"}
                        letterSpacing={"-0.02em"}
                      />
                    </div>
                  </Grid>
                </Grid> */}
                </div>
                <div className="abh-mh-sec3">
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    pb={"20px"}
                  >
                    <Heading3B
                      text={strings.curatedBrands}
                      color={Colors.black1c}
                      letterSpacing={"-0.02px"}
                      fontWeight={"500"}
                      padding={"0 0 0 0"}
                    />
                    <Box display={"flex"} alignItems={"center"}>
                      <Small
                        text={strings.ShopBrands}
                        color={Colors.black1c}
                        opacity={"0.64"}
                        fontWeight={"600"}
                        padding={"0 2px 0 0"}
                      />
                      <img alt="" src={forwordGray} />
                    </Box>
                  </Box>
                  <Grid container columnSpacing={2}>
                    <Grid item xs={2} className="col-2width">
                      <div className="curated-brands-logo-box">
                        <img
                          alt=""
                          src={curatedBrandslogo1}
                          className="curated-brands-lb-logo"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={2} className="col-2width">
                      <div className="curated-brands-logo-box">
                        <img
                          alt=""
                          src={curatedBrandslogo2}
                          className="curated-brands-lb-logo"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={2} className="col-2width">
                      <div className="curated-brands-logo-box">
                        <img
                          alt=""
                          src={curatedBrandslogo3}
                          className="curated-brands-lb-logo"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={2} className="col-2width">
                      <div className="curated-brands-logo-box">
                        <img
                          alt=""
                          src={curatedBrandslogo4}
                          className="curated-brands-lb-logo"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={2} className="col-2width">
                      <div className="curated-brands-logo-box">
                        <img
                          alt=""
                          src={curatedBrandslogo5}
                          className="curated-brands-lb-logo"
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <div className="abh-footer">
                <div className="abh-f-top-holder">
                  <div className="abh-fth-left">
                    <Heading3B
                      text={strings.help_Support}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 20px 0px"}
                    />
                    <Heading4B
                      text={strings.shipping_Returns}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.internationalShipping}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.contact}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.terms_Conditiosn}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.privacyPolicy}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.FAQ}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                  </div>
                  <div className="abh-fth-right" style={{ paddingTop: "4px" }}>
                    <Heading4B
                      text={strings.WeAreAlwaysHereToHelp}
                      color={Colors.black}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                    <Heading4B
                      text={strings.contactUsAt}
                      color={Colors.black}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                    <Heading4B
                      text={"support@pedlar.com and out"}
                      color={Colors.black}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                    <Heading4B
                      text={strings.customerServiceTeamWillBeIn}
                      color={Colors.black}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                    <Heading4B
                      text={strings.touch}
                      color={Colors.black}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                  </div>
                </div>
                <div className="abh-f-bottom-holder">
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Box>
                      <Small
                        text={strings.PedlarPTYLTDPoweredByPedlar}
                        color={Colors.black}
                        letterSpacing={"0.4px"}
                        padding={"0 0px 0px 0px"}
                      />
                    </Box>
                    <Box>
                      <img
                        alt=""
                        src={fAmex}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fApplepay}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fMastercard}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fPaypal}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fShoppay}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fVisa}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                    </Box>
                  </Box>
                </div>
              </div>
            </div>
          </div>
          <AllPopups
            popupIsOpen={popupOpen}
            style={popupType}
            closePopup={() => setPopupOpen(false)}
          />
        </div>
      ) : (
        <Box className="product-detail-parent">
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100vh"}
            width={"100vw"}
            position={"absolute"}
          >
            <Loaders />
          </Box>
        </Box>
      )}

      {/* mobile view  */}

      {Object.keys(userData).length > 0 && productsList.length > 0 ? (
        <div
          className="main-mid-holder mobile-view-marge"
          onClick={() => setIsOpen(true)}
        >
          {/* <Sidebar /> */}

          <div
            className="sidebar-holder sidebar-mobile-view-marge"
            style={{ position: "relative" }}
          >
            <Box className="" pt={"0px"}>
              <div className="top-header-heading">
                <Box
                  className="back-heading"
                  display={"flex"}
                  alignItems={"center"}
                  data-tut="reactour__ftab_mobile"
                >
                  <img
                    alt=""
                    src={menuIcon}
                    className="icon24"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    data-tut="reactour__ttab_mobile"
                  />
                  <Heading3B
                    text={strings.StoreFront}
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
                    <div
                      style={{ margin: "30px 0px 0px 0px", display: "block" }}
                    >
                      <div className="sidebar-list active">
                        <img alt="" src={sidebarIcon1} />
                        <Heading6S
                          text={strings.StoreFront}
                          color={Colors.black1c}
                          padding={"0 0 0px 16px"}
                          fontWeight={"400"}
                          letterSpacing={"-0.02em"}
                        />
                      </div>
                      <div
                        className="sidebar-list"
                        data-tut="reactour__frthtab_mobile"
                      >
                        <img alt="" src={sidebarIcon2} />
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
                      >
                        <Box display={"flex"} alignItems={"center"}>
                          <img src={logoutIcon} alt="" />
                          <Heading5B
                            text={"Logout"}
                            color={Colors.black1c}
                            padding={"0 0 0px 16px"}
                            letterSpacing={"-0.02em"}
                            cursor={"pointer"}
                            fontWeight={"400"}
                            onClick={() => YesNoAlertPopupOpen()}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </div>
                </Drawer>
              </Box>
            </Box>
          </div>
          <div
            className={
              "mid-content-holder " +
              (startProductTour ? "width-controller" : "")
            }
            style={{
              padding: "0px 12px 12px 12px",

              // width: setIsOpen === true ? "30%" : "100%"
            }}
          >
            <div className="add-banner-holder">
              <div data-tut="reactour__stab_mobile">
                <div className="abh-header">
                  <img
                    alt=""
                    src={menuIcon}
                    className="icon24"
                    aria-label="open drawer"
                    edge="start"
                  />
                  <Box display={"flex"} alignItems={"center"}>
                    <img src={pedlarLogo} className="logo-img" alt="" />
                    <Heading3B
                      text={userData ? userData.storefrontName : ""}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      cursor={"pointer"}
                      padding={"0 0 0 6px"}
                      fontWeight={"400"}
                    />
                  </Box>
                  <img alt="" src={cartBlack} className="icon24" />
                </div>

                <div className="abh-mid-holder">
                  <div
                    className="abh-mh-sec1"
                    style={{ paddingBottom: "14px" }}
                  >
                    <div className="abh-mh-s1-left">
                      <div
                        className="abh-ms1l-banner-holder"
                        style={{ height: "330px" }}
                      >
                        {userData?.storefrontImageUrl ? (
                          <div
                            className="abh-ms1l-bh-upload-image-mobile"
                            style={{
                              height: "100%",
                              width: "100%",
                            }}
                          >
                            {/* <img
                              alt=""
                              src={userData?.storefrontImageUrl}
                              className="preview-banner-image"
                            /> */}
                            <CardMedia
                              image={
                                userData?.storefrontImageUrl
                                  ? userData?.storefrontImageUrl
                                  : Bannerplaceholder
                              }
                              style={{
                                // backgroundImage: `url(${
                                //   bannerImage
                                //     ? bannerImage
                                //     : Bannerplaceholder
                                // })`,

                                // backgroundColor: "#FEEFCC",

                                backgroundSize: "cover !important",
                                backgroundRepeat: "no-repeat !important",
                                backgroundPosition: "top center",
                                position: "relative",
                                height: "100%",
                                // paddingTop: `56.25%`,
                                width: "100%",
                              }}
                            ></CardMedia>
                            <Box
                              sx={{
                                position: "absolute",

                                top: "2%",
                                left: "84%",
                                cursor: "pointer",
                                zIndex: "1",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                              >
                                <rect
                                  width="40"
                                  height="40"
                                  rx="20"
                                  fill="#8652FF"
                                  // fill-opacity="0.8"
                                  fillOpacity={"0.8"}
                                />
                                <path
                                  d="M33.3332 21.666H21.6665V33.3327H18.3332V21.666H6.6665V18.3327H18.3332V6.66602H21.6665V18.3327H33.3332V21.666Z"
                                  fill="white"
                                />
                              </svg>
                            </Box>
                          </div>
                        ) : (
                          // <div className="abh-ms1l-bh-upload-image">
                          //   <img
                          //     alt=""
                          //     src={userData?.storefrontImageUrl}
                          //     className="preview-banner-image"
                          //   />
                          // </div>
                          <div
                            className="abh-ms1l-bh-upload-image"
                            // style={{
                            //   height: "100%",
                            //   width: "100%"
                            // }}
                          >
                            <img
                              alt=""
                              src={Bannerplaceholder}
                              width="100%"
                              height="100%"
                              // className="addbg-icon"
                              style={
                                {
                                  // minHeight: "100%",
                                  // objectFit: "cover "
                                  // minWidth: "100%"
                                }
                              }
                            />

                            {/* <Heading6S
                              text={strings.uploadBanner}
                              color={Colors.gray49}
                              letterSpacing={"-0.02em"}
                              cursor={"pointer"}
                              padding={"0 0px 4px 0px"}
                            />
                            <Small
                              text={strings.MBMax}
                              color={Colors.black1c}
                              letterSpacing={"-0.02em"}
                              cursor={"pointer"}
                              padding={"0 0px 0 0px"}
                              opacity={"0.64"}
                            /> */}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className="abh-mh-s1-right"
                      style={{
                        width: "92%",

                        margin: "auto",
                        backgroundColor: "white",
                        zIndex: "11",
                        marginTop: "-10vh",
                        // borderRadius: "10px"
                      }}
                    >
                      <div
                        className="abh-ms1l-content-holder"
                        style={{
                          // marginTop: "-28%"
                          width: "92%",

                          margin: "auto",
                        }}
                      >
                        <Box
                          sx={{
                            border: "1px solid #D3D3D3",
                            padding: "1rem",
                            width: "auto",
                            borderRadius: "10px",
                            cursor: "pointer",
                            // marginTop: "-9% !important",
                            // borderTop: "0px",
                            backgroundColor: "white",
                            height: "160px",
                            overflowY: "scroll",
                          }}
                          className={"hideScrollbarBar"}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              cursor: "pointer",
                              color: "rgba(134, 82, 255, 0.8)",
                            }}
                          >
                            <Box>
                              <ModeEditOutlineOutlinedIcon
                                sx={{ width: "14px", marginRight: "3px" }}
                              />
                            </Box>
                            <Box
                              sx={{
                                fontWeight: "550",
                                fontSize: "12px",
                                marginTop: "-2px",
                              }}
                            >
                              EDIT
                            </Box>
                          </Box>
                          <Box
                            className=""
                            display={"flex"}
                            alignItems={"center"}
                            pb={"8px"}
                          >
                            <Heading5B
                              text={
                                userData?.storefrontDescription?.length > 0
                                  ? userData?.storefrontDescription
                                  : "Welcome to my Pedlar Store! Here is a collection of my favourite products from my favourite brands. Have a browse and enjoy."
                              }
                              color={Colors.black1c}
                              letterSpacing={"-0.02em"}
                              padding={"0 0px 0 0px"}
                              className="descriptionBreakWord2"
                            />
                          </Box>
                        </Box>
                        {/* <Box width={"100%"} pb={"24px"}>
                          <TextareaAutosize
                            className="textarea-textable"
                            aria-label="empty textarea"
                            placeholder="Enter Description"
                            defaultValue={
                              userData?.storefrontDescription
                                ? userData?.storefrontDescription
                                : "Hi honeys! I’ve worked closely with some of my fave brands to curate my own store! All items are shipped out directly from each brand. I hope you love what I've put together."
                            }
                          />
                        </Box> */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box pr={1}>
                            <img
                              alt=""
                              src={instaIcon}
                              width="16"
                              height="16"
                            />
                          </Box>
                          <Grid
                            container
                            sx={{
                              border: "1px solid #D3D3D3",
                              padding: "10px",
                              cursor: "pointer",
                              borderRadius: "10px",
                              marginTop: "10px",
                            }}
                            // onClick={toggleDrawer(true)}
                          >
                            <Grid
                              item
                              xs={9}
                              sx={{
                                wordBreak: "break-all",
                              }}
                            >
                              <Heading5B
                                text={
                                  userData.instagramLink === ""
                                    ? "@"
                                    : userData.instagramLink
                                }
                                color={Colors.black1c}
                                letterSpacing={"-0.02em"}
                                cursor={"pointer"}
                              />
                            </Grid>
                            {/* <Grid item xs={2}></Grid> */}
                            <Grid item xs={3}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  color: "rgba(134, 82, 255, 0.8)",
                                }}
                              >
                                <Box>
                                  <ModeEditOutlineOutlinedIcon
                                    sx={{ width: "14px", marginRight: "3px" }}
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    fontWeight: "550",
                                    fontSize: "12px",
                                    marginTop: "-2px",
                                  }}
                                >
                                  EDIT
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                        {/* <Box
                          className=""
                          display={"flex"}
                          alignItems={"center"}
                          pb={"8px"}
                        >
                          <img alt="" src={instaIcon} width="16" height="16" />
                          <Heading5B
                            // text={"@sam.smith"}
                            text={""}
                            color={Colors.black1c}
                            letterSpacing={"-0.02em"}
                            cursor={"pointer"}
                            padding={"0 0px 0 8px"}
                          />
                        </Box> */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box pr={1}>
                            <img
                              alt=""
                              src={tiktokIcon}
                              width="16"
                              height="16"
                            />
                          </Box>
                          <Grid
                            container
                            sx={{
                              border: "1px solid #D3D3D3",
                              padding: "10px",
                              cursor: "pointer",
                              borderRadius: "10px",
                              marginTop: "10px",
                            }}
                          >
                            <Grid
                              item
                              xs={9}
                              sx={{
                                wordBreak: "break-all",
                              }}
                            >
                              <Heading5B
                                text={
                                  userData.tiktokLink === ""
                                    ? "@"
                                    : userData.tiktokLink
                                }
                                color={Colors.black1c}
                                letterSpacing={"-0.02em"}
                                padding={"0 0px 0 8px"}
                              />
                            </Grid>
                            {/* <Grid item xs={2}></Grid> */}
                            <Grid item xs={3}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  cursor: "pointer",
                                  color: "rgba(134, 82, 255, 0.8)",
                                }}
                              >
                                <Box>
                                  <ModeEditOutlineOutlinedIcon
                                    sx={{ width: "14px", marginRight: "3px" }}
                                  />
                                </Box>
                                <Box
                                  sx={{
                                    fontWeight: "550",
                                    fontSize: "12px",
                                    marginTop: "-2px",
                                  }}
                                >
                                  EDIT
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                        {/* <Box
                          className=""
                          display={"flex"}
                          alignItems={"center"}
                          pb={"8px"}
                        >
                          <img alt="" src={tiktokIcon} width="16" height="16" />
                          <Heading5B
                            // text={"sam.smith"}
                            text={""}
                            color={Colors.black1c}
                            letterSpacing={"-0.02em"}
                            cursor={"pointer"}
                            padding={"0 0px 0 8px"}
                          />
                        </Box> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="abh-mid-holder">
                <div className="abh-mh-sec2">
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                    pb={"20px"}
                  >
                    <Box>
                      <Heading3B
                        text={strings.NewAdditions}
                        color={Colors.black1c}
                        letterSpacing={"-0.02px"}
                        fontWeight={"500"}
                        padding={"0 0 0 0"}
                      />

                      <Box display={"flex"} marginTop={"5px"}>
                        <ErrorOutlinedIcon
                          style={{
                            width: "13px",
                            color: "rgb(134, 82, 255)",
                            marginTop: "-3px",
                          }}
                        />
                        <Box
                          sx={{
                            color: "#A0A0A0",
                            marginLeft: "3px",
                            fontSize: "small",
                          }}
                        >
                          This section will only display your 5 most recent
                          products
                        </Box>
                      </Box>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} pt={"8px"}>
                      <Small
                        text={strings.SHOPALL}
                        color={Colors.black1c}
                        opacity={"0.64"}
                        fontWeight={"600"}
                        padding={"0 2px 0 0"}
                      />
                      <img alt="" src={forwordGray} />
                    </Box>
                  </Box>
                  <Grid container columnSpacing={2}>
                    {productsList.length > 0
                      ? productsList.map((item) => {
                          return (
                            <Grid item xs={6} sm={3} lg={3} key={item.id}>
                              <div className="abh-mh-s2-add-product-uploaded-box">
                                <img
                                  alt=""
                                  src={
                                    item.featuredImage.url
                                      ? item.featuredImage.url
                                      : noproduct
                                  }
                                  className="abh-mh-s2-apub-img"
                                />
                                <Small
                                  text={item.vendor}
                                  color={Colors.black1c}
                                  fontWeight={"600"}
                                  textTransform={"uppercase"}
                                />
                                <Heading6S
                                  text={item.title}
                                  color={Colors.black1c}
                                  padding={"0 0px 0px 0"}
                                  letterSpacing={"-0.02em"}
                                  className="abh-mh-s2-pr-dtl-truncate"
                                />
                                <Heading6S
                                  text={
                                    "$" +
                                    item.priceRangeV2.maxVariantPrice.amount
                                  }
                                  color={Colors.black1c}
                                  padding={"0 0px 0px 0"}
                                  letterSpacing={"-0.02em"}
                                />
                              </div>
                            </Grid>
                          );
                        })
                      : null}
                    <Grid item xs={6} sm={3} lg={3}>
                      <div className="abh-mh-s2-add-product-uploader">
                        <label className="abh-mh-s2-add-product-upload">
                          <img alt="" src={addPlusBlackImg} />
                        </label>
                        <Heading6S
                          text={strings.addProduct}
                          padding={"8px 0 0px 0"}
                          letterSpacing={"-0.02em"}
                        />
                      </div>
                    </Grid>
                  </Grid>
                  {/* <Grid container columnSpacing={2}>
                    <Grid item xs={6} sm={3} lg={3}>
                      <div className="abh-mh-s2-add-product-uploaded-box">
                        <img
                          alt=""
                          src={productList5}
                          className="abh-mh-s2-apub-img"
                        />
                        <Small
                          text={"Sisley Paris"}
                          color={Colors.black1c}
                          fontWeight={"600"}
                          textTransform={"uppercase"}
                        />
                        <Heading6S
                          text={"Eye Contour Mask"}
                          color={Colors.black1c}
                          padding={"0 0px 0px 0"}
                          letterSpacing={"-0.02em"}
                          className="abh-mh-s2-pr-dtl-truncate"
                        />
                        <Heading6S
                          text={"$42"}
                          color={Colors.black1c}
                          padding={"0 0px 0px 0"}
                          letterSpacing={"-0.02em"}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={3} lg={3}>
                      <div className="abh-mh-s2-add-product-uploaded-box">
                        <img
                          alt=""
                          src={productList6}
                          className="abh-mh-s2-apub-img"
                        />
                        <Small
                          text={"Matteau"}
                          color={Colors.black1c}
                          fontWeight={"600"}
                          textTransform={"uppercase"}
                        />
                        <Heading6S
                          text={"Drop Earring Collection"}
                          color={Colors.black1c}
                          fontWeight={"600"}
                          padding={"0 0px 0px 0"}
                          letterSpacing={"-0.02em"}
                          className="abh-mh-s2-pr-dtl-truncate"
                        />
                        <Heading6S
                          text={"$450"}
                          color={Colors.black1c}
                          fontWeight={"600"}
                          padding={"0 0px 0px 0"}
                          letterSpacing={"-0.02em"}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={3} lg={3}>
                      <div className="abh-mh-s2-add-product-uploaded-box">
                        <img
                          alt=""
                          src={productList7}
                          className="abh-mh-s2-apub-img"
                        />
                        <Small
                          text={"Matteau"}
                          color={Colors.black1c}
                          fontWeight={"600"}
                          textTransform={"uppercase"}
                        />
                        <Heading6S
                          text={"Drop Earring Collection"}
                          color={Colors.black1c}
                          fontWeight={"600"}
                          padding={"0 0px 0px 0"}
                          letterSpacing={"-0.02em"}
                          className="abh-mh-s2-pr-dtl-truncate"
                        />
                        <Heading6S
                          text={"$450"}
                          color={Colors.black1c}
                          fontWeight={"600"}
                          padding={"0 0px 0px 0"}
                          letterSpacing={"-0.02em"}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={3} lg={3}>
                      <div className="abh-mh-s2-add-product-uploader">
                        <label className="abh-mh-s2-add-product-upload">
                          <img alt="" src={addPlusBlackImg} />
                        </label>
                        <Heading6S
                          text={strings.addProduct}
                          padding={"8px 0 0px 0"}
                          letterSpacing={"-0.02em"}
                        />
                      </div>
                    </Grid>
                  </Grid> */}
                </div>
                <div className="abh-mh-sec3">
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"flex-start"}
                    justifyContent={"flex-start"}
                    pb={"20px"}
                  >
                    <Heading3B
                      text={strings.curatedBrands}
                      color={Colors.black1c}
                      letterSpacing={"-0.02px"}
                      fontWeight={"500"}
                      padding={"0 0 8px 0"}
                    />
                    <Box display={"flex"} alignItems={"center"}>
                      <Small
                        text={strings.ShopBrands}
                        color={Colors.black1c}
                        opacity={"0.64"}
                        fontWeight={"600"}
                        padding={"0 2px 0 0"}
                      />
                      <img alt="" src={forwordGray} />
                    </Box>
                  </Box>
                  <div className="curated-main-holder">
                    <div className="cm-holder">
                      <div className="curated-brands-logo-box">
                        <img
                          alt=""
                          src={curatedBrandslogo1}
                          className="curated-brands-lb-logo"
                        />
                      </div>
                      <div className="curated-brands-logo-box">
                        <img
                          alt=""
                          src={curatedBrandslogo2}
                          className="curated-brands-lb-logo"
                        />
                      </div>
                      <div className="curated-brands-logo-box">
                        <img
                          alt=""
                          src={curatedBrandslogo3}
                          className="curated-brands-lb-logo"
                        />
                      </div>
                      <div className="curated-brands-logo-box">
                        <img
                          alt=""
                          src={curatedBrandslogo4}
                          className="curated-brands-lb-logo"
                        />
                      </div>
                      <div className="curated-brands-logo-box">
                        <img
                          alt=""
                          src={curatedBrandslogo5}
                          className="curated-brands-lb-logo"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="abh-footer">
                <div className="abh-f-top-holder">
                  <div className="abh-fth-left">
                    <Heading3B
                      text={strings.help_Support}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 20px 0px"}
                    />
                    <Heading4B
                      text={strings.shipping_Returns}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.internationalShipping}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.contact}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.terms_Conditiosn}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.privacyPolicy}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.FAQ}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                  </div>
                  <div className="abh-fth-right" style={{ paddingTop: "4px" }}>
                    <Heading4B
                      text={strings.WeAreAlwaysHereToHelp}
                      color={Colors.black}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                    <Heading4B
                      text={strings.contactUsAt}
                      color={Colors.black}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                    <Heading4B
                      text={"support@pedlar.com and out"}
                      color={Colors.black}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                    <Heading4B
                      text={strings.customerServiceTeamWillBeIn}
                      color={Colors.black}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                    <Heading4B
                      text={strings.touch}
                      color={Colors.black}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                  </div>
                </div>
                <div className="abh-f-bottom-holder">
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Box pb={"20px"}>
                      <Small
                        text={strings.PedlarPTYLTDPoweredByPedlar}
                        color={Colors.black}
                        letterSpacing={"0.4px"}
                        padding={"0 0px 0px 0px"}
                      />
                    </Box>
                    <Box>
                      <img
                        alt=""
                        src={fAmex}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fApplepay}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fMastercard}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fPaypal}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fShoppay}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fVisa}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                    </Box>
                  </Box>
                </div>
              </div>
            </div>
            <Box
              className="share-store-position"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              data-tut="reactour__ffthtab_mobile"
              sx={{
                zIndex: "112",
              }}
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
                width={"184px"}
                text={strings.shareMyStore}
                margin={"0 0 0px 0"}
              />
            </Box>
          </div>
          <SwipeableDrawer
            anchor="bottom"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            disableSwipeToOpen={true}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Box className="drawer-bottom">
              <Heading6S
                text={strings.SocialLinks}
                color={Colors.black1c}
                padding={"0 0 30px 0"}
                fontWeight={"600"}
                textAlign={"center"}
              />
              <Box className="form-group">
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InstagramIcon />
                      </InputAdornment>
                    ),
                  }}
                  className="textfield"
                  label={strings.instagramHandle}
                  placeholder="Enter Here"
                />
              </Box>
              <Box className="form-group">
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img alt="" src={tiktokIcon} />
                      </InputAdornment>
                    ),
                  }}
                  className="textfield"
                  label={strings.tiktokUsername}
                  placeholder="Enter Here"
                />
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-end"}
                pt={"160px"}
              >
                <BackLarge
                  width={"100%"}
                  text={strings.save}
                  margin={"0 0 14px 0"}
                />
              </Box>
            </Box>
          </SwipeableDrawer>

          <SwipeableDrawer
            anchor="bottom"
            open={openSocial}
            onClose={toggleDrawerSocial(false)}
            onOpen={toggleDrawerSocial(true)}
            disableSwipeToOpen={true}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Box className="drawer-bottom">
              <Heading6S
                text={strings.chooseBanner}
                textAlign={"center"}
                color={Colors.black1c}
                padding={"0 0 26px 0"}
                letterSpacing={"-0.02em"}
              />
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Upload Image" {...a11yProps(0)} />
                  <Tab label="Instagram" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0} style={{ padding: "0" }}>
                <div className="">
                  <div className="upload-banner-popup-box">
                    <label className="abh-ms1l-bh-upload-image">
                      <img alt="" src={addBGBlackIcon} className="addbg-icon" />
                      <Heading6S
                        text={strings.uploadBanner}
                        color={Colors.gray49}
                        letterSpacing={"-0.02em"}
                        cursor={"pointer"}
                        padding={"0 0px 4px 0px"}
                      />
                      <Small
                        text={strings.MBMax}
                        color={Colors.black1c}
                        letterSpacing={"-0.02em"}
                        cursor={"pointer"}
                        padding={"0 0px 0 0px"}
                        opacity={"0.64"}
                      />
                      <input type="file" />
                    </label>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="insta-upload-img-popupholder">
                  <Body
                    text={strings.importAnImageFromInstagram}
                    color={Colors.gray49}
                    letterSpacing={"0.1px"}
                    cursor={"pointer"}
                    fontWeight={"500"}
                    padding={"0 0px 24px 0px"}
                    textAlign={"center"}
                  />
                  <button className="instapopupbutton" type="button">
                    <img alt="" src={instaWhite} />{" "}
                    <Heading6S
                      text={strings.ContinueWithInstagram}
                      color={Colors.grayf9}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 12px"}
                    />
                  </button>
                </div>
              </TabPanel>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-end"}
                mt={"80px"}
              >
                <BackLarge
                  width={"100%"}
                  text={strings.save}
                  margin={"0 0 14px 0"}
                />
              </Box>
            </Box>
          </SwipeableDrawer>

          <SwipeableDrawer
            anchor="bottom"
            open={openTour}
            onClose={toggleDrawerTour(false)}
            onOpen={toggleDrawerTour(true)}
            disableSwipeToOpen={true}
            ModalProps={{
              keepMounted: true,
            }}
            PaperProps={{
              classes: {
                root: classes.root,
              },
            }}
            // sx={{
            //   borderRadius: "40px 40px 0px 0px !important",
            //   border: "5px solid red"
            //   "& .cMuiPaper-root-MuiDrawer-paper": {
            //     borderRadius: "40px 40px 0px 0px"
            //   }
            // }}
          >
            <Box
              className="drawer-bottom"
              sx={{
                // border: "5px solid red",
                borderRadius: "40px 40px 0px 0px",
              }}
            >
              <Box
                className="popupdefaultimgbox"
                sx={{
                  position: "relative",
                  margin: "-30px -24px 0px -24px",
                  borderRadius: "40px 40px 0px 0px",
                }}
              >
                <img
                  alt=""
                  src={welcomeToIedlarImg}
                  style={{
                    borderRadius: "40px  40px 0px 0px",
                  }}
                  className="popupdefaultimg"
                />
              </Box>
              <Box pt={"8px"}>
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
                display={"block"}
                alignItems={"center"}
                justifyContent={"flex-end"}
                pt={"70px"}
              >
                <PrimaryLarge
                  width={"100%"}
                  text={strings.takeTour}
                  onClick={TourStartPopupOpenM}
                  margin={"0 0 6px 0"}
                />

                <CancelLarge
                  width={"100%"}
                  text={strings.skip}
                  onClick={() => navigate("/storefront")}
                  margin={"0 0 16px 0"}
                />
              </Box>
            </Box>
          </SwipeableDrawer>
          <SwipeableDrawer
            anchor="bottom"
            open={openShareStore}
            onClose={toggleDrawerShareStore(false)}
            onOpen={toggleDrawerShareStore(true)}
            disableSwipeToOpen={true}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Box className="drawer-bottom">
              <Box>
                <Heading6S
                  text={strings.shareYourStore}
                  color={"#454545"}
                  padding={"0 0 4px 0"}
                  letterSpacing={"-0.02em"}
                  textAlign={"center"}
                />
                <Heading4B
                  text={
                    strings.shareYourStoreURLAcrossYourSocialsLinkInBioStoriesVideosAndPictures
                  }
                  color={Colors.black1c}
                  padding={"0 0 8px 0"}
                  letterSpacing={"-0.02em"}
                  opacity={"0.60"}
                  textAlign={"center"}
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
                      text={"pedlar.store/storename"}
                      color={"#262626"}
                      padding={"0 0 0px 0"}
                      letterSpacing={"-0.02em"}
                    />
                  </Box>
                  <img
                    src={copyIconBlack}
                    alt=""
                    style={{ cursor: "pointer" }}
                  />
                </Box>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-end"}
                mt={"80px"}
              >
                <PrimaryLarge
                  width={"100%"}
                  text={strings.cancel}
                  margin={"0 0 14px 0"}
                />
              </Box>
            </Box>
          </SwipeableDrawer>
        </div>
      ) : (
        <Box className="product-detail-parent">
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100vh"}
            width={"100vw"}
            position={"absolute"}
          >
            <Loaders />
          </Box>
        </Box>
      )}
    </>
  );
};

export default OnboardingTourReview;
