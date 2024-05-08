import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { auth } from "../../../firebase";
import queryString from "query-string";
import * as Colors from "../../../assets/styles/Colors";
import { PrimaryLarge } from "../../../assets/styles/Buttons";
import {
  Heading2B,
  Heading3B,
  Heading4B,
  LabelWrapper,
} from "../../../assets/styles/Labels";
import "./Emailverified.scss";
import pedlarLogo from "../../../assets/images/logo/pedlar-logo.svg";
import loginImg from "../../../assets/images/product/login-img.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { verifyActionCode, LogOut } from "../../../firebase";
import CentralLoader from "../../../GlobalModule/CentralLoader";
const strings = require("../../../localisation_en.json");

function Emailverified(props) {
  const [isLoading, setLoading] = useState(true);
  const { search } = useLocation();
  const { oobCode } = queryString.parse(search);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      await verifyActionCode(oobCode);
      if (auth.currentUser) {
        await auth.currentUser.reload();
      }
      setLoading(false);
    };
    verifyEmail();
  }, [oobCode]);

  const handleClick = async () => {
    await LogOut();
    navigate("/");
  };

  if (isLoading) {
    return <CentralLoader />;
  } else {
    return (
      <>
        {/* desktop view  */}
        <div className="main-holder desktop-view-marge">
          <div className="new-container">
            <div className="login-header">
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
                      text={strings.emailVerified}
                      color={Colors.black1c}
                      padding={"0 0 32px 0"}
                      letterSpacing={"-0.02em"}
                    />
                    <LabelWrapper>
                      <Heading3B
                        text={strings.emailVerificationThankYou}
                        color={Colors.black1c}
                        opacity={"0.64"}
                        letterSpacing={"-0.02em"}
                      />
                    </LabelWrapper>

                    <Box
                      display={"flex"}
                      alignItems={"flex-end"}
                      flexDirection={"column"}
                      pt={"32px"}
                    >
                      <PrimaryLarge
                        width={"150px"}
                        text={strings.continue}
                        margin={"0 0 14px 0"}
                        onClick={() => navigate("/")}
                      />
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
                      text={strings.emailVerified}
                      color={Colors.black}
                      padding={"0 0 32px 0"}
                      letterSpacing={"-0.02em"}
                    />
                    <LabelWrapper>
                      <Heading4B
                        text={strings.emailVerificationThankYou}
                        color={Colors.black1c}
                        opacity={"0.64"}
                        letterSpacing={"-0.02em"}
                      />
                    </LabelWrapper>
                  </Box>
                  <Box
                    sx={{ width: "100%" }}
                    display={"flex"}
                    justifyContent={"center"}
                    pt={"32px"}
                  >
                    <PrimaryLarge
                      text={strings.continue}
                      margin={"0 0 14px 0"}
                      onClick={() => navigate("/")}
                    />
                  </Box>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </>
    );
  }
}

export default Emailverified;
