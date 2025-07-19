import { useState, useEffect } from "react";

export const useAppLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Track when critical resources are loaded
    const checkResources = () => {
      // Check if React has mounted and calculator is ready
      const rootElement = document.getElementById("root");
      const hasCalculatorContent =
        rootElement && rootElement.children.length > 0;

      if (hasCalculatorContent) {
        setLoadingProgress(100);
        setTimeout(() => setIsLoading(false), 500);
      } else {
        // Simulate progress based on time elapsed
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / 2000) * 100, 95); // Max 95% until ready
        setLoadingProgress(progress);
        setTimeout(checkResources, 100);
      }
    };

    const startTime = Date.now();
    const timer = setTimeout(checkResources, 100);

    return () => clearTimeout(timer);
  }, []);

  return { isLoading, loadingProgress };
};
