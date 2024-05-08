//package imports
import axios from "axios";
import PropTypes from "prop-types";
import ReactCrop from "react-image-crop";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "react-image-crop/dist/ReactCrop.css";
import "react-advanced-cropper/dist/style.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import React, { useEffect, useRef, useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Tab,
  Tabs,
  Box,
  Typography,
  AppBar,
  ImageList,
  ImageListItem,
} from "@mui/material";
//colors
import * as Colors from "../../../assets/styles/Colors";
// components
import ReactiveButton from "reactive-button";
import { Body } from "../../../assets/styles/Labels";
import { CancelLarge } from "../../../assets/styles/Buttons";
import ButtonLoader from "../../../GlobalModule/ButtonLoader";
import CentralLoader from "../../../GlobalModule/CentralLoader";
import {
  Small,
  Heading3B,
  Heading6S,
  LabelInput,
} from "../../../assets/styles/Labels";
//assets
import addBGBlackIcon from "../../../assets/images/structure/add-bg-black.svg";
//services
import { auth } from "../../../firebase";
import services from "../../../services/index";
import { useAuthState } from "react-firebase-hooks/auth";
//redux
import {
  saveInstagramImages,
  currentInstagramImagesData,
} from "../../../redux/reducers/instagramImages";
//text strings
const strings = require("../../../localisation_en.json");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const defaultCrop = {
  aspect: 4 / 5,
  x: 0,
  y: 0,
  width: 160,
  height: 200,
};

