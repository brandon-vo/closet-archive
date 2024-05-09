"use client";

import { useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";
import imglyRemoveBackground from "@imgly/background-removal";
import UploadForm from "./UploadForm";

interface UploadModalProps {
  userID: string;
}

export const uploadModalState = atom({
  key: "uploadModalState",
  default: false,
});

const UploadModal: React.FC<UploadModalProps> = ({ userID }) => {
  const showUploadModal = useRecoilValue(uploadModalState);
  const setShowUploadModal = useSetRecoilState(uploadModalState);
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    undefined,
  );
  const [processedImage, setProcessedImage] = useState<string | undefined>(
    undefined,
  );
  const [itemData, setItemData] = useState({
    item_name: "",
    category: "",
    colour: "",
    brand: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target && event.target.result) {
          const imageSrc = event.target.result as string;
          setUploadedImage(imageSrc);
          imglyRemoveBackground(imageSrc).then((blob: Blob) => {
            const processedImageUrl = URL.createObjectURL(blob);
            setProcessedImage(processedImageUrl);
            console.log("done processing!!");
          });
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
                console.log("File uploaded:", data);
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
                      console.log("Data inserted:", data);
                    }
                  });
              }
            });
        });
      handleClearUpload();
    }
  };

  const handleClearUpload = () => {
    setUploadedFile(undefined);
    setUploadedImage(undefined);
    setProcessedImage(undefined);
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
            className="absolute flex flex-col items-center justify-center bg-bv-white shadow-lg rounded-xl w-[80vw] lg:w-[950px] h-[85vh] md:h-[70vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full h-full p-4">
              <div className="flex flex-col gap-4 md:gap-0 md:justify-around w-full">
                <div className="bg-green-grey rounded-md px-4 py-2 text-bv-white button-shadow hover:brightness-95 transition cursor-pointer w-fit h-fit">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer"
                    style={{ textShadow: "#4A4E54 1px 0 7px" }}
                  >
                    Upload Image
                  </label>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <img
                    className="h-[50vw] lg:h-[500px] max-h-[300px] md:max-h-[100%] md:min-h-[360px] aspect-square bg-calm-grey"
                    src={processedImage ?? uploadedImage}
                  />
                  <UploadForm
                    itemData={itemData}
                    processedImage={processedImage}
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
