import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as Colors from "../../../assets/styles/Colors";
import { PrimaryLarge } from "../../../assets/styles/Buttons";
import {
  Heading2B,
  Heading3B,
  Heading6S,
  LabelWrapper,
  LabelInput,
} from "../../../assets/styles/Labels";

import "./CreateStore.scss";

import pedlarLogo from "../../../assets/images/logo/pedlar-logo.svg";
import loginImg from "../../../assets/images/product/login-img.png";
import backIcon from "../../../assets/images/structure/back-icon.svg";
import tiktokIcon from "../../../assets/images/structure/tiktok-icon.svg";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InstagramIcon from "@mui/icons-material/Instagram";
import services from "../../../services/index";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CircularProgress from "@mui/material/CircularProgress";

import {
  logInWithEmailAndPassword,
  sendVerificationEmail,
} from "../../../firebase";
import ReactiveButton from "reactive-button";
import ButtonLoader from "../../../GlobalModule/ButtonLoader";
import * as gtmEvents from "../../../utils/gtm";
const strings = require("../../../localisation_en.json");
// var slugformat = /^[A-Za-z0-9-]*$/;
var slugformat = /^[a-zA-Z0-9._-]*$/;
var slugFormatForSocialLinks = /^[a-zA-Z0-9._]*$/;

