"use client";

import { useRef, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";
import imglyRemoveBackground from "@imgly/background-removal";
import UploadForm from "./UploadForm";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

interface UploadModalProps {
  userID: string;
}

export const uploadModalState = atom({
  key: "uploadModalState",
  default: false,
});

export const refreshItemsState = atom({
  key: "refreshItemsState",
  default: false,
});

const UploadModal: React.FC<UploadModalProps> = ({ userID }) => {
  const showUploadModal = useRecoilValue(uploadModalState);
  const setShowUploadModal = useSetRecoilState(uploadModalState);
  const setRefreshItems = useSetRecoilState(refreshItemsState);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [itemData, setItemData] = useState({
    item_name: "",
    category: "",
    colour: "",
    brand: "",
  });

  // const cameraRef = useRef<HTMLVideoElement>(null);
  //
  // const handleCameraCapture = async () => {
  //   try {
  //     const constraints = { video: { facingMode: "environment" } };
  //     const stream = await navigator.mediaDevices.getUserMedia(constraints);
  //     if (cameraRef.current) {
  //       cameraRef.current.srcObject = stream;
  //       cameraRef.current.play();
  //     }
  //   } catch (error) {
  //     console.error("Error accessing camera:", error);
  //   }
  // };

  // const handleTakePhoto = () => {
  //   if (cameraRef.current) {
  //     const canvas = document.createElement("canvas");
  //     canvas.width = cameraRef.current.videoWidth;
  //     canvas.height = cameraRef.current.videoHeight;
  //     canvas.getContext("2d")?.drawImage(cameraRef.current, 0, 0);
  //     const photoDataUrl = canvas.toDataURL("image/png");
  //     setUploadedImage(photoDataUrl);
  //     imglyRemoveBackground(photoDataUrl).then((blob: Blob) => {
  //       const processedImageUrl = URL.createObjectURL(blob);
  //       setProcessedImage(processedImageUrl);
  //     });
  //   }
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target && event.target.result) {
          const imageSrc = event.target.result as string;
          setUploadedImage(imageSrc);
          imglyRemoveBackground(imageSrc, { model: "small" }).then(
            (blob: Blob) => {
              const processedImageUrl = URL.createObjectURL(blob);
              setProcessedImage(processedImageUrl);
            },
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmUpload = () => {
    if (!itemData.category) {
      return;
    }
    if (processedImage) {
      const supabase = createClient();
      fetch(processedImage)
        .then((response) => response.blob())
        .then((blob) => {
          const fileName = uuidv4();
          const file = new File([blob], fileName, { type: "image/png" });
          supabase.storage
            .from("closet")
            .upload(userID + "/" + fileName, file)
            .then(({ data, error }) => {
              if (error) {
                console.log("Error uploading file:", error);
              } else {
                // console.log("File uploaded:", data);
                // Supabase storage metadata cannot be used so we need to store the item data in a separate table
                supabase
                  .from("item_data")
                  .insert([
                    {
                      // @ts-ignore
                      id: data.id, // file name identifier
                      owner: userID,
                      item_name: itemData.item_name, // users custom name of the item
                      category: itemData.category, // hoodie, shirt, pants, etc.
                      colour: itemData.colour,
                      brand: itemData.brand,
                    },
                  ])
                  .select()
                  .then(({ data, error }) => {
                    if (error) {
                      console.log("Error inserting data:", error);
                    } else {
                      // console.log("Data inserted:", data);
                      setRefreshItems(true);
                    }
                  });
              }
            });
        });
      handleClearUpload();
      setShowUploadModal(false);
    }
  };

  const handleClearUpload = () => {
    setUploadedImage(null);
    setProcessedImage(null);
    setItemData({
      item_name: "",
      category: "",
      colour: "",
      brand: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <>
      {showUploadModal && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[10] bg-black/[0.5]"
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="absolute flex flex-col items-center justify-center bg-bv-white shadow-lg rounded-xl w-[90vw] lg:w-[950px] h-[90vh] md:h-[70vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full h-full p-4">
              <div className="flex flex-col gap-4 md:gap-2 md:justify-around w-full">
                <div className="flex gap-2">
                  <button className="bg-lake-blue rounded-md p-3 text-bv-white button-shadow hover:brightness-95 transition cursor-pointer w-fit h-fit">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <UploadIcon />
                    </label>
                  </button>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {/* <button
                    className="bg-calm-violet rounded-md p-3 text-bv-white button-shadow hover:brightness-95 transition cursor-pointer w-fit h-fit cursor-pointer"
                    onClick={handleCameraCapture}
                  >
                    <PhotoCameraIcon />
                  </button>
                  <button
                    className="bg-calm-violet rounded-md p-3 text-bv-white button-shadow hover:brightness-95 transition cursor-pointer w-fit h-fit cursor-pointer"
                    onClick={handleTakePhoto}
                  >
                    Take Photo
                  </button>
                  <video ref={cameraRef} className="hidden"></video> */}
                  <button
                    className={`${processedImage ? "bg-red-400 hover:brightness-95 cursor-pointer" : "bg-light-grey cursor-not-allowed"} rounded-md p-3 text-bv-white button-shadow transition w-fit h-fit`}
                    onClick={handleClearUpload}
                    disabled={!processedImage}
                  >
                    <DeleteIcon />
                  </button>
                </div>
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <img
                    className="h-[45vw] min-h-[300px] lg:h-[480px] max-h-[300px] md:max-h-[100%] md:min-h-[360px] aspect-square bg-calm-grey"
                    src={processedImage ?? uploadedImage ?? undefined}
                  />
                  <UploadForm
                    itemData={itemData}
                    processedImage={processedImage}
                    uploadedImage={uploadedImage}
                    handleInputChange={handleInputChange}
                    handleConfirmUpload={handleConfirmUpload}
                    setShowUploadModal={setShowUploadModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadModal;
