import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as Colors from "../../../../assets/styles/Colors";
import {
  Heading2B,
  Small,
  Heading3B,
  Heading6S,
} from "../../../../assets/styles/Labels";
import ReactiveButton from "reactive-button";
import productDetail1 from "../../../../assets/images/product/product-detail-img1.png";
import backArrow from "../../../../assets/images/structure/back-black.svg";
import deleteWhite from "../../../../assets/images/structure/delete-white.svg";
import Box from "@mui/material/Box";
import services from "../../../../services/index";
import Loaders from "../../../../GlobalModule/Loaders";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase";
import ButtonLoader from "../../../../GlobalModule/ButtonLoader";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "react-slideshow-image/dist/styles.css";
import { Pagination } from "swiper/core";

const strings = require("../../../../localisation_en.json");

const pagination = {
  clickable: true,
  pagination: true,
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "375px",
};
const buttonStyle = {
  display: "none",
};
const properties = {
  prevArrow: <button style={{ ...buttonStyle }}></button>,
  nextArrow: <button style={{ ...buttonStyle }}></button>,
};

const ProductDetailPopup = (props) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const params = useParams();

  const [product, setProduct] = useState({});
  const [buttonState, setButtonState] = useState("idle");
  const [apiResponseError, setApiResponseError] = useState("");

  const { state } = useLocation();

  useEffect(() => {
    getallproduct();
  }, []);

  const getallproduct = async () => {
    try {
      const response = await services.product.GET_PRODUCT_DETAIL(
        user.accessToken,
        params.id
      ); //,'vendor':uid

      setProduct(response.data.data.product);
    } catch (error) {
      setApiResponseError(error);
      setTimeout(() => setApiResponseError(""), 5000);
    }
  };

  const addProductStorefront = async (productId, action) => {
    setButtonState("loading");
    productId = productId?.split("/") || "";
    productId = parseInt(productId[productId.length - 1]);
    let count = parseInt(localStorage.getItem("productsCount"));
    if (action) {
      await services.product.DELETE_PRODUCT_FROM_STORE(user.accessToken, {
        productId: productId,
      });
      localStorage.setItem("productsCount", count - 1);
      localStorage.setItem("sucessMsg", "Product sucessfully removed.");
    } else {
      await services.product.ADD_PRODUCT_TO_STORE(user.accessToken, {
        productId: productId,
      });
      localStorage.setItem("productsCount", count + 1);
      localStorage.setItem("sucessMsg", "Product sucessfully added.");
    }

    // setting "filter-apply" to naviaget the products screen rather than brands screen
    // localStorage.setItem("filter-apply", "showProducts");
    localStorage.removeItem("brandsModalState");

    if (
      localStorage.getItem("back-path-address") &&
      localStorage.getItem("back-path-address").length !== ""
    ) {
      navigate(localStorage.getItem("back-path-address"));
      localStorage.removeItem("back-path-address");
      localStorage.removeItem("brandFilter");
      localStorage.removeItem("categoryFilter");
    } else if (
      localStorage.getItem("back-path") &&
      localStorage.getItem("back-path") !== "" &&
      localStorage.getItem("back-path") === "/add-product"
    ) {
      localStorage.removeItem("brandFilter");
      localStorage.removeItem("categoryFilter");

      navigate("/add-product");
    } else {
      localStorage.setItem("filter-apply", "showProducts");
      navigate("/add-product-list");
    }

    setButtonState("success");
  };
  const handleNavigate = () => {
    if (
      localStorage.getItem("back-path-address") &&
      localStorage.getItem("back-path-address").length !== ""
    ) {
      navigate(localStorage.getItem("back-path-address"));
      localStorage.removeItem("back-path-address");
    } else {
      navigate("/add-product-list");
      // setting "filter-apply" to naviaget the products screen rather than brands screen
      localStorage.setItem("filter-apply", "showProducts");
    }
  };

  return (
    <div className="mobile-view-marge">
      {Object.keys(product).length > 0 ? (
        <Box className="product-detail-parent" height={"100vh"}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            position={"absolute"}
            p={"15px 4px"}
            width={"100%"}
            sx={{
              zIndex: "222",
            }}
          >
            <img alt="" src={backArrow} onClick={() => handleNavigate()} />
          </Box>

          <div className="slide-container">
            <Swiper
              pagination={pagination}
              modules={[Pagination]}
              className="mySwiper"
            >
              {product.images.nodes.map((item, index) => (
                <Box key={"sliderImages" + index}>
                  <SwiperSlide>
                    <div
                      style={{
                        ...divStyle,
                        backgroundImage: `url(${
                          item.url ? item.url : productDetail1
                        })`,
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </SwiperSlide>
                </Box>
              ))}
            </Swiper>
            <div className="swiper-pagination"></div>
          </div>

          <Box
            p={"24px"}
            sx={{
              backgroundColor: "#f9f6f2 !important",
            }}
          >
            <Small
              text={Object.keys(product).length > 0 ? product.vendor : ""}
              color={Colors.black1c}
              fontWeight={"600"}
              padding={"0 0 4px 0"}
            />
            <Heading2B
              text={product.title}
              color={Colors.black1c}
              padding={"0 0 24px 0"}
              letterSpacing={"-0.02em"}
            />
            <Small
              text={strings.RRP}
              color={Colors.black1c}
              fontWeight={"600"}
              padding={"0 0 4px 0"}
            />
            <Heading3B
              text={
                Object.keys(product).length > 0
                  ? product.priceRangeV2.maxVariantPrice.amount.endsWith(".0")
                    ? "$" +
                      Math.round(product.priceRangeV2.maxVariantPrice.amount)
                    : "$" + product.priceRangeV2.maxVariantPrice.amount
                  : "00"
              }
              color={Colors.black1c}
              padding={"0 0 24px 0"}
              letterSpacing={"-0.02em"}
            />
            <Small
              text={strings.description}
              color={Colors.black1c}
              fontWeight={"600"}
              textTransform={"uppercase"}
              padding={"0 0 8px 0"}
            />
            {/* <Heading6S
              text={product.description}
              color={Colors.black1c}
              padding={"0 0 8px 0"}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
            /> */}
            <div
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              style={{ fontSize: "18px", lineHeight: "1.5" }}
              // style={{
              //   letterSpacing: "-0.02em",
              //   padding: "0 0 8px 0",
              //   fontWeight: "600"
              // }}
            ></div>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            className="pd-btn-holder"
          >
            {params.action === "remove" && (
              <ReactiveButton
                buttonState={buttonState}
                idleText={
                  <span style={{ display: "flex", alignIems: "center" }}>
                    <img alt="" src={deleteWhite} /> {strings.RemoveFromStore}
                  </span>
                }
                rounded
                size="large"
                color="#000"
                width={"205px"}
                onClick={() => addProductStorefront(product.id, true)}
                padding={"0 0 0px 12px"}
                fontWeight={"600"}
                letterSpacing={"-0.02em"}
                loadingText={<ButtonLoader />}
              />
            )}
            {params.action === "add" && (
              <ReactiveButton
                className="pd-button"
                buttonState={buttonState}
                idleText={strings.addToStore}
                onClick={() => addProductStorefront(product.id, false)}
                rounded
                size="large"
                color="#000"
                width={"150px"}
                margin={"0 0 14px 0"}
                loadingText={<ButtonLoader />}
              />
            )}
          </Box>
        </Box>
      ) : (
        <Box className="product-detail-parent">
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100vh"}
            width={"100vw"}
            position={"absolute"}
          >
            <Loaders />
          </Box>
        </Box>
      )}

      {apiResponseError?.length > 2 ? (
        <span className="product-add-error-box">{apiResponseError}</span>
      ) : null}
    </div>
  );
};

export default ProductDetailPopup;
