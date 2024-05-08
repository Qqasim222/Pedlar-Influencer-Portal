import * as Colors from "../../../../assets/styles/Colors";
import { Heading6S, Small } from "../../../../assets/styles/Labels";
import "../AddProduct.scss";
import ModalClose from "../../../../assets/images/structure/closeblack.svg";
import searchBlack from "../../../../assets/images/structure/search-light-black.svg";
import Box from "@mui/material/Box";
const strings = require("../../../../localisation_en.json");

function AddProductSearch(props) {
  return (
    <div className="mobile-view-marge">
      <Box className="max-width-600" pt={"0px"}>
        <div className="top-header-heading shadow">
          <Box
            className="back-heading"
            display={"flex"}
            alignItems={"center"}
            width={"100%"}
          >
            <img alt="" src={ModalClose} className="icon24" />
            <div className="search-box">
              <img
                alt=""
                src={searchBlack}
                className="search-icon"
                opacity={0.64}
              />
              <input
                type="text"
                className="search-input"
                placeholder="Search"
              />
            </div>
          </Box>
        </div>
        <Box className="" p={"24px 16px 16px 16px"}>
          <Small
            text={"Popular Brands"}
            color={Colors.black1c}
            fontWeight={"600"}
            padding={"4px 16px 4px 16px"}
            textTransform={"uppercase"}
            opacity={".64"}
          />
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={"12px 16px"}
            mb={1}
            className="select-check"
          >
            <img alt="" src={searchBlack} className="search-icon" />
            <Heading6S
              text={"A Brand 1"}
              color={Colors.gray45}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={"12px 16px"}
            mb={1}
            className="select-check"
          >
            <img alt="" src={searchBlack} className="search-icon" />
            <Heading6S
              text={"A Brand 2"}
              color={Colors.gray45}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={"12px 16px"}
            mb={1}
            className="select-check"
          >
            <img alt="" src={searchBlack} className="search-icon" />
            <Heading6S
              text={"A Brand 3"}
              color={Colors.gray45}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={"12px 16px"}
            mb={1}
            className="select-check"
          >
            <img alt="" src={searchBlack} className="search-icon" />
            <Heading6S
              text={"A Brand 4"}
              color={Colors.gray45}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
            />
          </Box>

          <Small
            text={"Categories"}
            color={Colors.black1c}
            fontWeight={"600"}
            padding={"4px 16px 4px 16px"}
            textTransform={"uppercase"}
            opacity={".64"}
          />
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={"12px 16px"}
            mb={1}
            className="select-check"
          >
            <img alt="" src={searchBlack} className="search-icon" />
            <Heading6S
              text={strings.Accessiories}
              color={Colors.gray45}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={"12px 16px"}
            mb={1}
            className="select-check"
          >
            <img alt="" src={searchBlack} className="search-icon" />
            <Heading6S
              text={strings.Allinones}
              color={Colors.gray45}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={"12px 16px"}
            mb={1}
            className="select-check"
          >
            <img alt="" src={searchBlack} className="search-icon" />
            <Heading6S
              text={strings.dresses}
              color={Colors.gray45}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={"12px 16px"}
            mb={1}
            className="select-check"
          >
            <img alt="" src={searchBlack} className="search-icon" />
            <Heading6S
              text={strings.face_Body}
              color={Colors.gray45}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={"12px 16px"}
            mb={1}
            className="select-check"
          >
            <img alt="" src={searchBlack} className="search-icon" />
            <Heading6S
              text={strings.jeans_Pants}
              color={Colors.gray45}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={"12px 16px"}
            mb={1}
            className="select-check"
          >
            <img alt="" src={searchBlack} className="search-icon" />
            <Heading6S
              text={strings.livingGifts}
              color={Colors.gray45}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={"12px 16px"}
            mb={1}
            className="select-check"
          >
            <img alt="" src={searchBlack} className="search-icon" />
            <Heading6S
              text={strings.face_Body}
              color={Colors.gray45}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={"12px 16px"}
            mb={1}
            className="select-check"
          >
            <img alt="" src={searchBlack} className="search-icon" />
            <Heading6S
              text={strings.Outerwear}
              color={Colors.gray45}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={"12px 16px"}
            mb={1}
            className="select-check"
          >
            <img alt="" src={searchBlack} className="search-icon" />
            <Heading6S
              text={strings.Shorts}
              color={Colors.gray45}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            p={"12px 16px"}
            mb={1}
            className="select-check"
          >
            <img alt="" src={searchBlack} className="search-icon" />
            <Heading6S
              text={strings.Skirts}
              color={Colors.gray45}
              fontWeight={"600"}
              letterSpacing={"-0.02em"}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default AddProductSearch;
