import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Colors from "../../../../assets/styles/Colors";
import {
  Heading3B,
  Heading6S,
  Small,
  LabelWrapper,
} from "../../../../assets/styles/Labels";
import "../AddProduct.scss";
import backArrow from "../../../../assets/images/structure/back-black.svg";
import selectBrandPlaceholderImage from "../../../../assets/images/product/selectBrandPlaceholderImage.png";

import checkedBlack from "../../../../assets/images/structure/checked-black.svg";
import searchBlack from "../../../../assets/images/structure/search-light-black.svg";
import filterBlack from "../../../../assets/images/structure/filter-black.svg";
import ModalClose from "../../../../assets/images/structure/closeblack.svg";
import noproduct from "../../../../assets/images/product/noproduct.png";
import View_All from "../../../../assets/images/product/view_all_products.png";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import services from "../../../../services/index";
import Loaders from "../../../../GlobalModule/Loaders";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase";
import { CircularProgress, Typography } from "@mui/material";
import { async } from "@firebase/util";
const strings = require("../../../../localisation_en.json");

const AddProductListing = (props) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState([]);
  /* eslint-disable no-unused-vars */
  const [vendorsList, setVendorsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  /* eslint-enable no-unused-vars */
  const [showMsg, setShowMsg] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [loader, setLoader] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [brandsModalState, setBrandsModalState] = useState(true);
  const [brand, setBrand] = useState([]);

  const [totalCategoriesCount, setTotalCategoriesCount] = useState(0);
  const [totalBrandsCount, setTotalBrandsCount] = useState(0);
  const [getProductsStateForUseEffect, setGetProductsStateForUseEffect] =
    useState(false);
  const [paginationData, setPaginationData] = useState({});
  const [showMoreProductsLoaderState, setShowMoreProductsLoaderState] =
    useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [apiResponseError, setApiResponseError] = useState("");

  const [callHandleScroll, setCallHandleScroll] = useState(false);
  // for showing text if the image fails to load
  const [loaded, setLoaded] = useState({});
  const handleImageLoad = (index) => {
    setLoaded((prevLoaded) => {
      const newLoaded = [...prevLoaded];
      newLoaded[index] = true;
      return newLoaded;
    });
  };
  const imgRefs = useRef([]);

  const { state } = useLocation();

  useLayoutEffect(() => {
    if (localStorage.getItem("sucessMsg"))
      setShowMsg(localStorage.getItem("sucessMsg"));

    setTimeout(() => {
      localStorage.setItem("sucessMsg", "");
      setShowMsg("");
    }, 3000);

    if (localStorage.getItem("filter-apply") !== "") {
      if (localStorage.getItem("filter-apply") === "showBrands") {
        setBrandsModalState(true);
        getallvendors();
      } else if (localStorage.getItem("filter-apply") === "showProducts") {
        getallproduct();
        setBrandsModalState(false);
      }

      localStorage.removeItem("filter-apply");
    } else {
      getallvendors();
      getallproduct();
    }
    getallcategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // calculating the total of applied filters

  useEffect(() => {
    if (localStorage.getItem("categoryFilter")) {
      let count;
      count = localStorage.getItem("categoryFilter");
      count = count?.split(",").length || 0;
      setTotalCategoriesCount(count);
    }
    if (localStorage.getItem("brandFilter")) {
      let count;
      count = localStorage.getItem("brandFilter");
      count = count?.split(",").length || 0;
      setTotalBrandsCount(count);
    }
    if (brandsModalState === false) {
      window.addEventListener("scroll", handleScroll);
    }
  }, [brandsModalState]);

  useEffect(() => {
    if (keyword.length === 0 || keyword.length > 2) {
      if (getProductsStateForUseEffect === true) {
        getallproduct();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  // useEffect to get the products when user click on View All

  useEffect(() => {
    setLoader(true);
    if (brandsModalState === false) {
      getallproduct();
    } else {
      getallvendors();
    }
  }, [brandsModalState]);

  useEffect(() => {
    if (brand.length > 0) {
      getallproduct();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  const getallproduct = async () => {
    setLoader(true);
    setProductsList([]);

    let filter = {};
    if (
      localStorage.getItem("categoryFilter") &&
      localStorage.getItem("categoryFilter") !== ""
    )
      filter.category = localStorage.getItem("categoryFilter");
    if (
      localStorage.getItem("brandFilter") &&
      localStorage.getItem("brandFilter") !== ""
    )
      filter.vendor = localStorage.getItem("brandFilter");

    if (keyword !== "") filter.keyword = keyword;
    if (brand.length > 0) filter.vendor = brand.join(",");

    try {
      const response = await services.product.GET_ALL(user.accessToken, filter); //,'vendor':uid

      setProductsList(response.data.data.products.nodes);
      setPaginationData(response?.data?.data?.products?.pageInfo);
    } catch (error) {
      setApiResponseError(error);
      setTimeout(() => setApiResponseError(""), 5000);
    }

    setLoader(false);
  };

  // infinite scrolling

  const handleScroll = async () => {
    if (
      window.innerHeight + Math.round(document.documentElement.scrollTop) >=
      document.body.offsetHeight
    ) {
      setCallHandleScroll(true);
    } else {
      setCallHandleScroll(false);
    }
  };

  const getScrollData = async () => {
    if (paginationData?.hasNextPage === true) {
      setShowMoreProductsLoaderState(true);
      let filter = {};
      if (
        localStorage.getItem("categoryFilter") &&
        localStorage.getItem("categoryFilter") !== ""
      )
        filter.category = localStorage.getItem("categoryFilter");
      if (
        localStorage.getItem("brandFilter") &&
        localStorage.getItem("brandFilter") !== ""
      )
        filter.vendor = localStorage.getItem("brandFilter");
      if (keyword !== "") filter.keyword = keyword;

      // if (category.length > 0) filter.category = category.join(",");
      if (brand.length > 0) filter.vendor = brand.join(",");
      try {
        const response = await services.product.GET_PRODUCTS_MODAL(
          user.accessToken,
          filter,
          paginationData
        );

        setPaginationData(response?.data?.data?.products?.pageInfo);

        setProductsList([
          ...productsList,
          ...response?.data?.data?.products?.nodes,
        ]);
        setCallHandleScroll(false);
      } catch (error) {
        setApiResponseError(error);
        setTimeout(() => setApiResponseError(""), 5000);
      }

      setShowMoreProductsLoaderState(false);

      // }
    }
  };

  // get products when bottom is reached

  useEffect(() => {
    if (callHandleScroll === true) {
      getScrollData();
    }
  }, [callHandleScroll]);

  const handleProductDetailclick = (id, action) => {
    let productId = id?.split("/") || "";
    productId = parseInt(productId[productId.length - 1]);
    let act = action ? "remove" : "add";
    navigate("/add-product-detail/" + act + "/" + productId, {
      state: {
        backPathRoute: `${state?.backPath}`,
      },
    });
  };

  const getallvendors = async () => {
    let filter = {};
    setLoader(true);

    if (
      localStorage.getItem("categoryFilter") &&
      localStorage.getItem("categoryFilter") !== ""
    ) {
      filter.category = localStorage.getItem("categoryFilter");
      setLoaded({});
    }

    try {
      const response = await services.product.GET_ALL_VENDORS(
        user.accessToken,
        filter
      ); //,'vendor':uid

      setVendorsList(response.data.data);
    } catch (error) {
      setApiResponseError(error);
      setTimeout(() => setApiResponseError(""), 5000);
    }

    setLoader(false);
  };

  useEffect(() => {
    if (vendorsList.length > 0) {
      if (Object.keys(loaded).length === 0) {
        setLoaded(Array(vendorsList?.length).fill(false));
      }
    }
  }, [vendorsList]);

  useEffect(() => {
    if (
      localStorage.getItem("categoryFilter") &&
      localStorage.getItem("categoryFilter") !== ""
    ) {
      setLoaded({});
    }
  }, []);

  const getallcategories = async () => {
    let filter = {};
    filter.keyword = keyword;
    if (
      localStorage.getItem("brandFilter") &&
      localStorage.getItem("brandFilter") !== ""
    )
      filter.vendor = localStorage.getItem("brandFilter");

    try {
      const response = await services.product.GET_ALL_TYPES(
        user.accessToken,
        filter
      ); //,'vendor':uid

      if (
        localStorage.getItem("categoryFilter") &&
        localStorage.getItem("categoryFilter") !== ""
      ) {
        let productTypes = [...response?.data?.data];
        productTypes = productTypes.map((item) => {
          return item?.productType;
        });
        let selectedcategoriesList = localStorage.getItem("categoryFilter");
        selectedcategoriesList = selectedcategoriesList.split(",");

        selectedcategoriesList = selectedcategoriesList.filter((catWord) =>
          productTypes.includes(catWord)
        );
        setTotalCategoriesCount(selectedcategoriesList.length);

        selectedcategoriesList = selectedcategoriesList.join(",");
        localStorage.setItem("categoryFilter", `${selectedcategoriesList}`);
      }

      setCategoriesList(response.data.data);
    } catch (error) {
      setApiResponseError(error);
      setTimeout(() => setApiResponseError(""), 5000);
    }
  };
  useLayoutEffect(() => {
    if (brandsModalState) {
      setCallHandleScroll(false);
    }
    if (brandsModalState === true && scrollPosition > 0) {
      window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [brandsModalState, scrollPosition]);

  const backArrowClicked = () => {
    setProductsList([]);
    setBrand([]);
    // setVendorsList([]);
    if (brandsModalState === false) {
      setLoader(true);
      getallvendors();

      setBrandsModalState(true);

      localStorage.removeItem("categoryFilter");
      localStorage.removeItem("brandFilter");
      setTotalCategoriesCount(0);
    } else {
      if (
        localStorage.getItem("categoryFilter") ||
        localStorage.getItem("brandFilter")
      ) {
        localStorage.removeItem("categoryFilter");
        localStorage.removeItem("brandFilter");
      }

      localStorage.removeItem("brandsModalState");
      navigate(localStorage.getItem("back-path"));
    }
    setCallHandleScroll(false);
  };
  useLayoutEffect(() => {
    setLoader(true);

    if (brandsModalState === true) {
      setProductsList([]);
    }
  }, [brandsModalState, vendorsList, categoriesList]);

  const brandClick = (brandName) => {
    if (brand.includes(brandName)) {
      const index = brand.indexOf(brandName);
      if (index > -1) setBrand(brand.filter((item) => item !== brandName));
    } else setBrand([...brand, brandName]);

    // localStorage.setItem("brandFilter", brandName);
  };

  const openAddProductModal = (item, index) => {
    setLoader(true);
    setProductsList([]);
    brandClick(item?.vendor);
    localStorage.setItem("vendorName", item?.vendor);
    localStorage.setItem("brandFilter", item?.vendor);
    localStorage.removeItem("brandsModalState");
    window.addEventListener("scroll", handleScroll);
    setBrandsModalState(false);
    setScrollPosition(window.scrollY);
    getallcategories();
  };
  const keywordValue = (value) => {
    setKeyword(value);
    setGetProductsStateForUseEffect(true);
  };

  // navigate to add-product-filter-page

  const navigateToAddProductFilter = () => {
    if (brandsModalState === true) {
      localStorage.setItem("brandsModalState", brandsModalState);
    }
    navigate("/add-product-filter");
  };

  const viewAllClicked = () => {
    setLoader(true);

    setBrandsModalState(false);
    localStorage.removeItem("brandsModalState");
    localStorage.removeItem("categoryFilter");
    localStorage.removeItem("brandFilter");
    setTotalBrandsCount(0);
    setTotalCategoriesCount(0);
    setBrand([]);

    getallproduct();
    window.addEventListener("scroll", handleScroll);
    setScrollPosition(0);
  };

  return (
    <div className="mobile-view-marge">
      <Box
        className="max-width-600"
        pt={"24px"}
        id="el"
        pb={20}
        // onScroll={handleScroll}
        // ref={listInnerRef}
      >
        <div className="top-header-heading">
          <Box className="back-heading" display={"flex"} alignItems={"center"}>
            <img
              alt=""
              src={backArrow}
              className=""
              onClick={backArrowClicked}
            />
            <Heading3B
              text={
                brandsModalState ? strings?.selectBrand : strings.AddProducts
              }
              color={Colors.black1c}
              fontWeight={"600"}
              padding={"0 0px 0px 16px"}
              letterSpacing={"-0.02em"}
            />
          </Box>
          <Box
            className="category-search"
            display={"flex"}
            alignItems={"center"}
          >
            <img
              alt=""
              src={filterBlack}
              className="icon24"
              // onClick={() => navigate("/add-product-filter")}
              onClick={navigateToAddProductFilter}
            />
            {brandsModalState ? (
              <Typography
                sx={{
                  color: "rgb(103, 80, 164)",
                }}
              >
                {`(${totalCategoriesCount})`}
              </Typography>
            ) : (
              <Typography
                sx={{
                  color: "rgb(103, 80, 164)",
                }}
              >
                {/* {`(${totalCategoriesCount + totalBrandsCount + brand?.length})`} */}
                {`(${totalCategoriesCount + totalBrandsCount})`}
              </Typography>
            )}

            {!showSearch && brandsModalState === false ? (
              <img
                alt=""
                src={searchBlack}
                className="icon24"
                style={{ marginLeft: "20px" }}
                onClick={() => setShowSearch(true)}
              />
            ) : (
              ""
            )}
          </Box>

          {showSearch && brandsModalState === false ? (
            <Box
              display={"flex"}
              alignItems={"center"}
              style={{
                position: "fixed",
                left: "0",
                top: "0",
                width: "100%",
                boxShadow:
                  "0px 0px 3px rgba(0, 0, 0, 0.15), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
                padding: "20px 16px 16px 16px",
                backgroundColor: "#F9F6F2",
              }}
            >
              <img
                alt=""
                src={ModalClose}
                className="search-icon"
                onClick={() => setShowSearch(false)}
              />
              <Box
                className="search-box"
                display={"flex"}
                alignItems={"center"}
                style={{
                  background: "transparent",
                  padding: "10px",
                  margin: "0 0 0 16px",
                  width: "100%",
                }}
              >
                <img
                  alt=""
                  src={searchBlack}
                  className="icon24"
                  style={{ marginRight: "20px" }}
                  onClick={() => setShowSearch(true)}
                />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search"
                  onChange={(e) => keywordValue(e.target.value.trim())}
                  // onChange={(e) => setKeyword(e.target.value.trim())}
                  value={keyword}
                />
              </Box>
            </Box>
          ) : (
            ""
          )}
        </div>
        <Container maxWidth="sm">
          {brandsModalState === false ? (
            <Grid container spacing={"16px"}>
              {productsList.length > 0 ? (
                productsList.map((product) => {
                  return (
                    <Grid item xs={6} key={product.id}>
                      <div className="add-product-uploaded-box">
                        <Box
                          mb={1}
                          alt=""
                          style={{
                            background: `url(${
                              product?.featuredImage?.url
                                ? product?.featuredImage?.url
                                : noproduct
                            }) center center no-repeat`,
                            backgroundSize: "contain",
                            cursor: "pointer",
                            width: "96%",
                            height: "180px",
                          }}
                          onClick={() =>
                            handleProductDetailclick(
                              product.id,
                              product.inCollection
                            )
                          }
                        ></Box>

                        {product.inCollection === true && (
                          <div className="added-chip">
                            <img alt="" src={checkedBlack} />
                            <Heading6S
                              text={strings.added}
                              color={Colors.black1c}
                              fontWeight={"600"}
                              padding={"0 0px 0px 8px"}
                              letterSpacing={"-0.02em"}
                            />
                          </div>
                        )}
                        <Small
                          text={product.vendor}
                          color={Colors.black1c}
                          fontWeight={"600"}
                          textTransform={"uppercase"}
                        />
                        <Heading6S
                          text={
                            product.title.length > 20
                              ? product.title.substring(0, 20) + "..."
                              : product.title
                          }
                          color={Colors.black1c}
                          fontWeight={"600"}
                          padding={"0 0px 0px 0"}
                          letterSpacing={"-0.02em"}
                        />
                        <LabelWrapper display={"flex"} alignItems={"center"}>
                          {product.priceRangeV2.maxVariantPrice.amount !==
                            product.priceRangeV2.minVariantPrice.amount && (
                            <Heading6S
                              text={
                                product.priceRangeV2.maxVariantPrice.amount.endsWith(
                                  ".0"
                                )
                                  ? "$" +
                                    Math.round(
                                      product.priceRangeV2.maxVariantPrice
                                        .amount
                                    )
                                  : "$" +
                                    product.priceRangeV2.maxVariantPrice.amount
                              }
                              color={Colors.black1c}
                              fontWeight={"600"}
                              padding={"0 4px 0px 0"}
                              letterSpacing={"-0.02em"}
                              textDecoration={"line-through"}
                              opacity={"0.6"}
                            />
                          )}
                          <Heading6S
                            text={
                              product.priceRangeV2.maxVariantPrice.amount.endsWith(
                                ".0"
                              )
                                ? "$" +
                                  Math.round(
                                    product.priceRangeV2.maxVariantPrice.amount
                                  )
                                : "$" +
                                  product.priceRangeV2.maxVariantPrice.amount
                            }
                            color={Colors.black1c}
                            fontWeight={"600"}
                            padding={"0 0px 0px 0"}
                            letterSpacing={"-0.02em"}
                          />
                        </LabelWrapper>
                      </div>
                    </Grid>
                  );
                })
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "160px",
                  }}
                >
                  {loader ? <Loaders /> : "No Product Found"}
                </div>
              )}

              <Box
                width={"100%"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CircularProgress
                  sx={{
                    color:
                      showMoreProductsLoaderState && productsList.length > 0
                        ? "#000000 !important"
                        : "transparent !important",
                  }}
                />
              </Box>
            </Grid>
          ) : null}
          {brandsModalState === true ? (
            <Grid container spacing={"16px"}>
              <Grid item xs={12}>
                <div
                  // className="add-product-uploaded-box"
                  // onClick={() => setBrandsModalState(false)}
                  onClick={viewAllClicked}
                  // style={{
                  //   background:
                  //     "radial-gradient(circle, rgba(215,168,189,1) 0%, rgba(207,229,255,1) 100%)",
                  //   height: "162px"
                  //   // mixBlendMode: "overlay" ,
                  // }}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <img
                      alt="Pedlar"
                      src={View_All}
                      height={"198px"}
                      width="100%"
                      style={{
                        objectFit: "cover",
                      }}
                    ></img>
                  </Box>
                  {/* <div className="apub-img">


                  </div> */}
                  {/* <Typography
                    fontSize={25}
                    sx={{
                      color: "#1C1B1F",

                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "20%",

                      position: "absolute",
                      top: "30%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      // border: "1px solid red",
                      width: "100%",
                      textDecoration: "underline",
                      fontWeight: "bold",
                    }}
                  >
                    View All
                  </Typography> */}
                </div>
              </Grid>

              {vendorsList.length > 0 && brandsModalState ? (
                vendorsList.map((item, index) => {
                  return (
                    <Grid item xs={12} key={index}>
                      <div
                        // className="add-product-uploaded-box"
                        onClick={() => openAddProductModal(item, index)}
                      >
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <img
                            alt="Pedlar"
                            src={
                              item?.banner_url || selectBrandPlaceholderImage
                            }
                            onError={(e) => {
                              e.target.src = selectBrandPlaceholderImage;
                              handleImageLoad(index);
                            }}
                            ref={(el) => (imgRefs.current[index] = el)}
                            // className="apub-img "
                            height={"198px"}
                            width="100%"
                            style={{
                              objectFit: "cover",
                            }}
                          ></img>

                          {loaded[index] && (
                            <Typography
                              fontSize={25}
                              sx={{
                                color: "white",
                                position: "absolute",
                                fontWeight: "bold",
                              }}
                            >
                              {item?.vendor}
                            </Typography>
                          )}

                          {/* <Typography
                            fontSize={12}
                            sx={{
                              color: "white",


                              position: "absolute",
                              // top: "30%",
                              // left: "50%",
                              // transform: "translate(-50%, -50%)",
                              // // border: "1px solid red",
                              // width: "100%",
                              fontWeight: "bold"
                            }}
                          >
                            {
                              "/" +
                                // imgRefs.current[index]?.src.includes(
                                //   "selectBrandPlaceholderImage"
                                // )
                                //   ? item?.vendor
                                //   : "something messy happened"
                                // ===
                                // selectBrandPlaceholderImage
                                //   ? item?.vendor
                                //   : null
                                imgRefs.current[index]?.src
                                  .split("/")
                                  .slice(3, 6)
                                  .join("/") ===
                              selectBrandPlaceholderImage
                                ? item?.vendor
                                : "falsyyyyyyyyee"
                              // : "false"}
                            }
                          </Typography> */}
                        </Box>
                      </div>
                    </Grid>
                  );
                })
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "160px",
                  }}
                >
                  {loader ? <Loaders /> : "No Brand Found"}
                </div>
              )}
            </Grid>
          ) : null}
        </Container>
        {showMsg && showMsg !== "" ? (
          <span className="product-added">{showMsg}</span>
        ) : null}
      </Box>
      {apiResponseError?.length > 2 ? (
        <span className="product-add-error-box">{apiResponseError}</span>
      ) : null}
    </div>
  );
};

export default AddProductListing;
