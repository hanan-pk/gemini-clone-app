// components/ThemeToggle.js
import { useTheme } from "../hooks/useTheme";
import { IoIosSunny } from "react-icons/io";
import { FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer text-sm px-4 py-4 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      {theme === "dark" ? <IoIosSunny /> : <FiMoon />}
    </button>
  );
}
