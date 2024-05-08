import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Colors from "../../../../assets/styles/Colors";
import { Heading3B, Heading6S } from "../../../../assets/styles/Labels";
import "../AddProduct.scss";
import backArrow1 from "../../../../assets/images/structure/navigate_before.svg";
import ModalClose from "../../../../assets/images/structure/closeblack.svg";
import Box from "@mui/material/Box";

import { Typography } from "@mui/material";
import { height } from "@mui/system";
const strings = require("../../../../localisation_en.json");

const AddProductFilter = (props) => {
  const navigate = useNavigate();
  const [totalCategoriesCount, setTotalCategoriesCount] = useState(0);
  const [totalBrandsCount, setTotalBrandsCount] = useState(0);
  const [showBrands, setShowBrands] = useState(true);

  const CloseFilterPage = () => {
    if (localStorage.getItem("brandsModalState")) {
      if (localStorage.getItem("brandsModalState") === "true") {
        localStorage.setItem("filter-apply", "showBrands");
      }
    } else {
      localStorage.setItem("filter-apply", "showProducts");
    }
    navigate("/add-product-list");
  };
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
    if (localStorage.getItem("brandsModalState")) {
      if (localStorage.getItem("brandsModalState") === "true") {
        setShowBrands(false);
      }
    }
  }, []);

  return (
    <div className="mobile-view-marge">
      <Box className="max-width-600">
        <div className="top-header-heading shadow">
          <Box className="back-heading" display={"flex"} alignItems={"center"}>
            <img
              alt=""
              src={ModalClose}
              className="icon24"
              onClick={() => CloseFilterPage()}
            />
            <Heading3B
              text={strings.Filter}
              color={Colors.black1c}
              fontWeight={"600"}
              padding={"0 0px 0px 16px"}
              letterSpacing={"-0.02em"}
            />
          </Box>
        </div>
        <Box
          className=""
          p={"20px 16px 16px 16px"}
          sx={{ position: "fixed", width: "100%" }}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            position={"sticky"}
            p={"16px"}
            mb={1}
            onClick={() => navigate("/add-product-category")}
          >
            <Heading6S
              text={strings.Categories}
              color={Colors.black1c}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
              // onClick={() => navigate("/add-product-category")}
            />
            <Typography
              sx={{
                color: "rgb(103, 80, 164)",
                width: "100%",
                marginLeft: "10px",
              }}
            >{`(${totalCategoriesCount})`}</Typography>
            <img
              alt=""
              src={backArrow1}
              className="icon24"
              style={{ transform: "rotate(180deg) translateY(-1px)" }}
              // onClick={() => navigate("/add-product-category")}
            />
          </Box>

          {showBrands && (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              p={"16px"}
              mb={1}
              onClick={() => navigate("/add-product-brand")}
            >
              <Heading6S
                text={strings.brands}
                color={Colors.black1c}
                fontWeight={"600"}
                letterSpacing={"-0.02em"}
                // onClick={() => navigate("/add-product-brand")}
              />
              <Typography
                sx={{
                  color: "rgb(103, 80, 164)",
                  width: "100%",
                  marginLeft: "10px",
                }}
              >{`(${totalBrandsCount})`}</Typography>
              <img
                alt=""
                src={backArrow1}
                className="icon24"
                style={{ transform: "rotate(180deg) translateY(-1px)" }}
                // onClick={() => navigate("/add-product-brand")}
              />
            </Box>
          )}
          {/* <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            p={"16px"}
            mb={1}
            onClick={() => navigate("/add-product-brand")}
          >
            <Heading6S
              text={strings.brands}
              color={Colors.black1c}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
              // onClick={() => navigate("/add-product-brand")}
            />
            <Typography
              sx={{
                color: "rgb(103, 80, 164)",
                width: "100%",
                marginLeft: "10px"
              }}
            >{`(${totalBrandsCount})`}</Typography>
            <img
              alt=""
              src={backArrow1}
              className="icon24"
              style={{ transform: "rotate(180deg) translateY(-1px)" }}
              // onClick={() => navigate("/add-product-brand")}
            />
          </Box> */}
        </Box>
      </Box>
    </div>
  );
};

export default AddProductFilter;
