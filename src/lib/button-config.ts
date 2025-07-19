export interface ButtonConfig {
  value: string;
  styleType: "default" | "light" | "inverted";
  span?: "1" | "2";
  size?: "default" | "large";
}

export const buttonLayoutConfig: ButtonConfig[][] = [
  [
    {
      value: "AC",
      styleType: "light",
    },
    {
      value: "±",
      styleType: "light",
      size: "large",
    },
    {
      value: "%",
      styleType: "light",
    },
    {
      value: "÷",
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: "1",
      styleType: "default",
      size: "large",
    },
    {
      value: "2",
      styleType: "default",
      size: "large",
    },
    {
      value: "3",
      styleType: "default",
      size: "large",
    },
    {
      value: "×",
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: "4",
      styleType: "default",
      size: "large",
    },
    {
      value: "5",
      styleType: "default",
      size: "large",
    },
    {
      value: "6",
      styleType: "default",
      size: "large",
    },
    {
      value: "-",
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: "7",
      styleType: "default",
      size: "large",
    },
    {
      value: "8",
      styleType: "default",
      size: "large",
    },
    {
      value: "9",
      styleType: "default",
      size: "large",
    },
    {
      value: "+",
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: "0",
      styleType: "default",
      span: "2",
      size: "large",
    },
    {
      value: ".",
      styleType: "default",
      size: "large",
    },
    {
      value: "=",
      styleType: "inverted",
      size: "large",
    },
  ],
];

export const buttonCorrectedLayoutConfig: ButtonConfig[][] = [
  [
    {
      value: "AC",
      styleType: "light",
    },
    {
      value: "±",
      styleType: "light",
      size: "large",
    },
    {
      value: "%",
      styleType: "light",
    },
    {
      value: "÷",
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: "7",
      styleType: "default",
      size: "large",
    },
    {
      value: "8",
      styleType: "default",
      size: "large",
    },
    {
      value: "9",
      styleType: "default",
      size: "large",
    },
    {
      value: "×",
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: "4",
      styleType: "default",
      size: "large",
    },
    {
      value: "5",
      styleType: "default",
      size: "large",
    },
    {
      value: "6",
      styleType: "default",
      size: "large",
    },
    {
      value: "-",
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: "1",
      styleType: "default",
      size: "large",
    },
    {
      value: "2",
      styleType: "default",
      size: "large",
    },
    {
      value: "3",
      styleType: "default",
      size: "large",
    },
    {
      value: "+",
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: "0",
      styleType: "default",
      span: "2",
      size: "large",
    },
    {
      value: ".",
      styleType: "default",
      size: "large",
    },
    {
      value: "=",
      styleType: "inverted",
      size: "large",
    },
  ],
];

export const buttonAppleLayoutConfig: ButtonConfig[][] = [
  [
    {
      value: "DEL",
      styleType: "light",
    },
    {
      value: "AC",
      styleType: "light",
    },
    {
      value: "%",
      styleType: "light",
    },
    {
      value: "÷",
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: "7",
      styleType: "default",
      size: "large",
    },
    {
      value: "8",
      styleType: "default",
      size: "large",
    },
    {
      value: "9",
      styleType: "default",
      size: "large",
    },
    {
      value: "×",
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: "4",
      styleType: "default",
      size: "large",
    },
    {
      value: "5",
      styleType: "default",
      size: "large",
    },
    {
      value: "6",
      styleType: "default",
      size: "large",
    },
    {
      value: "-",
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: "1",
      styleType: "default",
      size: "large",
    },
    {
      value: "2",
      styleType: "default",
      size: "large",
    },
    {
      value: "3",
      styleType: "default",
      size: "large",
    },
    {
      value: "+",
      styleType: "inverted",
      size: "large",
    },
  ],
  [
    {
      value: "±",
      styleType: "default",
      size: "large",
    },
    {
      value: "0",
      styleType: "default",
      size: "large",
    },
    {
      value: ".",
      styleType: "default",
      size: "large",
    },
    {
      value: "=",
      styleType: "inverted",
      size: "large",
    },
  ],
];
