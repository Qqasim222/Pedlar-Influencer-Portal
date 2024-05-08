import * as Colors from "./Colors";
import * as FontStyles from "./FontStyles";
import styled, { css, keyframes } from "styled-components/macro";
export const ButtonWrapper = styled.div`
  position: relative;
  margin: ${(props) => props.margin};
  width: 100%;
`;

const fadeInKeyframe = keyframes`
  from {opacity: 0.1;}
  to {opacity: 1;}
`;

const animation = (props) =>
  css`
    ${fadeInKeyframe} 0.6s linear;
  `;

const ButtonProvider = styled.button`
  font-weight: ${(props) => FontStyles.getFontWeight(FontStyles.Heading6S)};
  font-family: ${(props) => FontStyles.getFontFamily(FontStyles.Body)};
  font-size: ${(props) => props.fontSize};
  Height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  flex-grow: ${(props) => props.flexGrow};
  background: ${(props) => props.background};
  border-radius: ${(props) => props.borderRadius};
  border-width: ${(props) => props.borderWidth};
  border-color: ${(props) => props.borderColor};
  color: ${(props) => props.color};
  text-align: ${(props) => props.textAlign};
  width: ${(props) => props.width};
  white-space: nowrap;
  text-decoration: ${(props) => props.textDecoration};
  cursor: pointer;
  className: ${(props) => props.className};
  font-size: ${(props) => props.fontSize}
  font-weight: ${(props) => props.fontWeight}
  &:focus {
    animation: ${(props) => (props.fadeIn === true ? animation : "")};
    outline: none;
  }

`;

ButtonProvider.defaultProps = {
  theme: FontStyles.Body,
  padding: "initial",
  mobileMargin: "initial",
  margin: "initial",
  flexGrow: 0,
  background: "linear-gradient(96.22deg, #13E173 27.28%, #02CDFF 110.27%)",
  borderWidth: "0",
  borderColor: "initial",
  borderRadius: "0",
  color: "initial",
  textAlign: "initial",
  width: "100%",
  height: "initial",
  mobileWidth: "auto",
  fadeIn: "false",
  disabled: false,
};
/**
 * Represents a Semibold button with
 * font size: 16px
 * font name: Muli
 * font weight: Semibold
 * background color: Primary
 * padding: 16px 40px
 */
export function PrimaryLarge(props) {
  return (
    <ButtonProvider
      fontSize={"16px"}
      fontWeight={props.fontWeight}
      padding={"10px 16px"}
      margin={props.margin}
      flexGrow={props.flexGrow}
      background={Colors.black1c}
      color={Colors.grayf9}
      borderRadius={"666px"}
      borderWidth={"0px"}
      textAlign={"center"}
      width={props.width}
      height={"44px"}
      boxShadow={"none"}
      fadeIn={props.fadeIn}
      onClick={props.onClick}
      mobileWidth={props.mobileWidth}
      mobileMargin={props.mobileMargin}
      disabled={props.disabled}
      className={props.className}
    >
      {" "}
      {props.text}{" "}
    </ButtonProvider>
  );
}

/**
 * Represents a Semibold button with
 * font size: 14px
 * font name: Muli
 * font weight: Semibold
 * background color: Primary
 * padding: 8px 16px
 */
export function PrimarySmall(props) {
  return (
    <ButtonProvider
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
      padding={"8px 16px"}
      margin={props.margin}
      flexGrow={props.flexGrow}
      background={Colors.black1c}
      color={Colors.grayf9}
      borderRadius={"666px"}
      borderWidth={"0px"}
      textAlign={"center"}
      width={props.width}
      height={"36px"}
      boxShadow={"none"}
      fadeIn={props.fadeIn}
      onClick={props.onClick}
      mobileWidth={props.mobileWidth}
      mobileMargin={props.mobileMargin}
      disabled={props.disabled}
      className={props.className}
    >
      {" "}
      {props.text}{" "}
    </ButtonProvider>
  );
}

/**
 * Represents a Semibold button with
 * font size: 16px
 * font name: Muli
 * font weight: Semibold
 * background color: Primary
 * padding: 16px 40px
 */
export function PrimaryOutlineLarge(props) {
  return (
    <ButtonProvider
      fontSize={"16px"}
      fontWeight={props.fontWeight}
      padding={"10px 16px"}
      margin={props.margin}
      flexGrow={props.flexGrow}
      background={"transparent"}
      color={Colors.gray49}
      borderRadius={"666px"}
      borderWidth={"1px"}
      borderColor={Colors.grayee}
      textAlign={"center"}
      width={props.width}
      height={"40px"}
      boxShadow={"none"}
      fadeIn={props.fadeIn}
      onClick={props.onClick}
      mobileWidth={props.mobileWidth}
      mobileMargin={props.mobileMargin}
      disabled={props.disabled}
      className={props.className}
    >
      {" "}
      {props.text}{" "}
    </ButtonProvider>
  );
}
/**
 * Represents a Semibold button with
 * font size: 14px
 * font name: Muli
 * font weight: Semibold
 * background color: Primary
 * padding: 16px 40px
 */
