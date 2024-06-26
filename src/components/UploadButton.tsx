"use client";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { uploadModalState } from "./UploadModal/UploadModal";

const UploadButton: React.FC = () => {
  const showUploadModal = useRecoilValue(uploadModalState);
  const setShowUploadModal = useSetRecoilState(uploadModalState);

  return (
    <div>
      <button
        className={`w-[40px] h-[40px] rounded-full bg-green-grey text-white z-[3] hover:brightness-95 transition`}
        onClick={() => setShowUploadModal(!showUploadModal)}
      >
        <AddRoundedIcon fontSize="large" />
      </button>
    </div>
  );
};

export default UploadButton;
