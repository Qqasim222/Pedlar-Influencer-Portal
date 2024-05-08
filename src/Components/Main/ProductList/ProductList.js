import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryLarge } from "../../../assets/styles/Buttons";
import { Body, Small } from "../../../assets/styles/Labels";
import * as Colors from "../../../assets/styles/Colors";
import "./ProductList.scss";
import AddProductPopup from "../../../Popups/Childs/AddProductPopup/AddProductPopup";
import ProductDetailPopup from "../../../Popups/Childs/ProductDetailPopup/ProductDetailPopup";
import RemoveProductPopup from "../../../Popups/Childs/RemoveProductPopup/RemoveProductPopup";
import Sidebar from "../../../Components/Layout/Sidebar/Sidebar";
import noproduct from "../../../assets/images/product/noproduct.png";
import threeDotGray from "../../../assets/images/structure/three-dot-gray.svg";
import blackBgAdd from "../../../assets/images/structure/black-bg-add.svg";
import services from "../../../services/index";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  currentReloadData,
  setAddProductValueChange,
} from "../../../redux/reducers/addProductValueChange";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";

import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CentralLoader from "../../../GlobalModule/CentralLoader";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogContent from "@mui/material/DialogContent";
import { makeStyles } from "@mui/styles";

import { async } from "@firebase/util";
import { height } from "@mui/system";
const strings = require("../../../localisation_en.json");