export function PrimaryOutlineSmall(props) {
  return (
    <ButtonProvider
      fontSize={"14px"}
      fontWeight={props.fontWeight}
      padding={"8px 16px"}
      margin={props.margin}
      flexGrow={props.flexGrow}
      background={"transparent"}
      color={Colors.gray49}
      borderRadius={"666px"}
      borderWidth={"1px"}
      borderColor={Colors.grayee}
      textAlign={"center"}
      width={props.width}
      height={"36px"}
      boxShadow={"none"}
      fadeIn={props.fadeIn}
      onClick={props.onClick}
      mobileWidth={props.mobileWidth}
      mobileMargin={props.mobileMargin}
      disabled={props.disabled}
      className={props.className}
    >
      {" "}
      {props.text}{" "}
    </ButtonProvider>
  );
}

/**
 * Represents a Semibold button with
 * font size: 16px
 * font name: Muli
 * font weight: Semibold
 * background color: grayf8
 * padding: 16px 40px
 */
export function BackLarge(props) {
  return (
    <ButtonProvider
      fontSize={"16px"}
      fontWeight={props.fontWeight}
      padding={"10px 16px"}
      margin={props.margin}
      flexGrow={props.flexGrow}
      background={"rgba(28, 27, 31, 0.08)"}
      color={"rgba(28, 27, 31, .38)"}
      borderRadius={"666px"}
      borderWidth={"0px"}
      textAlign={"center"}
      width={props.width}
      height={"40px"}
      boxShadow={"none"}
      fadeIn={props.fadeIn}
      onClick={props.onClick}
      mobileWidth={props.mobileWidth}
      mobileMargin={props.mobileMargin}
      disabled={props.disabled}
      className={props.className}
    >
      {" "}
      {props.text}{" "}
    </ButtonProvider>
  );
}

/**
 * Represents a Semibold button with
 * font size: 16px
 * font name: Muli
 * font weight: Semibold
 * background color: white
 * padding: 16px 40px
 */
export function CancelLarge(props) {
  return (
    <ButtonProvider
      fontSize={props?.fontWeight ? props?.fontWeight : "16px"}
      fontWeight={props.fontWeight}
      padding={"10px 16px"}
      margin={props.margin}
      flexGrow={props.flexGrow}
      background={
        props?.background ? props.background : "rgba(249, 246, 242, 0.4)"
      }
      color={props?.color ? props?.color : Colors.black1c}
      borderRadius={"666px"}
      borderWidth={"0px"}
      textAlign={"center"}
      width={props.width}
      height={props?.height ? props?.height : "40px"}
      boxShadow={"none"}
      fadeIn={props.fadeIn}
      onClick={props.onClick}
      mobileWidth={props.mobileWidth}
      mobileMargin={props.mobileMargin}
      disabled={props.disabled}
      className={props.className}
    >
      {" "}
      {props.text}{" "}
    </ButtonProvider>
  );
}

/**
 * Represents a Semibold button with
 * font size: 16px
 * font name: Muli
 * font weight: Semibold
 * background color: Primary
 * padding: 16px 40px
 */
export function PrimaryOutlineBlack(props) {
  return (
    <ButtonProvider
      fontSize={"16px"}
      fontWeight={props.fontWeight}
      padding={"10px 16px"}
      margin={props.margin}
      flexGrow={props.flexGrow}
      background={Colors.white}
      color={Colors.black1c}
      borderRadius={"666px"}
      borderWidth={"1px"}
      borderColor={Colors.black1c}
      textAlign={"center"}
      width={props.width}
      height={"40px"}
      boxShadow={"none"}
      fadeIn={props.fadeIn}
      onClick={props.onClick}
      mobileWidth={props.mobileWidth}
      mobileMargin={props.mobileMargin}
      disabled={props.disabled}
      className={props.className}
    >
      {" "}
      {props.text}{" "}
    </ButtonProvider>
  );
}

/**
 * Represents a Semibold button with
 * font size: 16px
 * font name: Muli
 * font weight: Semibold
 * background color: Primary
 * padding: 16px 40px
 */
export function ShareLarge(props) {
  return (
    <ButtonProvider
      fontSize={"16px"}
      fontWeight={props.fontWeight}
      padding={"16px 16px"}
      margin={props.margin}
      flexGrow={props.flexGrow}
      background={Colors.black1c}
      color={Colors.grayf9}
      borderRadius={"16px"}
      borderWidth={"0px"}
      textAlign={"end"}
      width={props.width}
      height={"52px"}
      boxShadow={
        "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3);"
      }
      fadeIn={props.fadeIn}
      onClick={props.onClick}
      mobileWidth={props.mobileWidth}
      mobileMargin={props.mobileMargin}
      disabled={props.disabled}
      className={props.className}
    >
      {" "}
      {props.text}{" "}
    </ButtonProvider>
  );
}
