import { CALCULATOR_BUTTONS } from "./constants";

export interface ButtonConfig {
  value: string;
  styleType: "default" | "light" | "inverted";
  span?: "1" | "2";
  size?: "default" | "large";
}

export const buttonLayoutConfig: ButtonConfig[][] = [
  [
    {
      value: CALCULATOR_BUTTONS.CLEAR,
      styleType: "light",
    },
    {
      value: CALCULATOR_BUTTONS.INVERTED,
      styleType: "light",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.PERCENTAGE,
      styleType: "light",
    },
    {
      value: CALCULATOR_BUTTONS.DIVIDE,
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: CALCULATOR_BUTTONS.ONE,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.TWO,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.THREE,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.MULTIPLY,
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: CALCULATOR_BUTTONS.FOUR,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.FIVE,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.SIX,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.SUBTRACT,
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: CALCULATOR_BUTTONS.SEVEN,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.EIGHT,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.NINE,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.ADD,
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: CALCULATOR_BUTTONS.ZERO,
      styleType: "default",
      span: "2",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.DECIMAL,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.EQUALS,
      styleType: "inverted",
      size: "large",
    },
  ],
];

export const buttonCorrectedLayoutConfig: ButtonConfig[][] = [
  [
    {
      value: CALCULATOR_BUTTONS.CLEAR,
      styleType: "light",
    },
    {
      value: CALCULATOR_BUTTONS.INVERTED,
      styleType: "light",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.PERCENTAGE,
      styleType: "light",
    },
    {
      value: CALCULATOR_BUTTONS.DIVIDE,
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: CALCULATOR_BUTTONS.SEVEN,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.EIGHT,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.NINE,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.MULTIPLY,
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: CALCULATOR_BUTTONS.FOUR,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.FIVE,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.SIX,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.SUBTRACT,
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: CALCULATOR_BUTTONS.ONE,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.TWO,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.THREE,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.ADD,
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: CALCULATOR_BUTTONS.ZERO,
      styleType: "default",
      span: "2",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.DECIMAL,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.EQUALS,
      styleType: "inverted",
      size: "large",
    },
  ],
];

export const buttonAppleLayoutConfig: ButtonConfig[][] = [
  [
    {
      value: CALCULATOR_BUTTONS.DELETE,
      styleType: "light",
    },
    {
      value: CALCULATOR_BUTTONS.CLEAR,
      styleType: "light",
    },
    {
      value: CALCULATOR_BUTTONS.PERCENTAGE,
      styleType: "light",
    },
    {
      value: CALCULATOR_BUTTONS.DIVIDE,
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: CALCULATOR_BUTTONS.SEVEN,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.EIGHT,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.NINE,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.MULTIPLY,
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: CALCULATOR_BUTTONS.FOUR,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.FIVE,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.SIX,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.SUBTRACT,
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: CALCULATOR_BUTTONS.ONE,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.TWO,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.THREE,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.ADD,
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: CALCULATOR_BUTTONS.INVERTED,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.ZERO,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.DECIMAL,
      styleType: "default",
      size: "large",
    },
    {
      value: CALCULATOR_BUTTONS.EQUALS,
      styleType: "inverted",
      size: "large",
    },
  ],
];
