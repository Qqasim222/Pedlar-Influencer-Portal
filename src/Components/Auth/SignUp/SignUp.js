import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Colors from "../../../assets/styles/Colors";
import { PrimaryLarge } from "../../../assets/styles/Buttons";
import services from "../../../services/index";

import {
  Heading2B,
  Heading6S,
  LabelWrapper,
  LabelInput,
  Small,
} from "../../../assets/styles/Labels";
import "./SignUp.scss";
import pedlarLogo from "../../../assets/images/logo/pedlar-logo.svg";
import loginImg from "../../../assets/images/product/login-img.png";
import eyeNotshowImg from "../../../assets/images/structure/eye-notshow.svg";
import eyeShowImg from "../../../assets/images/structure/eye-show.svg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CircularProgress from "@mui/material/CircularProgress";

const strings = require("../../../localisation_en.json");
/* eslint-disable no-useless-escape */
// var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
var mailformat = "^[^@]+@[a-zA-Z0-9._-]+\\.+[a-z._-]+$";

var passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[\s\S]{8,}$/;

const SignUp = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState();
  const [showLoaderonEmailTextField, setShowLoaderonEmailTextField] =
    useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleAcceptedChange = () => {
    setIsAccepted((current) => !current);
  };
  useEffect(() => {
    if (password === "") {
      setPasswordErr("");
    } else if (!password.match(passwordFormat)) {
      setPasswordErr(strings.passwordPattern);
    } else setPasswordErr("");
  }, [password]);
  useEffect(() => {
    let emailAlreadyExist = localStorage.getItem("emailAlreadyExist");

    if (email === "") {
      setEmailErr("");
    } else if (emailAlreadyExist) {
      setEmailErr(strings.emailAlreadyExist);
      localStorage.removeItem("emailAlreadyExist");
    } else if (!email.match(mailformat)) {
      setEmailErr(strings.enterAValidEmailAddress);
    } else setEmailErr("");
  }, [email]);
  useEffect(() => {
    let localUserSignUpData = localStorage.getItem("userSignUpData");
    let userSignUpData = JSON.parse(localUserSignUpData);
    if (userSignUpData) {
      setFirstName(userSignUpData.firstName);
      setLastName(userSignUpData.lastName);
      setEmail(userSignUpData.email);
      setPassword(userSignUpData.password);
      setConfirmPassword(userSignUpData.password);
    }
  }, []);
  const registerUserHandler = async () => {
    let userSignUpData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    localStorage.setItem("userSignUpData", JSON.stringify(userSignUpData));
    navigate("/create-store");
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [valuesConfirm, setValuesConfirm] = React.useState({
    showPassword: false,
  });
  const handleClickShowPasswordConfirm = () => {
    setValuesConfirm({
      ...valuesConfirm,
      showPasswordConfirm: !valuesConfirm.showPasswordConfirm,
    });
  };
  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
  };
  const handleOpenTermNConditionPage = () => {
    const win = window.open("/terms-and-conditions", "_blank");
    win.focus();
  };
  const handleOpenPrivacyPolicyPage = () => {
    const win = window.open("/privacy-policy", "_blank");
    win.focus();
  };

  const isEmailAvailable = async () => {
    const data = { key: "email", value: email };
    if (emailErr === "" && email !== "") {
      setShowLoaderonEmailTextField(true);
      const response = await services.auth.VERIFY_EMAIL(data);
      setEmailAvailable(response?.data?.data);
      if (response?.data?.data === false || response?.data?.data === true) {
        setShowLoaderonEmailTextField(false);
      }
      if (response?.data?.data === false) {
        setEmailErr("Email already in use");
      }
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
                  <Heading2B
                    text={strings.createAccount}
                    color={Colors.black}
                    padding={"0 0 24px 0"}
                    letterSpacing={"-0.02em"}
                  />
                  <Grid container columnSpacing={2}>
                    <Grid item xs={6}>
                      <Box className="form-group">
                        <TextField
                          required
                          onChange={(e) => setFirstName(e.target.value)}
                          value={firstName}
                          className="textfield"
                          label={strings.firstName}
                          placeholder=""
                          inputProps={{
                            maxLength: 200,
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box className="form-group">
                        <TextField
                          required
                          onChange={(e) => setLastName(e.target.value)}
                          value={lastName}
                          className="textfield"
                          label={strings.lastName}
                          placeholder=""
                          inputProps={{
                            maxLength: 200,
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Box className="form-group">
                    <TextField
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={isEmailAvailable}
                      value={email}
                      className="textfield"
                      label={strings.email}
                      placeholder=""
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" className="">
                            {showLoaderonEmailTextField === true ? (
                              <CircularProgress color="inherit" size={30} />
                            ) : emailAvailable ? (
                              <CheckCircleOutlineIcon color="success" />
                            ) : emailAvailable === false ? (
                              <ErrorOutlineIcon color="error" />
                            ) : null}
                          </InputAdornment>
                        ),
                      }}
                    />
                    {emailErr ? (
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
                        type={values.showPassword ? "text" : "password"}
                        value={password}
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
                  </Box>
                  <Box className="form-group">
                    <FormControl
                      required
                      className="textfield"
                      sx={{ m: 0, width: "100%" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password2">
                        {strings.reenterPassword}
                      </InputLabel>
                      <OutlinedInput
                        placeholder=""
                        id="outlined-adornment-password2"
                        type={
                          valuesConfirm.showPasswordConfirm
                            ? "text"
                            : "password"
                        }
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordConfirm}
                              onMouseDown={handleMouseDownPasswordConfirm}
                              edge="end"
                            >
                              {valuesConfirm.showPasswordConfirm ? (
                                <img alt="" src={eyeShowImg} />
                              ) : (
                                <img alt="" src={eyeNotshowImg} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label={strings.reenterPassword}
                      />
                    </FormControl>
                    {confirmPassword !== password && confirmPassword !== "" ? (
                      <LabelInput
                        className="ipnputlabel"
                        color={Colors.error}
                        text={strings.reenterPasswordNotMatch}
                      ></LabelInput>
                    ) : null}
                  </Box>
                  <LabelWrapper>
                    <Checkbox
                      defaultChecked={isAccepted}
                      onChange={handleAcceptedChange}
                      required
                      {...label}
                    />
                    <Small
                      text={strings.iHaveReadAndAcceptThe}
                      color={Colors.gray49}
                      letterSpacing={"0.4px"}
                    />
                    <Small
                      text={strings.pedlarTerms_Conditions}
                      color={Colors.purple86}
                      padding={"0 0 0 4px"}
                      letterSpacing={"0.4px"}
                      cursor={"pointer"}
                      onClick={() => handleOpenTermNConditionPage()}
                    />
                  </LabelWrapper>
                  <LabelWrapper padding={"16px 0 0 0"}>
                    <Small
                      text={strings.viewPedlars}
                      color={Colors.gray49}
                      padding={"0px 0 0 0"}
                      letterSpacing={"0.4px"}
                      cursor={"pointer"}
                    />
                    <Small
                      text={strings.privacyPolicy}
                      color={Colors.purple86}
                      padding={"0px 0 0 4px"}
                      letterSpacing={"0.4px"}
                      cursor={"pointer"}
                      onClick={() => handleOpenPrivacyPolicyPage()}
                    />
                    <Small
                      text={strings.ToUnderstandHowWeManageYour}
                      color={Colors.gray49}
                      letterSpacing={"0.4px"}
                      cursor={"pointer"}
                      padding={"0px 0 0 4px"}
                    />
                    <Small
                      text={strings.personalInformation}
                      color={Colors.gray49}
                      letterSpacing={"0.4px"}
                      cursor={"pointer"}
                      padding={"0px 0 0 0px"}
                    />
                  </LabelWrapper>
                  <Box
                    display={"flex"}
                    alignItems={"flex-end"}
                    flexDirection={"column"}
                    pt={"20px"}
                  >
                    <PrimaryLarge
                      width={"310px"}
                      text={strings.continue}
                      margin={"0 0 14px 0"}
                      disabled={
                        firstName.trim() &&
                        lastName.trim() &&
                        password.trim() &&
                        password.trim() === confirmPassword.trim() &&
                        email.trim() &&
                        email.trim().match(mailformat) &&
                        passwordErr === "" &&
                        emailErr === "" &&
                        isAccepted
                          ? false
                          : true
                      }
                      onClick={() => registerUserHandler()}
                    />
                    <LabelWrapper
                      justifyContent={"center"}
                      padding={"10px 16px 10px 16px"}
                    >
                      <Heading6S
                        text={strings.alreadyHaveAnAccount}
                        color={Colors.black1c}
                        letterSpacing={"-0.02em"}
                        opacity={"0.8"}
                      />
                      <Heading6S
                        text={strings.logInHere}
                        color={"#8652FF"}
                        textDecoration={"underline"}
                        cursor={"pointer"}
                        padding={"0 0 0 2px"}
                        letterSpacing={"-0.02em"}
                        onClick={handleClick}
                      />
                    </LabelWrapper>
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
            onClick={handleClick}
          />
        </div>
        <div className="login-holder">
          <Grid container columnSpacing={0}>
            <Grid item xs={12} display={"flex"} alignItems={"center"}>
              <div
                className="login-right"
                style={{ justifyContent: "flex-start" }}
              >
                <Box sx={{ width: "100%" }}>
                  <Heading2B
                    text={strings.createAccount}
                    color={Colors.black}
                    padding={"0 0 24px 0"}
                    letterSpacing={"-0.02em"}
                  />
                  <Grid container columnSpacing={2}>
                    <Grid item xs={6}>
                      <Box className="form-group">
                        <TextField
                          required
                          className="textfield"
                          onChange={(e) => setFirstName(e.target.value)}
                          label={strings.firstName}
                          placeholder=""
                          inputProps={{
                            maxLength: 200,
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box className="form-group">
                        <TextField
                          required
                          onChange={(e) => setLastName(e.target.value)}
                          className="textfield"
                          label={strings.lastName}
                          placeholder=""
                          inputProps={{
                            maxLength: 200,
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Box className="form-group">
                    <TextField
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={isEmailAvailable}
                      value={email}
                      className="textfield"
                      label={strings.email}
                      placeholder=""
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" className="">
                            {showLoaderonEmailTextField === true ? (
                              <CircularProgress color="inherit" size={30} />
                            ) : emailAvailable ? (
                              <CheckCircleOutlineIcon color="success" />
                            ) : emailAvailable === false ? (
                              <ErrorOutlineIcon color="error" />
                            ) : null}
                          </InputAdornment>
                        ),
                      }}
                    />
                    {emailErr ? (
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
                        placeholder=""
                        id="outlined-adornment-password1"
                        type={values.showPassword ? "text" : "password"}
                        value={password}
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
                  </Box>
                  <Box className="form-group">
                    <FormControl
                      required
                      className="textfield"
                      sx={{ m: 0, width: "100%" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password22">
                        {strings.reenterPassword}
                      </InputLabel>
                      <OutlinedInput
                        placeholder=""
                        id="outlined-adornment-password22"
                        type={
                          valuesConfirm.showPasswordConfirm
                            ? "text"
                            : "password"
                        }
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordConfirm}
                              onMouseDown={handleMouseDownPasswordConfirm}
                              edge="end"
                            >
                              {valuesConfirm.showPasswordConfirm ? (
                                <img alt="" src={eyeShowImg} />
                              ) : (
                                <img alt="" src={eyeNotshowImg} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label={strings.reenterPassword}
                      />
                    </FormControl>
                    {confirmPassword !== password && confirmPassword !== "" ? (
                      <LabelInput
                        className="ipnputlabel"
                        color={Colors.error}
                        text={strings.reenterPasswordNotMatch}
                      ></LabelInput>
                    ) : null}
                  </Box>
                </Box>
                <Box sx={{ width: "100%", marginTop: "-10px" }}>
                  <LabelWrapper>
                    <Checkbox
                      defaultChecked={isAccepted}
                      onChange={handleAcceptedChange}
                      required
                      {...label}
                    />
                    <Small
                      text={strings.iHaveReadAndAcceptThe}
                      color={Colors.gray49}
                      letterSpacing={"0.4px"}
                      className="fontsize11"
                    />
                    <Small
                      text={strings.pedlarTerms_Conditions}
                      color={Colors.purple86}
                      padding={"0 0 0 4px"}
                      letterSpacing={"0.4px"}
                      cursor={"pointer"}
                      className="fontsize11"
                      onClick={() => handleOpenTermNConditionPage()}
                    />
                  </LabelWrapper>
                  <LabelWrapper padding={"16px 0 0 0"}>
                    <Small
                      text={strings.viewPedlars}
                      color={Colors.gray49}
                      padding={"0px 0 0 0"}
                      letterSpacing={"0.4px"}
                      cursor={"pointer"}
                    />
                    <Small
                      text={strings.privacyPolicy}
                      color={Colors.purple86}
                      padding={"0px 0 0 4px"}
                      letterSpacing={"0.4px"}
                      cursor={"pointer"}
                      onClick={() => handleOpenPrivacyPolicyPage()}
                    />
                    <Small
                      text={strings.toUnderstandhowWe}
                      color={Colors.gray49}
                      letterSpacing={"0.4px"}
                      cursor={"pointer"}
                      padding={"0px 0 0 4px"}
                    />
                    <Small
                      text={strings.ManageYour}
                      color={Colors.gray49}
                      letterSpacing={"0.4px"}
                      cursor={"pointer"}
                      padding={"0px 0 0 4px"}
                    />
                    <Small
                      text={strings.personalInformation}
                      color={Colors.gray49}
                      letterSpacing={"0.4px"}
                      cursor={"pointer"}
                      padding={"0px 0 0 4px"}
                    />
                  </LabelWrapper>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    pt={"20px"}
                  >
                    <PrimaryLarge
                      text={strings.continue}
                      margin={"0 0 14px 0"}
                      disabled={
                        firstName.trim() &&
                        lastName.trim() &&
                        password.trim() &&
                        password.trim() === confirmPassword.trim() &&
                        email.trim() &&
                        email.trim().match(mailformat) &&
                        passwordErr === "" &&
                        emailErr === "" &&
                        isAccepted
                          ? false
                          : true
                      }
                      onClick={() => registerUserHandler()}
                    />
                    <LabelWrapper
                      justifyContent={"center"}
                      padding={"10px 0px 10px 0px"}
                    >
                      <Heading6S
                        text={strings.alreadyHaveAnAccount}
                        color={Colors.black1c}
                        letterSpacing={"-0.02em"}
                        opacity={"0.8"}
                      />
                      <Heading6S
                        text={strings.logInHere}
                        color={"#8652FF"}
                        textDecoration={"underline"}
                        cursor={"pointer"}
                        padding={"0 0 0 3px"}
                        letterSpacing={"-0.02em"}
                        onClick={handleClick}
                      />
                    </LabelWrapper>
                  </Box>
                </Box>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default SignUp;
