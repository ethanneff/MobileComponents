import { isTablet } from "react-native-device-detection";

const padding = {
  p0: 0,
  p1: 4,
  p2: 8,
  p3: 12,
  p4: 16,
  p5: 20,
  p6: 24,
  p7: 28,
  p8: 32,
  p9: 36,
  p10: 40,
  p11: 44,
  p12: 48,
  p13: 52,
  p14: 56,
  p15: 60,
  p16: 64,
  p17: 68,
  p18: 72,
  p19: 76,
  p20: 80,
  p21: 84,
  p22: 88,
  p23: 92,
  p24: 96,
  p25: 100,
  p26: 104,
  p27: 108,
  p28: 112,
  p29: 116,
  p30: 120,
  p31: 124,
  p32: 128,
  p33: 132,
  p34: 136,
  p35: 140,
  p36: 144,
  p37: 148,
  p38: 152,
  p39: 156,
  p40: 160,
  p41: 164,
  p42: 168,
  p43: 172,
  p44: 176,
  p45: 180,
  p46: 184,
  p47: 188,
  p48: 192,
  p49: 196,
  p50: 200,
  p51: 204,
  p52: 208,
  p53: 212,
  p54: 216,
  p55: 220,
  p56: 224,
  p57: 228,
  p58: 232,
  p59: 236,
  p60: 240,
};

const percents = {
  p25: 0.25,
  p27: 0.27,
  p50: 0.5,
  p75: 0.75,
  p100: 1.0,
};

const sizing = {
  horizontal: isTablet ? 40 : 30,
  vertical: isTablet ? 30 : 5,
  exerciseThumbnail: isTablet ? 120 : 80,
  touchableMinHeight: isTablet ? padding.p15 : padding.p12,
  touchablePaddingHorizontal: isTablet ? padding.p5 : padding.p4,
  gutter: isTablet ? padding.p8 : padding.p5,
  borderRadius: 6,
  inputBorderRadius: padding.p2,
  disabledOpacity: 0.5,
  activeOpacity: 0.2,
  margin: isTablet ? padding.p8 : padding.p4,
  maxContainerWidth: 500,
};

const color = {
  brand: "hsl(17, 99%, 59%)",
  primary50: "hsl(183, 59%, 92%)",
  primary200: "hsl(179, 58%, 67%)",
  primary800: "hsl(176, 100%, 25%)",
  neutral0: "hsl(255, 100%, 100%)",
  neutral25: "hsl(0, 0%, 98%)",
  neutral30: "hsl(0, 0%, 97%)",
  neutral50: "hsl(204, 15%, 94%)",
  neutral100: "hsl(198, 16%, 84%)",
  neutral300: "hsl(200, 16%, 62%)",
  neutral700: "hsl(199, 18%, 33%)",
  neutral900: "hsl(200, 19%, 18%)",
  success: "hsl(84, 67%, 75%)",
  info: "hsl(202, 100%, 90%)",
  error: "hsl(0, 65%, 51%)",
  rate: "hsl(44, 91%, 53%)",
  tertiary: "hsl(198, 77%, 25%)",
  overlay: "hsla(200, 19%, 18%, 0.8)",
  cardOverlay: "hsla(0, 0%, 100%, 0.6)",
  gradientStart: "hsl(44, 91%, 53%)",
  gradientEnd: "hsl(33, 94%, 56%)",
  notificationBackground: "hsl(0, 0%, 97%)",
  notificationBadge: "hsl(2, 100%, 50%)",
  pureBlack: "hsl(0, 0%, 0%)",
  lineSpacer: "hsla(0, 0%, 59%, 0.3)",
  transparent: "hsla(0, 0%, 0%, 0)",
};

const fontWeight = {
  regular: "BrandonText-Regular",
  medium: "BrandonText-Medium",
  bold: "BrandonText-Bold",
};

