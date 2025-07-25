import { useCallback, lazy, Suspense } from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { customTokens } from "./lib/custom-tokens";

import { Wrapper } from "./components/wrapper";
import { Screen } from "./components/screen";
import { ButtonWrapper } from "./components/button-wrapper";
import { Button } from "./components/button";
import { LoadingScreen } from "./components/loading-screen";
import { ControlsLoading } from "./components/controls/loading";

import { useCalculator } from "./hooks/useCalculator";
import { useLayoutSetting } from "./hooks/useLayoutSetting";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";

// Lazy load the Controls component
const Controls = lazy(() =>
  import("./components/controls").then(module => ({ default: module.Controls }))
);

const customTheme = {
  ...webLightTheme,
  ...customTokens,
};

function App() {
  const { layoutConfig, selectProps } = useLayoutSetting();
  const { handleButtonClick, displayValue, value, lastOperation } =
    useCalculator();

  // Enable keyboard navigation with stable callback
  const keyboardHandler = useCallback(
    (value: string) => {
      // Simulate button click for keyboard input
      const event = {
        target: { dataset: { value } },
      } as unknown as React.MouseEvent<HTMLButtonElement>;
      handleButtonClick(event);
    },
    [handleButtonClick]
  );

  useKeyboardNavigation({
    onButtonClick: keyboardHandler,
  });

  return (
    <>
      <FluentProvider theme={customTheme}>
        <LoadingScreen />
        <Suspense fallback={<ControlsLoading />}>
          <Controls selectProps={selectProps} />
        </Suspense>
        <Wrapper>
          <Screen
            lastOperation={
              lastOperation && value.length === 1 ? lastOperation : ""
            }
            value={displayValue}
          />
          <ButtonWrapper>
            {layoutConfig.flat().map((config, index) => (
              <Button key={index} {...config} onClick={handleButtonClick} />
            ))}
          </ButtonWrapper>
        </Wrapper>
      </FluentProvider>
    </>
  );
}

export default App;
