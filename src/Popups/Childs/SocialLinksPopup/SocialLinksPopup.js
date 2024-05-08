import { useState, useEffect } from "react";
import * as Colors from "../../../assets/styles/Colors";
import {
  Heading3B,
  Heading6S,
  LabelInput,
} from "../../../assets/styles/Labels";
import { CancelLarge } from "../../../assets/styles/Buttons";
import tiktokIcon from "../../../assets/images/structure/tiktok-icon.svg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InstagramIcon from "@mui/icons-material/Instagram";
import ReactiveButton from "reactive-button";
import services from "../../../services/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import ButtonLoader from "../../../GlobalModule/ButtonLoader";
const strings = require("../../../localisation_en.json");
// var slugformat = /^[A-Za-z0-9-]*$/;
var slugFormatForSocialLinks = /^[a-zA-Z0-9._]*$/;

const SocialLinksPopup = (props) => {
  const [state, setState] = useState("idle");
  const [user] = useAuthState(auth);
  const [instagramLink, setInstagramLink] = useState(
    props.sendingData.instagramLink
  );
  const [instagramLinkErr, setInstagramLinkErr] = useState("");
  const [tiktokLink, setTiktokLink] = useState(props.sendingData.tiktokLink);
  const [tiktokLinkErr, setTiktokLinkErr] = useState("");
  const [apiResponseError, setApiResponseError] = useState("");

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

  const socialLinkSubmitHandler = async () => {
    setState("loading");
    let data = {
      instagramLink: "instagram.com/@" + instagramLink.trim(),
      tiktokLink: "tiktok.com/@" + tiktokLink.trim(),
    };

    let form = new FormData();
    //if (instagramLink.trim() !== "")
    form.append("instagramLink", "instagram.com/@" + instagramLink.trim());
    //if (tiktokLink.trim() !== "")
    form.append("tiktokLink", "tiktok.com/@" + tiktokLink.trim());
    try {
      await services.addbanner.ADD_SOCIALLINK_TO_STORE(user.accessToken, form);
      setState("success");
      data.popupType = "socialLinks";
      props.popupData(data);
      props.closePopup();
    } catch (error) {
      setApiResponseError(strings.apiErrorMessage);
      setTimeout(() => setApiResponseError(""), 5000);
      setTimeout(() => props.closePopup(), 6000);
    }
  };

  return (
    <div className="ph-container-box">
      <div className="ph-paper-box width380">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Heading3B
            text={strings.SocialLinks}
            color={Colors.black1c}
            padding={"0 0 16px 0"}
            fontWeight={"600"}
          />
          <Heading6S
            text={strings.updateYourSocialLinks}
            opacity={"0.64"}
            color={Colors.black1c}
            padding={"0 0 32px 0"}
            letterSpacing={"-0.02em"}
          />
        </Box>
        <Box>
          <Box className="form-group">
            <TextField
              onChange={(e) => setInstagramLink(e.target.value)}
              inputProps={{
                maxLength: 30,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InstagramIcon />
                  </InputAdornment>
                ),
              }}
              className="textfieldSocialPopup"
              label={strings.instagramHandle}
              placeholder="Enter Here"
              value={instagramLink}
              sx={{
                "& label.Mui-focused": {
                  color: "rgba(103, 80, 164, 1) !important",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(103, 80, 164, 1)",
                  },
                },
              }}
            />

            {instagramLinkErr !== "" ? (
              <LabelInput
                className="ipnputlabel"
                color={Colors.error}
                // text={strings.invalidAInstaLink}
                text={instagramLinkErr}
              ></LabelInput>
            ) : null}
            {/* {instagramLink?.length >= 27 ? (
              <LabelInput
                className="ipnputlabel"
                color={Colors.error}
                // text={strings.invalidAInstaLink}
                text={instagramLinkErr}
              ></LabelInput>
            ) : null} */}
          </Box>
          <Box className="form-group">
            <TextField
              onChange={(e) => setTiktokLink(e.target.value)}
              inputProps={{
                maxLength: 24,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img alt="" src={tiktokIcon} />
                  </InputAdornment>
                ),
              }}
              className="textfieldSocialPopup"
              label={strings.tiktokUsername}
              placeholder="Enter Here"
              value={tiktokLink}
              sx={{
                "& label.Mui-focused": {
                  color: "rgba(103, 80, 164, 1) !important",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "rgba(103, 80, 164, 1)",
                  },
                },
              }}
            />
            {tiktokLinkErr !== "" ? (
              <LabelInput
                className="ipnputlabel"
                color={Colors.error}
                text={tiktokLinkErr}
              ></LabelInput>
            ) : null}
          </Box>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          pt={"80px"}
        >
          <CancelLarge
            width={"100px"}
            text={strings.cancel}
            onClick={() => props.closePopup()}
          />
          {/* <BackLarge
            width={"100px"}
            text={strings.save}
            margin={"0 0 14px 0"}
            onClick={() => props.closePopup()}
          /> */}
          <ReactiveButton
            buttonState={state}
            rounded
            size="large"
            color="#000"
            onClick={() => socialLinkSubmitHandler()}
            disabled={
              instagramLinkErr.trim() !== "" || tiktokLinkErr.trim() !== ""
                ? true
                : false
            }
            idleText={strings.continue}
            width={"115px"}
            loadingText={<ButtonLoader />}
          />
        </Box>
      </div>
      {apiResponseError?.length > 2 ? (
        <span className="product-add-error-box">{apiResponseError}</span>
      ) : null}
    </div>
  );
};

export default SocialLinksPopup;
