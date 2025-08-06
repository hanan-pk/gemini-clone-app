"use client";
import { useSideBarStore } from "@/store/useSideBarStore";
import ChatWindowHeader from "../components/ChatWindowHeader";
import ChatWindowSidebar from "../components/ChatWindowSidebar";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useDeviceType } from "../utils/use DeviceTypeUtils";
import Head from "next/head";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isSideBarActive = useSideBarStore((state) => state.isSideBarActive);
  const isAuthRoute = pathname.startsWith("/login");
  const { isTablet, isMobile } = useDeviceType();

  function getDynamicPadding() {
    if (isTablet || isMobile) return "pl-0";
    if (isSideBarActive) return "pl-[300px]";
    if (!isAuthRoute) return "pl-[80px]";
    return "pl-0";
  }

  return (
    <html lang="en">
      <body>
        <Head>
          <title>Gemini - Clone</title>
        </Head>
        <Toaster />
        {!isAuthRoute && <ChatWindowSidebar />}
        <div
          className={`${getDynamicPadding()} transition-all duration-500 dark:bg-[#1B1C1D] bg-white h-screen`}
        >
          {!isAuthRoute && <ChatWindowHeader />}
          {children}
        </div>
      </body>
    </html>
  );
}
