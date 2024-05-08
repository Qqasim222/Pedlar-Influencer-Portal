import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Colors from "../../../../assets/styles/Colors";
import { Heading3B, Heading6S } from "../../../../assets/styles/Labels";
import "../AddProduct.scss";
import backArrow from "../../../../assets/images/structure/back-black.svg";
import Box from "@mui/material/Box";
import services from "../../../../services/index";
import Loaders from "../../../../GlobalModule/Loaders";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase";
import { Button, Checkbox, ListItemText, MenuItem } from "@mui/material";
const strings = require("../../../../localisation_en.json");

const AddProductCategory = (props) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [categoriesList, setCategoriesList] = useState([]);
  const [category, setCategory] = useState([]);
  const [
    categoryFilterLocalStorageLength,
    setcategoryFilterLocalStorageLength,
  ] = useState(0);

  useEffect(() => {
    if (
      localStorage.getItem("categoryFilter") &&
      localStorage.getItem("categoryFilter") !== ""
    ) {
      const selectedCategoriesList = localStorage
        .getItem("categoryFilter")
        .split(",");

      setCategory(selectedCategoriesList);
    }
    getallcategories();

    if (localStorage.getItem("categoryFilter")) {
      setcategoryFilterLocalStorageLength(
        localStorage.getItem("categoryFilter").length
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("category", category);

  const getallcategories = async () => {
    let filter = {};
    if (
      localStorage.getItem("brandFilter") &&
      localStorage.getItem("brandFilter") !== ""
    )
      filter.vendor = localStorage.getItem("brandFilter");
    const response = await services.product.GET_ALL_TYPES(
      user.accessToken,
      filter
    ); //,'vendor':uid
    setCategoriesList(response.data.data);
  };

  const applyFilter = async () => {
    if (localStorage.getItem("brandsModalState")) {
      if (localStorage.getItem("brandsModalState") === "true") {
        localStorage.setItem("filter-apply", "showBrands");
      }
    } else {
      localStorage.setItem("filter-apply", "showProducts");
    }
    localStorage.setItem("categoryFilter", category);

    navigate("/add-product-list");
  };
  const clearCategoryFilter = async () => {
    setCategory("");
    localStorage.setItem("categoryFilter", "");
    if (localStorage.getItem("brandsModalState")) {
      if (localStorage.getItem("brandsModalState") === "true") {
        localStorage.setItem("filter-apply", "showBrands");
      }
    } else {
      localStorage.setItem("filter-apply", "showProducts");
    }
    navigate("/add-product-list");
  };

  const categoryClick = (categoryName) => {
    if (category.includes(categoryName)) {
      const index = category.indexOf(categoryName);
      if (index > -1)
        setCategory(category.filter((item) => item !== categoryName));
    } else setCategory([...category, categoryName]);
  };

  return (
    <div className="mobile-view-marge">
      <Box className="max-width-600" pt={"0px"}>
        <div className="top-header-heading shadow">
          <Box className="back-heading" display={"flex"} alignItems={"center"}>
            <img
              alt=""
              src={backArrow}
              className="backarrow"
              onClick={() => navigate("/add-product-filter")}
            />
            <Heading3B
              text={strings.Category}
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
            onClick={() => clearCategoryFilter()}
          />
        </Box> */}

        <Box
          className="vendorListBox"
          p={"24px 16px 16px 16px"}
          // sx={{ height: "84vh", overflowY: "scroll" }}
        >
          {categoriesList.length > 0 ? (
            categoriesList.map((item, index) => {
              return (
                // <Box
                //   display={"flex"}
                //   alignItems={"center"}
                //   justifyContent={"space-between"}
                //   p={"12px 16px"}
                //   mb={1}
                //   key={item.node}
                //   onClick={(e) => categoryClick(item.node)}
                //   className={`select-check ${
                //     category.includes(item.node) ? "active" : ""
                //   }`}
                // >
                //   <label htmlFor="one">
                //     <Heading6S
                //       text={item.node}
                //       color={Colors.gray45}
                //       fontWeight={"600"}
                //       letterSpacing={"-0.02em"}
                //       // onClick={(e) => categoryClick(item.node)}
                //     />
                //   </label>
                // </Box>
                item.productType !== "" && (
                  <MenuItem
                    key={index}
                    className={"select-check"}
                    onClick={(e) => categoryClick(item.productType)}
                  >
                    <Checkbox
                      id={"checkbox" + index}
                      checked={category.includes(item.productType) || false}
                      iconStyle={{ fill: "black" }}
                      // onClick={(e) => categoryClick(item.productType)}
                    />
                    <ListItemText>
                      <Heading6S
                        className="ldb-text"
                        text={item.productType}
                        color={Colors.gray45}
                        padding={"0 0px 0px 0"}
                        letterSpacing={"-0.02em"}
                        cursor={"pointer"}
                        // onClick={(e) => categoryClick(item.node)}
                      />
                    </ListItemText>
                  </MenuItem>
                )
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
        <Box className="modal_bottom_buttons " sx={{ boxShadow: 5 }} mt={1}>
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
            onClick={() => clearCategoryFilter()}
          >
            {strings.clearAll}
          </Button>

          <Button
            size="large"
            variant="contained"
            disabled={
              category?.length === 0 && categoryFilterLocalStorageLength === 0
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
          disabled={category !== "" ? false : true}
          onClick={(e) => applyFilter()}
        /> */}
      </Box>
    </div>
  );
};

export default AddProductCategory;
