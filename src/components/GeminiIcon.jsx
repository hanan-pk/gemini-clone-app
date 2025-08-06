import Image from "next/image";

const GeminiIcon = ({ size = 30, isLoading }) => {
  return (
    <Image
      src={
        "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/google-gemini.svg"
      }
      width={size}
      height={size}
      alt="Gemini Logo"
    />
  );
};

export default GeminiIcon;