const fontSize = {
  h1: {
    fontSize: isTablet ? 48 : 36,
    lineHeight: isTablet ? 60 : 48,
    letterSpacing: isTablet ? -0.25 : -0.1,
    fontFamily: fontWeight.bold,
    color: color.neutral900,
  },
  h2: {
    fontSize: isTablet ? 36 : 28,
    lineHeight: isTablet ? 42 : 36,
    letterSpacing: isTablet ? 0 : 0.3,
    fontFamily: fontWeight.bold,
    color: color.neutral900,
  },
  h3: {
    fontSize: isTablet ? 28 : 22,
    lineHeight: isTablet ? 36 : 28,
    letterSpacing: 0,
    fontFamily: fontWeight.medium,
    color: color.neutral900,
  },
  h4: {
    fontSize: isTablet ? 22 : 20,
    lineHeight: isTablet ? 36 : 28,
    letterSpacing: 0,
    fontFamily: fontWeight.medium,
    color: color.neutral900,
  },
  h5: {
    fontSize: isTablet ? 18 : 17,
    lineHeight: isTablet ? 28 : 24,
    letterSpacing: 0,
    fontFamily: fontWeight.medium,
    color: color.neutral900,
  },
  body: {
    fontSize: isTablet ? 18 : 17,
    lineHeight: isTablet ? 28 : 24,
    letterSpacing: 0,
    fontFamily: fontWeight.regular,
    color: color.neutral900,
  },
  button: {
    fontSize: isTablet ? 16 : 15,
    lineHeight: isTablet ? 24 : 20,
    letterSpacing: isTablet ? 1 : 0.5,
    fontFamily: fontWeight.bold,
    color: color.neutral900,
  },
  caption: {
    fontSize: isTablet ? 18 : 15,
    lineHeight: isTablet ? 24 : 20,
    letterSpacing: 0,
    fontFamily: fontWeight.regular,
    color: color.neutral700,
  },
  overline: {
    fontSize: isTablet ? 16 : 14,
    lineHeight: isTablet ? 24 : 20,
    letterSpacing: isTablet ? 2 : 1.5,
    fontFamily: fontWeight.medium,
    color: color.neutral700,
  },
  link: {
    fontSize: isTablet ? 18 : 17,
    lineHeight: isTablet ? 28 : 24,
    letterSpacing: 0,
    fontFamily: fontWeight.regular,
    color: color.primary800,
  },
  error: {
    fontSize: isTablet ? 18 : 17,
    lineHeight: isTablet ? 28 : 24,
    letterSpacing: 0,
    fontFamily: fontWeight.regular,
    color: color.error,
  },
  tab: {
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0,
    fontFamily: fontWeight.regular,
    color: color.neutral700,
  },
};

const delay = {
  fadeIn: 200,
  fadeOut: 200,
  easeIn: 300,
  easeOut: 300,
  autoDismiss: 2500,
  levelUp: 6500,
};

export const colorWithOpacity = (colorValue: string, opacity = 0.5) => {
  const boundedOpacity = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity;
  const leading = 4;
  if (!colorValue.startsWith("hsl")) {
    return colorValue;
  }
  const substr = colorValue.substring(leading, colorValue.length - 1);
  return `hsla(${substr}, ${boundedOpacity})`;
};

const shadows = {
  dropShadow: {
    elevation: 3,
    shadowColor: color.overlay,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    zIndex: 3,
  },
};

const gradients = {
  progress: {
    colors: [color.success, color.primary200],
    start: { x: 0, y: 1 },
    end: { x: 1, y: 0 },
  },
  levelUp: {
    colors: [color.gradientStart, color.gradientEnd],
    start: { x: 0, y: 1 },
    end: { x: 1, y: 0 },
  },
  levelUpCard: {
    colors: [color.brand, color.gradientStart],
    start: { x: 0.3, y: 0 },
    end: { x: 0.9, y: 0 },
  },
  ftuSensorSetupDone: {
    colors: ["rgba(139, 224, 204, 1)", "rgba(178, 230, 170, 1)"],
    start: { x: 0, y: 0 },
    end: { x: 0.75, y: 0 },
  },
};

export default {
  delay,
  padding,
  percents,
  sizing,
  color,
  fontWeight,
  fontSize,
  shadows,
  gradients,
};
