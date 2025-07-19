import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { customTokens } from "./lib/custom-tokens";
import { buttonLayoutConfig } from "./lib/button-config";

import { Wrapper } from "./components/wrapper";
import { Screen } from "./components/screen";
import { ButtonWrapper } from "./components/button-wrapper";
import { Button } from "./components/button";

import { useCalculator } from "./hooks/useCalculator";

const customTheme = {
  ...webLightTheme,
  ...customTokens,
};

function App() {
  const { handleButtonClick, displayValue, value, lastOperation } =
    useCalculator();

  return (
    <FluentProvider theme={customTheme}>
      <Wrapper>
        <Screen
          lastOperation={
            lastOperation && value.length === 1 ? lastOperation : ""
          }
          value={displayValue}
        />
        <ButtonWrapper>
          {buttonLayoutConfig.flat().map((config, index) => (
            <Button key={index} {...config} onClick={handleButtonClick} />
          ))}
        </ButtonWrapper>
      </Wrapper>
    </FluentProvider>
  );
}

export default App;
