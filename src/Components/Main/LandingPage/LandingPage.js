import React from "react";
import * as Colors from "../../../assets/styles/Colors";
import { PrimaryLarge } from "../../../assets/styles/Buttons";
import {
  Heading3B,
  Heading4B,
  Heading6S,
  Small,
} from "../../../assets/styles/Labels";
import "./LandingPage.scss";
import pedlarLogo from "../../../assets/images/logo/pedlar-logo.svg";
import menuIcon from "../../../assets/images/structure/menu_24px.svg";
import ModalClose from "../../../assets/images/structure/closeblack.svg";
import cartBlack from "../../../assets/images/structure/cart-black.svg";
import tiktokIcon from "../../../assets/images/structure/tiktok-icon.svg";
import instaIcon from "../../../assets/images/structure/insta-icon.svg";
import forwordGray from "../../../assets/images/structure/forword-gray.svg";
import productList1 from "../../../assets/images/product/product-list1.png";
import productList2 from "../../../assets/images/product/product-list2.png";
import productList3 from "../../../assets/images/product/product-list3.png";
import productList4 from "../../../assets/images/product/product-list4.png";
import productList5 from "../../../assets/images/product/product-list5.png";
import productList6 from "../../../assets/images/product/product-list6.png";
import productList7 from "../../../assets/images/product/product-list7.png";
import productList8 from "../../../assets/images/product/product-list8.png";
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
import uploadedImg from "../../../assets/images/product/uploaded-img.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
const strings = require("../../../localisation_en.json");
const drawerWidth = 331;
function LandingPage(props) {
  const [mobileOpenCategory, setMobileOpenCategory] = React.useState(false);
  const handleDrawerToggleCategory = () => {
    setMobileOpenCategory(!mobileOpenCategory);
  };
  return (
    <>
      {/* desktop view  */}
      <div className="main-mid-holder mmh-bg-white desktop-view-marge">
        <div className="landing-main-holder landing-contianer">
          <div className="add-banner-holder">
            <div className="abh-header">
              <Box className="" display={"flex"} alignItems={"center"}>
                <img src={pedlarLogo} className="logo-img" alt="" />
                <Heading3B
                  text={"Hannah Juneva"}
                  color={Colors.black1c}
                  cursor={"pointer"}
                  padding={"0 0 0 8px"}
                  fontWeight={"400"}
                />
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Heading6S
                  text={strings.brands}
                  color={Colors.black1c}
                  letterSpacing={"-0.02em"}
                  padding={"0 20px"}
                  opacity={"0.80"}
                />
                <Heading6S
                  text={strings.shop}
                  color={Colors.black1c}
                  letterSpacing={"-0.02em"}
                  padding={"0 20px"}
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
                  <div className="abh-ms1l-banner-holder">
                    <div className="abh-ms1l-bh-uploaded-img-box">
                      <img
                        alt=""
                        src={uploadedImg}
                        className="abh-ms1l-bh-uploaded-img"
                      />
                    </div>
                  </div>
                </div>
                <div className="abh-mh-s1-right">
                  <div className="abh-ms1l-content-holder">
                    <Box className="" pb={"24px"}>
                      <Heading6S
                        text={
                          "Hi honeys! I’ve worked closely with some of my fave brands to curate my own store! All items are shipped out directly from each brand. I hope you love what I've put together. "
                        }
                        color={Colors.black1c}
                        letterSpacing={"-0.02em"}
                        cursor={"pointer"}
                        padding={"0 0px 0 0px"}
                      />
                    </Box>
                    <Box
                      className=""
                      display={"flex"}
                      alignItems={"center"}
                      pb={"8px"}
                    >
                      <img alt="" src={instaIcon} width="16" height="16" />
                      <Heading6S
                        text={"elinorcharlotte"}
                        color={Colors.black1c}
                        letterSpacing={"-0.02em"}
                        padding={"0 0px 0 8px"}
                      />
                    </Box>
                    <Box
                      className=""
                      display={"flex"}
                      alignItems={"center"}
                      pb={"8px"}
                    >
                      <img alt="" src={tiktokIcon} width="16" height="16" />
                      <Heading6S
                        text={"elridge"}
                        color={Colors.black1c}
                        letterSpacing={"-0.02em"}
                        padding={"0 0px 0 8px"}
                      />
                    </Box>
                    <Box pt={"32px"}>
                      <PrimaryLarge width={"150px"} text={strings.shopNow} />
                    </Box>
                  </div>
                </div>
              </div>
              <div className="abh-mh-sec2">
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  pb={"20px"}
                >
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
                  >
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
                    <div className="abh-mh-s2-add-product-uploaded-box">
                      <img
                        alt=""
                        src={productList8}
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
                        src={productList1}
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
                        src={productList2}
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
                        src={productList3}
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
                        src={productList4}
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
                </Grid>
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
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                  >
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
                    cursor={"pointer"}
                    opacity={"0.64"}
                  />
                  <Heading4B
                    text={strings.internationalShipping}
                    color={Colors.black1c}
                    letterSpacing={"-0.02em"}
                    padding={"0 0px 8px 0px"}
                    cursor={"pointer"}
                    opacity={"0.64"}
                  />
                  <Heading4B
                    text={strings.contact}
                    color={Colors.black1c}
                    letterSpacing={"-0.02em"}
                    padding={"0 0px 8px 0px"}
                    cursor={"pointer"}
                    opacity={"0.64"}
                  />
                  <Heading4B
                    text={strings.terms_Conditiosn}
                    color={Colors.black1c}
                    letterSpacing={"-0.02em"}
                    padding={"0 0px 8px 0px"}
                    cursor={"pointer"}
                    opacity={"0.64"}
                  />
                  <Heading4B
                    text={strings.privacyPolicy}
                    color={Colors.black1c}
                    letterSpacing={"-0.02em"}
                    padding={"0 0px 8px 0px"}
                    cursor={"pointer"}
                    opacity={"0.64"}
                  />
                  <Heading4B
                    text={strings.FAQ}
                    color={Colors.black1c}
                    letterSpacing={"-0.02em"}
                    padding={"0 0px 8px 0px"}
                    cursor={"pointer"}
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
                    <img alt="" src={fAmex} className="abh-f-social-icon" />
                    <img alt="" src={fApplepay} className="abh-f-social-icon" />
                    <img
                      alt=""
                      src={fMastercard}
                      className="abh-f-social-icon"
                    />
                    <img alt="" src={fPaypal} className="abh-f-social-icon" />
                    <img alt="" src={fShoppay} className="abh-f-social-icon" />
                    <img alt="" src={fVisa} className="abh-f-social-icon" />
                  </Box>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile view  */}
      <div className="main-mid-holder mmh-bg-white mobile-view-marge">
        <div className="landing-main-holder landing-contianer">
          <div className="add-banner-holder">
            <div className="abh-header">
              <img
                alt=""
                src={menuIcon}
                className="icon24"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggleCategory}
              />
              <Box display={"flex"} alignItems={"center"}>
                <img src={pedlarLogo} className="logo-img" alt="" />
                <Heading3B
                  text={"Hannah Juneva"}
                  color={Colors.black1c}
                  cursor={"pointer"}
                  padding={"0 0 0 8px"}
                  fontWeight={"400"}
                />
              </Box>
              <img alt="" src={cartBlack} className="icon24" />
            </div>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              <Drawer
                variant="temporary"
                open={mobileOpenCategory}
                onClose={handleDrawerToggleCategory}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
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
                  onClick={handleDrawerToggleCategory}
                />
                <div
                  className="sidebar-toggle"
                  style={{ margin: "30px 0px 0px 0px", display: "block" }}
                >
                  <div className="sidebar-list active">
                    <Heading6S
                      text={strings.brands}
                      color={Colors.black1c}
                      padding={"0 0 0px 16px"}
                      letterSpacing={"-0.02em"}
                    />
                  </div>
                  <div className="sidebar-list">
                    <Heading6S
                      text={strings.shop}
                      color={Colors.black1c}
                      padding={"0 0 0px 16px"}
                      letterSpacing={"-0.02em"}
                    />
                  </div>
                </div>
              </Drawer>
            </Box>
            <div className="abh-mid-holder">
              <div className="abh-mh-sec1">
                <div className="abh-mh-s1-left">
                  <div className="abh-ms1l-banner-holder">
                    <div className="abh-ms1l-bh-uploaded-img-box">
                      <img
                        alt=""
                        src={uploadedImg}
                        className="abh-ms1l-bh-uploaded-img"
                      />
                    </div>
                  </div>
                </div>
                <div className="abh-mh-s1-right">
                  <div className="abh-ms1l-content-holder">
                    <Box className="" pb={"24px"}>
                      <Heading6S
                        text={
                          "Hi honeys! I’ve worked closely with some of my fave brands to curate my own store! All items are shipped out directly from each brand. I hope you love what I've put together. "
                        }
                        color={Colors.black1c}
                        letterSpacing={"-0.02em"}
                        cursor={"pointer"}
                        padding={"0 0px 0 0px"}
                      />
                    </Box>
                    <Box
                      className=""
                      display={"flex"}
                      alignItems={"center"}
                      pb={"8px"}
                    >
                      <img alt="" src={instaIcon} width="16" height="16" />
                      <Heading6S
                        text={"@sam.smith"}
                        color={Colors.black1c}
                        letterSpacing={"-0.02em"}
                        padding={"0 0px 0 8px"}
                      />
                    </Box>
                    <Box
                      className=""
                      display={"flex"}
                      alignItems={"center"}
                      pb={"8px"}
                    >
                      <img alt="" src={tiktokIcon} width="16" height="16" />
                      <Heading6S
                        text={"sam.smith"}
                        color={Colors.black1c}
                        letterSpacing={"-0.02em"}
                        padding={"0 0px 0 8px"}
                      />
                    </Box>
                    <Box pt={"32px"}>
                      <PrimaryLarge width={"150px"} text={strings.shopNow} />
                    </Box>
                  </div>
                </div>
              </div>
              <div className="abh-mh-sec2">
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"flex-start"}
                  justifyContent={"flex-start"}
                  pb={"20px"}
                >
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
                    pt={"8px"}
                  >
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
                    <div className="abh-mh-s2-add-product-uploaded-box">
                      <img
                        alt=""
                        src={productList8}
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
                        src={productList1}
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
                        src={productList2}
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
                        src={productList3}
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
                        src={productList4}
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
                </Grid>
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
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                  >
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
                    cursor={"pointer"}
                    opacity={"0.64"}
                  />
                  <Heading4B
                    text={strings.internationalShipping}
                    color={Colors.black1c}
                    letterSpacing={"-0.02em"}
                    padding={"0 0px 8px 0px"}
                    cursor={"pointer"}
                    opacity={"0.64"}
                  />
                  <Heading4B
                    text={strings.contact}
                    color={Colors.black1c}
                    letterSpacing={"-0.02em"}
                    padding={"0 0px 8px 0px"}
                    cursor={"pointer"}
                    opacity={"0.64"}
                  />
                  <Heading4B
                    text={strings.terms_Conditiosn}
                    color={Colors.black1c}
                    letterSpacing={"-0.02em"}
                    padding={"0 0px 8px 0px"}
                    cursor={"pointer"}
                    opacity={"0.64"}
                  />
                  <Heading4B
                    text={strings.privacyPolicy}
                    color={Colors.black1c}
                    letterSpacing={"-0.02em"}
                    padding={"0 0px 8px 0px"}
                    cursor={"pointer"}
                    opacity={"0.64"}
                  />
                  <Heading4B
                    text={strings.FAQ}
                    color={Colors.black1c}
                    letterSpacing={"-0.02em"}
                    padding={"0 0px 8px 0px"}
                    cursor={"pointer"}
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
                    <img alt="" src={fAmex} className="abh-f-social-icon" />
                    <img alt="" src={fApplepay} className="abh-f-social-icon" />
                    <img
                      alt=""
                      src={fMastercard}
                      className="abh-f-social-icon"
                    />
                    <img alt="" src={fPaypal} className="abh-f-social-icon" />
                    <img alt="" src={fShoppay} className="abh-f-social-icon" />
                    <img alt="" src={fVisa} className="abh-f-social-icon" />
                  </Box>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
