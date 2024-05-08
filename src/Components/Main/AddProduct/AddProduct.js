import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Colors from "../../../assets/styles/Colors";
import { PrimaryLarge } from "../../../assets/styles/Buttons";
import { Heading2B, Heading6S, Small } from "../../../assets/styles/Labels";
import "./AddProduct.scss";
import AddProductPopup from "../../../Popups/Childs/AddProductPopup/AddProductPopup";
import ProductDetailPopup from "../../../Popups/Childs/ProductDetailPopup/ProductDetailPopup";
import pedlarLogo from "../../../assets/images/logo/pedlar-logo.svg";
import loginImg from "../../../assets/images/product/login-img.png";
import addPlusBlackImg from "../../../assets/images/structure/add-plus-black.svg";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import services from "../../../services/index";
import noproduct from "../../../assets/images/product/noproduct.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  currentReloadData,
  setAddProductValueChange,
} from "../../../redux/reducers/addProductValueChange";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import CentralLoader from "../../../GlobalModule/CentralLoader";

const strings = require("../../../localisation_en.json");

function AddProduct(props) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const currentReloadDataVar = useSelector(currentReloadData);
  const dispatch = useDispatch();
  const [openProductPopup, setOpenProductPopup] = useState(false);
  const [loading, setloading] = useState(false);
  const [openProductDetailPopup, setOpenProductDetailPopup] = useState({});
  const [productsList, setProductsList] = useState([]);
  const [sucessPopup, setSucessPopup] = useState(false);
  const [showMsg, setShowMsg] = useState("");
  const [apiResponseError, setApiResponseError] = useState("");

  useEffect(() => {
    getallproduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  useEffect(() => {
    // getallproduct();
    if (openProductPopup === true) {
      document.body.style.overflow = "hidden";
    } else {
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
    if (sucessPopup) {
      setOpenProductDetailPopup(false);
      setSucessPopup(false);
      dispatch(setAddProductValueChange(currentReloadDataVar ? false : true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sucessPopup]);

  function addProductPopupOpen() {
    setOpenProductPopup(true);
  }

  const getallproduct = async () => {
    if (localStorage.getItem("sucessMsg") !== "")
      setShowMsg(localStorage.getItem("sucessMsg"));
    setTimeout(() => {
      localStorage.setItem("sucessMsg", "");
      setShowMsg("");
    }, 3000);
    setloading(true);
    try {
      const response = await services.product.GET_ALL(user.accessToken, {
        selected: true,
      });
      setProductsList(response.data.data.products.nodes);
      setloading(false);
    } catch (error) {
      setApiResponseError(strings.apiErrorMessage);
      setTimeout(() => setApiResponseError(""), 5000);
    }
  };

  const handleAddProductClose = async () => {
    setOpenProductPopup(false);
    // getallproduct();
  };

  const OpenProductDetails = (item) => {
    Object.assign(item, { inCollection: true });
    setOpenProductDetailPopup(item);
  };

  useEffect(() => {
    if (Object.keys(openProductDetailPopup).length !== 0) {
      document.body.style.overflow = "hidden";
    } else if (
      Object.keys(openProductDetailPopup).length === 0 &&
      openProductPopup === false
    ) {
      document.body.style.overflow = "scroll";
      // get products if the user perform any action like add or remove product
      if (localStorage.getItem("product-list-api-call") === "true") {
        getallproduct();
        setTimeout(() => {
          localStorage.removeItem("product-list-api-call");
        }, 3000);
      }
    }
  }, [openProductDetailPopup]);
  const handleProductDetailclick = (id, action) => {
    let productId = id?.split("/") || "";
    productId = parseInt(productId[productId.length - 1]);

    let act = action ? "remove" : "add";
    localStorage.setItem("back-path-address", "/add-product");

    navigate("/add-product-detail/" + act + "/" + productId, {
      state: {
        backPath: "add-product",
      },
    });
  };

  const renderProducts = () => {
    if (loading) return <CentralLoader />;
    return (
      <>
        {productsList.length > 0
          ? productsList.map((item) => {
              return (
                <div
                  className="add-product-uploaded-box"
                  onClick={() => OpenProductDetails(item)}
                  style={{ cursor: "pointer", paddingRight: "9px" }}
                  key={item.id}
                >
                  <img
                    alt=""
                    src={
                      item.featuredImage.url
                        ? item.featuredImage.url
                        : noproduct
                    }
                    className="apub-img"
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
                    className="pr-dtl-truncate"
                  />
                  <Heading6S
                    text={
                      item.priceRangeV2.maxVariantPrice.amount.endsWith(".0")
                        ? "$" +
                          Math.round(item.priceRangeV2.maxVariantPrice.amount)
                        : item.priceRangeV2.minVariantPrice.amount
                        ? "$" + item.priceRangeV2.maxVariantPrice.amount
                        : "00"
                    }
                    color={Colors.black1c}
                    padding={"0 0px 0px 0"}
                    letterSpacing={"-0.02em"}
                  />
                </div>
              );
            })
          : ""}
        {productsList.length >= 3 ? (
          <div
            className="add-product-uploader"
            onClick={() => addProductPopupOpen()}
            style={{ cursor: "pointer" }}
          >
            <label className="add-product-upload">
              <img alt="" src={addPlusBlackImg} />
            </label>
            <Heading6S
              text={strings.addProduct}
              padding={"8px 0 0px 0"}
              letterSpacing={"-0.02em"}
            />
          </div>
        ) : (
          ""
        )}

        {[1, 2, 3].map((item, index) => {
          var print = false;

          if (productsList.length === 0 && item <= 3) print = true;
          if (productsList.length === 1 && item < 3) print = true;
          if (productsList.length === 2 && item < 2) print = true;
          return print ? (
            <div
              className="add-product-uploader"
              onClick={() => addProductPopupOpen()}
              style={{ cursor: "pointer" }}
              key={index}
            >
              <label className="add-product-upload">
                <img alt="" src={addPlusBlackImg} />
              </label>
              <Heading6S
                text={strings.addProduct}
                padding={"8px 0 0px 0"}
                letterSpacing={"-0.02em"}
              />
            </div>
          ) : (
            ""
          );
        })}
      </>
    );
  };

  const renderProductsMobile = () => {
    localStorage.setItem("back-path", "/add-product");
    document.body.style.overflow = "hidden";
    if (loading) return <CentralLoader />;
    return (
      <>
        {productsList.length > 0
          ? productsList.map((item) => {
              return (
                <Grid item xs={6} key={item.id}>
                  <div
                    className="add-product-uploaded-box"
                    // onClick={() =>
                    //   navigate("/add-product-list", {
                    //     state: {
                    //       backPath: "add-product"
                    //     }
                    //   })
                    // }
                    onClick={() => handleProductDetailclick(item.id, true)}
                  >
                    <img
                      alt=""
                      src={
                        item.featuredImage.url
                          ? item.featuredImage.url
                          : noproduct
                      }
                      className="apub-img"
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
                      fontWeight={"600"}
                      padding={"0 0px 0px 0"}
                      letterSpacing={"-0.02em"}
                      className="pr-dtl-truncate"
                    />
                    <Heading6S
                      text={
                        item.priceRangeV2.maxVariantPrice.amount.endsWith(".0")
                          ? "$" +
                            Math.round(item.priceRangeV2.maxVariantPrice.amount)
                          : "$" + item.priceRangeV2.maxVariantPrice.amount
                      }
                      color={Colors.black1c}
                      fontWeight={"600"}
                      padding={"0 0px 0px 0"}
                      letterSpacing={"-0.02em"}
                    />
                  </div>
                </Grid>
              );
            })
          : ""}
        {productsList.length >= 3 ? (
          <Grid item xs={6}>
            <div
              className="add-product-uploader"
              onClick={() =>
                navigate("/add-product-list", {
                  state: {
                    backPath: "add-product",
                  },
                })
              }
            >
              <label className="add-product-upload">
                <img alt="" src={addPlusBlackImg} />
              </label>
              <Heading6S
                text={strings.addProduct}
                padding={"8px 0 0px 0"}
                letterSpacing={"-0.02em"}
              />
            </div>{" "}
          </Grid>
        ) : (
          ""
        )}

        {[1, 2, 3].map((item, index) => {
          var print = false;
          if (productsList.length === 0 && item <= 3) print = true;
          if (productsList.length === 1 && item < 3) print = true;
          if (productsList.length === 2 && item < 2) print = true;
          return print ? (
            <Grid item xs={6} key={index}>
              <div
                className="add-product-uploader"
                onClick={() =>
                  navigate("/add-product-list", {
                    state: {
                      backPath: "add-product",
                    },
                  })
                }
              >
                <label className="add-product-upload">
                  <img alt="" src={addPlusBlackImg} />
                </label>
                <Heading6S
                  text={strings.addProduct}
                  padding={"8px 0 0px 0"}
                  letterSpacing={"-0.02em"}
                />
              </div>{" "}
            </Grid>
          ) : (
            ""
          );
        })}
      </>
    );
  };

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
                <div className="login-right lr-product-right">
                  <Heading2B
                    text={strings.addProductsToYourStore}
                    color={Colors.black}
                    padding={"0 0 0px 0"}
                    letterSpacing={"-0.02em"}
                  />
                  <Heading2B
                    text={strings.atLeast3Required}
                    className={"gradient-gray"}
                    padding={"0 0 44px 0"}
                    letterSpacing={"-0.02em"}
                  />
                  <div className="add-productlist-holder descriptionBox">
                    {renderProducts()}
                  </div>
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
                      onClick={() => navigate("/onboarding-tour")}
                      disabled={productsList.length >= 3 ? false : true}
                      cursor={"pointer"}
                    />
                  </Box>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>

        {openProductPopup ? (
          <div className="popup-holder">
            <div className="ph-backdrop-box">
              <AddProductPopup
                closePopup={() => handleAddProductClose()}
                popupIsOpen={openProductPopup}
                openDetailPopup={(obj) => setOpenProductDetailPopup(obj)}
                sucessPopup={(obj) => setSucessPopup(obj)}
                setOpenProductPopup={setOpenProductPopup}
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
                setOpenProductPopup={setOpenProductPopup}
                CloseAddProductsPopup={() => handleAddProductClose()}
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
      <div className="main-holder mobile-view-marge">
        <div className="login-header">
          <img src={pedlarLogo} className="logo-img" alt="" />
        </div>
        <div className="login-holder" style={{ marginTop: "12px" }}>
          <Heading2B
            text={strings.addProductsToYourStore}
            color={Colors.black}
            padding={"0 0 0px 0"}
            letterSpacing={"-0.02em"}
          />
          <Heading2B
            text={strings.atLeast3Required}
            className={"gradient-gray"}
            padding={"4px 0 44px 0"}
            letterSpacing={"-0.02em"}
          />
          <Grid container columnSpacing={"16px"} className="mobileProductsBox">
            {renderProductsMobile()}
          </Grid>
          <div className="addProductsContinueButton">
            <PrimaryLarge
              // width={"100%"}
              text={strings.continue}
              margin={"16px 0 14px 0"}
              onClick={() => navigate("/onboarding-tour")}
              disabled={productsList.length >= 3 ? false : true}
            />
          </div>
        </div>
        {showMsg ? <span className="product-added">{showMsg}</span> : null}
        {apiResponseError?.length > 2 ? (
          <span className="product-add-error-box">{apiResponseError}</span>
        ) : null}
      </div>
    </>
  );
}

export default AddProduct;
