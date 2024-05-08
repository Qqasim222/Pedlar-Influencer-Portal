/**
 * Size: 40px
 * Font style: Inter
 * Weight: Bold
 */
export const Heading1B = "heading1B";

/**
 * Size: 32px
 * Font style: Inter
 * Weight: Bold
 */
export const Heading2B = "heading2B";

/**
 * Size: 24px
 * Font style: Inter
 * Weight: Bold
 */
export const Heading3B = "heading3B";

/**
 * Size: 20px
 * Font style: Inter
 * Weight: Bold
 */
export const Heading4B = "heading4B";

/**
 * Size: 18px
 * Font style: Inter
 * Weight: SemiBold
 */
export const Heading5B = "heading5B";

/**
 * Size: 16px
 * Font style: Inter
 * Weight: SemiBold
 */
export const Heading6S = "heading6S";

/**
 * Size: 14px
 * Weight: Regular
 */
export const Body = "body";

/**
 * Size: 14px
 * Weight: Regular
 */
export const LabelInput = "labelInput";

/**
 * Size: 12px
 * Weight: Regular
 */
export const small = "small";

/**
 * Size: 12px
 * Weight: Regular
 */
export const error = "error";

/**
 * Size: 10px
 * Weight: Regular
 */
export const smallest = "smallest";

export function getFontFamily(fontStyle) {
  return "Inter";
}

export function getFontSize(fontStyle) {
  switch (fontStyle) {
    case Heading1B:
      return "40px";
    case Heading2B:
      return "32px";
    case Heading3B:
      return "22px";
    case Heading4B:
      return "20px";
    case Heading5B:
      return "18px";
    case Heading6S:
      return "16px";
    case Body:
      return "14px";
    case LabelInput:
      return "12px";
    case small:
      return "12px";
    case error:
      return "12px";
    case smallest:
      return "10px";
    default:
      return;
  }
}

export function getFontWeight(fontStyle) {
  switch (fontStyle) {
    case Heading1B:
      return "700";
    case Heading2B:
      return "600";
    case Heading3B:
      return "600";
    case Heading4B:
      return "600";
    case Heading5B:
      return "600";
    case Heading6S:
      return "600";
    case Body:
      return "400";
    case LabelInput:
      return "400";
    case small:
      return "400";
    case error:
      return "400";
    case smallest:
      return "400";
    default:
      return;
  }
}
