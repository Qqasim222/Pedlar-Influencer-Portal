import styled from "styled-components";
import * as FontStyles from "./FontStyles";

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: ${(props) => props.flexWrap};
  align-items: center;
  justify-content: ${(props) => props.justifyContent};
  white-space: ${(props) => props.whiteSpace};
  max-height: ${(props) => props.maxHeight};
  overflow-x: ${(props) => props.overflowX};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  transition: transform 0.2s ease-in-out;
  &::after {
    content: "";
  }

  ::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1000px) {
    padding: ${(props) => props.mobilePadding};
  }
`;

LabelWrapper.defaultProps = {
  flexWrap: "wrap",
  justifyContent: "flex-start",
  whiteSpace: "normal",
  overflowX: "visible"
};

const LabelProvider = styled.div`
  font-family: ${(props) =>
    props.fontFamily
      ? props.fontFamily
      : FontStyles.getFontFamily(props.theme)};
  font-weight: ${(props) =>
    props.fontWeight
      ? props.fontWeight
      : FontStyles.getFontWeight(props.theme)};
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : FontStyles.getFontSize(props.theme)};
  text-align: ${(props) => props.textAlign};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  flex-grow: ${(props) => props.flexGrow};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  letter-spacing: ${(props) => props.letterSpacing};
  border-bottom: ${(props) => props.borderBottom};
  cursor: ${(props) => props.cursor};
  text-decoration: ${(props) => props.textDecoration};
  text-transform: ${(props) => props.textTransform};
  user-select: ${(props) => props.userSelect};
  classname: ${(props) => props.className};
  font-weight: ${(props) => props.fontWeight};
  opacity: ${(props) => props.opacity};
`;

LabelProvider.defaultProps = {
  theme: FontStyles.Body,
  textAlign: "left",
  padding: "initial",
  margin: "initial",
  flexGrow: 0,
  color: "black",
  lineHeight: "normal",
  letterSpacing: "normal",
  borderBottom: "medium none color",
  textDecoration: "none currentcolor solid"
};

/**
 * Represents a div with
 * font size: 40px
 * font name: Muli
 * font weight: Bold
 */
export function Heading1B(props) {
  return (
    <LabelProvider
      theme={FontStyles.Heading1B}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      textTransform={props.textTransform}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
      opacity={props.opacity}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 32px
 * font name: Muli
 * font weight: Bold
 */
export function Heading2B(props) {
  return (
    <LabelProvider
      theme={FontStyles.Heading2B}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      textTransform={props.textTransform}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
      opacity={props.opacity}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 22px
 * font name: Muli
 * font weight: Bold
 */
export function Heading3B(props) {
  return (
    <LabelProvider
      theme={FontStyles.Heading3B}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      textTransform={props.textTransform}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
      opacity={props.opacity}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 20px
 * font name: Muli
 * font weight: Bold
 */
export function Heading4B(props) {
  return (
    <LabelProvider
      theme={FontStyles.Heading4B}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      textTransform={props.textTransform}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
      opacity={props.opacity}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 18px
 * font name: Muli
 * font weight: SemiBold
 */
export function Heading5B(props) {
  return (
    <LabelProvider
      theme={FontStyles.Heading5B}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      textTransform={props.textTransform}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
      opacity={props.opacity}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 16px
 * font name: Muli
 * font weight: SemiBold
 */
export function Heading6S(props) {
  return (
    <LabelProvider
      theme={FontStyles.Heading6S}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      textTransform={props.textTransform}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
      opacity={props.opacity}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 14px
 * font name: Muli
 * font weight: Regular
 */
export function Body(props) {
  return (
    <LabelProvider
      theme={FontStyles.Body}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      textTransform={props.textTransform}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
      opacity={props.opacity}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 12px
 * font name: Muli
 * font weight: Regular
 */
export function LabelInput(props) {
  return (
    <LabelProvider
      theme={FontStyles.LabelInput}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      textTransform={props.textTransform}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
      opacity={props.opacity}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 14px
 * font name: Muli
 * font weight: Regular
 */
export function Link(props) {
  return (
    <LabelProvider
      theme={FontStyles.Body}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      textTransform={props.textTransform}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
      opacity={props.opacity}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 12px
 * font name: Muli
 * font weight: Regular
 */
export function Small(props) {
  return (
    <LabelProvider
      theme={FontStyles.small}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      textTransform={props.textTransform}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
      opacity={props.opacity}
      fontSize={props.fontSize}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 12px
 * font name: Muli
 * font weight: Regular
 */
export function Error(props) {
  return (
    <LabelProvider
      theme={FontStyles.error}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      textTransform={props.textTransform}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
      opacity={props.opacity}
    >
      {props.text}
    </LabelProvider>
  );
}

/**
 * Represents a div with
 * font size: 10px
 * font name: Muli
 * font weight: Regular
 */
export function Smallest(props) {
  return (
    <LabelProvider
      theme={FontStyles.smallest}
      fontWeight={props.fontWeight}
      textAlign={props.textAlign}
      padding={props.padding}
      margin={props.margin}
      flexGrow={props.flexGrow}
      color={props.color}
      lineHeight={props.lineHeight}
      letterSpacing={props.letterSpacing}
      textDecoration={props.textDecoration}
      textTransform={props.textTransform}
      cursor={props.cursor}
      onClick={props.onClick}
      className={props.className}
      opacity={props.opacity}
    >
      {props.text}
    </LabelProvider>
  );
}
