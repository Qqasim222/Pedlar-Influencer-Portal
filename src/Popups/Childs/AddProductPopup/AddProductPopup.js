import { useState, useEffect, useRef, useLayoutEffect } from "react";
import * as Colors from "../../../assets/styles/Colors";
import {
  Heading2B,
  Small,
  Heading6S,
  LabelWrapper,
} from "../../../assets/styles/Labels";
import noproduct from "../../../assets/images/product/noproduct.png";
import selectBrandPlaceholderImage from "../../../assets/images/product/selectBrandPlaceholderImage.png";

import ModalClose from "../../../assets/images/structure/closeblack.svg";
import dropDawnBlack from "../../../assets/images/structure/drop-dawn-black.svg";
import searchBlack from "../../../assets/images/structure/search-black.svg";
import checkedBlack from "../../../assets/images/structure/checked-black.svg";
import backArrow from "../../../assets/images/structure/back-black.svg";
import View_All from "../../../assets/images/product/view_all_products.png";

import { useSelector } from "react-redux";
import { currentReloadData } from "../../../redux/reducers/addProductValueChange";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import Grid from "@mui/material/Grid";
import {
  AppBar,
  Button,
  // Checkbox,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";

import Loaders from "../../../GlobalModule/Loaders";
import services from "../../../services/index";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

import CircularProgress from "@mui/material/CircularProgress";
import ReactiveButton from "reactive-button";
import ButtonLoader from "../../../GlobalModule/ButtonLoader";
import { padding } from "@mui/system";
const strings = require("../../../localisation_en.json");

const AddProductPopup = (props) => {
  const [user] = useAuthState(auth);
  const reload = useSelector(currentReloadData);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [vendorsList, setVendorsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showMsg, setShowMsg] = useState("");
  const [first, setFirst] = useState(props.openFirst);

  const [paginationData, setPaginationData] = useState({});

  const [showMoreProductsLoaderState, setShowMoreProductsLoaderState] =
    useState(false);
  const [apiResponseError, setApiResponseError] = useState("");

  const [brandsModalState, setBrandsModalState] = useState(true);

  const [apiCallonButtonClick, setApiCallonButtonClick] = useState(false);
  const [categoriesTotalCount, setcategoriesTotalCount] = useState(0);
  const [brandsTotalCount, setbrandsTotalCount] = useState(0);
  const [apiResponseHasError, setapiResponseHasError] = useState("");
  const [brandsModalLoader, setbrandsModalLoader] = useState(false);

  const imgRefs = useRef([]);

  // for showing text if the image fails to load
  const [loaded, setLoaded] = useState({});
  const handleImageLoad = (index) => {
    setLoaded((prevLoaded) => {
      const newLoaded = [...prevLoaded];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  useEffect(() => {
    getallvendors();
    getallcategories();
    if (brandsModalState === false) {
      getallproduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    setLoader(true);
  }, [brandsModalState, vendorsList, categoriesList]);

  useEffect(() => {
    if (brandsModalState === false) {
      setbrandsTotalCount(brand?.length);

      getallproduct();
    }
    if (brandsModalState === true) {
      setProductsList([]);
    }
  }, [brandsModalState]);
  useEffect(() => {
    if (first === "") getallproduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);
  useEffect(() => {
    if (brandsModalState === false) {
      if (first === "" && (keyword.length === 0 || keyword.length > 2))
        getallproduct();
    }
    if (brandsModalState === true) {
      if (keyword.length > 2) {
        getallvendors();
      }
      if (keyword.length === 0) {
        getallvendors();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);
  useEffect(() => {
    if (first === "") {
      if (apiCallonButtonClick === true) {
        getallproduct();
      }
    }
    // if (brandsModalState === true && apiCallonButtonClick === true) {
    if (apiCallonButtonClick === true || apiCallonButtonClick === true) {
      getallvendors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  useEffect(() => {
    if (first === "") {
      if (apiCallonButtonClick === true) {
        getallproduct();
      }
    }
    getallcategories();

    // getallproduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);
  const getallproduct = async () => {
    setLoader(true);

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

    setApiCallonButtonClick(false);

    let VendorName = "";

    if (localStorage.getItem("vendorName") !== "") {
      VendorName = localStorage.getItem("vendorName");
    }

    // setLoader(true);
    setProductsList([]);

    let filter = {};
    if (keyword !== "") filter.keyword = keyword;
    if (category.length > 0) filter.category = category.join(",");
    if (brand.length > 0) filter.vendor = brand.join(",");
    if (VendorName?.length > 0) filter.vendor = VendorName;

    try {
      const response = await services.product.GET_ALL(user.accessToken, filter);
      setPaginationData(response?.data?.data?.products?.pageInfo);

      setProductsList(response.data.data.products.nodes);
    } catch (error) {
      setapiResponseHasError(error);
      setTimeout(() => setapiResponseHasError(""), 5000);
    }

    // let responseData = response.data.data.products.nodes.sort(
    //   () => Math.random() - 0.5
    // );

    setLoader(false);

    localStorage.setItem("vendorName", "");

    if (first !== "") setFirst("");
  };

  const listInnerRef = useRef();

  // infinite scroll method
  const handleScroll = async () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;

      console.log(
        "scrollTop + clientHeight === scrollHeight",
        Math.ceil(scrollTop),
        clientHeight,
        scrollHeight
      );
      if (
        Math.ceil(scrollTop) + clientHeight - scrollHeight === 0 &&
        brandsModalState === false &&
        productsList.length > 0
      ) {
        if (paginationData?.hasNextPage === true) {
          setShowMoreProductsLoaderState(true);
          let filter = {};
          // if (keyword !== "") filter.keyword = keyword;
          if (category.length > 0) filter.category = category.join(",");
          if (brand.length > 0) filter.vendor = brand.join(",");

          try {
            const response = await services.product.GET_PRODUCTS_MODAL(
              user.accessToken,
              filter,
              paginationData
            );

            setPaginationData(response?.data?.data?.products?.pageInfo);
            const totalProducts = [
              ...productsList,
              ...response?.data?.data?.products?.nodes,
            ];
            setProductsList(totalProducts);
            setShowMoreProductsLoaderState(false);
          } catch (error) {
            setapiResponseHasError(error);
            setTimeout(() => setapiResponseHasError(""), 5000);
          }
        }
      }
    }
  };

  const getallvendors = async () => {
    setbrandsModalLoader(true);

    let filter = {};
    if (category.length > 0) filter.category = category.join(",");
    if (keyword !== "") filter.keyword = keyword;

    try {
      const response = await services.product.GET_ALL_VENDORS(
        user.accessToken,
        filter
      );

      const vendorListResponse = [...response?.data?.data];

      const vendorListSorted = vendorListResponse.sort(function (a, b) {
        return a.vendor.localeCompare(b.vendor);
      });

      setVendorsList(vendorListSorted);
    } catch (error) {
      setapiResponseHasError(error);
      setTimeout(() => setapiResponseHasError(""), 5000);
    }

    setbrandsModalLoader(false);

    setApiCallonButtonClick(false);
  };
  useEffect(() => {
    if (vendorsList.length > 0) {
      if (Object.keys(loaded).length === 0) {
        setLoaded(Array(vendorsList?.length).fill(false));
      }
    }
  }, [vendorsList]);

  const getallcategories = async () => {
    let filter = {};
    if (brand.length > 0) filter.vendor = brand.join(",");

    try {
      const response = await services.product.GET_ALL_TYPES(
        user.accessToken,
        filter
      );
      const categoriesListResponse = [...response.data.data];

      //updating the category state if the API response is changed to show the correct count

      const productTypes = categoriesListResponse.map(
        (item) => item.productType
      );
      let selectedCategoriesList = category;

      selectedCategoriesList = selectedCategoriesList.filter((catWord) =>
        productTypes.includes(catWord)
      );

      setCategory(selectedCategoriesList);
      setcategoriesTotalCount(selectedCategoriesList?.length);

      const categoriesListSorted = categoriesListResponse.sort(function (a, b) {
        return a.productType.localeCompare(b.productType);
      });

      setCategoriesList(categoriesListSorted);
    } catch (error) {
      setapiResponseHasError(error);
      setTimeout(() => setapiResponseHasError(""), 5000);
    }

    setApiCallonButtonClick(false);
  };
  const openProductDetailPopup = async (product) => {
    props.openDetailPopup(product);
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
    setApiCallonButtonClick(false);

    // getallproduct();
  };
  const handleClick2 = () => {
    setOpen2((prev) => !prev);
  };
  const handleClickAway2 = () => {
    setOpen2(false);
    setApiCallonButtonClick(false);

    // getallproduct();
  };
  const brandClick = (brandName) => {
    if (brand.includes(brandName)) {
      const index = brand.indexOf(brandName);
      if (index > -1) setBrand(brand.filter((item) => item !== brandName));
    } else setBrand([...brand, brandName]);
  };
  const categoryClick = (categoryName) => {
    if (category.includes(categoryName)) {
      const index = category.indexOf(categoryName);
      if (index > -1)
        setCategory(category.filter((item) => item !== categoryName));
    } else setCategory([...category, categoryName]);
  };
  const styles = {
    position: "absolute",
    top: 40,
    right: 0,
    left: 0,
    zIndex: 1,
  };

  // modal handling method

  const openAddProductModal = (item, index) => {
    setLoader(true);
    brandClick(item?.vendor);
    localStorage.setItem("vendorName", item?.vendor);
    setBrandsModalState(false);

    getallproduct();
  };
  const applyFiltersMethodCategories = () => {
    if (brandsModalState === true) {
      setVendorsList([]);
      getallvendors();
      setLoaded({});
      // handleClickAway();
    } else {
      getallproduct();
      getallvendors();

      setBrandsModalState(false);
      setApiCallonButtonClick(true);
      // handleClickAway();
    }
    setOpen(false);
    setcategoriesTotalCount(category?.length);
  };

  const applyFiltersMethodBrands = () => {
    getallproduct();
    setApiCallonButtonClick(true);
    setOpen2(false);
    setbrandsTotalCount(brand?.length);

    // handleClickAway2();
  };

  const clearAllFiltersCategory = () => {
    if (brandsModalState === true) {
      setCategory([]);
      setVendorsList([]);
      setApiCallonButtonClick(true);

      getallvendors();
      setcategoriesTotalCount(category?.length);
    } else {
      setApiCallonButtonClick(true);
      setCategory([]);
    }
    setOpen(false);
    setcategoriesTotalCount(0);

    // handleClickAway();
  };
  const clearAllBrandMethod = () => {
    setApiCallonButtonClick(true);
    setOpen2(false);

    setBrand([]);
    setbrandsTotalCount(0);

    // handleClickAway2();
  };

  // change the state of the modal on back arrow click

  const modalStateHandler = () => {
    setbrandsModalLoader(true);

    setVendorsList([]);
    setApiCallonButtonClick(true);
    setCategory([]);
    setBrand([]);

    setBrandsModalState(true);
    setcategoriesTotalCount(0);
    setbrandsTotalCount(0);
  };

  const ViewAllClicked = () => {
    setLoader(true);
    setProductsList([]);
    setBrandsModalState(false);
  };

  return (
    <div className="ph-container-box">
      <div
        className="ph-paper-box width860 minheight"
        onScroll={handleScroll}
        ref={listInnerRef}
        style={{
          paddingTop: "0px",
        }}
      >
        <AppBar
          component={"nav"}
          position={"sticky"}
          top={"0"}
          sx={{
            // backgroundColor:
            //   productsList.length > 0 ? "#F9F6F2 !important" : "transparent",
            backgroundColor: "#F9F6F2 !important",

            paddingTop: "25px !important",
          }}
          elevation={0}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            pb={"24px"}
          >
            {brandsModalState ? null : (
              <img
                alt=""
                src={backArrow}
                className="modal-close mc-24"
                onClick={loader === false ? modalStateHandler : null}
              />
            )}

            <Heading2B
              text={
                brandsModalState ? strings?.selectBrand : strings.addProducts
              }
              color={Colors.black1c}
              padding={"0 0 0px 0"}
              letterSpacing={"-0.02em"}
              className={brandsModalState === false ? "fullWidth" : ""}
            />
            <img
              alt=""
              src={ModalClose}
              className="modal-close"
              onClick={() => props.closePopup()}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={"16px"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <Heading6S
                text={strings.filterBy}
                color={Colors.black1c}
                opacity={"0.64"}
                padding={"0 24px 0px 0"}
                letterSpacing={"-0.02em"}
              />

              <ClickAwayListener onClickAway={handleClickAway}>
                <Box sx={{ position: "relative" }}>
                  <button
                    className="popdropbutton"
                    type="button"
                    onClick={handleClick}
                  >
                    {strings.allCategories}
                    <Typography
                      sx={{
                        color: "rgb(103, 80, 164)",
                      }}
                      // >{`(${category?.length})`}</Typography>
                    >{`(${categoriesTotalCount})`}</Typography>

                    <img alt="" src={dropDawnBlack} />
                  </button>
                  {open ? (
                    <Box sx={styles}>
                      <div className="productdropbox">
                        {/* <div className="pdb-hdr">
                          <Heading6S
                            text={strings.clearFilters}
                            color={Colors.black1c}
                            padding={"20px 16px 8px 16px"}
                            letterSpacing={"-0.02em"}
                            onClick={(e) => setCategory([])}
                            cursor={"pointer"}
                            margin={"0px 0px 0px auto"}
                          />
                        </div> */}
                        <div className="pdb-body">
                          {categoriesList.length > 0
                            ? categoriesList.map((item, index) => {
                                return (
                                  <>
                                    {item?.productType !== "" && (
                                      <MenuItem
                                        key={index}
                                        onClick={(e) =>
                                          categoryClick(item.productType)
                                        }
                                      >
                                        <Checkbox
                                          id={"checkbox" + index}
                                          checked={
                                            category.includes(
                                              item.productType
                                            ) || false
                                          }
                                          iconStyle={{ fill: "black" }}
                                          // onChange={(e) => getCheckBoxValue(e, item)}
                                          // onClick={() => {
                                          //   setFilterCheckBoxes({ ...filterCheckBoxes, [checkboxKey]: !filterCheckBoxes[checkboxKey] });
                                          // }}
                                          // onClick={(e) =>
                                          //   categoryClick(item.productType)
                                          // }
                                        />
                                        <ListItemText>
                                          <Heading6S
                                            className="ldb-text"
                                            text={item.productType}
                                            color={Colors.gray45}
                                            padding={"0 0px 0px 0"}
                                            letterSpacing={"-0.02em"}
                                            cursor={"pointer"}
                                            // onClick={(e) =>
                                            //   categoryClick(item.productType)
                                            // } //categoryClick
                                          />
                                        </ListItemText>
                                      </MenuItem>
                                    )}
                                    {/* <div
                                    key={item.node}
                                    className={`listing-data-box ${
                                      category.includes(item.node)
                                        ? "ldb-active"
                                        : ""
                                    }`}
                                  >
                                    <Heading6S
                                      className="ldb-text"
                                      text={item.node}
                                      color={Colors.gray45}
                                      padding={"0 0px 0px 0"}
                                      letterSpacing={"-0.02em"}
                                      cursor={"pointer"}
                                      onClick={(e) => categoryClick(item.node)} //categoryClick
                                    />
                                  </div> */}
                                  </>
                                );
                              })
                            : ""}
                        </div>
                        <Box
                          className="modal_bottom_buttons"
                          sx={{ boxShadow: 5 }}
                        >
                          <Button
                            size="large"
                            variant="outlined"
                            // disabled={category?.length < 1}
                            sx={{
                              color: "#000000",
                              borderRadius: "20px",
                              border: "1px solid black",
                              textTransform: "none",
                              marginRight: "10px",
                            }}
                            onClick={() => clearAllFiltersCategory()}
                          >
                            {strings.clearAll}
                          </Button>

                          <Button
                            size="large"
                            variant="contained"
                            disabled={
                              category?.length === 0 &&
                              categoriesTotalCount === 0
                            }
                            sx={{
                              color: "#ffffff",
                              borderRadius: "20px",

                              textTransform: "none",
                              backgroundColor: "#000000",
                              ":hover": {
                                bgcolor: "#000000",
                                color: "white",
                              },
                            }}
                            onClick={() => applyFiltersMethodCategories()}
                          >
                            {strings.applyFilter}
                          </Button>
                        </Box>
                      </div>
                    </Box>
                  ) : null}
                  {console.log(category?.length, "category?.length")}
                </Box>
              </ClickAwayListener>

              {brandsModalState ? null : (
                <ClickAwayListener onClickAway={handleClickAway2}>
                  <Box sx={{ position: "relative" }}>
                    <button
                      className="popdropbutton"
                      type="button"
                      onClick={handleClick2}
                    >
                      {strings.allBrands}
                      <Typography
                        sx={{
                          color: "rgb(103, 80, 164)",
                        }}
                        // >{`(${brand?.length})`}</Typography>
                      >{`(${brandsTotalCount})`}</Typography>

                      <img alt="" src={dropDawnBlack} />
                    </button>
                    {open2 ? (
                      <Box sx={styles}>
                        <div className="productdropbox">
                          {/* <div className="pdb-hdr">
                            <Heading6S
                              text={strings.clearFilters}
                              color={Colors.black1c}
                              padding={"20px 16px 8px 16px"}
                              letterSpacing={"-0.02em"}
                              onClick={(e) => setBrand([])}
                              margin={"0px 0px 0px auto"}
                              cursor={"pointer"}
                            />
                          </div> */}
                          <div className="pdb-body">
                            {vendorsList.length > 0
                              ? vendorsList.map((item, index) => {
                                  return (
                                    <MenuItem
                                      key={index}
                                      onClick={(e) => brandClick(item.vendor)}
                                    >
                                      <Checkbox
                                        id={"checkbox" + index}
                                        checked={
                                          brand.includes(item.vendor) || false
                                        }
                                        iconStyle={{ fill: "black" }}
                                        // onChange={(e) => getCheckBoxValue(e, item)}
                                        // onClick={() => {
                                        //   setFilterCheckBoxes({ ...filterCheckBoxes, [checkboxKey]: !filterCheckBoxes[checkboxKey] });
                                        // }}
                                        // onClick={(e) => brandClick(item.vendor)}
                                      />
                                      <ListItemText>
                                        <Heading6S
                                          className="ldb-text"
                                          text={item.vendor}
                                          color={Colors.gray45}
                                          padding={"0 0px 0px 0"}
                                          letterSpacing={"-0.02em"}
                                          cursor={"pointer"}
                                          // onClick={(e) =>
                                          //   brandClick(item.vendor)
                                          // }
                                        />
                                      </ListItemText>
                                    </MenuItem>
                                    // <div
                                    //   key={item.vendor}
                                    //   className={`listing-data-box ${
                                    //     brand.includes(item.vendor)
                                    //       ? "ldb-active"
                                    //       : ""
                                    //   }`}
                                    // >
                                    //   <Heading6S
                                    //     className="ldb-text"
                                    //     text={item.vendor}
                                    //     color={Colors.gray45}
                                    //     padding={"0 0px 0px 0"}
                                    //     letterSpacing={"-0.02em"}
                                    //     cursor={"pointer"}
                                    //     onClick={(e) => brandClick(item.vendor)} //setBrand(item.node)
                                    //   />
                                    // </div>
                                  );
                                })
                              : ""}
                          </div>
                          <Box
                            className="modal_bottom_buttons"
                            sx={{ boxShadow: 5 }}
                          >
                            <Button
                              size="large"
                              variant="outlined"
                              // disabled={brand?.length < 1}
                              sx={{
                                color: "#000000",
                                borderRadius: "20px",
                                border: "1px solid black",
                                textTransform: "none",
                                marginRight: "10px",
                              }}
                              onClick={clearAllBrandMethod}
                            >
                              {strings.clearAll}
                            </Button>

                            <Button
                              size="large"
                              variant="contained"
                              disabled={
                                brand?.length === 0 && brandsTotalCount === 0
                              }
                              sx={{
                                color: "#ffffff",
                                borderRadius: "20px",

                                textTransform: "none",
                                backgroundColor: "#000000",
                                ":hover": {
                                  bgcolor: "#000000",
                                  color: "white",
                                },
                              }}
                              onClick={() => applyFiltersMethodBrands()}
                            >
                              {strings.applyFilter}
                            </Button>
                          </Box>
                        </div>
                      </Box>
                    ) : null}
                  </Box>
                </ClickAwayListener>
              )}
            </Box>
            {brandsModalState ? null : (
              <div className="search-box">
                {keyword && keyword !== "" ? (
                  <img
                    alt=""
                    src={ModalClose}
                    className="icon24"
                    style={{ marginRight: "12px", width: "20px" }}
                    onClick={() => setKeyword("")}
                  />
                ) : (
                  <img alt="" src={searchBlack} className="search-icon" />
                )}
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value.trim())}
                />
              </div>
            )}
          </Box>
          {/* </Box> */}
        </AppBar>
        <Box mt={5} sx={{ zIndex: "-20px" }}>
          <div
            className={
              brandsModalState === false ? "add-product-uploaded-holder" : ""
            }
          >
            {/* <div> */}
            <Grid
              className="add-product-uploaded-box"
              container
              spacing={2}
              direction={"row"}
              // sx={{
              //   width: "105% !important"
              // }}
              // xs={12}
              // sm={12}
              // md={12}
              // lg={12}
              // xl={12}
            >
              {brandsModalState ? (
                vendorsList?.length > 0 ? (
                  vendorsList.map((item, index) => {
                    return (
                      <>
                        {index === 0 ? (
                          <Grid item md={4}>
                            <Box
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              onClick={ViewAllClicked}

                              // style={{ cursor: "pointer" }}
                            >
                              <img
                                alt="Pedlar"
                                src={View_All}
                                ref={(el) => (imgRefs.current[index] = el)}
                                style={{
                                  cursor: "pointer",
                                  // marginBottom: "8px"
                                  // width: "299px !important",
                                  // height: "177px !important"
                                }}
                                // className="apub-img"
                                // width="299px"
                                width="100%"
                                height={"160px"}
                              ></img>
                            </Box>
                          </Grid>
                        ) : null}
                        <Grid
                          item
                          md={4}
                          key={item.id}
                          onClick={() => openAddProductModal(item, index)}
                        >
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                          >
                            {/* <BrandsImage
                              src={item?.logo_url}
                              vendor={item?.vendor}
                            /> */}
                            <img
                              alt="Pedlar"
                              src={
                                item?.banner_url || selectBrandPlaceholderImage
                                // item?.logo_url || selectBrandPlaceholderImage
                              }
                              ref={(el) => (imgRefs.current[index] = el)}
                              onError={(e) => {
                                e.target.src = selectBrandPlaceholderImage;
                                handleImageLoad(index);
                              }}
                              style={{
                                cursor: "pointer",
                                // marginBottom: "8px"
                                // width: "299px !important",
                                // height: "177px !important"
                              }}
                              // className="apub-img"
                              // width="299px"
                              width="100%"
                              height={"160px"}
                            ></img>

                            {loaded[index] && (
                              <Typography
                                sx={{
                                  color: "white",
                                  fontSize: 22,

                                  fontWeight: "bold",
                                  position: "absolute",
                                  cursor: "pointer",
                                }}
                              >
                                {item?.vendor}
                              </Typography>
                            )}
                          </Box>
                        </Grid>
                      </>
                    );
                  })
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      marginTop: "100px",
                      marginBottom: "100px",
                    }}
                  >
                    {brandsModalLoader ? (
                      <Loaders />
                    ) : vendorsList?.length === 0 ? (
                      "No Brand Found"
                    ) : null}
                  </div>
                )
              ) : productsList.length > 0 ? (
                productsList.map((item, index) => {
                  return (
                    <Grid item md={3} key={item.id}>
                      <Box
                        mb={1}
                        alt=""
                        style={{
                          background: `url(${
                            item?.featuredImage?.url
                              ? item?.featuredImage?.url
                              : noproduct
                          }) center center no-repeat`,
                          backgroundSize: "contain",
                          cursor: "pointer",
                          width: "96%",
                          height: "180px",
                        }}
                        // className="apub-img"
                        onClick={() => openProductDetailPopup(item)}
                      >
                        {item?.inCollection ? (
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
                        ) : null}
                      </Box>

                      <Small
                        text={item.vendor}
                        color={Colors.black1c}
                        fontWeight={"600"}
                        textTransform={"uppercase"}
                      />
                      <Heading6S
                        text={
                          item?.title?.length > 20
                            ? item?.title.substring(0, 20) + "..."
                            : item?.title
                        }
                        color={Colors.black1c}
                        fontWeight={"600"}
                        padding={"0 0px 0px 0"}
                        letterSpacing={"-0.02em"}
                      />
                      <LabelWrapper display={"flex"} alignItems={"center"}>
                        {item?.priceRangeV2?.maxVariantPrice?.amount !==
                          item?.priceRangeV2?.minVariantPrice?.amount && (
                          <Heading6S
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
                            item.priceRangeV2.maxVariantPrice.amount.endsWith(
                              ".0"
                            )
                              ? "$" +
                                Math.round(
                                  item.priceRangeV2.maxVariantPrice.amount
                                )
                              : "$" + item.priceRangeV2.maxVariantPrice.amount
                          }
                          color={Colors.black1c}
                          fontWeight={"600"}
                          padding={"0 0px 0px 0"}
                          letterSpacing={"-0.02em"}
                        />
                      </LabelWrapper>
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
                    marginTop: "100px",
                    marginBottom: "100px",
                  }}
                >
                  {" "}
                  {loader ? (
                    <Loaders />
                  ) : productsList.length === 0 ? (
                    "No Product Found "
                  ) : null}
                </div>
              )}
            </Grid>
            {/* {showMoreProductsLoaderState &&
            productsList.length > 0 &&
            loader === false ? ( */}
            <Box
              width={"100%"}
              sx={{
                display: "flex",
                justifyContent: "center",
                // border: "1px solid red",
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
            {/* // ) : null} */}
          </div>
        </Box>
        {showMsg && showMsg !== "" ? (
          <span className="product-added">{showMsg}</span>
        ) : null}
        {apiResponseError?.length > 2 ? (
          <span className="product-add-error-box">{apiResponseError}</span>
        ) : null}
        {apiResponseHasError?.length > 2 ? (
          <span className="product-add-error-box">{apiResponseHasError}</span>
        ) : null}
      </div>
    </div>
  );
};

export default AddProductPopup;
