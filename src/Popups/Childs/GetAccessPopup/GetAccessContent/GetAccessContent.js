import * as Colors from "../../../../assets/styles/Colors";
import { Small } from "../../../../assets/styles/Labels";
import { PrimaryLarge } from "../../../../assets/styles/Buttons";
import tiktokIcon from "../../../../assets/images/structure/tiktok-icon.svg";
import * as React from "react";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InstagramIcon from "@mui/icons-material/Instagram";
const strings = require("../../../../localisation_en.json");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function GetAccessContent(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <Box className="access-popup-tabs">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label={strings.iAmACreator} {...a11yProps(0)} />
            <Tab label={strings.iAmABrand} {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} style={{ padding: "0" }}>
          <div className="">
            <div>
              <Box className="form-group">
                <TextField
                  className="textfield"
                  id="outlined-required2"
                  label={strings.firstName}
                  placeholder="Enter Here"
                  required
                />
              </Box>
              <Box className="form-group">
                <TextField
                  className="textfield"
                  id="outlined-required2"
                  label={strings.lastName}
                  placeholder="Enter Here"
                  required
                />
              </Box>
              <Box className="form-group">
                <TextField
                  className="textfield"
                  id="outlined-required2"
                  label={strings.emailAddress}
                  placeholder="Enter Here"
                  required
                />
              </Box>
              <Box className="form-group">
                <TextField
                  className="textfield"
                  id="outlined-required2"
                  label={strings.city}
                  placeholder="Enter Here"
                  required
                />
              </Box>
              <Box className="form-group">
                <TextField
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InstagramIcon />
                      </InputAdornment>
                    ),
                  }}
                  className="textfield"
                  label={strings.instagramHandle}
                  placeholder="Enter Here"
                />
              </Box>
              <Box className="form-group">
                <TextField
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img alt="" src={tiktokIcon} />
                      </InputAdornment>
                    ),
                  }}
                  className="textfield"
                  label={strings.tiktokUsername}
                  placeholder="Enter Here"
                />
              </Box>
            </div>
            <PrimaryLarge
              width={"125px"}
              text={strings.getInTouch}
              margin={"0 0 24px 0"}
            />
            <Small
              text={
                strings.weWillCommunicateWithYouAboutTheInformationRequested
              }
              color={Colors.gray49}
            />
            <Small
              text={
                strings.theUseOfYourInformationIsGoverenedByPedlarsPrivacyPolicy
              }
              color={Colors.gray49}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="">
            <div>
              <Box className="form-group">
                <TextField
                  className="textfield"
                  id="outlined-required2"
                  label={strings.firstName}
                  placeholder="Enter Here"
                  required
                />
              </Box>
              <Box className="form-group">
                <TextField
                  className="textfield"
                  id="outlined-required2"
                  label={strings.lastName}
                  placeholder="Enter Here"
                  required
                />
              </Box>
              <Box className="form-group">
                <TextField
                  className="textfield"
                  id="outlined-required2"
                  label={strings.companyName}
                  placeholder="Enter Here"
                  required
                />
              </Box>
              <Box className="form-group">
                <TextField
                  className="textfield"
                  id="outlined-required2"
                  label={strings.emailAddress}
                  placeholder="Enter Here"
                  required
                />
              </Box>
              <Box className="form-group">
                <TextField
                  className="textfield"
                  id="outlined-required2"
                  label={strings.phoneNumber}
                  placeholder="Enter Here"
                  required
                />
              </Box>
              <Box className="form-group">
                <TextField
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InstagramIcon />
                      </InputAdornment>
                    ),
                  }}
                  className="textfield"
                  label={strings.instagramHandle}
                  placeholder="Enter Here"
                />
              </Box>
            </div>
            <PrimaryLarge
              width={"125px"}
              text={strings.getInTouch}
              margin={"0 0 24px 0"}
            />
            <Small
              text={
                strings.weWillCommunicateWithYouAboutTheInformationRequested
              }
              color={Colors.gray49}
            />
            <Small
              text={
                strings.theUseOfYourInformationIsGoverenedByPedlarsPrivacyPolicy
              }
              color={Colors.gray49}
            />
          </div>
        </TabPanel>
      </Box>
    </>
  );
}

export default GetAccessContent;
