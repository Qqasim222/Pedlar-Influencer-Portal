import React, { useEffect, useState } from "react";
import * as Colors from "../../../assets/styles/Colors";
import { Heading3B, Heading6S, Small } from "../../../assets/styles/Labels";
import { CancelLarge } from "../../../assets/styles/Buttons";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import ReactiveButton from "reactive-button";
import services from "../../../services/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import ButtonLoader from "../../../GlobalModule/ButtonLoader";
// local strings Imports
const strings = require("../../../localisation_en.json");

const DescriptionPopup = (props) => {
  const [user] = useAuthState(auth);
  const [state, setState] = useState("idle");
  const [description, setDescription] = useState(props.sendingData.description);
  const [characterCount, setCharacterCount] = useState(0);
  const [onDescriptionFieldClicked, setonDescriptionFieldClicked] =
    useState(false);
  const [apiResponseError, setApiResponseError] = useState("");

  useEffect(() => {
    setCharacterCount(description?.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description]);

  const saveDescription = async () => {
    // if (description !== "") {
    setState("loading");

    try {
      await services.addbanner.ADD_DESCRIPTION_TO_STORE(user.accessToken, {
        type: "description",
        description: description,
      });
      let data = {
        popupType: "description",
        description: description,
      };
      setState("success");
      props.popupData(data);
      props.closePopup();
    } catch (error) {
      setApiResponseError(strings.apiErrorMessage);
      setTimeout(() => setApiResponseError(""), 5000);
      setTimeout(() => props.closePopup(), 6000);
    }

    // }
  };

  const changeBorderColor = () => {
    setonDescriptionFieldClicked(true);
  };

  return (
    <div className="ph-container-box">
      <div className="ph-paper-box width380">
        <Box>
          <Heading3B
            text={strings.storeDescription}
            color={Colors.black1c}
            padding={"0 0 16px 0"}
            fontWeight={"600"}
            textAlign={"center"}
          />
          <Heading6S
            text={strings.updateYourStoreDescription}
            opacity={"0.64"}
            color={Colors.black1c}
            padding={"0 0 24px 0"}
            letterSpacing={"-0.02em"}
            textAlign={"center"}
          />
        </Box>
        <Box>
          <Box className="form-group">
            <TextareaAutosize
              className={
                "textarea-textable description " +
                (onDescriptionFieldClicked ? "changeBorderColor" : "")
              }
              aria-label="empty textarea"
              placeholder="Enter Description"
              label="description"
              defaultValue={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={350}
              onClick={changeBorderColor}
            />
            <label className="description-label">Description</label>
            <Small
              text={
                characterCount
                  ? characterCount + "/350 characters"
                  : 0 + "/350 characters"
              }
              className="caractor-right-align"
              color={Colors.gray49}
            />
          </Box>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          pt={"40px"}
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
            onClick={() => saveDescription()}
          /> */}
          <ReactiveButton
            buttonState={state}
            rounded
            size="large"
            color="#000"
            onClick={() => saveDescription()}
            // disabled={description === "" ? true : false}
            disabled={description?.length > 350}
            idleText={strings.save}
            width={"100px"}
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

export default DescriptionPopup;