const ProductList = (props) => {
  const [user] = useAuthState(auth);
  const currentReloadDataVar = useSelector(currentReloadData);
  const dispatch = useDispatch();
  const [openProductPopup, setOpenProductPopup] = useState(false);
  const [openProductDetailPopup, setOpenProductDetailPopup] = useState({});
  const [productsList, setProductsList] = useState([]);
  const [sucessPopup, setSucessPopup] = useState(false);

  const [removeProductPopup, setRemoveProductPopup] = useState(false);
  const [removeProductId, setRemoveProductId] = useState("");
  const [removeResponse, setRemoveResponse] = useState("");
  /* eslint-disable no-unused-vars */
  const [reloadData, setReloadData] = useState(false);
  const [showMsg, setShowMsg] = useState("");
  const [productDetailPageData, setProductDetailPageData] = useState({});
  const [detailProductId, setDetailProductId] = useState("");
  const [paginationData, setpaginationData] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  // const [totalInventoryProducts, setTotalInventoryProducts] = useState([]);
  const [paginationCount, setPaginationCount] = useState();
  const [apiResponseError, setApiResponseError] = useState("");
  const [productCount, setProductCount] = useState();

  // const [loader, setLoader] = useState(false);

  const useStyles = makeStyles({
    backdrop: {
      backgroundColor: "transparent",
    },
    boxShadow: {
      borderRadius: "20px !important",
      width: "75%",
      backgroundColor: "#F9F6F2 !important",
      boxShadow:
        "0px 0px 1px rgb(0 0 0 / 0%), 0px 1px 3px 1px rgb(0 0 0 / 1%) !important ",
    },
    contentRoot: {
      padding: "0px 0px 0px 0px",
    },
    TypographyRoot: {
      fontSize: "18px",
      lineHeight: "24px",
      marginTop: "10px",
    },
  });
  const classes = useStyles();

  /* eslint-enable no-unused-vars */
  const navigate = useNavigate();
  useEffect(() => {
    getallproduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   getallproduct();
  // }, [openProductPopup]);

  function isFloat(value) {
    if (
      typeof value === "number" &&
      !Number.isNaN(value) &&
      !Number.isInteger(value)
    ) {
      return true;
    }

    return false;
  }

  const checkCountValue = (response) => {
    // let countValue = Object.keys(response).length / 25;
    let countValue = response / 25;

    if (isFloat(countValue)) {
      countValue = Math.trunc(countValue);
      countValue++;

      setPaginationCount(countValue);
    }
    if (!isFloat(countValue)) {
      setPaginationCount(countValue);
    }
  };

  useEffect(() => {
    if (removeResponse === "yes") {
      (async () => {
        setProductsList([]);

        let productId = removeProductId?.split("/") || "";
        productId = parseInt(productId[productId.length - 1]);
        await services.product
          .DELETE_PRODUCT_FROM_STORE(user.accessToken, {
            productId: productId,
          })
          .then(() => {
            setRemoveProductId("");
            setRemoveProductPopup(false);
            //get products if the user delete the products on clicking the 3 dots option button
            localStorage.setItem("sucessMsg", "Product sucessfully removed.");
            getallproduct();
            // getallproduct();
          })
          .catch((error) => {
            setApiResponseError(error);
            setTimeout(() => setApiResponseError(""), 5000);
          });
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

    if (localStorage.getItem("errorMsg") !== "") {
      setApiResponseError(localStorage.getItem("errorMsg"));
      setTimeout(() => {
        localStorage.setItem("errorMsg", "");
        setApiResponseError("");
      }, 3000);
    }
    setProductsList([]);
    await services.product
      .GET_COUNT(user.accessToken, {
        selected: true,
      })
      .then((res) => {
        checkCountValue(res?.data?.data?.productsCount);
        setProductCount(res?.data?.data?.productsCount);
      })
      .catch((error) => {
        setApiResponseError(error);
        setTimeout(() => setApiResponseError(""), 5000);
      }); //,'vendor':uid

    await services.product
      .GET_INVENTORY_INITIAL_PRODUCTS(user.accessToken, {
        selected: true,
      })
      .then((res) => {
        setProductsList(res.data.data.products.nodes);
        setpaginationData(res?.data?.data?.products?.pageInfo);
      })
      .catch((error) => {
        setApiResponseError(error);
        setTimeout(() => setApiResponseError(""), 5000);
      });
  };
  // function productDetailPopupOpen(item) {}

  function RemoveProductPopuOpen(product) {
    setRemoveProductPopup(true);
    // setRemoveProductId(product);
    setAnchorEl(null);
    setdesktopAnchorEl(null);
  }
  const handleAddProductClose = async () => {
    setOpenProductPopup(false);
    // getallproduct();
  };

  const redirectAddProduct = (backPath, redirectPath) => {
    if (localStorage.getItem("categoryFilter")) {
      localStorage.removeItem("categoryFilter");
    }
    if (localStorage.getItem("brandFilter")) {
      localStorage.removeItem("brandFilter");
    }
    localStorage.setItem("back-path", backPath);

    navigate(redirectPath);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [DesktopAnchorEl, setdesktopAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const DesktopOpen = Boolean(DesktopAnchorEl);
  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setRemoveProductId(item?.id);
    setDetailProductId(item?.id);

    setProductDetailPageData(item);
  };
  const handleClickDesktop = (event, item) => {
    setdesktopAnchorEl(event.currentTarget);
    setRemoveProductId(item?.id);
    setDetailProductId(item?.id);

    Object.assign(item, { inCollection: true });
    setProductDetailPageData(item);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setdesktopAnchorEl(null);

    setRemoveProductId("");
  };
  console.log("");
  const setProductdata = () => {
    setOpenProductDetailPopup(productDetailPageData);

    setAnchorEl(null);
    setdesktopAnchorEl(null);
  };
  const OpenProductDetails = (item) => {
    Object.assign(item, { inCollection: true });
    setOpenProductDetailPopup(item);
  };

  const handleProductDetailclick = (id, action) => {
    let productId = id?.split("/") || "";
    productId = parseInt(productId[productId.length - 1]);
    let act = action ? "remove" : "add";

    localStorage.setItem("back-path-address", "/product-list");

    navigate("/add-product-detail/" + act + "/" + productId, {
      state: {
        backPath: "product-list",
      },
    });
  };
  const getPaginationData = async (e, value) => {
    if (value > pageNumber) {
      setProductsList([]);
      const response = await services.product
        .GET_ALL_PAGINATION_DATA(
          user.accessToken,
          {
            selected: true,
          },

          paginationData
        )
        .then((res) => {
          setProductsList(res.data.data.products.nodes);
          setpaginationData(res?.data?.data?.products?.pageInfo);
          setPageNumber(value);
          window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch((error) => {
          setApiResponseError(error);
          setTimeout(() => setApiResponseError(""), 5000);
        }); //,'vendor':uid
    }
    if (value < pageNumber) {
      setProductsList([]);
      const response = await services.product
        .GET_ALL_PAGINATION_DATA_BACKWARD(
          user.accessToken,
          {
            selected: true,
          },

          paginationData
        )
        .then((res) => {
          setProductsList(res.data.data.products.nodes);
          setpaginationData(res?.data?.data?.products?.pageInfo);
          setPageNumber(value);
        })
        .catch((error) => {
          setApiResponseError(error);
          setTimeout(() => setApiResponseError(""), 5000);
        }); //,'vendor':uid
    }
  };
  useEffect(() => {
    if (openProductPopup === true) {
      document.body.style.overflow = "hidden";
    }
    if (openProductPopup === false) {
      // get products if the user perform any action like add or remove product
      if (localStorage.getItem("product-list-api-call") === "true") {
        getallproduct();
        setTimeout(() => {
          localStorage.removeItem("product-list-api-call");
        }, 3000);
      }

      document.body.style.overflow = "scroll";
    }
  }, [openProductPopup]);
  useEffect(() => {
    if (Object.keys(openProductDetailPopup).length !== 0) {
      document.body.style.overflow = "hidden";
    }
    if (
      Object.keys(openProductDetailPopup).length === 0 &&
      openProductPopup === false
    ) {
      document.body.style.overflow = "scroll";
    }

    // get products only if the user perform any action and localStorage has the success message
    if (
      localStorage.getItem("sucessMsg") !== "" &&
      openProductPopup === false
    ) {
      getallproduct();
    }
  }, [openProductDetailPopup]);

  useEffect(() => {
    if (open === true && anchorEl !== null) {
      document.body.style.overflow = "hidden";
    }
    if (open === false || anchorEl === null) {
      document.body.style.overflow = "scroll";
    } else document.body.style.overflow = "scroll";
  }, [open, anchorEl]);

  return (
    <>
      {/* desktop view  */}
      <div className="main-mid-holder desktop-view-marge">
        <Sidebar />
        <div className="mid-content-holder">
          <Box display={"flex"} justifyContent={"flex-end"} pt={"24px"}>
            <PrimaryLarge
              width={"150px"}
              text={strings.AddProducts}
              margin={"0 0 24px 0"}
              onClick={() => setOpenProductPopup(true)}
            />
          </Box>
          <div className="table-type-view-holder">
            <div className="ttvh-header">
              <Body
                className="width1"
                text={strings.product}
                padding={"0px 24px 0px 20px"}
                letterSpacing={"0.1px"}
                fontWeight={"700"}
              />
              <Body
                className="width2"
                text={strings.brand}
                padding={"0px 16px 0px 0px"}
                letterSpacing={"0.1px"}
                fontWeight={"700"}
              />
              <Body
                className="width3"
                text={strings.price}
                padding={"0px 16px 0px 0px"}
                letterSpacing={"0.1px"}
                fontWeight={"700"}
              />
              <Body
                className="width4"
                text={strings.stock}
                padding={"0px 16px 0px 0px"}
                letterSpacing={"0.1px"}
                fontWeight={"700"}
              />
              <Body
                className="width5"
                text={" "}
                padding={"0px 16px 0px 0px"}
                letterSpacing={"0.1px"}
                fontWeight={"700"}
              />
            </div>
            <div className="ttvh-body">
              {productsList.length > 0 ? (
                productsList.map((item) => {
                  return (
                    <div className="ttvh-body-list" key={item.id}>
                      <Box
                        className="width1"
                        cursor={"pointer"}
                        display={"flex"}
                        alignItems={"center"}
                        p={"0px 16px 0px 0px"}
                        onClick={() => OpenProductDetails(item)}
                        sx={{ cursor: "pointer", height: "100%" }}
                      >
                        <div className="ttvh-bl-img-box">
                          <img
                            alt=""
                            src={
                              item?.featuredImage?.url
                                ? item.featuredImage.url
                                : noproduct
                            }
                            className="ttvh-bl-img"
                          />
                        </div>
                        <Body
                          text={item.title}
                          padding={"0px 0px 0px 24px"}
                          letterSpacing={"0.25px"}
                          color={Colors.black}
                          fontWeight={600}
                        />
                      </Box>
                      <Box
                        className="width2"
                        display={"flex"}
                        alignItems={"center"}
                        p={"0px 16px 0px 0px"}
                        onClick={() => OpenProductDetails(item)}
                        sx={{ cursor: "pointer", height: "100%" }}
                      >
                        <Body
                          text={item.vendor}
                          padding={"0px 0px 0px 0px"}
                          letterSpacing={"0.25px"}
                          color={Colors.black1c}
                          opacity={".64"}
                          fontWeight={600}
                        />
                      </Box>
                      <Box
                        className="width3"
                        display={"flex"}
                        alignItems={"center"}
                        p={"0px 16px 0px 0px"}
                        onClick={() => OpenProductDetails(item)}
                        sx={{ cursor: "pointer", height: "100%" }}
                      >
                        <Body
                          text={
                            item.priceRangeV2.maxVariantPrice.amount.endsWith(
                              ".0"
                            )
                              ? "$" +
                                Math.round(
                                  item.priceRangeV2.maxVariantPrice.amount
                                )
                              : "$" + item.priceRangeV2.maxVariantPrice.amount
                          }
                          padding={"0px 0px 0px 0px"}
                          letterSpacing={"0.25px"}
                          color={Colors.black1c}
                          opacity={".64"}
                          fontWeight={600}
                        />
                      </Box>

                      <Box
                        className="width4"
                        display={"flex"}
                        alignItems={"center"}
                        p={"0px 16px 0px 0px"}
                        onClick={() => OpenProductDetails(item)}
                        sx={{ cursor: "pointer", height: "100%" }}
                      >
                        <span
                          className={
                            item.totalInventory > 0
                              ? "alert green"
                              : "alert red"
                          }
                        ></span>
                        <Body
                          text={
                            item.totalInventory > 0
                              ? strings.InStock
                              : strings.NoStock
                          }
                          padding={"0px 0px 0px 0px"}
                          letterSpacing={"0.25px"}
                          color={Colors.black1c}
                          opacity={".50"}
                          fontWeight={600}
                        />
                      </Box>

                      <Box
                        className="width5"
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"flex-end"}
                      >
                        <Button
                          id="basic-button"
                          aria-controls={DesktopOpen ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={DesktopOpen ? "true" : undefined}
                          onClick={(e) => handleClickDesktop(e, item)}
                        >
                          <img
                            alt=""
                            src={threeDotGray}
                            className="threedotgray"
                          />
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={DesktopAnchorEl}
                          open={DesktopOpen}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                          sx={{
                            "& .MuiMenu-paper": {
                              borderRadius: "15% !important",
                              backgroundColor: "#f9f6f2 !important",

                              boxShadow:
                                "0px 0px 1px rgb(0 0 0 / 0%), 0px 1px 3px 1px rgb(0 0 0 / 3%) !important ",
                            },
                          }}
                        >
                          <MenuItem
                            onClick={() => RemoveProductPopuOpen(item.id)}
                            sx={{
                              justifyContent: "center",
                              borderBottom: "1px solid #e6e1e5 !important",
                              color: "#b3261e !important",
                            }}
                          >
                            {strings.RemoveProduct}
                          </MenuItem>

                          <MenuItem
                            onClick={setProductdata}
                            sx={{
                              justifyContent: "center",
                              borderBottom: "1px solid #e6e1e5 !important",
                            }}
                          >
                            {strings.ViewDetails}
                          </MenuItem>

                          <MenuItem
                            onClick={handleClose}
                            sx={{
                              justifyContent: "center",
                            }}
                          >
                            {strings.cancel}
                          </MenuItem>
                        </Menu>
                      </Box>
                    </div>
                  );
                })
              ) : productCount === 0 ? (
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
              ) : (
                <CentralLoader />
              )}
              {productsList.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Pagination
                    count={paginationCount ? paginationCount : 9}
                    hidePrevButton={
                      paginationData?.hasPreviousPage === false ? true : false
                    }
                    hideNextButton={
                      paginationData?.hasNextPage === false ? true : false
                    }
                    onChange={(e, value) => getPaginationData(e, value)}
                    page={pageNumber}
                    variant="outlined"
                    shape="rounded"
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                      />
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {openProductPopup ? (
          <div className="popup-holder">
            <div className="ph-backdrop-box">
              <AddProductPopup
                closePopup={() => handleAddProductClose()}
                popupIsOpen={openProductPopup}
                openDetailPopup={(obj) => setOpenProductDetailPopup(obj)}
                reloadData={reloadData}
                openFirst="first"
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
      <div className="main-mid-holder mobile-view-marge">
        <Sidebar />

        <div className="mid-content-holder">
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            pt={"20px"}
            position={"fixed"}
            style={{ right: "16px", top: "0px", zIndex: 999 }}
          >
            <img
              alt=""
              src={blackBgAdd}
              onClick={() =>
                redirectAddProduct("/product-list", "/add-product-list")
              }
            />
          </Box>
          <div className="table-type-view-holder">
            <div className="ttvh-body">
              {productsList.length > 0 ? (
                productsList.map((item) => {
                  return (
                    <div className="ttvh-body-list" key={item.id}>
                      <Box
                        sx={{ width: "100%" }}
                        display={"flex"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Box
                          display={"flex"}
                          alignItems={"flex-start"}
                          onClick={() =>
                            handleProductDetailclick(item?.id, true)
                          }
                        >
                          <Box>
                            <div className="ttvh-bl-img-box">
                              <img
                                alt=""
                                src={
                                  item?.featuredImage?.url
                                    ? item.featuredImage.url
                                    : noproduct
                                }
                                className="ttvh-bl-img"
                                style={{
                                  height: "96px",
                                  width: "96px",
                                  objectFit: "contain",
                                }}
                              />
                            </div>
                          </Box>
                          <Box p={"16px"}>
                            <Box>
                              <Body
                                text={item.title}
                                padding={"0px 0px 4px 0px"}
                                letterSpacing={"0.25px"}
                                fontWeight={"500"}
                                className="texttruncate"
                                color={Colors.black}
                              />
                              <Body
                                text={item.vendor}
                                padding={"0px 0px 0px 0px"}
                                letterSpacing={"0.25px"}
                                className="texttruncate"
                                color={Colors.dark_gray}
                              />
                            </Box>
                            <Box
                              display={"flex"}
                              alignItems={"flex-start"}
                              pt={"8px"}
                            >
                              <Small
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
                                padding={"0px 0px 0px 0px"}
                                letterSpacing={"0.25px"}
                                color={Colors.black}
                                opacity={"0.5"}
                              />
                              <Box
                                className="width4"
                                display={"flex"}
                                alignItems={"center"}
                                p={"0px 0px 0px 12px"}
                              >
                                <span
                                  className={
                                    item.totalInventory > 0
                                      ? "alert green"
                                      : "alert red"
                                  }
                                ></span>
                                <Small
                                  text={
                                    item.totalInventory > 0
                                      ? strings.InStock
                                      : strings.NoStock
                                  }
                                  padding={"0px 0px 0px 0px"}
                                  letterSpacing={"0.25px"}
                                  color={Colors.black}
                                  opacity={"0.5"}
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Box>

                        <Box p={"16px 10px 0 0"}>
                          <Button
                            id="basic-button2"
                            aria-controls={open ? "basic-menu2" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={(e) => handleClick(e, item)}
                            style={{ minWidth: "25px", paddingLeft: "0" }}
                          >
                            <MoreVertIcon
                              className="threedotgray"
                              sx={{ color: "black", opacity: "0.6" }}
                            />
                          </Button>
                          <Dialog
                            id="basic-menu2"
                            BackdropProps={{
                              style: {
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                                opacity: 0.5,
                              },
                            }}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="menu-dialog-title"
                            aria-describedby="menu-dialog-description"
                            classes={{
                              root: classes.backdrop,
                            }}
                            PaperProps={{
                              classes: {
                                root: classes.boxShadow,
                              },
                            }}
                          >
                            <DialogContent
                              classes={{
                                root: classes.contentRoot,
                              }}
                            >
                              <ListItem
                                sx={{
                                  textAlign: "center",
                                  borderBottom: "1px solid #e6e1e5 !important",
                                  color: "#b3261e !important",
                                }}
                                onClick={(e) =>
                                  RemoveProductPopuOpen(e, item.id)
                                }
                              >
                                <ListItemText
                                  classes={{
                                    primary: classes.TypographyRoot,
                                  }}
                                >
                                  {strings.RemoveProduct}
                                </ListItemText>
                              </ListItem>

                              <ListItem
                                sx={{
                                  textAlign: "center",

                                  borderBottom: "1px solid #e6e1e5 !important",
                                }}
                                onClick={() =>
                                  handleProductDetailclick(
                                    detailProductId,
                                    true
                                  )
                                }
                              >
                                <ListItemText
                                  classes={{
                                    primary: classes.TypographyRoot,
                                  }}
                                >
                                  {strings.ViewDetails}
                                </ListItemText>
                              </ListItem>

                              <ListItem
                                onClick={handleClose}
                                sx={{
                                  textAlign: "center",
                                }}
                              >
                                <ListItemText
                                  classes={{
                                    primary: classes.TypographyRoot,
                                  }}
                                >
                                  {strings.cancel}
                                </ListItemText>
                              </ListItem>
                            </DialogContent>
                          </Dialog>
                        </Box>
                      </Box>
                    </div>
                  );
                })
              ) : productCount === 0 ? (
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
              ) : (
                <CentralLoader />
              )}
              {productsList.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Pagination
                    count={paginationCount ? paginationCount : 9}
                    hidePrevButton={
                      paginationData?.hasPreviousPage === false ? true : false
                    }
                    hideNextButton={
                      paginationData?.hasNextPage === false ? true : false
                    }
                    onChange={(e, value) => getPaginationData(e, value)}
                    page={pageNumber}
                    variant="outlined"
                    shape="rounded"
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{
                          previous: ArrowBackIcon,
                          next: ArrowForwardIcon,
                        }}
                        {...item}
                      />
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
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
    </>
  );
};

export default ProductList;