const CreateStore = (props) => {
  const [state, setState] = useState("idle");
  const [id, setId] = useState("");
  const [idErr, setIdErr] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storefrontName, setStorefrontName] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [instagramLinkErr, setInstagramLinkErr] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");
  const [tiktokLinkErr, setTiktokLinkErr] = useState("");
  const [formDisabled, setFormDisabled] = useState(false);
  const [domainNameAvailable, setDomainNameAvailable] = useState();
  const [showLoaderonDomainNameTextField, setShowLoaderonDomainNameTextField] =
    useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  useEffect(() => {
    if (id === "") {
      setIdErr("");
    }

    // else if (idErr === "") {
    //   setFormDisabled(false);
    // }
    else if (!id.match(slugformat)) {
      setIdErr(strings.invalidSlug);
    } else {
      setIdErr("");
      setFormDisabled(false);
      let tempId = id.replaceAll(" ", "-").toLowerCase();
      setId(tempId);
    }
  }, [id]);
  useEffect(() => {
    if (instagramLink === "") {
      setInstagramLinkErr("");
    }
    if (
      instagramLink?.length >= 30 &&
      !instagramLink.match(slugFormatForSocialLinks)
    ) {
      setInstagramLinkErr(
        " Enter a valid Instagram username and  You cannot put more than 30 characters"
      );
    } else if (!instagramLink.match(slugFormatForSocialLinks)) {
      setInstagramLinkErr(strings.invalidAInstaLink);
    } else if (instagramLink?.length >= 30) {
      setInstagramLinkErr("You cannot put more than 30 characters");
    } else setInstagramLinkErr("");
  }, [instagramLink]);
  useEffect(() => {
    if (tiktokLink === "") {
      setTiktokLinkErr("");
    }
    if (
      tiktokLink?.length >= 24 &&
      !tiktokLink.match(slugFormatForSocialLinks)
    ) {
      setTiktokLinkErr(
        " Enter a valid tiktok username and  You cannot put more than 24 characters"
      );
    } else if (!tiktokLink.match(slugFormatForSocialLinks)) {
      setTiktokLinkErr(strings.invalidATiktokLink);
    } else if (tiktokLink?.length >= 24) {
      setTiktokLinkErr(" You cannot put more than 24 characters");
    } else setTiktokLinkErr("");
  }, [tiktokLink]);
  useEffect(() => {
    let localUserSignUpData = localStorage.getItem("userSignUpData");
    let userSignUpData = JSON.parse(localUserSignUpData);
    if (userSignUpData) {
      setFirstName(userSignUpData.firstName);
      setLastName(userSignUpData.lastName);
      setEmail(userSignUpData.email);
      setPassword(userSignUpData.password);
    }
  }, []);
  const registerUserHandler = async () => {
    setState("loading");
    let newId = id.replaceAll(" ", "_").toLowerCase();
    let data = {
      id: newId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      storefrontName: storefrontName.trim(),
      instagramLink:
        instagramLink.trim() !== ""
          ? strings.instagram_Url + instagramLink.trim()
          : "",
      tiktokLink:
        tiktokLink.trim() !== "" ? strings.tiktok_Url + tiktokLink.trim() : "",
    };

    if (instagramLink.trim() === "") {
      delete data?.instagramLink;
    }
    if (tiktokLink.trim() === "") {
      delete data?.tiktokLink;
    }

    setFormDisabled(true);
    try {
      const response = await services.auth.REGISTER_USER(data);
      const loggedIn = await logInWithEmailAndPassword(email, password);
      if (loggedIn) {
        await sendVerificationEmail();
      }
      if (response.status === 200) {
        setState("success");
        navigate(`/sent-link/${email}`);
        localStorage.removeItem("userSignUpData");
      }
    } catch (error) {
      setFormDisabled(true);
      setState("error");
      if (error.response.data.message === "Email already exists.") {
        localStorage.setItem("emailAlreadyExist", error.response.data.message);
        navigate("/signup");
      }
      if (error.response.data.message === "User ID already exists")
        setIdErr(strings.storeDomainIsExist);
    }
  };

  const isDomainNameAvailable = async () => {
    const data = { key: "storename", value: id };
    if (idErr === "" && id !== "") {
      setShowLoaderonDomainNameTextField(true);
      const response = await services.auth.VERIFY_DOMAIN_NAME(data);
      setDomainNameAvailable(response?.data?.data);
      if (response?.data?.data === false || response?.data?.data === true) {
        setShowLoaderonDomainNameTextField(false);
      }
      if (response?.data?.data === false) {
        setIdErr("This Domain name is already in use ");
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
                  <Box
                    style={{ cursor: "pointer" }}
                    display={"flex"}
                    alignItems={"center"}
                    onClick={() => {
                      navigate(`/signup`);
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
                    text={strings.createStore}
                    color={Colors.black}
                    padding={"16px 0 32px 0"}
                    letterSpacing={"-0.02em"}
                  />
                  <Heading3B
                    text={strings.storeDetails}
                    padding={"0 0 16px 0"}
                    letterSpacing={"-0.02em"}
                  />
                  <Box className="form-group">
                    <TextField
                      required
                      onChange={(e) => setStorefrontName(e.target.value)}
                      className="textfield"
                      label={strings.storeName}
                      placeholder=""
                      inputProps={{
                        maxLength: 20,
                      }}
                    />
                    {storefrontName.length >= 20 && (
                      <LabelInput
                        className="ipnputlabel "
                        sx={{
                          height: "auto",
                        }}
                        color={Colors.error}
                        text={"You cannot put more than 20 characters"}
                      ></LabelInput>
                    )}
                  </Box>
                  <Box className="form-group">
                    <TextField
                      required
                      onChange={(e) =>
                        setId(e.target.value.replace(/\s+/g, "-"))
                      }
                      onBlur={isDomainNameAvailable}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className="inptandrmnt"
                          >
                            {strings.pedlar_Store}
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end" className="">
                            {showLoaderonDomainNameTextField === true ? (
                              <CircularProgress color="inherit" size={30} />
                            ) : domainNameAvailable ? (
                              <CheckCircleOutlineIcon color="success" />
                            ) : domainNameAvailable === false ? (
                              <ErrorOutlineIcon color="error" />
                            ) : null}
                          </InputAdornment>
                        ),
                      }}
                      className="textfield"
                      label={strings.storeDomain}
                      placeholder=""
                      value={id}
                    />
                    {idErr === "" ? (
                      <LabelInput
                        className="ipnputlabel"
                        text="You cannot change your store domain once your account is created"
                      ></LabelInput>
                    ) : null}

                    {idErr !== "" ? (
                      <LabelInput
                        className="ipnputlabel ilheight"
                        style={{ height: "auto" }}
                        color={Colors.error}
                        text={idErr}
                      ></LabelInput>
                    ) : null}
                  </Box>
                  <LabelWrapper margin={"16px 0 0 0"}>
                    <Heading3B
                      text={strings.socialLinks}
                      padding={"0 0 16px 0"}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                    />
                    <Heading3B
                      text={strings.displayedOnStore}
                      padding={"0 0 16px 2px"}
                      className="gradient-gray"
                      letterSpacing={"-0.02em"}
                    />
                  </LabelWrapper>
                  <Box className="form-group">
                    <TextField
                      onChange={(e) => setInstagramLink(e.target.value)}
                      className="textfield"
                      label={strings.instagramHandle}
                      placeholder=""
                      value={instagramLink}
                      inputProps={{
                        maxLength: 30,
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" className="">
                            <InstagramIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {/* {instagramLink.length >= 30 && (
                      <LabelInput
                        className="ipnputlabel "
                        style={{ height: "auto" }}
                        color={Colors.error}
                        text={"You cannot put more than 30 characters"}
                      ></LabelInput>
                    )} */}
                    {instagramLinkErr !== "" && (
                      <LabelInput
                        className="ipnputlabel"
                        color={Colors.error}
                        text={instagramLinkErr}
                      ></LabelInput>
                    )}
                  </Box>
                  <Box className="form-group">
                    <TextField
                      onChange={(e) => setTiktokLink(e.target.value)}
                      inputProps={{ maxLength: 24 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" className="">
                            <img alt="" src={tiktokIcon} />
                          </InputAdornment>
                        ),
                      }}
                      className="textfield"
                      label={strings.tiktokUsername}
                      placeholder=""
                    />
                    {tiktokLinkErr !== "" ? (
                      <LabelInput
                        className="ipnputlabel"
                        color={Colors.error}
                        text={tiktokLinkErr}
                      ></LabelInput>
                    ) : null}
                    {/* {tiktokLink.length >= 24 ? (
                      <LabelInput
                        className="ipnputlabel"
                        color={Colors.error}
                        text={"You cannot put more than 24 characters"}
                      ></LabelInput>
                    ) : null} */}
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"flex-end"}
                    flexDirection={"column"}
                    pt={"8px"}
                  >
                    <ReactiveButton
                      buttonState={state}
                      rounded
                      size="large"
                      color="#000"
                      onClick={() => registerUserHandler()}
                      disabled={
                        formDisabled
                          ? true
                          : id.trim() && storefrontName.trim()
                          ? // &&
                            // instagramLinkErr.trim() === "" &&
                            // tiktokLinkErr.trim() === ""
                            false
                          : true
                      }
                      idleText={strings.continue}
                      width={"115px"}
                      loadingText={<ButtonLoader />}
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
            alt=""
            src={backIcon}
            className="lh-backicon"
            onClick={() => {
              navigate(`/signup`);
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
                  <Box
                    sx={{ width: "100%" }}
                    display={"flex"}
                    justifyContent={"flex-start"}
                  >
                    <Heading2B
                      text={strings.createStore}
                      color={Colors.black}
                      padding={"0px 0 40px 0"}
                      letterSpacing={"-0.02em"}
                      width={"100%"}
                    />
                  </Box>
                  <Box
                    sx={{ width: "100%" }}
                    display={"flex"}
                    justifyContent={"flex-start"}
                  >
                    <Heading3B
                      text={strings.storeDetails}
                      padding={"0 0 24px 0"}
                      letterSpacing={"-0.02em"}
                      width={"100%"}
                      color={Colors.black1c}
                    />
                  </Box>
                  <Box sx={{ width: "100%" }} className="form-group">
                    <TextField
                      required
                      onChange={(e) => setStorefrontName(e.target.value)}
                      className="textfield"
                      label={strings.storeName}
                      placeholder=""
                      inputProps={{
                        maxLength: 20,
                      }}
                    />
                    {storefrontName.length >= 20 && (
                      <LabelInput
                        className="ipnputlabel "
                        sx={{
                          height: "auto",
                        }}
                        color={Colors.error}
                        text={"You cannot put more than 20 characters"}
                      ></LabelInput>
                    )}
                  </Box>
                  <Box sx={{ width: "100%" }} className="form-group">
                    <TextField
                      required
                      onChange={(e) =>
                        setId(e.target.value.replace(/\s+/g, "-"))
                      }
                      onBlur={isDomainNameAvailable}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className="inptandrmnt"
                          >
                            {strings.pedlar_Store}
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end" className="">
                            {showLoaderonDomainNameTextField === true ? (
                              <CircularProgress color="inherit" size={30} />
                            ) : domainNameAvailable ? (
                              <CheckCircleOutlineIcon color="success" />
                            ) : domainNameAvailable === false ? (
                              <ErrorOutlineIcon color="error" />
                            ) : null}
                          </InputAdornment>
                        ),
                      }}
                      className="textfield"
                      label={strings.storeDomain}
                      placeholder=""
                      value={id}
                    />
                    {idErr === "" ? (
                      <LabelInput
                        className="ipnputlabel"
                        text="You cannot change your store domain once your account is created"
                      ></LabelInput>
                    ) : null}

                    {idErr !== "" ? (
                      <LabelInput
                        className="ipnputlabel "
                        color={Colors.error}
                        text={idErr}
                      ></LabelInput>
                    ) : null}
                  </Box>
                  <LabelWrapper margin={"32px 0 0 0"}>
                    <Heading3B
                      text={strings.socialLinks}
                      padding={"0 0 16px 0"}
                      color={Colors.black1c}
                      letterSpacing={"-0.02em"}
                    />
                    <Heading3B
                      text={strings.displayedOnStore}
                      padding={"0 0 16px 8px"}
                      className="gradient-gray"
                      letterSpacing={"-0.02em"}
                    />
                  </LabelWrapper>
                  <Box sx={{ width: "100%" }} className="form-group">
                    <TextField
                      onChange={(e) => setInstagramLink(e.target.value)}
                      inputProps={{ maxLength: 30 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <InstagramIcon />
                            {/* {strings.instagram_Url} */}
                          </InputAdornment>
                        ),
                      }}
                      className="textfield"
                      label={strings.instagramHandle}
                      placeholder=""
                    />
                    {/* {instagramLink.length >= 30 ? (
                      <LabelInput
                        className="ipnputlabel ilheight"
                        style={{ height: "auto" }}
                        color={Colors.error}
                        text={"You cannot put more than 30 characters"}
                      ></LabelInput>
                    ) : null} */}
                    {instagramLinkErr !== "" ? (
                      <LabelInput
                        className="ipnputlabel"
                        color={Colors.error}
                        text={instagramLinkErr}
                      ></LabelInput>
                    ) : null}
                  </Box>
                  <Box sx={{ width: "100%" }} className="form-group">
                    <TextField
                      onChange={(e) => setTiktokLink(e.target.value)}
                      inputProps={{ maxLength: 24 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <img alt="" src={tiktokIcon} />
                            {/* {strings.tiktok_Url} */}
                          </InputAdornment>
                        ),
                      }}
                      className="textfield"
                      label={strings.tiktokUsername}
                      placeholder=""
                    />
                    {tiktokLinkErr !== "" ? (
                      <LabelInput
                        className="ipnputlabel"
                        color={Colors.error}
                        text={tiktokLinkErr}
                      ></LabelInput>
                    ) : null}
                    {/* {tiktokLink.length >= 24 ? (
                      <LabelInput
                        className="ipnputlabel"
                        color={Colors.error}
                        text={"You cannot put more than 24 characters"}
                      ></LabelInput>
                    ) : null} */}
                  </Box>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{ width: "100%" }}
                    display={"flex"}
                    alignItems={"center"}
                    p={"16px 0 16px 0"}
                  >
                    <PrimaryLarge
                      text={strings.createStore}
                      disabled={
                        formDisabled
                          ? true
                          : id && storefrontName
                          ? // &&

                            // instagramLink &&
                            // tiktokLink &&
                            // instagramLinkErr === "" &&
                            // tiktokLinkErr === ""
                            false
                          : true
                      }
                      onClick={() => registerUserHandler()}
                    />
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

export default CreateStore;
