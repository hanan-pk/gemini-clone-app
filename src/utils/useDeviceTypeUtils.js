import { useEffect, useState } from "react";

export function useDeviceType() {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;

      setDevice({
        isMobile: width <= 767,
        isTablet: width > 767 && width <= 1024,
        isDesktop: width > 1024,
      });
    };

    updateDeviceType(); // Set on mount
    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  // Destructure device before returning
  const { isMobile, isTablet, isDesktop } = device;
  return { isMobile, isTablet, isDesktop };
}
