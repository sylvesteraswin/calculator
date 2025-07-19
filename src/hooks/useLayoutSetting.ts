import type { SelectProps } from "@fluentui/react-components";
import { useState, useMemo } from "react";

import {
  buttonLayoutConfig,
  buttonCorrectedLayoutConfig,
  buttonAppleLayoutConfig,
} from "../lib/button-config";

type LayoutType = "default" | "corrected" | "apple";

export const useLayoutSetting = () => {
  const [layoutType, setLayoutType] = useState<LayoutType>("default");

  const layoutConfig = useMemo(() => {
    switch (layoutType) {
      case "corrected":
        return buttonCorrectedLayoutConfig;
      case "apple":
        return buttonAppleLayoutConfig;
      default:
        return buttonLayoutConfig;
    }
  }, [layoutType]);

  const handleLayoutChange: SelectProps["onChange"] = (_, data) => {
    setLayoutType(data.value as LayoutType);
  };

  const selectProps: SelectProps = useMemo(() => {
    return {
      value: layoutType,
      onChange: handleLayoutChange,
    };
  }, [layoutType]);

  return { layoutConfig, selectProps };
};
