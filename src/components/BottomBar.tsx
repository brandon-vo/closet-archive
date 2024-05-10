"use client";

import UploadButton from "./UploadButton";
import HomeIcon from "@mui/icons-material/Home";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";

const BottomBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center absolute bottom-0 left-[50%] translate-x-[-50%] bg-bv-white bottom-bar-shadow w-[300px] md:w-[500px] h-[65px] rounded-t-xl px-8 md:px-28">
      <HomeIcon className="text-dark-grey w-[32px] h-[32px]" />
      <CheckroomIcon className="text-light-grey w-[32px] h-[32px] cursor-not-allowed" />
      <UploadButton />
      <CalendarMonthIcon className="text-light-grey w-[32px] h-[32px] cursor-not-allowed" />
      <SettingsIcon className="text-light-grey w-[32px] h-[32px] cursor-not-allowed" />
    </div>
  );
};

export default BottomBar;
