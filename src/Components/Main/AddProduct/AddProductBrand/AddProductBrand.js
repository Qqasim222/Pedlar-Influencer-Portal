import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Colors from "../../../../assets/styles/Colors";
import { PrimarySmall } from "../../../../assets/styles/Buttons";
import { Heading3B, Heading6S } from "../../../../assets/styles/Labels";
import "../AddProduct.scss";
import backArrow from "../../../../assets/images/structure/back-black.svg";
import Box from "@mui/material/Box";
import services from "../../../../services/index";
import Loaders from "../../../../GlobalModule/Loaders";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase";
import { Checkbox, ListItemText, MenuItem, Button } from "@mui/material";

const strings = require("../../../../localisation_en.json");

const AddProductBrand = (props) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [vendorsList, setVendorsList] = useState([]);
  const [brand, setBrand] = useState([]);

  const [brandFilterLocalStorageLength, setbrandFilterLocalStorageLength] =
    useState(0);
  useEffect(() => {
    if (
      localStorage.getItem("brandFilter") &&
      localStorage.getItem("brandFilter") !== ""
    ) {
      const selectedBrandsList = localStorage.getItem("brandFilter").split(",");
      setBrand(selectedBrandsList);
    }
    if (localStorage.getItem("brandFilter")) {
      setbrandFilterLocalStorageLength(
        localStorage.getItem("brandFilter").length
      );
    }
    getallvendors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getallvendors = async () => {
    let filter = {};

    if (
      localStorage.getItem("categoryFilter") &&
      localStorage.getItem("categoryFilter") !== ""
    )
      filter.category = localStorage.getItem("categoryFilter");
    const response = await services.product.GET_ALL_VENDORS(
      user.accessToken,
      filter
    );

    const vendorListResponse = [...response?.data?.data];

    const vendorListSorted = vendorListResponse.sort(function (a, b) {
      return a.vendor.localeCompare(b.vendor);
    });

    setVendorsList(vendorListSorted);
  };
  const applyFilter = async () => {
    if (localStorage.getItem("brandsModalState")) {
      if (localStorage.getItem("brandsModalState") === "true") {
        localStorage.setItem("filter-apply", "showBrands");
      }
    } else {
      localStorage.setItem("filter-apply", "showProducts");
    }
    localStorage.setItem("brandFilter", brand);
    navigate("/add-product-list");
    // localStorage.setItem("filter-apply", "filter");
  };
  const clearBrandFilter = async () => {
    localStorage.setItem("filter-apply", "showProducts");
    setBrand("");
    localStorage.setItem("brandFilter", "");

    navigate("/add-product-list");
    // localStorage.setItem("filter-apply", "");
  };

  const brandClick = (brandName) => {
    if (brand.includes(brandName)) {
      const index = brand.indexOf(brandName);
      if (index > -1) setBrand(brand.filter((item) => item !== brandName));
    } else setBrand([...brand, brandName]);
  };

  return (
    <div className="mobile-view-marge">
      <Box className="max-width-600" pt={"0px"}>
        <div className="top-header-heading shadow">
          <Box className="back-heading" display={"flex"} alignItems={"center"}>
            <img
              alt=""
              src={backArrow}
              onClick={() => navigate("/add-product-filter")}
            />
            <Heading3B
              text={strings.brands}
              color={Colors.black1c}
              fontWeight={"600"}
              padding={"0 0px 0px 6px"}
              letterSpacing={"-0.02em"}
            />
          </Box>
        </div>
        {/* <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          className="select-box"
          p={"24px 16px 8px 16px"}
        >
          <Heading6S
            text={strings.clearFilters}
            color={Colors.black1c}
            fontWeight={"600"}
            padding={"0 0px 0px 6px"}
            letterSpacing={"-0.02em"}
            onClick={() => clearBrandFilter()}
          />
        </Box> */}
        <Box
          className="vendorListBox"
          p={"24px 16px 16px 16px"}
          // sx={{ height: "84vh", overflowY: "auto" }}
        >
          {vendorsList.length > 0 ? (
            vendorsList.map((item, index) => {
              return (
                // <Box
                //   display={"flex"}
                //   alignItems={"center"}
                //   justifyContent={"space-between"}
                //   p={"12px 16px"}
                //   mb={1}
                //   key={item.vendor}
                //   onClick={(e) => brandClick(item.vendor)}
                //   className={`select-check ${
                //     brand.includes(item.vendor) ? "active" : ""
                //   }`}
                // >
                //   <Heading6S
                //     text={item.vendor}
                //     color={Colors.gray45}
                //     fontWeight={"600"}
                //     letterSpacing={"-0.02em"}
                //     // onClick={(e) => brandClick(item.node)}
                //   />
                // </Box>
                <MenuItem
                  key={index}
                  className={"select-check"}
                  onClick={(e) => brandClick(item.vendor)}
                >
                  <Checkbox
                    id={"checkbox" + index}
                    checked={brand.includes(item.vendor) || false}
                    iconStyle={{ fill: "black" }}
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
                      // } //categoryClick
                    />
                  </ListItemText>
                </MenuItem>
              );
            })
          ) : (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginTop: "160px",
              }}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              p={"12px 16px"}
              mb={1}
            >
              <Loaders />
            </Box>
          )}
        </Box>
        <Box className="modal_bottom_buttons " sx={{ boxShadow: 5 }}>
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
            onClick={() => clearBrandFilter()}
          >
            {strings.clearAll}
          </Button>

          <Button
            size="large"
            variant="contained"
            disabled={
              brand?.length === 0 && brandFilterLocalStorageLength === 0
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
            onClick={(e) => applyFilter()}
          >
            {strings.applyFilter}
          </Button>
        </Box>
        {/* <PrimarySmall
          width={"130px"}
          text={strings.Applyfilters}
          margin={"16px 0 14px 0"}
          className="apply-btn"
          disabled={brand !== "" ? false : true}
          onClick={(e) => applyFilter()}
        /> */}
      </Box>
    </div>
  );
};

export default AddProductBrand;
