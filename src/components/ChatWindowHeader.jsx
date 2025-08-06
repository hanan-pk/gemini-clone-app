import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useRouter } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useSideBarStore } from "../store/useSideBarStore";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDeviceType } from "../utils/useDeviceTypeUtils";

const ChatWindowHeader = () => {
  const router = useRouter();
  const { toggleSideBar } = useSideBarStore((state) => state);
  const { isMobile, isTablet } = useDeviceType();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <div className="flex items-center justify-between p-4 w-full">
      <div className="flex items-center">
        {isTablet ||
          (isMobile && (
            <span
              className="text-xl dark:text-[#C4C7C5] text-[#111] cursor-pointer mr-4"
              onClick={toggleSideBar}
            >
              <RxHamburgerMenu />
            </span>
          ))}
        <h2 className="text-2xl dark:text-[#C4C7C5] text-[#575B5F]">Gemini</h2>
      </div>
      <div className="flex items-center">
        <ThemeToggle />
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="h-[40px] w-[40px] cursor-pointer ml-4">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div onClick={handleLogout} className="cursor-pointer">
              Logout
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ChatWindowHeader;
