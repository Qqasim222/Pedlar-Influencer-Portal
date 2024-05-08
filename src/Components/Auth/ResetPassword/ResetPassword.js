import * as React from "react";
import * as Colors from "../../../assets/styles/Colors";
import { PrimaryLarge } from "../../../assets/styles/Buttons";
import { Heading2B } from "../../../assets/styles/Labels";
import "./ResetPassword.scss";
import loginImg from "../../../assets/images/product/login-img.png";
import eyeNotshowImg from "../../../assets/images/structure/eye-notshow.svg";
import eyeShowImg from "../../../assets/images/structure/eye-show.svg";
import pedlarLogo from "../../../assets/images/logo/pedlar-logo.svg";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
const strings = require("../../../localisation_en.json");

function ResetPassword(props) {
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [valuesConfirm, setValuesConfirm] = React.useState({
    showPassword: false,
  });
  const handleChangeConfirm = (prop) => (event) => {
    setValuesConfirm({ ...valuesConfirm, [prop]: event.target.value });
  };
  const handleClickShowPasswordConfirm = () => {
    setValuesConfirm({
      ...valuesConfirm,
      showPasswordConfirm: !valuesConfirm.showPasswordConfirm,
    });
  };
  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
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
                <div className="login-right l-r-new-space">
                  <Heading2B
                    text={strings.resetPassword}
                    color={Colors.black}
                    padding={"0 0 64px 0"}
                    letterSpacing={"-0.02em"}
                  />
                  <Box className="form-group">
                    <FormControl
                      required
                      className="textfield"
                      sx={{ m: 0, width: "100%" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        placeholder="Enter Here"
                        id="outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <img alt="" src={eyeShowImg} />
                              ) : (
                                <img alt="" src={eyeNotshowImg} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label={strings.password}
                      />
                    </FormControl>
                  </Box>
                  <Box className="form-group">
                    <FormControl
                      required
                      className="textfield"
                      sx={{ m: 0, width: "100%" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password2">
                        {strings.reEnterNewPassword}
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password2"
                        type={
                          valuesConfirm.showPasswordConfirm
                            ? "text"
                            : "password"
                        }
                        value={valuesConfirm.passwordConfirm}
                        onChange={handleChangeConfirm("password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordConfirm}
                              onMouseDown={handleMouseDownPasswordConfirm}
                              edge="end"
                            >
                              {valuesConfirm.showPasswordConfirm ? (
                                <img alt="" src={eyeShowImg} />
                              ) : (
                                <img alt="" src={eyeNotshowImg} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label={strings.reEnterNewPassword}
                        placeholder="Enter Here"
                      />
                    </FormControl>
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"flex-end"}
                    flexDirection={"column"}
                    pt={"40px"}
                  >
                    <PrimaryLarge
                      width={"310px"}
                      text={strings.resetPassword}
                      margin={"0 0 0px 0"}
                    />
                  </Box>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      {/* mobile view  */}
      <div className="main-holder mobile-view-marge">
        <div className="login-header">
          <img src={pedlarLogo} className="logo-img" alt="" />
        </div>
        <div className="login-holder">
          <Grid container columnSpacing={0}>
            <Grid item xs={12} display={"flex"} alignItems={"center"}>
              <div
                className="login-right"
                style={{ justifyContent: "flex-start" }}
              >
                <Box sx={{ width: "100%" }}>
                  <Heading2B
                    text={strings.resetPassword}
                    color={Colors.black}
                    padding={"0 0 44px 0"}
                    letterSpacing={"-0.02em"}
                  />
                  <Box className="form-group">
                    <FormControl
                      required
                      className="textfield"
                      sx={{ m: 0, width: "100%" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        placeholder="Enter Here"
                        id="outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange("password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <img alt="" src={eyeShowImg} />
                              ) : (
                                <img alt="" src={eyeNotshowImg} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label={strings.password}
                      />
                    </FormControl>
                  </Box>
                  <Box className="form-group">
                    <FormControl
                      required
                      className="textfield"
                      sx={{ m: 0, width: "100%" }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password2">
                        {strings.reEnterNewPassword}
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password2"
                        type={
                          valuesConfirm.showPasswordConfirm
                            ? "text"
                            : "password"
                        }
                        value={valuesConfirm.passwordConfirm}
                        onChange={handleChangeConfirm("password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordConfirm}
                              onMouseDown={handleMouseDownPasswordConfirm}
                              edge="end"
                            >
                              {valuesConfirm.showPasswordConfirm ? (
                                <img alt="" src={eyeShowImg} />
                              ) : (
                                <img alt="" src={eyeNotshowImg} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label={strings.reEnterNewPassword}
                        placeholder="Enter Here"
                      />
                    </FormControl>
                  </Box>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    pt={"208px"}
                  >
                    <PrimaryLarge
                      width={"310px"}
                      text={strings.resetPassword}
                      margin={"0 0 0px 0"}
                    />
                  </Box>
                </Box>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
