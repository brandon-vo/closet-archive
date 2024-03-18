"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import imglyRemoveBackground from "@imgly/background-removal";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseIcon from "@mui/icons-material/Close";

interface UploadProps {
  userID: string;
}

const Upload: React.FC<UploadProps> = ({ userID }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
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
    setUploadedFile(null);
    setUploadedImage(null);
    setProcessedImage(null);
    setItemData({
      item_name: "",
      category: "",
      colour: "",
      brand: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    // console.log(itemData, value)
  };

  return (
    <div>
      <button
        className={`fixed right-[50px] bottom-[50px] w-[50px] h-[50px] rounded-full bg-green-grey text-white z-[3] ${showUploadModal ? "" : "neu-button"}`}
        onClick={() => setShowUploadModal(!showUploadModal)}
      >
        <AddRoundedIcon fontSize="large" />
      </button>

      {showUploadModal && (
        <>
          <div className="fixed inset-0 bg-black/[0.5]" />
          <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
            onClick={() => setShowUploadModal(false)}
          >
            <div
              className="absolute flex flex-col items-center justify-center bg-bv-white shadow-lg rounded-xl px-8 py-40 md:p-56"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-[10px] right-[15px] text-red-500"
                onClick={() => setShowUploadModal(false)}
              >
                <CloseIcon />
              </button>
              <form onSubmit={(e) => e.preventDefault()}>
                <input type="file" onChange={handleFileChange} />
              </form>
              {uploadedImage && !processedImage && (
                <div className="flex items-center justify-center">
                  <img className="w-[500px]" src={uploadedImage} alt="Image" />
                </div>
              )}
              {processedImage && (
                <div className="flex flex-col items-center justify-center]">
                  <img className="w-[500px]" src={processedImage} alt="Image" />
                  <div className="flex gap-8 w-full items-center justify-center">
                    <button
                      className="bg-green-400 text-bv-white px-4 py-2 rounded-xl neu-button"
                      onClick={handleConfirmUpload}
                    >
                      Confirm Upload
                    </button>
                    <button
                      className="bg-red-400 text-bv-white px-4 py-2 rounded-xl neu-button"
                      onClick={handleClearUpload}
                    >
                      Cancel Upload
                    </button>
                    <div className="flex flex-col gap-4">
                      <label htmlFor="item_name">Name</label>
                      <input
                        className="bg-gray-100"
                        type="text"
                        id="item_name"
                        value={itemData.item_name}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="category">Category</label>
                      <input
                        className="bg-gray-100"
                        type="text"
                        id="category"
                        value={itemData.category}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="colour">Colour</label>
                      <input
                        className="bg-gray-100"
                        type="text"
                        id="colour"
                        value={itemData.colour}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="brand">Brand</label>
                      <input
                        className="bg-gray-100"
                        type="text"
                        id="brand"
                        value={itemData.brand}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Upload;
