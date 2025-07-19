const wrapperWidth = 307;
const wrapperHeight = 473;
const wrapperLeftPadding = 20;
const wrapperTopPadding = 26;

const finalWrapperWidth = wrapperWidth - wrapperLeftPadding * 2;
const finalWrapperHeight = wrapperHeight - wrapperTopPadding * 2;

export const customTokens = {
  textShadow: "2px 2px 0px rgba(0, 0, 0, 0.4)",
  wrapperBackground: "rgba(17, 41, 79, 1)",
  wrapperWidth: `${finalWrapperWidth}px`,
  wrapperHeight: `${finalWrapperHeight}px`,
  wrapperPaddingTop: `${wrapperTopPadding}px`,
  wrapperPaddingLeft: `${wrapperLeftPadding}px`,
  defaultBackground: "rgba(24, 33, 60, 1)",
  defaultBackgroundHover: "rgba(12, 18, 36, 1)",
  lightBackground: "rgba(25, 52, 93, 1)",
  lightBackgroundHover: "rgba(40, 80, 150, 1)",
  invertedBackground: "rgba(151, 50, 63, 1)",
  invertedBackgroundHover: "rgba(230, 80, 100, 1)",
  screenTextColor: "rgba(255, 255, 255, 1)",
  screenHeight: "81px",
  buttonMinWidth: "61px",
  buttonMinHeight: "61px",
};
