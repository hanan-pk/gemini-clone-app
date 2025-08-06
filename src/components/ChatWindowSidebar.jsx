"use client";
import { BsPencil, BsThreeDotsVertical } from "react-icons/bs";
import { CiShare2 } from "react-icons/ci";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { MdOutlinePushPin } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useChatStore } from "../store/useChatStore";
import { useSideBarStore } from "../store/useSideBarStore";
import { SlSettings } from "react-icons/sl";
import { RxCountdownTimer } from "react-icons/rx";
import { RiContactsLine } from "react-icons/ri";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import { PiLinkSimpleHorizontal } from "react-icons/pi";
import { PiNumberCircleOneBold } from "react-icons/pi";
import { MdOutlineFeedback } from "react-icons/md";
import { GrHelpBook } from "react-icons/gr";
import clsx from "clsx";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useDeviceType } from "../utils/useDeviceTypeUtils";

const ChatWindowSidebar = () => {
  const { isSideBarActive, toggleSideBar, showSideBar } = useSideBarStore(
    (state) => state
  );
  const { chats, addNewChat, deleteChat } = useChatStore((state) => state);
  const router = useRouter();
  const { id } = useParams();
  const { isTablet, isMobile } = useDeviceType();
  const handleCreate = () => {
    const newChat = {
      id: Date.now() + 1,
    };
    addNewChat(newChat);
    router.push(`/chatroom/${newChat.id}`);
    toast.success("New chat created!");
  };

  const handleDeleteChat = (chat) => {
    deleteChat(chat);
    router.push("/");
  };

  return (
    <div
      className={`dark:bg-[#282A2C] bg-[#F0F4F9] overflow-hidden z-[20] ${
        isSideBarActive
          ? "w-[280px]"
          : isTablet || isMobile
          ? "w-0"
          : "w-[80px]"
      } h-screen fixed left-0 transition-all duration-500`}
      onMouseEnter={showSideBar}
    >
      <div className="flex items-center justify-between px-8 py-6">
        <span
          className="text-xl dark:text-[#C4C7C5] text-[#111] cursor-pointer"
          onClick={toggleSideBar}
        >
          <RxHamburgerMenu />
        </span>
        {isSideBarActive && (
          <Link href={`/search`}>
            <span className="text-xl dark:text-[#C4C7C5] text-[#111] cursor-pointer">
              <IoMdSearch />
            </span>
          </Link>
        )}
      </div>
      <div className="pt-6 cursor-pointer px-4">
        <span
          className="text-[#6f7071] flex items-center text-md cursor-pointer dark:hover:bg-[#323537] hover:bg-[#D3E3FD] text-[#939495] p-2 px-4 rounded-full"
          onClick={handleCreate}
        >
          <FaRegEdit />{" "}
          {isSideBarActive && (
            <small className="text-[14px] ml-2"> New Chat</small>
          )}
        </span>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div
          className={`pt-8 text-[#939495]  ${
            isSideBarActive ? "opacity-100" : "opacity-0"
          } transition-opacity duration-100 `}
        >
          <span className="block px-8 py-6 ">Recent</span>
          <ul className="px-4">
            {[...chats]
              .sort((a, b) => {
                const aLast =
                  a.messages[a.messages.length - 1]?.timestamp || "";
                const bLast =
                  b.messages[b.messages.length - 1]?.timestamp || "";
                return new Date(bLast).getTime() - new Date(aLast).getTime();
              })
              .map((chat) => (
                <li
                  key={chat.id}
                  className={`mb-2 cursor-pointer ${
                    chat?.id == id &&
                    "bg-[#D3E3FD] text-[#0842A0] dark:bg-[#1F3760] dark:text-[#D3E3FD]"
                  } "hover:bg-[#E4E8ED] dark:hover:bg-[#323537]", p-2 px-4 rounded-full flex justify-between items-center group`}
                >
                  <Link
                    href={`/chatroom/${chat.id}`}
                    className="truncate overflow-hidden text-ellipsis whitespace-nowrap w-full"
                  >
                    {chat?.messages[0]?.text || chat.title}
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <small className="text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <BsThreeDotsVertical />
                      </small>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <CiShare2 /> Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MdOutlinePushPin />
                          Pin
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BsPencil /> Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteChat(chat)}
                        >
                          <FaRegTrashAlt />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ))}
          </ul>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="flex items-center text-[#939495] px-8 absolute bottom-6 cursor-pointer">
              <SlSettings />
              <small
                className={`text-lg ml-2 transition-opacity duration-100 ${
                  isSideBarActive ? "opacity-100 visible" : "opacity-0 hidden"
                }`}
              >
                {" "}
                Settings and help
              </small>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                <RxCountdownTimer /> Activity
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RiContactsLine />
                Saved info
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HiOutlinePuzzlePiece />
                Apps
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PiLinkSimpleHorizontal />
                Saved Links
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PiNumberCircleOneBold />
                View subscriptions
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MdOutlineFeedback />
                Send Feedbacks
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GrHelpBook />
                Help
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        ;
      </div>
    </div>
  );
};

export default ChatWindowSidebar;
