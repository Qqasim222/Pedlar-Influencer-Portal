import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Colors from "../../../assets/styles/Colors";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Heading2B,
  Heading6S,
  LabelInput,
  LabelWrapper,
} from "../../../assets/styles/Labels";
import "./Login.scss";
import eyeNotshowImg from "../../../assets/images/structure/eye-notshow.svg";
import eyeShowImg from "../../../assets/images/structure/eye-show.svg";
import loginImg from "../../../assets/images/product/login-img.png";
import pedlarLogo from "../../../assets/images/logo/pedlar-logo.svg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { logInWithEmailAndPassword } from "../../../firebase";
import ReactiveButton from "reactive-button";
import ButtonLoader from "../../../GlobalModule/ButtonLoader";

// import { LoadingButton } from "@mui/lab/LoadingButton";
// import { LoadingButton } from "@mui/lab";
// import { LoadingButton } from "@mui/lab/LoadingButton";
import * as gtmEvents from "../../../utils/gtm";
const strings = require("../../../localisation_en.json");
/* eslint-disable no-useless-escape */
// const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let mailformat = "^[^@]+@[a-zA-Z0-9._-]+\\.+[a-z._-]+$";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const [state, setState] = useState("idle");

  useEffect(() => {
    setPasswordErr("");
    if (email === "") {
      return setEmailErr("");
    } else if (!email.match(mailformat)) {
      return setEmailErr(strings.enterAValidEmailAddress);
    } else setEmailErr("");
  }, [email]);
  useEffect(() => {
    setPasswordErr("");
  }, [password]);

  const LoginUserHandler = async () => {
    setPasswordErr("");
    if (email.trim() === "" || password.trim() === "") {
      if (email.trim() === "") setEmailErr("email is required");
      if (password.trim() === "") setPasswordErr("password is required");

      return;
    }

    try {
      setState("loading");

      await logInWithEmailAndPassword(email, password);
    } catch (error) {
      setState("idle");
      if (error.code === "auth/user-not-found")
        setEmailErr(strings.notRegisterEmail);
      if (error.code === "auth/wrong-password")
        setPasswordErr(strings.incorrectPassword);
      if (error.code === "auth/too-many-requests")
        setPasswordErr(strings.tooManyRequests);
    }
  };
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      LoginUserHandler();
    }
  };
  const handleClick = () => {
    localStorage.removeItem("userSignUpData");
    navigate("/signup");
  };
  const handleFogotPasswordClick = () => {
    navigate("/forgot-password");
  };
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {/* desktop view  */}
      <div className="main-holder desktop-view-marge">
        <div className="new-container">
          <div className="login-header" style={{ cursor: "pointer" }}>
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
                <div className="login-right l-r-new-space">
                  <Heading2B
                    text={strings.logIn}
                    color={Colors.black}
                    padding={"0 0 40px 0"}
                    letterSpacing={"-0.02em"}
                  />

                  <Box className="form-group">
                    <TextField
                      className="textfield"
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={(e) => handleKeypress(e)}
                      id="outlined-required2"
                      label={strings.email}
                      placeholder=""
                      required
                    />
                    {emailErr !== "" ? (
                      <LabelInput
                        className="ipnputlabel"
                        color={Colors.error}
                        text={emailErr}
                      ></LabelInput>
                    ) : null}
                  </Box>
                  <Box className="form-group">
                    <FormControl
                      required
                      className="textfield"
                      sx={{ m: 0, width: "100%" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        placeholder=""
                        id="outlined-adornment-password"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeypress}
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <img alt="" src={eyeShowImg} />
                              ) : (
                                <img alt="" src={eyeNotshowImg} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label={strings.password}
                      />
                    </FormControl>
                    {passwordErr !== "" ? (
                      <LabelInput
                        className="ipnputlabel"
                        color={Colors.error}
                        text={passwordErr}
                      ></LabelInput>
                    ) : null}
                    <Heading6S
                      text={strings.forgot_password}
                      color={"#8652FF"}
                      textDecoration={"underline"}
                      letterSpacing={"-0.02em"}
                      margin={
                        passwordErr ? "-20px 0px 0px 0px" : "-30px 0px 0px 0px"
                      }
                      cursor={"pointer"}
                      onClick={handleFogotPasswordClick}
                    />
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    pt={"40px"}
                  >
                    <ReactiveButton
                      buttonState={state}
                      idleText={strings.logIn}
                      onClick={() => LoginUserHandler()}
                      rounded
                      size="large"
                      color="#000"
                      width={"310px"}
                      loadingText={<ButtonLoader />}
                    />
                    {/* <LoadingButton
                      variant="contained"
                      loading={state}
                      size="large"
                      color="#000"
                      width={"310px"}
                      onClick={() => LoginUserHandler()}
                    >
                      {strings.logIn}
                    </LoadingButton> */}

                    {/* <LabelWrapper
                      justifyContent={"center"}
                      padding={"10px 0px 10px 20px"}
                    >
                      <Heading6S
                        text={strings.dontHaveAnAccount}
                        color={Colors.black1c}
                        letterSpacing={"-0.02em"}
                      />
                      <Heading6S
                        text={strings.createOneHere}
                        color={"#8652FF"}
                        textDecoration={"underline"}
                        letterSpacing={"-0.02em"}
                        padding={"0px 0px 0px 2px"}
                        cursor={"pointer"}
                        onClick={handleClick}
                      />
                    </LabelWrapper> */}
                  </Box>
                  <a
                    href="https://pedlar.store/privacy-policy"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Heading6S
                      text={strings.pedlarsPrivacyPolicy}
                      letterSpacing={"-0.02em"}
                      padding={"20px 0px"}
                      cursor={"pointer"}
                      color={"#49454f"}
                      textAlign={"center"}
                      className="privacyPolicy"
                    />
                  </a>
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
                    text={strings.logIn}
                    color={Colors.black}
                    padding={"0 0 70px 0"}
                    letterSpacing={"-0.02em"}
                  />
                  <Box className="form-group">
                    <TextField
                      required
                      className="textfield"
                      id="outlined-required3"
                      onChange={(e) => setEmail(e.target.value)}
                      label={strings.email}
                      placeholder="Enter Here"
                    />
                    {emailErr !== "" ? (
                      <LabelInput
                        className="ipnputlabel"
                        color={Colors.error}
                        text={emailErr}
                      ></LabelInput>
                    ) : null}
                  </Box>
                  <Box className="form-group">
                    <FormControl
                      required
                      className="textfield"
                      sx={{ m: 0, width: "100%" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password1">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        placeholder="Enter Here"
                        id="outlined-adornment-password1"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <img alt="" src={eyeShowImg} />
                              ) : (
                                <img alt="" src={eyeNotshowImg} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label={strings.password}
                      />
                    </FormControl>
                    {passwordErr !== "" ? (
                      <LabelInput
                        className="ipnputlabel"
                        color={Colors.error}
                        text={passwordErr}
                      ></LabelInput>
                    ) : null}
                    <Heading6S
                      text={strings.forgot_password}
                      color={"#8652FF"}
                      textDecoration={"underline"}
                      letterSpacing={"-0.02em"}
                      margin={
                        passwordErr ? "-20px 0px 0px 0px" : "-30px 0px 0px 0px"
                      }
                      cursor={"pointer"}
                      onClick={handleFogotPasswordClick}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{ width: "100%" }}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  flexDirection={"column"}
                  pt={"50px"}
                >
                  <ReactiveButton
                    buttonState={state}
                    idleText={strings.logIn}
                    onClick={() => LoginUserHandler()}
                    rounded
                    size="large"
                    color="#000"
                    width={"100%"}
                    height={"44px"}
                    loadingText={<ButtonLoader />}
                  />
                </Box>

                {/* <LabelWrapper
                    justifyContent={"center"}
                    padding={"10px 0px 10px 20px"}
                  >
                    <Heading6S
                      text={strings.dontHaveAnAccount}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                    />
                    <Heading6S
                      text={strings.createOneHere}
                      color={"#8652FF"}
                      textDecoration={"underline"}
                      letterSpacing={"-0.02em"}
                      padding={"0px 0px 0px 2px"}
                      cursor={"pointer"}
                      onClick={handleClick}
                    />
                  </LabelWrapper> */}
              </div>
            </Grid>
          </Grid>
          <a
            href="https://pedlar.store/privacy-policy"
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <Heading6S
              text={strings.pedlarsPrivacyPolicy}
              letterSpacing={"-0.02em"}
              padding={"10px 0px"}
              cursor={"pointer"}
              color={"#49454f"}
              textAlign={"center"}
              className="privacyPolicy"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