const ChooseBannerPopup = (props) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  //states
  const [src, setSrc] = useState(null);
  const [value, setValue] = useState(0);
  const [image, setImage] = useState(null);
  const [state, setState] = useState("idle");
  const [fileErr, setFileErr] = useState("");
  const [crop, setCrop] = useState(defaultCrop);
  const [imageType, setimageType] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [inputActive, setInputActive] = useState(false);
  const [apiResponseError, setApiResponseError] = useState("");
  const [instagramPostsData, setInstgramPostsData] = useState([]);
  const currentImagesofInstagram = useSelector(currentInstagramImagesData);
  const [selectedInstagramImageUrl, setSelectedInstagramImageUrl] =
    useState("");
  const [instagramAllowPermissionCode, setinstagramAllowPermissionCode] =
    useState("");
  const [selectedInstagramImageUrlFinal, setSelectedInstagramImageUrlFinal] =
    useState("");
  const [showLoaderUntilInstagramPosts, setShowLoaderUntilInstagramPosts] =
    useState(false);

  const selectImage = async (file) => {
    setSrc(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (imageType === "image/png" || imageType === "image/jpeg") {
      setFileErr("");
    } else {
      if (imageType.length > 0)
        setFileErr(strings.bannerImagePngOrJpegAcceptedError);

      if (fileErr) {
        setInputActive(true);
      }
    }
  }, [imageType]);

  const cropImageNow = async () => {
    setState("loading");

    let data = {};
    data.popupType = "bannerImage";

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = 6;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    canvas.style.width = crop.width * window.devicePixelRatio + "px";
    canvas.style.height = crop.height * window.devicePixelRatio + "px";
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    data.bannerImage = `${canvas.toDataURL()}`;

    const croppedImageFileData = dataURLtoFile(
      `${canvas.toDataURL()}`,
      `cropped-image-file${new Date()}`
    );
    let formDataTwo = new FormData();

    formDataTwo.append("image", croppedImageFileData);

    try {
      await services.addbanner.ADD_BANNERIMAGE_TO_STORE(
        user.accessToken,
        formDataTwo
      );
      setState("success");

      props.popupData(data);
    } catch (error) {
      setApiResponseError(strings.apiErrorMessage);
      setTimeout(() => setApiResponseError(""), 5000);
    }
    props.closePopup();
    document.body.style.overflow = "unset";
  };
  const cropImageNow2 = async () => {
    setState("loading");

    let data = {};
    data.popupType = "bannerImage";

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = 6;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    canvas.style.width = crop.width * window.devicePixelRatio + "px";
    canvas.style.height = crop.height * window.devicePixelRatio + "px";
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    const response = await fetch(selectedInstagramImageUrlFinal);
    const blob = await response.blob();
    const imageObject = new Image();
    imageObject.src = URL.createObjectURL(blob);

    imageObject.onload = () => {
      ctx.drawImage(
        imageObject,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      data.bannerImage = canvas.toDataURL();

      const croppedImageFileData = dataURLtoFile(
        canvas.toDataURL(),
        `cropped-image-file${new Date()}`
      );
      let formDataTwo = new FormData();

      formDataTwo.append("image", croppedImageFileData);

      try {
        services.addbanner.ADD_BANNERIMAGE_TO_STORE(
          user.accessToken,
          formDataTwo
        );
        setState("success");

        props.popupData(data);
      } catch (error) {
        setApiResponseError(strings.apiErrorMessage);
        setTimeout(() => setApiResponseError(""), 5000);
      }
      props.closePopup();
      setinstagramAllowPermissionCode("");
      document.body.style.overflow = "unset";
    };
  };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const closePopUpHandler = () => {
    setinstagramAllowPermissionCode("");
    props.closePopup();
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    if (image) {
      const defaultCrop = {
        aspect: 4 / 5,
        x: 0,
        y: 0,

        width: image?.width,
      };
      setCrop(defaultCrop);
    }
  }, [image]);

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const onImageLoaded = (img) => {
    setImage(img);
  };

  // this event will be fired when the user will click on continue with instagram while choosing banner in the modal
  const handleInstagramClickEvent = () => {
    const url = `https://www.instagram.com/oauth/authorize?client_id=${process.env.REACT_APP_INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_INSTAGRAM_REDIRECT_UI}&scope=user_profile%2Cuser_media&response_type=code&logger_id=${process.env.REACT_APP_INSTAGRAM_LOGGER_ID}`;
    window.location.href = url;
  };

  const getAccessToken = async () => {
    const requestBody = {
      code: instagramAllowPermissionCode.toString(),
    };

    try {
      const response = await services.addbanner.GET_ACCESS_TOKEN(requestBody);

      setAccessToken(response?.data?.data?.accessToken);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // this useEffect will only run after the user has allowed our website to use their data.
  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const code = searchParams.get("code");

    if (code?.length > 1) {
      handleChange(null, 1);
      setShowLoaderUntilInstagramPosts(true);
      setinstagramAllowPermissionCode(code);
      searchParams.delete("code");
      const newURL = `${url.origin}${url.pathname}`;
      window.history.replaceState({ path: newURL }, "", newURL);
    }
  }, []);

  useEffect(() => {
    if (
      currentImagesofInstagram?.length > 0 &&
      instagramPostsData?.length === 0
    ) {
      setInstgramPostsData(currentImagesofInstagram);
    }
  }, []);

  useEffect(() => {
    if (instagramAllowPermissionCode?.length > 0 && accessToken?.length === 0) {
      getAccessToken();
    }
  }, [instagramAllowPermissionCode]);

  useEffect(() => {
    if (accessToken?.length > 1) {
      fetchInstagramPostsByAcessToken();
    }
  }, [accessToken]);

  const fetchInstagramPostsByAcessToken = () => {
    try {
      axios
        .get(
          `https://graph.instagram.com/me/media?fields=id,media_type,media_url&limit=${100}&access_token=${accessToken}`
        )
        .then((resp) => {
          const filteredData = resp?.data?.data.filter(
            (item) => item?.media_type === "IMAGE"
          );
          setInstgramPostsData(filteredData);
          dispatch(saveInstagramImages(filteredData));
        });
    } catch (err) {
      console.log("error", err);
    }
  };

  const chooseThisInstagramImageMethod = () => {
    setSelectedInstagramImageUrlFinal(selectedInstagramImageUrl);
  };

  useEffect(() => {
    if (selectedInstagramImageUrlFinal?.length > 0) {
      setSelectedInstagramImageUrl("");
    }
  }, [selectedInstagramImageUrlFinal]);

  return (
    <div className="ph-container-box">
      <div className="ph-paper-box width380" style={{ paddingTop: "0px" }}>
        <AppBar
          component={"nav"}
          position={"sticky"}
          sx={{
            backgroundColor: "#F9F6F2",
            paddingTop: "24px",
          }}
          elevation={0}
        >
          <Box>
            <Heading3B
              text={strings.chooseBanner}
              color={Colors.black1c}
              padding={"0 0 24px 0"}
              letterSpacing={"-0.02em"}
            />
          </Box>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Upload Image" {...a11yProps(0)} />
              <Tab id="instagramTabID" label="Instagram" {...a11yProps(1)} />
            </Tabs>
            {instagramPostsData.length > 0 &&
              selectedInstagramImageUrl.length === 0 &&
              selectedInstagramImageUrlFinal?.length === 0 &&
              value !== 0 && (
                <Small
                  text={strings.ChooseAnImage}
                  color={Colors.black}
                  letterSpacing={"0.4px"}
                  padding={"10px 0 0px 10px"}
                />
              )}
          </Box>
        </AppBar>

        <Box>
          <TabPanel value={value} index={0}>
            <div className="" style={{ backgroundColor: src ? "#d3d3d3" : "" }}>
              <div
                className="upload-banner-popup-box"
                style={{ marginTop: "25px" }}
              >
                {src ? (
                  <>
                    <label
                      className="abh-ms1l-bh-upload-image"
                      style={{ height: "246px" }}
                    >
                      <ReactCrop
                        key={src}
                        src={src}
                        onImageLoaded={onImageLoaded}
                        onChange={onCropChange}
                        aspectRatio={4 / 5}
                        keepSelection={true}
                        crop={crop}
                        style={{
                          objectFit: "contain",
                        }}
                      ></ReactCrop>
                    </label>
                    {fileErr !== "" ? (
                      <LabelInput
                        className="ipnputlabel changePosition"
                        color={Colors.error}
                        text={fileErr}
                      ></LabelInput>
                    ) : null}
                    <label className="abh-ms1l-bh-upload-image">
                      {inputActive && (
                        <input
                          ref={inputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            selectImage(e.target.files[0]);
                            setimageType(
                              e.target.files[0].type.toLocaleLowerCase()
                            );
                            // setimageSize(e.target.files[0].size);
                            setInputActive(false);
                          }}
                        />
                      )}

                      <div
                        className="banner-preview-banner"
                        onClick={() => setInputActive(true)}
                        style={{
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {/* {images[0]?.name} */}
                        <div className="delete-banner">
                          <div>
                            <DeleteOutlinedIcon
                              sx={{ width: "20px", marginRight: "15px" }}
                            />
                          </div>
                          <div>Replace banner</div>
                        </div>
                      </div>
                    </label>
                  </>
                ) : (
                  <>
                    <label
                      className="abh-ms1l-bh-upload-image"
                      style={{ marginTop: "5rem" }}
                    >
                      <img alt="" src={addBGBlackIcon} className="addbg-icon" />
                      <Heading6S
                        text={strings.uploadBanner}
                        color={Colors.gray49}
                        letterSpacing={"-0.02em"}
                        cursor={"pointer"}
                        padding={"0 0px 4px 0px"}
                      />
                      <Small
                        text={strings.MBMax}
                        color={Colors.black1c}
                        letterSpacing={"-0.02em"}
                        cursor={"pointer"}
                        padding={"0 0px 0 0px"}
                        opacity={"0.64"}
                      />
                      <input
                        type="file"
                        // onChange={handleFileChange}

                        onChange={(e) => {
                          selectImage(e.target.files[0]);

                          setimageType(
                            e.target.files[0].type.toLocaleLowerCase()
                          );

                          setInputActive(false);
                        }}
                      />
                    </label>
                  </>
                )}
              </div>
            </div>
          </TabPanel>

          <TabPanel
            value={value}
            index={1}
            sx={{
              marginTop: "25px",
            }}
          >
            {instagramPostsData.length > 0 &&
            selectedInstagramImageUrl.length === 0 &&
            selectedInstagramImageUrlFinal?.length === 0 ? (
              <>
                <div style={{ height: "407px" }}>
                  <ImageList sx={{ width: "100%" }} cols={3} rowHeight={110}>
                    {instagramPostsData.map((item) => (
                      <ImageListItem key={item?.id}>
                        <img
                          src={item?.media_url}
                          alt={"pedlar images"}
                          loading="lazy"
                          onLoad={() => setShowLoaderUntilInstagramPosts(false)}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                          onClick={() =>
                            setSelectedInstagramImageUrl(item?.media_url)
                          }
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </div>
              </>
            ) : selectedInstagramImageUrl.length > 0 ? (
              <>
                <Small
                  text={strings.preview}
                  color={Colors.black1c}
                  letterSpacing={"-0.01em"}
                  cursor={"pointer"}
                  padding={"10px 0 10px 0px"}
                />
                <div style={{ backgroundColor: "#d3d3d3", height: "363px" }}>
                  <img
                    src={selectedInstagramImageUrl}
                    width={"100%"}
                    height={"100%"}
                    style={{ objectFit: "contain" }}
                    alt="pedlar"
                  ></img>
                </div>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-evenly"}
                  mt={"10px"}
                >
                  <CancelLarge
                    fontSize={"13px"}
                    rounded
                    background={"#d3d3d3"}
                    width={"157px"}
                    text={strings.useAnother}
                    margin={"0 0 0px 0"}
                    onClick={() => setSelectedInstagramImageUrl("")}
                  />

                  <ReactiveButton
                    rounded
                    size="large"
                    color="#000"
                    idleText={strings.useThisImage}
                    onClick={() => chooseThisInstagramImageMethod()}
                  />
                </Box>
              </>
            ) : selectedInstagramImageUrlFinal?.length > 0 ? (
              <Box sx={{ width: 327, height: 250, marginTop: "25px" }}>
                <div className="upload-banner-popup-box">
                  <label
                    className="abh-ms1l-bh-upload-image"
                    style={{ height: "100%" }}
                  >
                    <ReactCrop
                      key={selectedInstagramImageUrlFinal}
                      src={selectedInstagramImageUrlFinal}
                      onImageLoaded={onImageLoaded}
                      onChange={onCropChange}
                      aspectRatio={4 / 5}
                      keepSelection={true}
                      // locked={true}
                      crop={crop}
                    ></ReactCrop>
                  </label>
                </div>
              </Box>
            ) : (
              <div
                className="insta-upload-img-popupholder"
                style={{ paddingTop: "5rem", marginTop: "25px" }}
              >
                {showLoaderUntilInstagramPosts ? (
                  <CentralLoader />
                ) : (
                  <>
                    <Body
                      text={strings.importAnImageFromInstagram}
                      color={Colors.gray49}
                      letterSpacing={"0.1px"}
                      cursor={"pointer"}
                      fontWeight={"500"}
                      padding={"0 0px 24px 0px"}
                      textAlign={"center"}
                    />
                    <button
                      className="instapopupbutton"
                      type="button"
                      onClick={handleInstagramClickEvent}
                      style={{ cursor: "pointer" }}
                    >
                      <InstagramIcon sx={{ color: "white" }} />
                      <Heading6S
                        text={strings.ContinueWithInstagram}
                        color={Colors.grayf9}
                        letterSpacing={"-0.02em"}
                        padding={"0 0px 0px 12px"}
                      />
                    </button>
                  </>
                )}
              </div>
            )}
          </TabPanel>
        </Box>
        {value === 0 ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            mt={"45px"}
          >
            <CancelLarge
              width={"100px"}
              text={strings.cancel}
              margin={"0 0 0px 0"}
              onClick={closePopUpHandler}
            />
            <ReactiveButton
              buttonState={state}
              rounded
              size="large"
              color="#000"
              onClick={() => cropImageNow()}
              disabled={fileErr?.length === 0 && src?.length > 0 ? false : true}
              idleText={strings.save}
              loadingText={<ButtonLoader />}
            />
          </Box>
        ) : selectedInstagramImageUrlFinal.length > 1 ? (
          <>
            <div
              className="banner-preview-banner"
              style={{
                marginTop: "10px",
              }}
            >
              <div
                className="delete-banner"
                onClick={() => setSelectedInstagramImageUrlFinal("")}
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  backgroundColor: "#d3d3d3",
                  height: "40px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <div>
                  <DeleteOutlinedIcon
                    sx={{ width: "20px", marginRight: "15px" }}
                  />
                </div>
                <div>Replace banner</div>
              </div>
            </div>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              mt={"82px"}
            >
              <CancelLarge
                width={"100px"}
                text={strings.cancel}
                margin={"0 0 0px 0"}
                onClick={closePopUpHandler}
              />

              <ReactiveButton
                buttonState={state}
                rounded
                size="large"
                color="#000"
                onClick={() => cropImageNow2()}
                disabled={
                  selectedInstagramImageUrlFinal.length > 1 ? false : true
                }
                idleText={strings.save}
                loadingText={<ButtonLoader />}
              />
            </Box>
          </>
        ) : instagramPostsData?.length === 0 ? (
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            mt={"45px"}
          >
            <CancelLarge
              width={"100px"}
              text={strings.cancel}
              margin={"0 0 0px 0"}
              onClick={closePopUpHandler}
            />

            <ReactiveButton
              buttonState={state}
              rounded
              size="large"
              color="#000"
              disabled={
                selectedInstagramImageUrlFinal.length > 1 ? false : true
              }
              idleText={strings.save}
              loadingText={<ButtonLoader />}
            />
          </Box>
        ) : null}
      </div>

      {apiResponseError?.length > 2 ? (
        <span className="product-add-error-box">{apiResponseError}</span>
      ) : null}
    </div>
  );
};

export default ChooseBannerPopup;
