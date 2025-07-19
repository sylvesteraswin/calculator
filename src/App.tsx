import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { customTokens } from "./lib/custom-tokens";

import { Wrapper } from "./components/wrapper";
import { Screen } from "./components/screen";
import { ButtonWrapper } from "./components/button-wrapper";
import { Button } from "./components/button";
import { LoadingScreen } from "./components/loading-screen";
import { Controls } from "./components/controls";

import { useCalculator } from "./hooks/useCalculator";
import { useLayoutSetting } from "./hooks/useLayoutSetting";

const customTheme = {
  ...webLightTheme,
  ...customTokens,
};

function App() {
  const { layoutConfig, correctLayoutProps } = useLayoutSetting();
  const { handleButtonClick, displayValue, value, lastOperation } =
    useCalculator();

  return (
    <>
      <FluentProvider theme={customTheme}>
        <LoadingScreen />
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
        <Controls correctLayoutProps={correctLayoutProps} />
      </FluentProvider>
    </>
  );
}

export default App;
