import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useNavigate } from "react-router-dom";

import * as Colors from "../../../assets/styles/Colors";
import {
  Heading2B,
  LabelInput,
  Heading3B,
  LabelWrapper,
  Heading6S,
  Small,
} from "../../../assets/styles/Labels";
import "./ForgotPassword.scss";

import loginImg from "../../../assets/images/product/login-img.png";
import pedlarLogo from "../../../assets/images/logo/pedlar-logo.svg";
// import backIcon from "../../../assets/images/structure/back-icon.svg";
import backIcon from "../../../assets/images/structure/back-icon.svg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { sendForgotPasswordEmail } from "../../../firebase";
import ReactiveButton from "reactive-button";
import ButtonLoader from "../../../GlobalModule/ButtonLoader";
import backArrow from "../../../assets/images/structure/back-black.svg";
import { Link } from "@mui/material";

const strings = require("../../../localisation_en.json");
/* eslint-disable-next-line */
// var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let mailformat = "^[^@]+@[a-zA-Z0-9._-]+\\.+[a-z._-]+$";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [eventMsg, setEventMsg] = useState("");
  const [state, setState] = useState("idle");
  let history = useHistory();
  const navigate = useNavigate();

  const handleClick = () => {
    history.push("/");
  };
  useEffect(() => {
    if (email === "") {
      setEmailErr("");
    } else if (!email.match(mailformat)) {
      setEmailErr(strings.enterAValidEmailAddress);
    } else setEmailErr("");
  }, [email]);
  const ForogtPasswordSubmitHandler = async () => {
    try {
      setState("loading");
      await sendForgotPasswordEmail(email);
      setEventMsg(strings.resetPasswordlinkSent);
      setState("success");
      setEmail("");
      navigate("/check-email");
      setTimeout(() => {
        setEventMsg("");
      }, 5000);
    } catch (error) {
      if (error.code === "auth/user-not-found")
        setEmailErr(strings.notRegisterEmail);
    }
  };

  return (
    <>
      {/* desktop view  */}
      <div className="main-holder desktop-view-marge">
        <div className="new-container">
          <div className="login-header" style={{ cursor: "pointer" }}>
            <img
              src={pedlarLogo}
              className="logo-img"
              alt=""
              onClick={handleClick}
            />
          </div>
          <div className="login-holder">
            <Grid container columnSpacing={2}>
              <Grid item xs={4} className="col4">
                <div className="login-left">
                  <div className="ll-img-box">
                    <img alt="" src={loginImg} className="login-left-img" />
                  </div>
                </div>
              </Grid>
              <Grid
                item
                xs={8}
                className="col8"
                display={"flex"}
                alignItems={"center"}
              >
                <div className="login-right l-r-new-space">
                  <Box
                    style={{ cursor: "pointer" }}
                    display={"flex"}
                    alignItems={"center"}
                    mb={3}
                    onClick={() => {
                      navigate(`/`);
                    }}
                  >
                    <img alt="" src={backIcon} />
                    <Heading6S
                      text={strings.back}
                      color={Colors.black1c}
                      padding={"0 0 0 12px"}
                      letterSpacing={"-0.02em"}
                    />
                  </Box>
                  <Heading2B
                    text={strings.resetPassword}
                    color={Colors.black}
                    padding={"0 0 20px 0"}
                    letterSpacing={"-0.02em"}
                  />
                  <Heading3B
                    text={`${strings.ToResetYourPasswordPlease}`}
                    color={Colors.black1c}
                    opacity={"0.64"}
                    letterSpacing={"-0.02em"}
                  />{" "}
                  <Heading3B
                    text={`${strings.ContactPedlarSupportat}`}
                    color={Colors.black1c}
                    opacity={"0.64"}
                    letterSpacing={"-0.02em"}
                  />
                  <Link
                    href="mailto:hello@pedlar.store"
                    sx={{
                      textDecorationColor: Colors.black1c,
                      "&:hover": {
                        textDecorationColor: Colors.black1c,
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Heading3B
                      text={`hello@pedlar.store.`}
                      color={Colors.black1c}
                      opacity={"0.64"}
                      letterSpacing={"-0.02em"}
                    />
                  </Link>
                  <Box sx={{ padding: "0 0 100px 0" }}></Box>
                  {/* <Box className="form-group">
                    <TextField
                      className="textfield"
                      id="outlined-required2"
                      label={strings.email}
                      placeholder=""
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    {emailErr !== "" ? (
                      <LabelInput
                        className="ipnputlabel"
                        color={Colors.error}
                        text={emailErr}
                      ></LabelInput>
                    ) : null}
                  </Box> */}
                  {/* <Box
                    display={"flex"}
                    alignItems={"flex-end"}
                    flexDirection={"column"}
                    pt={"120px"}
                  >
                    <ReactiveButton
                      buttonState={state}
                      onClick={() => ForogtPasswordSubmitHandler()}
                      rounded
                      size="large"
                      color="#000"
                      disabled={
                        email.trim() &&
                        email.trim().match(mailformat) &&
                        emailErr === ""
                          ? false
                          : true
                      }
                      idleText={strings.resetPassword}
                      width={"310px"}
                      loadingText={<ButtonLoader />}
                    />
                    {eventMsg ? (
                      <span className="product-added">{eventMsg}</span>
                    ) : null}
                  </Box> */}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      {/* mobile view  */}
      <div className="main-holder mobile-view-marge">
        <div className="login-header">
          <img
            alt=""
            src={backArrow}
            className="lh-backicon"
            onClick={() => {
              navigate(`/`);
            }}
          />
          <img
            src={pedlarLogo}
            className="logo-img"
            alt=""
            onClick={handleClick}
          />
        </div>
        <div className="login-holder">
          <Grid container columnSpacing={0}>
            <Grid item xs={12} display={"flex"} alignItems={"center"}>
              <div className="login-right">
                <Box sx={{ width: "100%" }}>
                  <Heading2B
                    text={strings.resetPassword}
                    color={Colors.black}
                    padding={"0 0 40px 0"}
                    letterSpacing={"-0.02em"}
                  />
                  <LabelWrapper padding={"0 0 32px 0px"}>
                    <Heading3B
                      text={strings.ToResetYourPasswordPlease}
                      className="gradient-gray"
                      display={"flex"}
                      alignItems={"center"}
                    />
                    <Heading3B
                      text={strings.ContactPedlarSupportat}
                      className="gradient-gray"
                      display={"flex"}
                      alignItems={"center"}
                    />
                    <Link
                      href="mailto:hello@pedlar.store"
                      sx={{
                        textDecorationColor:
                          "rgba(28, 27, 31, 0.64) !important",
                        "&:hover": {
                          textDecorationColor:
                            "rgba(28, 27, 31, 0.64) !important",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <Heading3B
                        text={`hello@pedlar.store.`}
                        className="gradient-gray"
                        display={"flex"}
                        alignItems={"center"}
                      />
                    </Link>
                  </LabelWrapper>
                  {/* <Box className="form-group">
                    <TextField
                      required
                      className="textfield"
                      id="outlined-required3"
                      label={strings.email}
                      placeholder=""
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailErr !== "" ? (
                      <LabelInput
                        className="ipnputlabel"
                        color={Colors.error}
                        text={emailErr}
                      ></LabelInput>
                    ) : null}
                  </Box> */}
                </Box>
                {/* <Box
                  sx={{ width: "100%" }}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDirection={"column"}
                  // pt={"120px"}
                >
                  <ReactiveButton
                    buttonState={state}
                    onClick={() => ForogtPasswordSubmitHandler()}
                    rounded
                    size="large"
                    color="#000"
                    disabled={
                      email.trim() &&
                      email.trim().match(mailformat) &&
                      emailErr === ""
                        ? false
                        : true
                    }
                    idleText={strings.resetPassword}
                    // width={"310px"}
                    width="100%"
                    height={"44px"}
                    loadingText={<ButtonLoader />}
                  />

                  {eventMsg ? (
                    <span className="product-added">{eventMsg}</span>
                  ) : null}
                </Box> */}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
