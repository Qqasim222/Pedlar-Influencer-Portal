import * as Colors from "../../../assets/styles/Colors";
import {
  Heading2B,
  Small,
  Heading3B,
  Heading6S,
} from "../../../assets/styles/Labels";
import ModalClose from "../../../assets/images/structure/closeblack.svg";
import backArrow from "../../../assets/images/structure/back-black.svg";
import productDetail1 from "../../../assets/images/product/product-detail-img1.png";
import deleteWhite from "../../../assets/images/structure/delete-white.svg";
import ReactiveButton from "reactive-button";
import Loaders from "../../../GlobalModule/Loaders";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import services from "../../../services/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import ButtonLoader from "../../../GlobalModule/ButtonLoader";
import CentralLoader from "../../../GlobalModule/CentralLoader";
const strings = require("../../../localisation_en.json");

const ProductDetailPopup = (props) => {
  const [user] = useAuthState(auth);
  const [product, setProduct] = useState({});
  const [state, setState] = useState("idle");
  const [loading, setloading] = useState(false);
  const [apiResponseError, setApiResponseError] = useState("");

  useEffect(() => {
    var productId = props.itemData.id?.split("/") || "";
    productId = parseInt(productId[productId.length - 1]);
    getProduct(productId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getProduct = async (productId) => {
    setProduct({});
    try {
      const response = await services.product.GET_PRODUCT_DETAIL(
        user.accessToken,
        productId
      );
      setProduct(response.data.data.product);
    } catch (error) {
      setApiResponseError(error);
      setTimeout(() => setApiResponseError(""), 5000);
    }
  };
  const addProductStorefront = async (productId, action) => {
    setState("loading");
    setloading(true);
    productId = productId?.split("/") || "";
    productId = parseInt(productId[productId.length - 1]);
    let count = parseInt(localStorage.getItem("productsCount"));
    if (action) {
      await services.product
        .DELETE_PRODUCT_FROM_STORE(user.accessToken, {
          productId: productId,
        })
        .then(() => {
          localStorage.setItem("productsCount", count - 1);
          localStorage.setItem("sucessMsg", "Product sucessfully removed.");
          localStorage.setItem("product-list-api-call", "true");
        })
        .catch(() => {
          localStorage.setItem(
            "errorMsg",
            "An error occurred. Please try again."
          );
        });
    } else {
      await services.product
        .ADD_PRODUCT_TO_STORE(user.accessToken, {
          productId: productId,
        })
        .then(() => {
          localStorage.setItem("productsCount", count + 1);
          localStorage.setItem("sucessMsg", "Product sucessfully added.");
          localStorage.setItem("product-list-api-call", "true");
        })
        .catch(() => {
          localStorage.setItem(
            "errorMsg",
            "An error occurred. Please try again."
          );
        });
    }
    setState("success");
    props.sucessPopup(true);
    props.setOpenProductPopup(false);
  };
  const closeProductDetailHandler = () => {
    props.closePopup();
    props?.CloseAddProductsPopup();
    document.body.style.overflow = "unset";
  };
  const backArrowClickHandler = () => {
    props.closePopup();

    document.body.style.overflow = "unset";
  };
  if (loading) return <CentralLoader />;

  return (
    <div className="ph-container-box">
      <div className="ph-paper-box width860" style={{ padding: "0" }}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          position={"absolute"}
          p={"24px"}
          width={"100%"}
          zIndex={"1"}
        >
          <img
            alt=""
            src={backArrow}
            className="modal-close mc-24"
            onClick={backArrowClickHandler}
          />
          <img
            alt=""
            src={ModalClose}
            className="modal-close"
            onClick={closeProductDetailHandler}
          />
        </Box>
        {Object.keys(product).length > 0 ? (
          <Box className="product-detail-holder product-detail-holder--newheight">
            <Box className="pdh-left">
              {product.images.nodes.length > 0
                ? product.images.nodes.map((item, index) => {
                    return (
                      <img
                        alt=""
                        src={item.url ? item.url : productDetail1}
                        className="pdg-l-img"
                        key={index}
                      />
                    );
                  })
                : ""}
            </Box>
            <Box
              className="pdh-right"
              sx={{
                minHeight: "94% !important",
              }}
            >
              <Small
                text={product.vendor}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0 0 4px 0"}
              />
              <Heading2B
                text={product.title}
                color={Colors.black1c}
                padding={"0 0 30px 0"}
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
                  product.priceRangeV2.maxVariantPrice.amount.endsWith(".0")
                    ? "$" +
                      Math.round(product.priceRangeV2.maxVariantPrice.amount)
                    : "$" + product.priceRangeV2.maxVariantPrice.amount
                }
                color={Colors.black1c}
                padding={"0 0 30px 0"}
                letterSpacing={"-0.02em"}
              />
              <Heading6S
                text={strings.description}
                color={Colors.black1c}
                padding={"0 0 8px 0"}
                fontWeight={"600"}
                letterSpacing={"-0.02em"}
              />

              {/* <Box position={"relative"}> */}
              {/* <Box> */}
              <div
                style={{ fontSize: "18px", lineHeight: "1.5" }}
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              ></div>

              {/* </Box> */}

              {/* <Small
                text={product.description}
                color={Colors.black1c}
                fontWeight={"600"}
                padding={"0 0 8px 0"}
                opacity={0.64}
                fontSize="18px"
                className="productgDetailsDescription"
              /> */}
            </Box>
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              // pb={1}
              className="pd-btn-holder"
              // sx={{
              //   position: "absolute !important",
              //   right: "-5%",
              //   // top: "15%",
              //   bottom: "-12% !important",
              // }}
            >
              {props.itemData.inCollection && (
                <ReactiveButton
                  buttonState={state}
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
                  loadingText={<ButtonLoader />}
                />
              )}
              {!props.itemData.inCollection && (
                <ReactiveButton
                  buttonState={state}
                  idleText={strings.addToStore}
                  onClick={() => addProductStorefront(product.id, false)}
                  rounded
                  size="large"
                  color="#000"
                  width={"124px"}
                  loadingText={<ButtonLoader />}
                />
              )}
            </Box>
          </Box>
        ) : (
          <Box className="product-detail-holder">
            <Loaders />
          </Box>
        )}
      </div>
      {apiResponseError?.length > 2 ? (
        <span className="product-add-error-box">{apiResponseError}</span>
      ) : null}
    </div>
  );
};

export default ProductDetailPopup;
