import type { SwitchProps } from "@fluentui/react-components";
import { useState, useMemo } from "react";

import type { ButtonConfig } from "../lib/button-config";
import {
  buttonLayoutConfig,
  buttonCorrectedLayoutConfig,
} from "../lib/button-config";

export const useLayoutSetting = () => {
  const [layoutConfig, setLayoutConfig] =
    useState<ButtonConfig[][]>(buttonLayoutConfig);
  const [correctLayoutValue, setCorrectLayoutValue] = useState(false);

  const handleCorrectLayoutChange: SwitchProps["onChange"] = (_, data) => {
    setCorrectLayoutValue(data.checked);
    setLayoutConfig(
      data.checked ? buttonCorrectedLayoutConfig : buttonLayoutConfig
    );
  };

  const correctLayoutProps: SwitchProps = useMemo(() => {
    return {
      checked: correctLayoutValue,
      onChange: handleCorrectLayoutChange,
    };
  }, [correctLayoutValue]);

  return { layoutConfig, correctLayoutProps };
};
