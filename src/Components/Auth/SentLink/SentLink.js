import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Colors from "../../../assets/styles/Colors";
import { PrimaryLarge } from "../../../assets/styles/Buttons";
import {
  Heading2B,
  Heading3B,
  LabelWrapper,
  LabelInput,
} from "../../../assets/styles/Labels";
import "./SentLink.scss";
import pedlarLogo from "../../../assets/images/logo/pedlar-logo.svg";
import loginImg from "../../../assets/images/product/login-img.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { LogOut } from "../../../firebase";
import { sendVerificationEmail } from "../../../firebase";
const strings = require("../../../localisation_en.json");

function SentLink(props) {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [counter, setCounter] = useState(0);
  const [resendEmailError, setResendEmailError] = useState("");
  const navigate = useNavigate();
  const handleClick = async () => {
    await LogOut();
    navigate("/");
  };
  useEffect(() => {
    let string = window.location.pathname?.split("/") || "";
    setEmail(string[2]);
  }, []);
  const sendVerificationEmailHandle = async () => {
    try {
      setCounter(15);
      await sendVerificationEmail();

      setSuccessMsg(strings.sendVerificationEmailSuccessMsg);
      setTimeout(() => {
        setSuccessMsg("");
      }, 5000);
    } catch (error) {
      if (error.code === "auth/too-many-requests")
        setSuccessMsg(strings.sendVerificationEmailErrorMsg);
      setResendEmailError("Please try after 15 seconds");

      setTimeout(() => {
        setSuccessMsg("");
      }, 8000);
      setTimeout(() => {
        setSuccessMsg("");
        setResendEmailError("");
      }, 15000);
    }
  };

  //useEffect for counter to display on resend email button

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  console.log(counter);

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
              onClick={() => handleClick()}
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
                <div className="login-right">
                  <Heading2B
                    text={strings.WeveSentYouALink}
                    color={Colors.black1c}
                    padding={"0 0 32px 0"}
                    letterSpacing={"-0.02em"}
                  />
                  <LabelWrapper>
                    <Heading3B
                      text={strings.HitTheLinkInTheEmailWeveSentTo}
                      className="gradient-gray"
                      display={"flex"}
                      alignItems={"center"}
                    />
                    <Heading3B
                      text={email}
                      color={Colors.black1c}
                      display={"flex"}
                      alignItems={"center"}
                    />
                    <Heading3B
                      text={strings.toVerifyYourEmail}
                      className="gradient-gray"
                      display={"flex"}
                      alignItems={"center"}
                      padding={"0 0 0 2px"}
                    />
                    {/* <Heading3B
                      text={strings.addressAndStartSelling}
                      className="gradient-gray"
                      display={"flex"}
                      alignItems={"center"}
                    /> */}
                    <Heading3B
                      text={strings.ifYouCanNotFindYourVerificationEmail}
                      className="gradient-gray"
                      display={"flex"}
                      alignItems={"center"}
                      padding={"16px 0 0 0px"}
                    />
                    {successMsg ? (
                      <span className="product-added">{successMsg}</span>
                    ) : null}
                    {/*
                    <span className="product-added">
                      {
                        "After clicking on verification link please refresh the page to continue."
                      }
                    </span> */}
                  </LabelWrapper>

                  <Box
                    display={"flex"}
                    alignItems={"flex-end"}
                    flexDirection={"column"}
                    pt={"32px"}
                  >
                    <PrimaryLarge
                      width={"150px"}
                      text={
                        resendEmailError.length > 0
                          ? counter > 0
                            ? counter
                            : strings.resendEmail
                          : strings.resendEmail
                      }
                      disabled={resendEmailError.length > 0 ? true : false}
                      margin={"0 0 14px 0"}
                      onClick={() => sendVerificationEmailHandle()}
                    />
                    {resendEmailError.length > 0 ? (
                      <LabelInput
                        className="ipnputlabel"
                        color={Colors.error}
                        text={
                          "Please wait 15 seconds to resend the verification link again."
                        }
                      ></LabelInput>
                    ) : null}
                  </Box>
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
            src={pedlarLogo}
            className="logo-img"
            alt=""
            onClick={() => handleClick()}
          />
        </div>
        <div className="login-holder">
          <Grid container columnSpacing={0}>
            <Grid item xs={12} display={"flex"} alignItems={"center"}>
              <div className="login-right">
                <Box sx={{ width: "100%" }}>
                  <Heading2B
                    text={strings.WeveSentYouALink}
                    color={Colors.black}
                    padding={"0 0 32px 0"}
                    letterSpacing={"-0.02em"}
                  />
                  <LabelWrapper>
                    <Heading3B
                      text={strings.HitTheLinkInTheEmailWeveSentTo}
                      className="gradient-gray"
                      display={"flex"}
                      alignItems={"center"}
                    />
                    <Heading3B
                      text={email}
                      color={Colors.black1c}
                      display={"flex"}
                      alignItems={"center"}
                    />
                    <Heading3B
                      text={strings.toVerifyYourEmail}
                      className="gradient-gray"
                      display={"flex"}
                      alignItems={"center"}
                      padding={"0 0 0 2px"}
                    />
                    {/* <Heading3B
                      text={strings.addressAndStartSelling}
                      className="gradient-gray"
                      display={"flex"}
                      alignItems={"center"}
                    /> */}
                    <Heading3B
                      text={strings.ifYouCanNotFindYourVerificationEmail}
                      className="gradient-gray"
                      display={"flex"}
                      alignItems={"center"}
                      padding={"16px 0 0 0px"}
                    />
                    {successMsg ? (
                      <span className="product-added">{successMsg}</span>
                    ) : null}
                  </LabelWrapper>
                </Box>
                <Box
                  sx={{ width: "100%" }}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDirection={"column"}
                  pt={"40px"}
                >
                  <PrimaryLarge
                    text={
                      resendEmailError.length > 0
                        ? counter > 0
                          ? counter
                          : strings.resendEmail
                        : strings.resendEmail
                    }
                    disabled={resendEmailError.length > 0 ? true : false}
                    margin={"0 0 14px 0"}
                    onClick={() => sendVerificationEmailHandle()}
                  />
                  {resendEmailError.length > 0 ? (
                    <LabelInput
                      className="ipnputlabel"
                      color={Colors.error}
                      text={
                        "Please wait 15 seconds to resend the verification link again."
                      }
                    ></LabelInput>
                  ) : null}
                </Box>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default SentLink;
