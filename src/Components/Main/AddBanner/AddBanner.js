import React, { useEffect, useRef, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

import { useTour } from "@reactour/tour";
import { Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import * as Colors from "../../../assets/styles/Colors";
import {
  PrimaryLarge,
  CancelLarge,
  ShareLarge,
} from "../../../assets/styles/Buttons";
import {
  Heading3B,
  Heading4B,
  Heading6S,
  Heading5B,
  Small,
  LabelInput,
} from "../../../assets/styles/Labels";

import { POPUP_TYPE } from "../../../Helpers/Enums";
import "./AddBanner.scss";
import AllPopups from "../../../Popups/AllPopups";
import Sidebar from "../../../Components/Layout/Sidebar/Sidebar";

import noproduct from "../../../assets/images/product/noproduct.png";
import { Body } from "../../../assets/styles/Labels";
import pedlarLogo from "../../../assets/images/logo/pedlar-logo.svg";
import cartBlack from "../../../assets/images/structure/cart-black.svg";
import tiktokIcon from "../../../assets/images/structure/tiktok-icon.svg";
import shareIcon from "../../../assets/images/structure/shareIcon.svg";

import instaIcon from "../../../assets/images/structure/insta-icon.svg";
import forwordGray from "../../../assets/images/structure/forword-gray.svg";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import addPlusBlackImg from "../../../assets/images/structure/add-plus-black.svg";
import addBGBlackIcon from "../../../assets/images/structure/add-bg-black.svg";

import selectBrandPlaceholderImage from "../../../assets/images/product/selectBrandPlaceholderImage.png";
import Bannerplaceholder from "../../../assets/images/product/Bannerplaceholder.png";
import DeleteIcon from "../../../assets/images/structure/deleteIcon";
import fAmex from "../../../assets/images/structure/f-amex.svg";
import fApplepay from "../../../assets/images/structure/f-applepay.svg";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import fMastercard from "../../../assets/images/structure/f-mastercard.svg";
import fPaypal from "../../../assets/images/structure/f-paypal.svg";
import fShoppay from "../../../assets/images/structure/f-shoppay.svg";
import fVisa from "../../../assets/images/structure/f-visa.svg";
import menuIcon from "../../../assets/images/structure/menu_24px.svg";
import ModalClose from "../../../assets/images/structure/closeblack.svg";
import welcomeToIedlarImg from "../../../assets/images/product/welcome-to-pedlar.png";
import copyIconBlack from "../../../assets/images/structure/copy-icon-black.svg";
import ConfittiAnimation from "../../../Popups/Childs/ShareYourStore/ConfittiAnimation";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import PropTypes from "prop-types";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InstagramIcon from "@mui/icons-material/Instagram";
import ReactiveButton from "reactive-button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import services from "../../../services/index";
import AddProductPopup from "../../../Popups/Childs/AddProductPopup/AddProductPopup";
import ProductDetailPopup from "../../../Popups/Childs/ProductDetailPopup/ProductDetailPopup";
import RemoveProductPopup from "../../../Popups/Childs/RemoveProductPopup/RemoveProductPopup";
import {
  CircularProgress,
  useTheme,
  CardMedia,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import {
  currentReloadData,
  setAddProductValueChange,
} from "../../../redux/reducers/addProductValueChange";
import {
  saveInstagramImages,
  currentInstagramImagesData,
} from "../../../redux/reducers/instagramImages";
import Loaders from "../../../GlobalModule/Loaders";
import ButtonLoader from "../../../GlobalModule/ButtonLoader";
import axios from "axios";
const strings = require("../../../localisation_en.json");
// var slugformat = /^[A-Za-z0-9-]*$/;
var slugformat = /^[a-zA-Z0-9._]*$/;

const drawerWidth = 331;

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

const AddBanner = (props) => {
  const [user] = useAuthState(auth);
  const currentReloadDataVar = useSelector(currentReloadData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState("idle");
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [value, setValue] = useState(0);
  const [images, setImages] = useState("");
  const [imgSize, setImgSize] = useState({});
  const [userData, setUserData] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [curatedBrands, setCuratedBrands] = useState([]);
  const [openProductPopup, setOpenProductPopup] = useState(false);
  const [openProductDetailPopup, setOpenProductDetailPopup] = useState({});

  /* eslint-disable no-unused-vars */
  const [reloadData, setReloadData] = useState(false);
  const [showMsg, setShowMsg] = useState("");
  const [sucessPopup, setSucessPopup] = useState(false);
  const [removeProductPopup, setRemoveProductPopup] = useState(false);
  const [removeProductId, setRemoveProductId] = useState("");
  const [removeResponse, setRemoveResponse] = useState("");
  const theme = useTheme();
  const [sendingData, setSendingData] = useState("");
  const [detailProductId, setDetailProductId] = useState("");
  const [loaderState, setLoaderState] = useState(false);
  const [loaderState2, setLoaderState2] = useState(false);
  const [loaderState3, setLoaderState3] = useState(false);
  const [apiResponseError, setApiResponseError] = useState("");

  const [descriptionLengthState, setdescriptionLengthState] = useState("");
  const [showLoaderUntilInstagramPosts, setShowLoaderUntilInstagramPosts] =
    useState(false);

  //Banner Image
  const [bannerImage, setBannerImage] = useState("");
  const [file, setFile] = useState("");
  const [sendfile, setSendFile] = useState("");
  const [fileErr, setFileErr] = useState("");
  const inputRef = useRef();
  const cropperRef = useRef();
  const imgRefs = useRef([]);

  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState(defaultCrop);
  const [image, setImage] = useState(null);
  const [imageType, setimageType] = useState("");
  const [imageSize, setimageSize] = useState();

  const currentImagesofInstagram = useSelector(currentInstagramImagesData);

  useEffect(() => {
    if (imageType === "image/png" || imageType === "image/jpeg") {
      setFileErr("");
    } else {
      if (imageType.length > 0)
        setFileErr(strings.bannerImagePngOrJpegAcceptedError);
    }
  }, [image, imageSize, imageType]);
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

  const onImageLoaded = (img) => {
    setImage(img);
  };

  const selectImage = (file) => {
    setSrc(URL.createObjectURL(file));
  };
  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const cropImageNow = async () => {
    setState("loading");

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    const pxlRatio = window.devicePixelRatio;
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

    setBannerImage(`${canvas.toDataURL()}`);

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
    } catch (error) {
      setApiResponseError(strings.apiErrorMessage);
      setTimeout(() => setApiResponseError(""), 5000);
    }
    setOpenSocial(false);
    setState("success");

    setSrc("");
    setImage("");
  };

  const useStyles = makeStyles(() => ({
    root: {
      justifyContent:
        curatedBrands.length === 2 || curatedBrands.length === 4
          ? "center"
          : "flex-start",
      width: "100%",
      marginLeft: "0px",
    },
    borderRadius: {
      borderRadius: "10px 10px 0 0",
    },
  }));
  const muiClasses = useStyles();

  const [loaded, setLoaded] = useState({});
  const handleImageLoad = (index) => {
    setLoaded((prevLoaded) => {
      const newLoaded = [...prevLoaded];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file);
      }
    };
  }, []);

  // convert base64 string to file object

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

  //Store Front Description
  const [description, setDescription] = useState("");
  const [descriptionTemp, setDescriptionTemp] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [shortDescription, setShortDescription] = useState([]);

  useEffect(() => {
    setCharacterCount(descriptionTemp.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descriptionTemp]);

  const saveDescription = async () => {
    // if (descriptionTemp !== "") {
    const textAreaComponent = document.getElementById("descriptionTextArea");
    const descriptionTextAreaAutosizeValue = textAreaComponent.value;
    setDescriptionTemp(descriptionTextAreaAutosizeValue);
    setState("loading");

    try {
      await services.addbanner.ADD_DESCRIPTION_TO_STORE(user.accessToken, {
        type: "description",
        description: descriptionTextAreaAutosizeValue,
      });
      setDescription(descriptionTextAreaAutosizeValue);
    } catch (error) {
      setApiResponseError(strings.apiErrorMessage);
      setTimeout(() => setApiResponseError(""), 5000);
    }
    setOpenDiscription(false);
    setState("success");
    // }
  };

  const checkDescriptionLength = () => {
    if (description?.includes("\n") && description?.length < 50) {
      let des = description?.split("\n") || "";

      if (des?.length <= 5) {
        setShortDescription(des);
      } else {
        setShortDescription([]);
      }
    } else {
      setShortDescription([]);
    }
  };
  useEffect(() => {
    checkDescriptionLength();
  }, [description]);

  //Social media links
  const [instagramLink, setInstagramLink] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");
  const [instagramLinkTemp, setInstagramLinkTemp] = useState("");
  const [instagramLinkTempErr, setInstagramLinkTempErr] = useState("");
  const [tiktokLinkTemp, setTiktokLinkTemp] = useState("");
  const [tiktokLinkTempErr, setTiktokLinkTempErr] = useState("");
  const [onDescriptionFieldClicked, setonDescriptionFieldClicked] =
    useState(false);
  useEffect(() => {
    if (instagramLinkTemp === "") {
      setInstagramLinkTempErr("");
    }

    if (
      instagramLinkTemp?.length >= 30 &&
      !instagramLinkTemp.match(slugformat)
    ) {
      setInstagramLinkTempErr(
        " Enter a valid Instagram username and  You cannot put more than 30 characters"
      );
    } else if (!instagramLinkTemp.match(slugformat)) {
      setInstagramLinkTempErr(strings.invalidAInstaLink);
    } else if (instagramLinkTemp?.length >= 30) {
      setInstagramLinkTempErr(" You cannot put more than 30 characters");
    } else setInstagramLinkTempErr("");
  }, [instagramLinkTemp]);

  useEffect(() => {
    if (tiktokLinkTemp === "") {
      setTiktokLinkTempErr("");
    }
    if (tiktokLinkTemp?.length >= 24 && !tiktokLinkTemp.match(slugformat)) {
      setTiktokLinkTempErr(
        " Enter a valid tiktok username and  You cannot put more than 24 characters"
      );
    } else if (!tiktokLinkTemp.match(slugformat)) {
      setTiktokLinkTempErr(strings.invalidATiktokLink);
    } else if (tiktokLinkTemp?.length >= 24) {
      setTiktokLinkTempErr(" You cannot put more than 24 characters");
    } else setTiktokLinkTempErr("");
  }, [tiktokLinkTemp]);
  const socialLinkSubmitHandler = async () => {
    setState("loading");

    let form = new FormData();
    //if (instagramLinkTemp.trim() !== "")
    form.append("instagramLink", "instagram.com/@" + instagramLinkTemp.trim());
    //if (tiktokLinkTemp.trim() !== "")
    form.append("tiktokLink", "tiktok.com/@" + tiktokLinkTemp.trim());
    try {
      await services.addbanner.ADD_SOCIALLINK_TO_STORE(user.accessToken, form);
      setState("success");
      //if (tiktokLinkTemp.trim() !== "")
      setTiktokLink("tiktok.com/@" + tiktokLinkTemp.trim());
      //if (instagramLinkTemp.trim() !== "")
      setInstagramLink("instagram.com/@" + instagramLinkTemp.trim());
    } catch (error) {
      setApiResponseError(strings.apiErrorMessage);
      setTimeout(() => setApiResponseError(""), 5000);
    }

    setOpen(false);
  };

  useEffect(() => {
    if (userData.storefrontImageUrl && userData.storefrontImageUrl !== "")
      setBannerImage(userData?.storefrontImageUrl);
    if (
      userData.storefrontDescription &&
      userData.storefrontDescription !== ""
    ) {
      setDescription(userData?.storefrontDescription);
      setDescriptionTemp(userData?.storefrontDescription);
    }
    if (userData.instagramLink && userData.instagramLink !== "")
      setInstagramLink(userData.instagramLink);
    if (userData.tiktokLink && userData.tiktokLink !== "")
      setTiktokLink(userData.tiktokLink);
  }, [userData]);

  const { setIsOpen } = useTour();
  function socialLinksPopupOpen() {
    setPopupType(POPUP_TYPE.SOCIAL_LINKS_POPUP);
    setPopupOpen(true);
    let instaUser = instagramLink?.split("/@") || "";
    let tiktokUser = tiktokLink?.split("/@") || "";
    setSendingData({
      instagramLink: instaUser[1] !== undefined ? instaUser[1] : "",
      tiktokLink: tiktokUser[1] !== undefined ? tiktokUser[1] : "",
    });
  }

  // disable scroll if the user opens description modal

  useEffect(() => {
    if (popupOpen === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [popupOpen]);

  useEffect(() => {
    if (openProductPopup === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [openProductPopup]);
  useEffect(() => {
    if (Object.keys(openProductDetailPopup).length !== 0) {
      document.body.style.overflow = "hidden";
    } else if (
      Object.keys(openProductDetailPopup).length === 0 &&
      openProductPopup === false
    ) {
      getallproduct();
      document.body.style.overflow = "scroll";
      if (localStorage.getItem("sucessMsg") !== "")
        setShowMsg(localStorage.getItem("sucessMsg"));
      setTimeout(() => {
        localStorage.setItem("sucessMsg", "");
        setShowMsg("");
      }, 3000);
    }
  }, [openProductDetailPopup]);

  function discriptionPopupOpen() {
    setPopupType(POPUP_TYPE.DISCRIPTION_POPUP);
    setPopupOpen(true);
    setSendingData({ description: description });
  }
  function chooseBannerPopupOpen() {
    document.body.style.overflow = "hidden";
    setPopupType(POPUP_TYPE.CHOOSE_BANNER_POPUP);
    setPopupOpen(true);
  }

  const [popupData, setPopupData] = useState(false);
  useEffect(() => {
    if (popupData.popupType === "socialLinks") {
      if (popupData.tiktokLink !== "") setTiktokLink(popupData.tiktokLink);
      if (popupData.instagramLink !== "")
        setInstagramLink(popupData.instagramLink);
    }
    if (popupData.popupType === "bannerImage") {
      setBannerImage(popupData.bannerImage);
    }
    if (popupData.popupType === "description") {
      setDescription(popupData.description);
      setDescriptionTemp(popupData.description);
    }
    if (popupData.popupType === "sharepopup") {
      setShowMsg("Link Copied to Clipboard");
      setTimeout(() => setShowMsg(""), 4000);
    }
  }, [popupData]);

  useEffect(() => {
    //TourStartPopupOpen();
    getallproduct();
    getUserData();
    getCuratedBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    let instaUser = instagramLink?.split("/@") || "";
    let tiktokUser = tiktokLink?.split("/@") || "";
    setInstagramLinkTemp(instaUser[1] !== undefined ? instaUser[1] : "");
    setTiktokLinkTemp(tiktokUser[1] !== undefined ? tiktokUser[1] : "");
    setOpen(newOpen);
  };

  useEffect(() => {
    function keyHandling(e) {
      if (e.keyCode === 75) {
        e.preventDefault();
        setIsOpen(true);
      }
    }
    window.addEventListener("keyup", keyHandling);
    return () => window.removeEventListener("keyup", keyHandling);
  }, [setIsOpen]);

  const [mobileOpenCategory, setMobileOpenCategory] = React.useState(false);
  const handleDrawerToggleCategory = () => {
    setMobileOpenCategory(!mobileOpenCategory);
  };

  const [openChooseBenner, setOpenSocial] = React.useState(false);
  const toggleDrawerChooseBenner = (newOpenSocial) => () => {
    setOpenSocial(newOpenSocial);
  };

  const [openDiscription, setOpenDiscription] = React.useState(false);
  const toggleOpenDiscription = (newOpenDiscription) => () => {
    setOpenDiscription(newOpenDiscription);
  };

  const [openTour, setOpenTour] = React.useState(false);
  const toggleDrawerTour = (newOpenTour) => () => {
    setOpenTour(newOpenTour);
  };

  const [openShareStore, setOpenShareStore] = React.useState(false);
  const toggleDrawerShareStore = (newOpenShareStore) => () => {
    setOpenShareStore(newOpenShareStore);
  };

  // change state if description modal closes

  useEffect(() => {
    if (openDiscription === false) {
      setonDescriptionFieldClicked(false);
    }
  }, [openDiscription]);

  useEffect(() => {
    if (removeResponse === "yes") {
      (async () => {
        let productId = removeProductId?.split("/") || "";
        productId = parseInt(productId[productId.length - 1]);
        await services.product.DELETE_PRODUCT_FROM_STORE(user.accessToken, {
          productId: productId,
        });
        setRemoveProductId("");
        setRemoveProductPopup(false);
        getallproduct();
      })();
    }
    setRemoveResponse("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeResponse]);
  useEffect(() => {
    if (sucessPopup) {
      setOpenProductDetailPopup({});
      setSucessPopup(false);
      dispatch(setAddProductValueChange(currentReloadDataVar ? false : true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sucessPopup]);
  const getallproduct = async () => {
    if (localStorage.getItem("sucessMsg") !== "")
      setShowMsg(localStorage.getItem("sucessMsg"));
    setTimeout(() => {
      localStorage.setItem("sucessMsg", "");
      setShowMsg("");
    }, 3000);
    setLoaderState2(true);
    try {
      const response = await services.product.GET_PRODUCTS_ADD_BANNER_PAGE(
        user.accessToken,
        {
          selected: true,
          limit: 5,
        }
      );

      setProductsList(response.data.data.products.nodes);
    } catch {
      setApiResponseError(strings.apiErrorMessage);
      setTimeout(() => setApiResponseError(""), 5000);
    }
    setLoaderState2(false);
  };

  // get curated brands
  const getCuratedBrands = async () => {
    setLoaderState3(true);
    await services.product

      .GET_CURATED_BRANDS(user.accessToken)
      .then((response) => {
        setCuratedBrands(response.data.data);
        setLoaded(Array(response.data.data).fill(false));
        setLoaderState3(false);
      })
      .catch(() => {
        setApiResponseError(strings.apiErrorMessage);
        setTimeout(() => setApiResponseError(""), 5000);
      });
  };

  const handleAddProductClose = async () => {
    setOpenProductPopup(false);
    getallproduct();
  };

  const redirectAddProduct = (backPath, redirectPath) => {
    localStorage.setItem("back-path", backPath);
    navigate(redirectPath);
  };

  const getUserData = async () => {
    setLoaderState(true);
    try {
      const response = await services.addbanner.GET_USER(
        user.accessToken,
        user.uid
      );
      setUserData(response.data.data);
      setBannerImage(response?.data?.data?.storefrontImageUrl);
      setDescription(response.data.data?.storefrontDescription);
      setdescriptionLengthState(response.data.data?.storefrontDescription);
    } catch (error) {
      setApiResponseError(error);
      setTimeout(() => setApiResponseError(""), 5000);
    }
    setLoaderState(false);
  };

  const [copymsg, setCopymsg] = React.useState("");
  const handleCopyText = () => {
    navigator.clipboard.writeText("pedlar.store/" + user.uid);
    setCopymsg(<ConfittiAnimation />);
    setTimeout(() => setCopymsg(""), 4000);
    setShowMsg("Link Copied to Clipboard");
    setTimeout(() => setShowMsg(""), 4000);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const OpenProductDetails = (item) => {
    Object.assign(item, { inCollection: true });
    setOpenProductDetailPopup(item);
  };

  const handleProductDetailclick = (id, action) => {
    let productId = id?.split("/") || "";
    productId = parseInt(productId[productId.length - 1]);

    let act = action ? "remove" : "add";
    localStorage.setItem("back-path-address", "/storefront");

    navigate("/add-product-detail/" + act + "/" + productId, {
      state: {
        backPath: "product-list",
      },
    });
  };

  const changeTextAreaState = () => {
    setonDescriptionFieldClicked(true);
  };

  useEffect(() => {
    if (apiResponseError.length > 2) {
      setLoaderState3(false);
    }
  }, [apiResponseError]);

  // click on the add banner plus icon if there is instagram access token code in the   url

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const code = searchParams.get("code");

    if (code?.length > 1 && isMobile) {
      setShowLoaderUntilInstagramPosts(true);
      setinstagramAllowPermissionCode(code);
      setOpenSocial(true);
      handleChange(null, 1);
      searchParams.delete("code");
      const newURL = `${url.origin}${url.pathname}`;
      window.history.replaceState({ path: newURL }, "", newURL);
    }
    if (!isMobile && code?.length > 1) {
      chooseBannerPopupOpen();
    }
  }, []);

  useEffect(() => {
    if (
      currentImagesofInstagram?.length > 0 &&
      instagramPostsData?.length === 0 &&
      isMobile
    ) {
      setInstgramPostsData(currentImagesofInstagram);
    }
  }, []);

  //     ************* writing code for instagram posts fetching
  const [instagramAllowPermissionCode, setinstagramAllowPermissionCode] =
    useState("");
  const [instagramPostsData, setInstgramPostsData] = useState([]);
  const [selectedInstagramImageUrl, setSelectedInstagramImageUrl] =
    useState("");

  const [selectedInstagramImageUrlFinal, setSelectedInstagramImageUrlFinal] =
    useState("");
  const [longLivedAcessToken, setLOngLivedAcessToken] = useState("");
  const [accessToken, setAccessToken] = useState("");

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
      // const data = await response.json();

      setAccessToken(response?.data?.data?.accessToken);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (
      instagramAllowPermissionCode?.length > 0 &&
      accessToken?.length === 0 &&
      isMobile
    ) {
      getAccessToken();
    }
  }, [instagramAllowPermissionCode]);

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

  useEffect(() => {
    if (accessToken?.length > 1) {
      fetchInstagramPostsByAcessToken();
    }
  }, [accessToken]);

  // useThisInstagramImageMethod;
  // const chooseThisInstagramImageMethod = () => {
  //   setSelectedInstagramImageUrlFinal(selectedInstagramImageUrl);
  // };

  useEffect(() => {
    if (selectedInstagramImageUrlFinal?.length > 0) {
      setSelectedInstagramImageUrl("");
    }
  }, [selectedInstagramImageUrlFinal]);

  const cropImageNow2 = async () => {
    setState("loading");

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

    imageObject.onload = async () => {
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

      setBannerImage(`${canvas.toDataURL()}`);

      const croppedImageFileData = dataURLtoFile(
        canvas.toDataURL(),
        `cropped-image-file${new Date()}`
      );
      let formDataTwo = new FormData();

      formDataTwo.append("image", croppedImageFileData);

      try {
        const response = await services.addbanner.ADD_BANNERIMAGE_TO_STORE(
          user.accessToken,
          formDataTwo
        );
        setState("success");
      } catch (error) {
        setApiResponseError(strings.apiErrorMessage);
        setTimeout(() => setApiResponseError(""), 5000);
      }

      setSrc("");
      setImage("");

      setSelectedInstagramImageUrl("");
      setSelectedInstagramImageUrlFinal("");
      document.body.style.overflow = "scroll";
      setOpenSocial(false);
    };
  };

  useEffect(() => {
    if (openChooseBenner) {
      setState("idle");
    }
  }, [openChooseBenner]);

  return (
    <>
      {/* desktop view */}

      <div className="main-mid-holder desktop-view-marge">
        <Sidebar />
        <div className="mid-content-holder">
          {
            <div className="add-banner-holder">
              {Object.keys(userData).length > 0 ? (
                <div data-tut="reactour__stab">
                  <div className="abh-header">
                    <Box className="" display={"flex"} alignItems={"center"}>
                      <img src={pedlarLogo} className="logo-img" alt="" />

                      <Heading3B
                        text={userData ? userData.storefrontName : ""}
                        color={Colors.black1c}
                        letterSpacing={"-0.02em"}
                        cursor={"pointer"}
                        padding={"0 0 0 8px"}
                        textTransform={"capitalize"}
                      />
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                      <Heading6S
                        text={strings.brands}
                        color={Colors.footer_gray}
                        letterSpacing={"-0.02em"}
                        padding={"0 10px"}
                        opacity={"0.64"}
                      />
                      <Heading6S
                        text={strings.shop}
                        color={Colors.footer_gray}
                        letterSpacing={"-0.02em"}
                        padding={"0 10px"}
                        opacity={"0.64"}
                      />
                      <Box p={"0 0px 0 20px"}>
                        <img alt="" src={cartBlack} className="h-cart-icon" />
                      </Box>
                    </Box>
                  </div>
                  <div className="abh-mid-holder">
                    <div className="abh-mh-sec1">
                      <div className="abh-mh-s1-left">
                        <Box
                          className="abh-ms1l-banner-holder"
                          sx={{
                            height: "595px !important",
                          }}
                          onClick={() => chooseBannerPopupOpen()}
                        >
                          {bannerImage !== "" && (
                            <div
                              className="abh-ms1l-bh-upload-image"
                              style={{
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <CardMedia
                                component="img"
                                image={
                                  bannerImage ? bannerImage : Bannerplaceholder
                                }
                                style={{
                                  minHeight: "100%",

                                  minWidth: "100%",
                                  maxWidth: "100%",
                                }}
                                sx={{
                                  objectFit: "fill",
                                }}
                              ></CardMedia>
                              <Box
                                sx={{
                                  position: "absolute",

                                  height: "50px",
                                  marginTop: "29rem",
                                  marginLeft: "26rem",
                                  cursor: "pointer",
                                  zIndex: "1",
                                }}
                                onClick={() => chooseBannerPopupOpen()}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="40"
                                  height="40"
                                  viewBox="0 0 40 40"
                                  fill="none"
                                >
                                  <rect
                                    width="40"
                                    height="40"
                                    rx="20"
                                    fill="#8652FF"
                                    // fill-opacity="0.8"
                                    fillOpacity={"0.8"}
                                  />
                                  <path
                                    d="M33.3332 21.666H21.6665V33.3327H18.3332V21.666H6.6665V18.3327H18.3332V6.66602H21.6665V18.3327H33.3332V21.666Z"
                                    fill="white"
                                  />
                                </svg>
                              </Box>
                            </div>
                          )}
                          {bannerImage === "" && (
                            <div
                              className="abh-ms1l-bh-upload-image"
                              style={{
                                height: "100%",
                                width: "100%",
                              }}
                            >
                              <img
                                alt=""
                                src={Bannerplaceholder}
                                // className="addbg-icon"
                                style={{
                                  minHeight: "100%",
                                  minWidth: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          )}
                        </Box>
                      </div>
                      <div
                        className="abh-mh-s1-right"
                        style={{
                          zIndex: "123",

                          height: "328px",
                          paddingBottom: "5px",
                        }}
                      >
                        <div className="abh-ms1l-content-holder">
                          <Box
                            sx={{
                              border: "1px solid #D3D3D3",
                              padding: "1rem",
                              width: "90% !important",
                              borderRadius: "10px",
                              cursor: "pointer",
                              overflowY: "auto",
                              height: "154px",
                            }}
                            className={"descriptionBox"}
                            onClick={() => discriptionPopupOpen()}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                cursor: "pointer",
                                color: "rgba(134, 82, 255, 0.8)",
                              }}
                              onClick={() => discriptionPopupOpen()}
                            >
                              <Box>
                                <ModeEditOutlineOutlinedIcon
                                  sx={{
                                    width: "17px",
                                    marginRight: "3px",
                                  }}
                                />
                              </Box>
                              <Box sx={{ fontWeight: "600" }}>EDIT</Box>
                            </Box>
                            <Box
                              // display={"flex"}
                              alignItems={"center"}
                              pb={"8px"}
                            >
                              {shortDescription?.length > 0 ? (
                                shortDescription?.map((item) => {
                                  return (
                                    <>
                                      <Heading6S
                                        text={item}
                                        color={Colors.black1c}
                                      />
                                      <br></br>
                                    </>
                                  );
                                })
                              ) : (
                                <Heading6S
                                  text={
                                    description?.length > 0
                                      ? description
                                      : "Welcome to my Pedlar Store! Here is a collection of my favourite products from my favourite brands. Have a browse and enjoy."
                                  }
                                  color={Colors.black1c}
                                  letterSpacing={"-0.02em"}
                                  padding={"0 0px 0 0px"}
                                  className="descriptionBreakWord2"
                                ></Heading6S>
                              )}
                            </Box>
                          </Box>
                          <Box
                            className=""
                            display={"flex"}
                            alignItems={"center"}
                            pb={"8px"}
                            sx={{ marginTop: "1rem", width: "90% !important" }}
                          >
                            <img
                              alt=""
                              src={instaIcon}
                              width="16"
                              height="16"
                            />
                            <Box
                              sx={{
                                border: "1px solid #D3D3D3",
                                borderRadius: "10px",
                                marginLeft: "10px",
                                padding: "1rem",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                cursor: "pointer",
                              }}
                              onClick={() => socialLinksPopupOpen()}
                            >
                              <Box>
                                <Heading6S
                                  text={
                                    // instagramLink?.split("@")[1]?.length === 0
                                    instagramLink
                                      ? instagramLink?.split("@")[1] ||
                                        "Add Instagram"
                                      : "Add Instagram"
                                  }
                                  color={Colors.black1c}
                                  letterSpacing={"-0.02em"}
                                  padding={"0 0px 0 8px"}
                                  className="text-width-limit-on-sociallinks"
                                />
                              </Box>
                              <Box
                                sx={{
                                  cursor: "pointer",
                                  color: "rgba(134, 82, 255, 0.8)",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                onClick={() => socialLinksPopupOpen()}
                              >
                                <Box>
                                  <ModeEditOutlineOutlinedIcon
                                    sx={{ width: "17px", marginRight: "3px" }}
                                  />
                                </Box>
                                <Box sx={{ fontWeight: "600" }}>EDIT</Box>
                              </Box>
                            </Box>
                          </Box>
                          <Box
                            className=""
                            display={"flex"}
                            alignItems={"center"}
                            pb={"8px"}
                            sx={{
                              width: "90% !important",
                            }}
                          >
                            <img
                              alt=""
                              src={tiktokIcon}
                              width="16"
                              height="16"
                            />
                            <Box
                              sx={{
                                border: "1px solid #D3D3D3",
                                borderRadius: "10px",
                                marginLeft: "10px",
                                padding: "1rem",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                cursor: "pointer",
                              }}
                              onClick={() => socialLinksPopupOpen()}
                            >
                              <Box>
                                <Heading6S
                                  text={
                                    // tiktokLink?.split("@")[1].length === 0
                                    tiktokLink
                                      ? tiktokLink?.split("@")[1] ||
                                        "Add Tiktok"
                                      : "Add Tiktok"
                                  }
                                  color={Colors.black1c}
                                  letterSpacing={"-0.02em"}
                                  padding={"0 0px 0 8px"}
                                  className="text-width-limit-on-sociallinks"
                                />
                              </Box>
                              <Box
                                sx={{
                                  cursor: "pointer",
                                  color: "rgba(134, 82, 255, 0.8)",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                onClick={() => socialLinksPopupOpen()}
                              >
                                <Box>
                                  <ModeEditOutlineOutlinedIcon
                                    sx={{ width: "17px", marginRight: "3px" }}
                                  />
                                </Box>
                                <Box sx={{ fontWeight: "600" }}>EDIT</Box>
                              </Box>
                            </Box>
                          </Box>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Box
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    borderBottom: "1px solid  #dddddd ",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      height: "76vh",
                      backgroundColor: "#FFFFF7",
                    }}
                  ></Box>
                </Box>
              )}
              <div className="abh-mid-holder">
                <div className="abh-mh-sec2">
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    pb={"20px"}
                  >
                    <Box display={"flex"} alignItems={"center"}>
                      <Heading3B
                        text={strings.NewAdditions}
                        color={Colors.black1c}
                        letterSpacing={"-0.02px"}
                        fontWeight={"500"}
                        padding={"0 0 0 0"}
                        opacity={"0.64"}
                      />

                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        marginLeft={"20px"}
                      >
                        <ErrorOutlinedIcon
                          style={{
                            width: "13px",
                            color: "rgb(134, 82, 255)",
                          }}
                        />
                        <Box sx={{ color: "#A0A0A0", marginLeft: "3px" }}>
                          This section will only display your 5 most recent
                          products
                        </Box>
                      </Box>
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                      <Small
                        text={strings.SHOPALL}
                        color={Colors.footer_gray}
                        fontWeight={"600"}
                        padding={"0 2px 0 0"}
                        opacity={"0.64"}
                      />
                      <img alt="" src={forwordGray} />
                    </Box>
                  </Box>
                  <Grid container>
                    {productsList.length > 0 ? (
                      productsList.map((item, index) => {
                        return (
                          <Grid
                            container
                            item
                            xs={6}
                            sm={2.6}
                            lg={3}
                            key={item.id}
                            onClick={() => OpenProductDetails(item)}
                          >
                            <div className="abh-mh-s2-add-product-uploaded-box">
                              <img
                                alt=""
                                src={
                                  item?.featuredImage?.url
                                    ? item?.featuredImage?.url
                                    : noproduct
                                }
                                className="abh-mh-s2-apub-img"
                              />
                              <Small
                                text={item.vendor}
                                color={Colors.black1c}
                                fontWeight={"600"}
                                textTransform={"uppercase"}
                              />
                              <Heading6S
                                text={item.title}
                                color={Colors.black1c}
                                padding={"0 0px 0px 0"}
                                letterSpacing={"-0.02em"}
                                className="abh-mh-s2-pr-dtl-truncate"
                              />
                              <Heading6S
                                text={
                                  item.priceRangeV2.maxVariantPrice.amount.endsWith(
                                    ".0"
                                  )
                                    ? "$" +
                                      Math.round(
                                        item.priceRangeV2.maxVariantPrice.amount
                                      )
                                    : "$" +
                                      item.priceRangeV2.maxVariantPrice.amount
                                }
                                color={Colors.black1c}
                                padding={"0 0px 0px 0"}
                                letterSpacing={"-0.02em"}
                              />
                            </div>
                          </Grid>
                        );
                      })
                    ) : loaderState2 ? (
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          position: "absolute",
                          marginTop: "4%",
                        }}
                      >
                        <CircularProgress color="inherit" />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h3
                          style={{
                            padding: "auto",
                          }}
                        >
                          No Product Found
                        </h3>
                      </Box>
                    )}
                    <Grid item xs={6} sm={2.6} lg={2.6}>
                      <div className="abh-mh-s2-add-product-uploader">
                        <label
                          className="abh-mh-s2-add-product-upload"
                          onClick={() => setOpenProductPopup(true)}
                        >
                          <img alt="" src={addPlusBlackImg} />
                        </label>
                        <Heading6S
                          text={strings.addProduct}
                          padding={"20px 0 0px 0"}
                          letterSpacing={"-0.02em"}
                          margin={"0 0 0 4% !important"}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div className="abh-mh-sec3">
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    pb={"20px"}
                  >
                    <Heading3B
                      text={strings.curatedBrands}
                      color={Colors.black1c}
                      letterSpacing={"-0.02px"}
                      fontWeight={"500"}
                      padding={"0 0 0 0"}
                      opacity={"0.64"}
                    />
                    <Box display={"flex"} alignItems={"center"}>
                      <Small
                        text={strings.ShopBrands}
                        color={Colors.footer_gray}
                        opacity={"0.64"}
                        fontWeight={"600"}
                        padding={"0 2px 0 0"}
                      />
                      <img alt="" src={forwordGray} />
                    </Box>
                  </Box>
                  <Grid
                    container
                    // spacing={34}
                    // width="100%"
                    spacing={2}
                  >
                    {curatedBrands?.length > 0 ? (
                      curatedBrands?.slice(0, 4).map((item, index) => {
                        return (
                          <Grid
                            item
                            sm={3}
                            md={3}
                            lg={3}
                            key={"curatedBrands" + index}
                            // className="col-2width"
                          >
                            <div
                              className="curated-brands-logo-box"
                              style={{
                                padding: "0px !important",
                              }}
                            >
                              <Box
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                height="inherit"
                                width="100%"
                                // border="1px solid red"
                              >
                                <img
                                  alt=""
                                  src={
                                    item?.logo_url ? item?.logo_url : noproduct
                                  }
                                  // ref={(el) => (imgRefs.current[index] = el)}
                                  onError={(e) => {
                                    e.target.src = selectBrandPlaceholderImage;
                                    handleImageLoad(index);
                                  }}
                                  className="curated-brands-lb-logo"
                                />

                                {loaded[index] && (
                                  <Typography
                                    sx={{
                                      color: "white",
                                      fontSize: 22,

                                      fontWeight: "bold",
                                      position: "absolute",
                                    }}
                                  >
                                    {item?.vendor}
                                  </Typography>
                                )}
                              </Box>
                            </div>

                            {/* <div className="curated-brands-logo-box">
                              <img
                                alt=""
                                // src={curatedBrandslogo1}
                                src={item?.banner_url}
                                className="curated-brands-lb-logo"
                              />
                            </div> */}
                          </Grid>
                        );
                      })
                    ) : loaderState3 ? (
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          position: "absolute",
                          marginTop: "4%",
                        }}
                      >
                        {/* <Loaders /> */}
                        <CircularProgress color="inherit" />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h3
                          style={{
                            padding: "auto",
                          }}
                        >
                          No Brand Found
                        </h3>
                      </Box>
                    )}
                  </Grid>
                </div>
              </div>
              <div className="abh-footer">
                <div className="abh-f-top-holder">
                  <div className="abh-fth-left">
                    <Heading3B
                      text={strings.help_Support}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 20px 0px"}
                    />
                    <Heading4B
                      text={strings.shipping_Returns}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      // opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.internationalShipping}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      // opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.contact}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      // opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.terms_Conditiosn}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      // opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.privacyPolicy}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      // opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.FAQ}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      // opacity={"0.64"}
                    />
                  </div>
                  <div className="abh-fth-right" style={{ paddingTop: "4px" }}>
                    <Heading4B
                      text={strings.WeAreAlwaysHereToHelp}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                    <Heading4B
                      text={strings.contactUsAt}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                    <Heading4B
                      text={"support@pedlar.com and out"}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                    <Heading4B
                      text={strings.customerServiceTeamWillBeIn}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                    <Heading4B
                      text={strings.touch}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                  </div>
                </div>
                <div className="abh-f-bottom-holder">
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Box>
                      <Small
                        text={strings.PedlarPTYLTDPoweredByPedlar}
                        color={Colors.black}
                        letterSpacing={"0.4px"}
                        padding={"0 0px 0px 0px"}
                      />
                    </Box>
                    <Box>
                      <img
                        alt=""
                        src={fAmex}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fApplepay}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fMastercard}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fPaypal}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fShoppay}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fVisa}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                    </Box>
                  </Box>
                </div>
              </div>
            </div>
          }
        </div>
        <AllPopups
          popupIsOpen={popupOpen}
          style={popupType}
          closePopup={() => setPopupOpen(false)}
          popupData={(obj) => setPopupData(obj)}
          sendingData={sendingData}
        />

        {openProductPopup ? (
          <div className="popup-holder">
            <div className="ph-backdrop-box">
              <AddProductPopup
                closePopup={() => handleAddProductClose()}
                popupIsOpen={openProductPopup}
                openDetailPopup={(obj) => setOpenProductDetailPopup(obj)}
                reloadData={reloadData}
              />
            </div>
          </div>
        ) : null}
        {Object.keys(openProductDetailPopup).length !== 0 ? (
          <div className="popup-holder">
            <div className="ph-backdrop-box">
              <ProductDetailPopup
                closePopup={() => setOpenProductDetailPopup({})}
                popupIsOpen={Object.keys(openProductDetailPopup).length !== 0}
                itemData={openProductDetailPopup}
                sucessPopup={(obj) => setSucessPopup(obj)}
                CloseAddProductsPopup={() => handleAddProductClose()}
              />
            </div>
          </div>
        ) : null}

        {removeProductPopup ? (
          <div className="popup-holder">
            <div className="ph-backdrop-box">
              <RemoveProductPopup
                closePopup={() => setRemoveProductPopup(false)}
                popupIsOpen={removeProductPopup}
                removeResponse={(obj) => setRemoveResponse(obj)}
              />
            </div>
          </div>
        ) : null}
        {showMsg ? <span className="product-added">{showMsg}</span> : null}
        {apiResponseError?.length > 2 ? (
          <span className="product-add-error-box">{apiResponseError}</span>
        ) : null}
      </div>

      {/* mobile view  */}

      <div
        className="main-mid-holder mobile-view-marge"
        onClick={() => setIsOpen(true)}
      >
        <Sidebar />
        {
          <div
            className="mid-content-holder"
            style={{ padding: "0px 12px 12px 12px" }}
          >
            <div className="add-banner-holder">
              {Object.keys(userData).length > 0 ? (
                <div data-tut="reactour__stab_mobile">
                  <div className="abh-header">
                    <Box display={"flex"} alignItems={"center"}>
                      <img src={pedlarLogo} className="logo-img" alt="" />
                      <Heading3B
                        text={userData ? userData.storefrontName : ""}
                        color={Colors.black1c}
                        letterSpacing={"-0.02em"}
                        cursor={"pointer"}
                        padding={"0 0 0 6px"}
                        fontWeight={"400"}
                      />
                    </Box>
                    <img alt="" src={cartBlack} className="icon24" />
                  </div>
                  <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                  >
                    <Drawer
                      variant="temporary"
                      open={mobileOpenCategory}
                      onClose={handleDrawerToggleCategory}
                      ModalProps={{
                        keepMounted: true,
                      }}
                      sx={{
                        display: { sx: "none" },
                        "& .MuiDrawer-paper": {
                          boxSizing: "border-box",
                          width: "100%",
                          maxWidth: "331px",
                          position: "relative",
                        },
                      }}
                    >
                      <img
                        alt=""
                        src={ModalClose}
                        className="close-drawe-icon"
                        aria-label="close drawer"
                        edge="end"
                        onClick={handleDrawerToggleCategory}
                      />
                      <div
                        className="sidebar-toggle"
                        style={{ margin: "30px 0px 0px 0px", display: "block" }}
                      >
                        <div className="sidebar-list active">
                          <Heading6S
                            text={strings.brands}
                            color={Colors.black1c}
                            padding={"0 0 0px 16px"}
                            letterSpacing={"-0.02em"}
                          />
                        </div>
                        <div className="sidebar-list">
                          <Heading6S
                            text={strings.shop}
                            color={Colors.black1c}
                            padding={"0 0 0px 16px"}
                            letterSpacing={"-0.02em"}
                          />
                        </div>
                      </div>
                    </Drawer>
                  </Box>
                  <div className="abh-mid-holder">
                    <div className="abh-mh-sec1">
                      <div className="abh-mh-s1-left">
                        <div
                          className="abh-ms1l-banner-holder"
                          onClick={toggleDrawerChooseBenner(true)}
                        >
                          {bannerImage !== "" && (
                            <div
                              className="abh-ms1l-bh-upload-image-mobile"
                              style={{
                                height: "100%",
                                width: "100%",
                              }}
                            >
                              <CardMedia
                                component="img"
                                image={
                                  bannerImage ? bannerImage : Bannerplaceholder
                                }
                                style={{
                                  minHeight: "100%",

                                  minWidth: "100%",
                                  maxWidth: "100%",
                                  objectFit: "fill",
                                }}
                              ></CardMedia>
                              <Box
                                sx={{
                                  position: "absolute",

                                  top: "2%",
                                  left: "84%",
                                  cursor: "pointer",
                                  zIndex: "1",
                                }}
                                onClick={toggleDrawerChooseBenner(true)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="40"
                                  height="40"
                                  viewBox="0 0 40 40"
                                  fill="none"
                                >
                                  <rect
                                    width="40"
                                    height="40"
                                    rx="20"
                                    fill="#8652FF"
                                    // fill-opacity="0.8"
                                    fillOpacity={"0.8"}
                                  />
                                  <path
                                    d="M33.3332 21.666H21.6665V33.3327H18.3332V21.666H6.6665V18.3327H18.3332V6.66602H21.6665V18.3327H33.3332V21.666Z"
                                    fill="white"
                                  />
                                </svg>
                              </Box>
                            </div>
                          )}

                          {bannerImage === "" && (
                            <div
                              className="abh-ms1l-bh-upload-image"
                              style={{
                                height: "100%",
                                width: "100%",
                              }}
                            >
                              <img
                                alt=""
                                src={Bannerplaceholder}
                                style={{
                                  minHeight: "100%",
                                  objectFit: "cover ",
                                  minWidth: "100%",
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className="abh-mh-s1-right"
                        style={{
                          width: "92%",
                          margin: "auto",
                          backgroundColor: "white",
                          zIndex: "11",
                          marginTop: "-10vh",
                          // borderRadius: "10px"
                        }}
                      >
                        <div
                          className="abh-ms1l-content-holder"
                          style={{
                            // marginTop: "-28%"
                            width: "92%",
                            margin: "auto",
                          }}
                        >
                          <Box
                            sx={{
                              border: "1px solid #D3D3D3",
                              padding: "1rem",
                              width: "auto",
                              borderRadius: "10px",
                              cursor: "pointer",
                              // marginTop: "-9% !important",
                              // borderTop: "0px",
                              backgroundColor: "white",
                            }}
                            onClick={toggleOpenDiscription(true)}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                cursor: "pointer",
                                color: "rgba(134, 82, 255, 0.8)",
                              }}
                              onClick={toggleOpenDiscription(true)}
                            >
                              <Box>
                                <ModeEditOutlineOutlinedIcon
                                  sx={{ width: "14px", marginRight: "3px" }}
                                />
                              </Box>
                              <Box
                                sx={{
                                  fontWeight: "550",
                                  fontSize: "12px",
                                  marginTop: "-2px",
                                }}
                              >
                                EDIT
                              </Box>
                            </Box>
                            <Box
                              className=""
                              // display={"flex"}
                              alignItems={"center"}
                              pb={"8px"}
                            >
                              {shortDescription?.length > 0 ? (
                                shortDescription?.map((item) => {
                                  return (
                                    <>
                                      <Heading6S
                                        text={item}
                                        color={Colors.black1c}
                                      />
                                      <br></br>
                                    </>
                                  );
                                })
                              ) : (
                                <Heading6S
                                  text={
                                    description?.length > 0
                                      ? description
                                      : "Welcome to my Pedlar Store! Here is a collection of my favourite products from my favourite brands. Have a browse and enjoy."
                                  }
                                  color={Colors.black1c}
                                  letterSpacing={"-0.02em"}
                                  padding={"0 0px 0 0px"}
                                  className="descriptionBreakWord2"
                                />
                              )}
                            </Box>
                          </Box>
                          <Box
                            mt={1.2}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box pr={1}>
                              <img
                                alt=""
                                src={instaIcon}
                                width="16"
                                height="16"
                              />
                            </Box>
                            <Grid
                              container
                              sx={{
                                border: "1px solid #D3D3D3",
                                padding: "10px",
                                cursor: "pointer",
                                borderRadius: "10px",
                                marginTop: "10px",
                              }}
                              onClick={toggleDrawer(true)}
                            >
                              <Grid
                                item
                                xs={9}
                                sx={{
                                  wordBreak: "break-all",
                                }}
                              >
                                <Heading5B
                                  text={
                                    // instagramLink?.split("@")[1]?.length === 0
                                    instagramLink
                                      ? instagramLink?.split("@")[1] ||
                                        "Add Instagram"
                                      : "Add Instagram"
                                  }
                                  color={Colors.black1c}
                                  letterSpacing={"-0.02em"}
                                  cursor={"pointer"}
                                />
                              </Grid>
                              {/* <Grid item xs={2}></Grid> */}
                              <Grid item xs={3}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    color: "rgba(134, 82, 255, 0.8)",
                                  }}
                                  onClick={toggleDrawer(true)}
                                >
                                  <Box>
                                    <ModeEditOutlineOutlinedIcon
                                      sx={{ width: "14px", marginRight: "3px" }}
                                    />
                                  </Box>
                                  <Box
                                    sx={{
                                      fontWeight: "550",
                                      fontSize: "12px",
                                      marginTop: "-2px",
                                    }}
                                  >
                                    EDIT
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box
                            mt={1.2}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box pr={1}>
                              <img
                                alt=""
                                src={tiktokIcon}
                                width="16"
                                height="16"
                              />
                            </Box>
                            <Grid
                              container
                              sx={{
                                border: "1px solid #D3D3D3",
                                padding: "10px",
                                cursor: "pointer",
                                borderRadius: "10px",
                                marginTop: "10px",
                              }}
                              onClick={toggleDrawer(true)}
                            >
                              <Grid
                                item
                                xs={9}
                                sx={{
                                  wordBreak: "break-all",
                                }}
                              >
                                <Heading5B
                                  text={
                                    // tiktokLink?.split("@")[1].length === 0
                                    tiktokLink
                                      ? tiktokLink?.split("@")[1] ||
                                        "Add Tiktok"
                                      : "Add Tiktok"
                                  }
                                  color={Colors.black1c}
                                  letterSpacing={"-0.02em"}
                                  // padding={"0 0px 0 8px"}
                                />
                              </Grid>
                              {/* <Grid item xs={2}></Grid> */}
                              <Grid item xs={3}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    color: "rgba(134, 82, 255, 0.8)",
                                  }}
                                  onClick={toggleDrawer(true)}
                                >
                                  <Box>
                                    <ModeEditOutlineOutlinedIcon
                                      sx={{ width: "14px", marginRight: "3px" }}
                                    />
                                  </Box>
                                  <Box
                                    sx={{
                                      fontWeight: "550",
                                      fontSize: "12px",
                                      marginTop: "-2px",
                                    }}
                                  >
                                    EDIT
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                          <Box
                            className=""
                            display={"flex"}
                            alignItems={"center"}
                            pb={"8px"}
                          ></Box>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Box
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    borderBottom: "1px solid  #dddddd ",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      height: "76vh",
                      backgroundColor: "#FFFFF7",
                    }}
                  ></Box>
                </Box>
              )}
              <div className="abh-mid-holder">
                <div className="abh-mh-sec2">
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    // alignItems={"flex-start"}
                    justifyContent={"space-between"}
                    pb={"10px"}
                  >
                    <Box>
                      <Heading3B
                        text={strings.NewAdditions}
                        color={Colors.black1c}
                        letterSpacing={"-0.02px"}
                        fontWeight={"500"}
                        padding={"0 0 0 0"}
                        opacity={"0.64"}
                      />
                    </Box>
                    <Box display={"flex"} alignItems={"center"} pt={"8px"}>
                      <Small
                        text={strings.SHOPALL}
                        color={Colors.footer_gray}
                        opacity={"0.64"}
                        fontWeight={"600"}
                        padding={"0 2px 0 0"}
                      />
                      <img alt="" src={forwordGray} />
                    </Box>
                  </Box>
                  <Box display={"flex"} marginTop={"5px"} mb={2}>
                    <ErrorOutlinedIcon
                      style={{
                        width: "13px",
                        color: "rgb(134, 82, 255)",
                        marginTop: "-3px",
                      }}
                    />
                    <Box
                      sx={{
                        color: "#A0A0A0",
                        marginLeft: "3px",
                        fontSize: "small",
                      }}
                    >
                      This section will only display your 5 most recent products
                    </Box>
                  </Box>
                  <Grid container columnSpacing={2}>
                    {productsList.length > 0 ? (
                      productsList.map((item) => {
                        return (
                          <Grid item xs={6} sm={3} lg={3} key={item.id}>
                            <div className="abh-mh-s2-add-product-uploaded-box">
                              <img
                                alt=""
                                src={
                                  item?.featuredImage?.url
                                    ? item?.featuredImage?.url
                                    : noproduct
                                }
                                className="abh-mh-s2-apub-img"
                                onClick={() =>
                                  handleProductDetailclick(item.id, true)
                                }
                              />
                              <Small
                                text={item.vendor}
                                color={Colors.black1c}
                                fontWeight={"600"}
                                textTransform={"uppercase"}
                              />
                              <Heading6S
                                text={item.title}
                                color={Colors.black1c}
                                padding={"0 0px 0px 0"}
                                letterSpacing={"-0.02em"}
                                className="abh-mh-s2-pr-dtl-truncate"
                              />
                              <Heading6S
                                text={
                                  item.priceRangeV2.maxVariantPrice.amount.endsWith(
                                    ".0"
                                  )
                                    ? "$" +
                                      Math.round(
                                        item.priceRangeV2.maxVariantPrice.amount
                                      )
                                    : "$" +
                                      item.priceRangeV2.maxVariantPrice.amount
                                }
                                color={Colors.black1c}
                                padding={"0 0px 0px 0"}
                                letterSpacing={"-0.02em"}
                              />
                            </div>
                          </Grid>
                        );
                      })
                    ) : loaderState2 ? (
                      <Box className="product-detail-parent">
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          // height={"100vh"}
                          // width={"100vw"}
                          position={"absolute"}
                        >
                          <Loaders />
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h3
                          style={{
                            padding: "auto",
                          }}
                        >
                          No Product Found
                        </h3>
                      </Box>
                    )}
                    <Grid item xs={6} sm={3} lg={3}>
                      <div className="abh-mh-s2-add-product-uploader">
                        <label
                          className="abh-mh-s2-add-product-upload"
                          onClick={() =>
                            redirectAddProduct(
                              "/storefront",
                              "/add-product-list"
                            )
                          }
                        >
                          <img alt="" src={addPlusBlackImg} />
                        </label>
                        <Heading6S
                          text={strings.addProduct}
                          padding={"8px 0 0px 0"}
                          letterSpacing={"-0.02em"}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div className="abh-mh-sec3">
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    // alignItems={"flex-start"}
                    justifyContent={"space-between"}
                    pb={"20px"}
                  >
                    <Box>
                      <Heading3B
                        text={strings.curatedBrands}
                        color={Colors.black1c}
                        letterSpacing={"-0.02px"}
                        fontWeight={"500"}
                        padding={"0 0 8px 0"}
                        opacity={"0.64"}
                      />
                    </Box>
                    <Box display={"flex"} alignItems={"center"}>
                      <Small
                        text={strings.ShopBrands}
                        color={Colors.footer_gray}
                        opacity={"0.64"}
                        fontWeight={"600"}
                        padding={"0 2px 0 0"}
                      />
                      <img alt="" src={forwordGray} />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      marginRight: {
                        xs: "-5% !important",
                        sm: "-5% !important",
                        md: "0px  !important",
                      },
                    }}
                  >
                    <Grid
                      container
                      spacing={1}
                      classes={{
                        root: muiClasses.root,
                      }}
                    >
                      {curatedBrands?.length > 0 ? (
                        curatedBrands?.slice(0, 4).map((item, index) => {
                          return (
                            <Grid
                              container
                              item
                              xs={5.6}
                              sm={2.8}
                              className="curated-brands-logo-box"
                              key={"curated+" + index}
                              width="100%"
                              sx={{
                                marginBottom: "5px !important",
                              }}
                            >
                              <Box
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                height="inherit"
                                width="100%"
                              >
                                <img
                                  alt=""
                                  // src={curatedBrandslogo5}
                                  src={
                                    item?.logo_url ? item?.logo_url : noproduct
                                  }
                                  ref={(el) => (imgRefs.current[index] = el)}
                                  onError={(e) => {
                                    e.target.src = selectBrandPlaceholderImage;
                                    handleImageLoad(index);
                                  }}
                                  className="curated-brands-lb-logo"
                                />

                                {loaded[index] && (
                                  <Typography
                                    sx={{
                                      color: "white",
                                      fontSize: 15,
                                      fontWeight: "bold",
                                      position: "absolute",
                                    }}
                                  >
                                    {item?.vendor}
                                  </Typography>
                                )}
                              </Box>
                            </Grid>
                          );
                        })
                      ) : loaderState3 ? (
                        <Box className="product-detail-parent">
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            // height={"100vh"}
                            // width={"100vw"}
                            position={"absolute"}
                          >
                            <Loaders />
                          </Box>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <h3
                            style={{
                              padding: "auto",
                            }}
                          >
                            No Brand Found
                          </h3>
                        </Box>
                      )}
                    </Grid>
                  </Box>
                </div>
              </div>
              <div className="abh-footer">
                <div className="abh-f-top-holder">
                  <div className="abh-fth-left">
                    <Heading3B
                      text={strings.help_Support}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 20px 0px"}
                    />
                    <Heading4B
                      text={strings.shipping_Returns}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.internationalShipping}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.contact}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.terms_Conditiosn}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.privacyPolicy}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                    <Heading4B
                      text={strings.FAQ}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 8px 0px"}
                      opacity={"0.64"}
                    />
                  </div>
                  <div className="abh-fth-right" style={{ paddingTop: "4px" }}>
                    <Heading4B
                      text={strings.WeAreAlwaysHereToHelp}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                    <Heading4B
                      text={strings.contactUsAt}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                    <Heading4B
                      text={"support@pedlar.com and out"}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                    <Heading4B
                      text={strings.customerServiceTeamWillBeIn}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                    <Heading4B
                      text={strings.touch}
                      color={Colors.footer_gray}
                      letterSpacing={"-0.02em"}
                      padding={"0 0px 0px 0px"}
                    />
                  </div>
                </div>
                <div className="abh-f-bottom-holder">
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Box pb={"20px"}>
                      <Small
                        text={strings.PedlarPTYLTDPoweredByPedlar}
                        color={Colors.black}
                        letterSpacing={"0.4px"}
                        padding={"0 0px 0px 0px"}
                      />
                    </Box>
                    <Box>
                      <img
                        alt=""
                        src={fAmex}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fApplepay}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fMastercard}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fPaypal}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fShoppay}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                      <img
                        alt=""
                        src={fVisa}
                        className="abh-f-social-icon"
                        style={{ cursor: "default" }}
                      />
                    </Box>
                  </Box>
                </div>
              </div>
            </div>
            <Box
              className="share-store-position"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-start"}
              onClick={toggleDrawerShareStore(true)}
              sx={{
                zIndex: "112",
              }}
            >
              <img
                src={shareIcon}
                alt=""
                style={{
                  position: "absolute",
                  marginLeft: "10px",
                  marginTop: "2px",
                  cursor: "pointer",
                }}
              ></img>

              <ShareLarge
                width={"184px"}
                text={strings.shareMyStore}
                margin={"0 0 0px 0"}
              />
            </Box>
          </div>
        }
        <SwipeableDrawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          disableSwipeToOpen={true}
          ModalProps={{
            keepMounted: true,
          }}
          classes={{
            paper: muiClasses.borderRadius,
          }}
        >
          <Box className="drawer-bottom">
            <Heading6S
              text={strings.SocialLinks}
              color={Colors.black1c}
              padding={"0 0 30px 0"}
              fontWeight={"600"}
              textAlign={"center"}
            />
            <Box className="form-group">
              <TextField
                onChange={(e) => setInstagramLinkTemp(e.target.value)}
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
                placeholder={"Enter Here"}
                value={instagramLinkTemp}
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
              {instagramLinkTempErr !== "" ? (
                <LabelInput
                  className="ipnputlabel"
                  color={Colors.error}
                  // text={strings.invalidAInstaLink}
                  text={instagramLinkTempErr}
                ></LabelInput>
              ) : null}
            </Box>
            <Box className="form-group">
              <TextField
                onChange={(e) => setTiktokLinkTemp(e.target.value)}
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
                placeholder={"Enter Here"}
                value={tiktokLinkTemp}
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
              {tiktokLinkTempErr !== "" ? (
                <LabelInput
                  className="ipnputlabel"
                  color={Colors.error}
                  text={tiktokLinkTempErr}
                ></LabelInput>
              ) : null}
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              pt={"160px"}
            >
              <ReactiveButton
                buttonState={state}
                rounded
                size="large"
                color="#000"
                onClick={() => socialLinkSubmitHandler()}
                disabled={
                  instagramLinkTempErr.trim() !== "" ||
                  tiktokLinkTempErr.trim() !== ""
                    ? true
                    : false
                }
                idleText={strings.save}
                width={"100%"}
                loadingText={<ButtonLoader />}
              />
            </Box>
          </Box>
        </SwipeableDrawer>

        <SwipeableDrawer
          anchor="bottom"
          open={openDiscription}
          onClose={toggleOpenDiscription(false)}
          onOpen={toggleOpenDiscription(true)}
          disableSwipeToOpen={true}
          ModalProps={{
            keepMounted: true,
          }}
          classes={{
            paper: muiClasses.borderRadius,
          }}
        >
          <Box className="drawer-bottom">
            <Heading5B
              text={strings.storeDescription}
              color={Colors.black1c}
              padding={"0 0 24px 0"}
              fontWeight={"600"}
              textAlign={"center"}
              fontSize={"16px"}
            />
            <Box className="form-group">
              <TextareaAutosize
                className={
                  "textarea-textable discription " +
                  (onDescriptionFieldClicked ? "borderofDescription " : "")
                }
                id="descriptionTextArea"
                aria-label="empty textarea"
                placeholder="Enter Description"
                defaultValue={descriptionTemp}
                maxLength={350}
                maxRows={3}
                minRows={3}
                onClick={changeTextAreaState}
                onChange={(e) => setdescriptionLengthState(e.target.value)}
              />
              <label className="description-label">Description</label>
              <Small
                text={descriptionLengthState?.length + "/350 characters"}
                className="caractor-right-align"
              />
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              pt={"40px"}
            >
              <ReactiveButton
                buttonState={state}
                rounded
                size="large"
                color="#000"
                margin={"0 0 14px 0"}
                onClick={() => saveDescription()}
                // disabled={descriptionTemp === "" ? true : false}
                idleText={strings.save}
                width={"100%"}
                loadingText={<ButtonLoader />}
              />
            </Box>
          </Box>
        </SwipeableDrawer>

        <SwipeableDrawer
          anchor="bottom"
          open={openChooseBenner}
          onClose={toggleDrawerChooseBenner(false)}
          onOpen={toggleDrawerChooseBenner(true)}
          disableSwipeToOpen={true}
          ModalProps={{
            keepMounted: true,
            BackdropProps: {
              classes: {
                root: {
                  backgroundColor: "transparent",
                  opacity: 1,
                  transform: "translate(0px 0px)",
                },
              },
            },
          }}
          classes={{
            paper: muiClasses.borderRadius,
          }}
        >
          <Box
            className="drawer-bottom"
            sx={{
              overflowY: "hidden",
            }}
          >
            <Heading6S
              text={strings.chooseBanner}
              textAlign={"center"}
              color={Colors.black1c}
              padding={"0 0 26px 0"}
              letterSpacing={"-0.02em"}
            />
            <Box pb={2}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Upload Image" {...a11yProps(0)} />
                <Tab id="instagramTabID" label="Instagram" {...a11yProps(1)} />
              </Tabs>
            </Box>

            <Box>
              <TabPanel value={value} index={0}>
                <div
                  className=""
                  style={{ backgroundColor: src ? "#E5E5E5" : "" }}
                >
                  <div className="upload-banner-popup-box">
                    {src ? (
                      <>
                        <label
                          className="abh-ms1l-bh-upload-image"
                          style={{ height: "246px" }}
                        >
                          <Box
                            className="drawer-bottom"
                            onTouchStart={(e) => e.stopPropagation()}
                          >
                            <ReactCrop
                              key={src}
                              src={src}
                              onImageLoaded={onImageLoaded}
                              onChange={(event) => onCropChange(event)}
                              aspectRatio={4 / 5}
                              keepSelection={true}
                              crop={crop}
                              style={{
                                objectFit: "contain",
                              }}
                            ></ReactCrop>
                          </Box>
                        </label>
                        {fileErr !== "" ? (
                          <LabelInput
                            className="ipnputlabel  "
                            color={Colors.error}
                            text={fileErr}
                          ></LabelInput>
                        ) : null}

                        <label className="abh-ms1l-bh-upload-image">
                          <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              selectImage(e.target.files[0]);

                              setimageType(
                                e.target.files[0].type.toLocaleLowerCase()
                              );
                              setimageSize(e.target.files[0].size);
                            }}
                          />

                          <div
                            className="banner-preview-banner-mobile"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "101%",
                            }}
                          >
                            <div className="delete-banner">
                              <div
                                style={{ width: "20px", marginRight: "15px" }}
                              >
                                <DeleteIcon />
                              </div>
                              <div className="replaceBannerButton">
                                Replace banner
                              </div>
                            </div>
                          </div>
                        </label>
                      </>
                    ) : (
                      <label
                        className="abh-ms1l-bh-upload-image"
                        style={{ marginTop: "5rem" }}
                      >
                        <img
                          alt=""
                          src={addBGBlackIcon}
                          className="addbg-icon"
                        />
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
                          onChange={(e) => {
                            selectImage(e.target.files[0]);

                            setimageType(
                              e.target.files[0].type.toLocaleLowerCase()
                            );
                            setimageSize(e.target.files[0].size);
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                {instagramPostsData.length > 0 &&
                selectedInstagramImageUrl?.length === 0 &&
                selectedInstagramImageUrlFinal?.length === 0 ? (
                  <>
                    <Small
                      text={strings.ChooseAnImage}
                      color={Colors.black}
                      letterSpacing={"0.4px"}
                      margin={"10px 0 16px 0"}
                      fontWeight={"500"}
                      fontSize={"14px"}
                    />

                    <div style={{ height: "334px", overflowY: "auto" }}>
                      <ImageList
                        sx={{ width: "100%", marginTop: "0px" }}
                        cols={3}
                        rowHeight={110}
                      >
                        {instagramPostsData.map((item) => (
                          <ImageListItem key={item?.id}>
                            <img
                              src={item?.media_url}
                              alt={"pedlar images"}
                              loading="lazy"
                              onLoad={() =>
                                setShowLoaderUntilInstagramPosts(false)
                              }
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
                    <div
                      style={{ backgroundColor: "#d3d3d3", height: "239px" }}
                    >
                      <img
                        src={selectedInstagramImageUrl}
                        width={"100%"}
                        height={"100%"}
                        style={{ objectFit: "contain" }}
                        alt="pedlar"
                      ></img>
                    </div>
                    <Box
                      mt={"10px"}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "10px",
                      }}
                    >
                      <CancelLarge
                        rounded
                        width={"100%"}
                        background={"#000"}
                        text={strings.useThisImage}
                        onClick={() =>
                          setSelectedInstagramImageUrlFinal(
                            selectedInstagramImageUrl
                          )
                        }
                        height={"44px"}
                        color="white"
                      />
                      <CancelLarge
                        fontSize={"13px"}
                        rounded
                        background={"#F9F6F266"}
                        width={"100%"}
                        text={strings.useAnother}
                        margin={"0 0 0px 0"}
                        onClick={() => setSelectedInstagramImageUrl("")}
                      />
                    </Box>
                  </>
                ) : selectedInstagramImageUrlFinal?.length > 0 ? (
                  <Box
                    sx={{
                      height: 250,
                      backgroundColor: selectedInstagramImageUrlFinal
                        ? "#E5E5E5"
                        : "",
                    }}
                    onTouchStart={(e) => e.stopPropagation()}
                  >
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
                          crop={crop}
                        ></ReactCrop>
                      </label>
                    </div>
                  </Box>
                ) : instagramPostsData?.length === 0 &&
                  instagramAllowPermissionCode?.length === 0 ? (
                  <div
                    className="insta-upload-img-popupholder"
                    style={{ paddingTop: "5rem" }}
                  >
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
                      style={{ cursor: "pointer" }}
                      onClick={handleInstagramClickEvent}
                    >
                      <InstagramIcon sx={{ color: "white" }} />
                      <Heading6S
                        text={strings.ContinueWithInstagram}
                        color={Colors.grayf9}
                        letterSpacing={"-0.02em"}
                        padding={"0 0px 0px 12px"}
                      />
                    </button>
                  </div>
                ) : (
                  showLoaderUntilInstagramPosts && (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "377px",
                      }}
                    >
                      <CircularProgress size={50} color="inherit" />
                    </Box>
                  )
                )}
              </TabPanel>
            </Box>
            {value === 0 ? (
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-end"}
                mt={src ? "65px" : ""}
              >
                <ReactiveButton
                  buttonState={state}
                  rounded
                  size="large"
                  color="#000"
                  margin={"50px 0 14px 0"}
                  onClick={() => cropImageNow()}
                  disabled={
                    fileErr?.length === 0 && src?.length > 0 ? false : true
                  }
                  idleText={strings.save}
                  width={"100%"}
                  loadingText={<ButtonLoader />}
                />
              </Box>
            ) : instagramAllowPermissionCode?.length === 0 ? (
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-end"}
                mt={src ? "65px" : ""}
              >
                <ReactiveButton
                  buttonState={state}
                  rounded
                  size="large"
                  color="#000"
                  margin={"50px 0 14px 0"}
                  disabled={true}
                  idleText={strings.save}
                  width={"100%"}
                  loadingText={<ButtonLoader />}
                />
              </Box>
            ) : instagramAllowPermissionCode?.length > 1 &&
              selectedInstagramImageUrlFinal.length > 1 ? (
              <>
                <div className="banner-preview-banner">
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
                    <div style={{ width: "20px", marginRight: "15px" }}>
                      <DeleteIcon />
                    </div>
                    <div className="replaceBannerButton">Replace banner</div>
                  </div>
                </div>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-end"}
                  mt={"47px"}
                >
                  <ReactiveButton
                    buttonState={state}
                    rounded
                    size="large"
                    color="#000"
                    margin={"50px 0 14px 0"}
                    onClick={() => cropImageNow2()}
                    idleText={strings.done}
                    width={"100%"}
                    loadingText={<ButtonLoader />}
                  />
                </Box>
              </>
            ) : null}
          </Box>
        </SwipeableDrawer>

        <SwipeableDrawer
          anchor="bottom"
          open={openTour}
          onClose={toggleDrawerTour(false)}
          onOpen={toggleDrawerTour(true)}
          disableSwipeToOpen={true}
        >
          <Box className="drawer-bottom">
            <Box
              className="popupdefaultimgbox"
              style={{
                position: "relative",
                margin: "-30px -24px 0px -24px",
              }}
            >
              <img
                alt=""
                src={welcomeToIedlarImg}
                className="popupdefaultimg"
              />
            </Box>
            <Box pt={"8px"}>
              <Heading3B
                text={strings.welcomeToPedlar}
                color={Colors.black1c}
                padding={"0 0 16px 0"}
                letterSpacing={"-0.02em"}
              />
              <Heading4B
                text={strings.heyThereCongratulationsOnJoiningPedlar}
                opacity={"0.64"}
                color={Colors.black1c}
                padding={"0 0 24px 0"}
                letterSpacing={"-0.02em"}
              />
            </Box>
            <Box
              display={"block"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              pt={"70px"}
            >
              <PrimaryLarge
                width={"100%"}
                text={strings.takeTour}
                margin={"0 0 6px 0"}
              />
              <CancelLarge
                width={"100%"}
                text={strings.skip}
                margin={"0 0 16px 0"}
              />
            </Box>
          </Box>
        </SwipeableDrawer>
        <SwipeableDrawer
          anchor="bottom"
          open={openShareStore}
          onClose={toggleDrawerShareStore(false)}
          onOpen={toggleDrawerShareStore(true)}
          disableSwipeToOpen={true}
          ModalProps={{
            keepMounted: true,
          }}
          classes={{
            paper: muiClasses.borderRadius,
          }}
        >
          <Box className="drawer-bottom">
            <Box>
              <Heading6S
                text={strings.shareYourStore}
                color={"#454545"}
                padding={"0 0 4px 0"}
                letterSpacing={"-0.02em"}
                textAlign={"center"}
              />
              <Heading4B
                text={
                  strings.shareYourStoreURLAcrossYourSocialsLinkInBioStoriesVideosAndPictures
                }
                color={Colors.black1c}
                padding={"0 0 8px 0"}
                letterSpacing={"-0.02em"}
                opacity={"0.60"}
                textAlign={"center"}
              />
            </Box>
            <Box>
              <Box className="share-box-orange">
                <Box>
                  <Small
                    fontWeight={"400"}
                    text={strings.shareLink}
                    color={"#666666"}
                    padding={"0 0 2px 0"}
                    letterSpacing={"-0.01em"}
                  />
                  <Heading5B
                    text={"pedlar.store/" + user.uid}
                    color={"#262626"}
                    padding={"0 0 0px 0"}
                    letterSpacing={"-0.02em"}
                  />
                </Box>
                <img
                  src={copyIconBlack}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={handleCopyText}
                />
              </Box>

              <span> {copymsg} </span>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
              mt={"80px"}
            >
              <PrimaryLarge
                width={"100%"}
                text={strings.cancel}
                margin={"0 0 14px 0"}
                onClick={toggleDrawerShareStore(false)}
              />
            </Box>
          </Box>
        </SwipeableDrawer>
        {showMsg ? (
          <span
            className="product-added"
            style={{ marginBottom: "70px", zIndex: "2222" }}
          >
            {showMsg}
          </span>
        ) : null}
        {apiResponseError?.length > 2 ? (
          <span className="product-add-error-box">{apiResponseError}</span>
        ) : null}
      </div>
    </>
  );
};

export default AddBanner;
