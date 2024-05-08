import * as Colors from "../../../assets/styles/Colors";
import { PrimaryLarge } from "../../../assets/styles/Buttons";
import {
  Heading2B,
  Heading3B,
  LabelWrapper
} from "../../../assets/styles/Labels";
import "./CheckEmail.scss";
import loginImg from "../../../assets/images/product/login-img.png";
import pedlarLogo from "../../../assets/images/logo/pedlar-logo.svg";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const strings = require("../../../localisation_en.json");

function CheckEmail(props) {
  const navigate = useNavigate();
  const [eventMsg, setEventMsg] = useState(strings.resetPasswordlinkSent);

  useEffect(() => {
    setTimeout(() => {
      setEventMsg("");
    }, 5000);
  }, []);

  return (
    <>
      {/* desktop view  */}
      <div className="main-holder desktop-view-marge">
        <div className="new-container">
          <div className="login-header">
            <img src={pedlarLogo} className="logo-img" alt="" />
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
                    text={strings.checkYourEmail}
                    color={Colors.black1c}
                    padding={"0 0 32px 0"}
                    letterSpacing={"-0.02em"}
                  />
                  <LabelWrapper>
                    <Heading3B
                      text={
                        strings.weHaveSentPasswordRecoverInstructionsToYourEmail
                      }
                      color={Colors.black1c}
                      opacity={"0.64"}
                      letterSpacing={"-0.02em"}
                    />
                  </LabelWrapper>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    pt={"32px"}
                    onClick={() => navigate("/forgot-password")}
                  >
                    <PrimaryLarge
                      width={"65%"}
                      text={strings.resendEmail}
                      margin={"0 0 14px 0"}
                    />
                  </Box>
                  {eventMsg ? (
                    <span className="product-added">{eventMsg}</span>
                  ) : null}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      {/* mobile view  */}
      <div className="main-holder mobile-view-marge">
        <div className="login-header">
          <img src={pedlarLogo} className="logo-img" alt="" />
        </div>
        <div className="login-holder">
          <Grid container columnSpacing={0}>
            <Grid item xs={12} display={"flex"} alignItems={"center"}>
              <div className="login-right">
                <Box sx={{ width: "100%" }}>
                  <Heading2B
                    text={strings.checkYourEmail}
                    color={Colors.black}
                    padding={"0 0 32px 0"}
                    letterSpacing={"-0.02em"}
                  />
                  <LabelWrapper>
                    <Heading3B
                      text={
                        strings.weHaveSentPasswordRecoverInstructionsToYourEmail
                      }
                      color={Colors.black1c}
                      opacity={"0.64"}
                      letterSpacing={"-0.02em"}
                    />
                  </LabelWrapper>
                </Box>
                <Box
                  sx={{ width: "100%" }}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDirection={"column"}
                  pt={"32px"}
                  onClick={() => navigate("/forgot-password")}
                >
                  <PrimaryLarge
                    text={strings.resendEmail}
                    margin={"0 0 14px 0"}
                  />
                </Box>
                {eventMsg ? (
                  <span className="product-added">{eventMsg}</span>
                ) : null}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default CheckEmail;
