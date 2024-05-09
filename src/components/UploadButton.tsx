"use client";

import { useEffect, useState } from "react";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { uploadModalState } from "./UploadModal";

const UploadButton: React.FC = () => {
  const showUploadModal = useRecoilValue(uploadModalState);
  const setShowUploadModal = useSetRecoilState(uploadModalState);

  return (
    <div>
      <button
        className={`w-[40px] h-[40px] rounded-full bg-green-grey text-white z-[3] ${showUploadModal ? "" : "neu-button"}`}
        onClick={() => setShowUploadModal(!showUploadModal)}
      >
        <AddRoundedIcon fontSize="large" />
      </button>
    </div>
  );
};

export default UploadButton;
